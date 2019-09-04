import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import OrderIcon from '@material-ui/icons/PlaylistAdd';
import OrderHistoryIcon from '@material-ui/icons/History';
import ActiveOrdersIcon from '@material-ui/icons/Sync';
import ActiveOrders from './../page/activeOrders/ActiveOrders';
import Order from './../page/Order';
import OrderHistory from '../page/orderHistory/OrderHistory';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { configure } from './../utils';
import { State, selectRoute } from './../../store/reducer';
import Action from './../../type/Action';
import Tab, { TabMap } from './../../type/Tab';
import Text from './../../text/language/Text';
import TextContext from './../../text/TextContext';
import {
    ROUTE_HOME,
    ROUTE_ACTIVE_ORDERS,
    ROUTE_ORDER,
    ROUTE_ORDER_HISTORY,
    navigateToActiveOrders,
    navigateToOrder,
    navigateToOrderHistory
} from './../../store/location/route';

interface TabsProps {
    currentTab: Tab,
    dispatch: Dispatch
    label: TabMap<string>
};

const tabIndex: TabMap<number> = {
    'active-orders': 0,
    'order': 1,
    'order-history': 2
};

const tabs: ['active-orders', 'order', 'order-history']
          = ['active-orders', 'order', 'order-history'];

const page: TabMap<{ page: React.ReactNode, icon: React.ReactElement }> = {
    'active-orders': { page: <ActiveOrders />, icon: <ActiveOrdersIcon /> },
    'order': { page: <Order />, icon:  <OrderIcon /> },
    'order-history': { page: <OrderHistory />, icon: <OrderHistoryIcon /> }
};

const action: TabMap<() => Action> = {
    'active-orders': navigateToActiveOrders,
    'order': navigateToOrder,
    'order-history': navigateToOrderHistory
};

const Tabs: React.FC<TabsProps> = ({
    currentTab,
    dispatch,
    label
}) => (
    <React.Fragment>
        <MuiAppBar position='static' >
            <MuiTabs
                value={tabIndex[currentTab]}
                onChange={(_, tabIndex) => dispatch(action[tabs[tabIndex]]())}
                variant='fullWidth'
                centered >
                {tabs.map(tab => (
                    <MuiTab
                        key={tab}
                        label={label[tab]}
                        value={tabIndex[tab]}
                        icon={page[tab].icon} />
                ))}
            </MuiTabs>
        </MuiAppBar>
        {page[currentTab].page}
    </React.Fragment>
);

type TabsWtihTextProps = Omit<TabsProps, 'label'> & { label: (text: Text) => TabMap<string> };

const TabsWithText : React.FC<TabsWtihTextProps> = ({
    label,
    ...rest
}) => (
    <TextContext.Consumer>
        {text => (
            <Tabs {...rest} label={label(text)} />
        )}
    </TextContext.Consumer>
);

const routeToTabMap: Record<string, Tab | undefined> = {
    [ROUTE_HOME]: 'active-orders',
    [ROUTE_ACTIVE_ORDERS]: 'active-orders',
    [ROUTE_ORDER]: 'order',
    [ROUTE_ORDER_HISTORY]: 'order-history'
};

function mapRouteToTab(route: string): Tab {
    const tab = routeToTabMap[route];
    return tab ? tab : tabs[0];
}

const ConfiguredTabs = configure(TabsWithText, {
    tabIndex,
    tabs,
    label: text => text.tab
});

const ConnectedTabs = connect(
    (state: State) => ({ currentTab: mapRouteToTab(selectRoute(state)) })
)(ConfiguredTabs);

export default  ConnectedTabs;