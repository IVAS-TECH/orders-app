import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import OrderIcon from '@material-ui/icons/PlaylistAdd';
import OrderHistoryIcon from '@material-ui/icons/History';
import ActiveOrdersIcon from '@material-ui/icons/Sync';
import Order from './../page/Order';
import OrderHistory from '../page/orderHistory/OrderHistory';
import { connect } from 'react-redux';
import { configure } from './../utils';
import { State, selectLanguage, selectTab } from './../../store/reducer';
import { Tab, TabMap, changeTab, tabIndex, tabs } from './../../store/tab';

interface TabsProps {
    currentTab: Tab,
    onTabChange: (tab: Tab) => void,
    label: TabMap<string>,
    tabIndex: TabMap<number>,
    tabs: Array<Tab>
};

const page: TabMap<{ page: React.ReactNode, icon: React.ReactElement }> = {
    'active-orders': { page: 'NOT IMPLEMENTED', icon: <ActiveOrdersIcon /> },
    'order': { page: <Order />, icon:  <OrderIcon /> },
    'order-history': { page: <OrderHistory />, icon: <OrderHistoryIcon /> }
};

const Tabs: React.FC<TabsProps> = ({
    currentTab,
    onTabChange,
    label,
    tabIndex,
    tabs
}) => (
    <React.Fragment>
        <MuiAppBar position='static' >
            <MuiTabs
                value={tabIndex[currentTab]}
                onChange={(_, tabIndex) => onTabChange(tabs[tabIndex])}
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

const ConfiguredTabs = configure(Tabs, {
    tabIndex,
    tabs
});

const ConnectedTabs = connect(
    (state: State) => {
        const language = selectLanguage(state);
        const { activeOrders, order, orderHistory } = language.tab;
        return {
            currentTab: selectTab(state),
            label: {
                'active-orders': activeOrders,
                'order': order,
                'order-history': orderHistory
            }
        }
    }, { onTabChange: changeTab }
)(ConfiguredTabs);

export default  ConnectedTabs;