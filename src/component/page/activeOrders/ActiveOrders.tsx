import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrdersInProcess from './OrdersInProcess';
import OrderInfo from './../../../type/OrderInfo';
import { State, selectActiveOrders, selectViewOrder } from './../../../store/reducer';
import { connect } from 'react-redux';
import { fetchOrderData } from './../../../store/action';
import { closeViewOrder} from './../../../store/viewOrder';
import ViewOrder from '../common/ViewOrder';
import { OrderData } from '../../../type/OrderData';

interface ActiveOrdersProps {
    ordersInProcess: OrderInfo[],
    viewOrder: null | OrderData,
    fetchOrderData: (id: string) => void,
    closeViewOrder: () => void;
}

const useStyles = makeStyles(theme => ({
    paper: {
        width: '90%',
        marginTop: theme.spacing(6),
        marginLeft: 'auto',
        marginRight: 'auto',
        overflowX: 'auto'
    },
    title: {
        margin: theme.spacing(2)
    },
    noOrdersText: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(6)
    }
}));

const ActiveOrders: React.FC<ActiveOrdersProps> = ({
    ordersInProcess,
    viewOrder,
    fetchOrderData,
    closeViewOrder
}) => {
    const classes = useStyles();
    return (
        <>
             <OrdersInProcess
                paperClass={classes.paper}
                titleClass={classes.title}
                noOrdersToShowClass={classes.noOrdersText}
                orders={ordersInProcess}
                fetchOrderData={fetchOrderData} />
            <ViewOrder orderData={viewOrder} onClose={closeViewOrder} />
        </>
    );
};

const Page = connect(
    (state: State) => ({
        ordersInProcess: selectActiveOrders(state),
        viewOrder: selectViewOrder(state)
    }),
    { fetchOrderData, closeViewOrder }
)(ActiveOrders);

export default Page;