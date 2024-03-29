import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CurrentFilters from './filters/currentFilters/CurrentFilters';
import SetFilters from './filters/setFilters/SetFilters';
import ChangeFilters from './filters/ChangeFilters';
import FilteredOrders from './FilteredOrders';
import ViewOrder from '../common/ViewOrder';
import OrderAgain from './OrderAgain';
import { ordersPerPageOptions, changeOrdersPerPage } from './../../../store/filteredOrders';
import {
    State,
    selectCurrentOrderFilter,
    selectChangeOrderFilter,
    selectFilteredOrders,
    selectSetOrderFilter,
    selectViewOrder,
    selectOrderAgain
} from './../../../store/reducer';
import { fetchOrderData, orderAgain } from './../../../store/action';
import { closeViewOrder} from './../../../store/viewOrder';
import { closeOrderAgain } from './../../../store/orderAgain';
import OrderInfo from '../../../type/OrderInfo';
import { OrderData } from '../../../type/OrderData';

interface OrderHistoryProps {
    isOderFilterSet: boolean,
    changeOrderFilters: boolean,
    currentOrdersPage: OrderInfo[],
    fetchOrderData: (id: string) => void,
    orderAgain: (id: string) => void,
    ordersCount: number,
    ordersPerPage: number,
    pageNumber: number,
    changeOrdersPerPage: (ordersPerPage: number) => void,
    memberIdToNameMap: Record<string, string>,
    viewOrderData: null | OrderData,
    onViewOrderDataClose: () => void,
    openOrderAgain: boolean,
    closeOrderAgain: () => void
}

const filtersWidth = 1000;

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3)
    },
    filters: {
        margin: theme.spacing(4),
        padding: theme.spacing(3),
        [theme.breakpoints.up(filtersWidth + 2 * theme.spacing(4))]: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
            marginLeft: 'auto',
            marginRight: 'auto',
            width: filtersWidth,
            padding: theme.spacing(2)
        }
    },
    filteredOrders: {
        width: '98%',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: { padding: theme.spacing(3) },
    noOrdersText: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6)
    }
}));

const OrderHistory: React.FC<OrderHistoryProps> = ({
    isOderFilterSet,
    changeOrderFilters,
    currentOrdersPage,
    fetchOrderData,
    orderAgain,
    ordersCount,
    ordersPerPage,
    pageNumber,
    changeOrdersPerPage,
    memberIdToNameMap,
    viewOrderData,
    onViewOrderDataClose,
    openOrderAgain,
    closeOrderAgain
}) => {
    const classes = useStyles();
    return (
        <>
            <main className={classes.layout}>
                <Paper className={classes.filters}>
                    {isOderFilterSet ? <CurrentFilters /> : <SetFilters />}
                </Paper>
                {isOderFilterSet && <Paper className={classes.filteredOrders}>
                    <FilteredOrders
                        titleClass={classes.title}
                        noOrdersToShowClass={classes.noOrdersText}
                        orders={currentOrdersPage}
                        ordersPerPageOptions={ordersPerPageOptions}
                        fetchOrderData={fetchOrderData}
                        orderAgain={orderAgain}
                        ordersCount={ordersCount}
                        ordersPerPage={ordersPerPage}
                        pageNumber={pageNumber}
                        changeOrdersPerPage={changeOrdersPerPage}
                        memberIdToNameMap={memberIdToNameMap} />
                </Paper>}
            </main>
            {isOderFilterSet && <>
                <ChangeFilters changeFilters={changeOrderFilters} />
                <ViewOrder orderData={viewOrderData} onClose={onViewOrderDataClose} />
                <OrderAgain open={openOrderAgain} onClose={closeOrderAgain} />  
            </>}
        </>
    );
};

const OrderHistoryPage = connect(
    (state: State) => {
        const { currentPage, count, ordersPerPage, pageNumber } = selectFilteredOrders(state);
        return {
            isOderFilterSet: selectCurrentOrderFilter(state) !== null,
            changeOrderFilters: selectChangeOrderFilter(state),
            currentOrdersPage: currentPage,
            ordersCount: count,
            ordersPerPage,
            pageNumber,
            memberIdToNameMap: selectSetOrderFilter(state).orderedBy.name,
            viewOrderData: selectViewOrder(state),
            openOrderAgain: selectOrderAgain(state)
        };
    }, {
        fetchOrderData,
        orderAgain,
        changeOrdersPerPage,
        onViewOrderDataClose: closeViewOrder,
        closeOrderAgain
    }
)(OrderHistory)

export default OrderHistoryPage;