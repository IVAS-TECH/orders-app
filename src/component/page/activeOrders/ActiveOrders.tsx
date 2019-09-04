import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrdersInProcess from './OrdersInProcess';
import OrderInfo from './../../../type/OrderInfo';
import { State, selectActiveOrders } from './../../../store/reducer';
import { connect } from 'react-redux';

interface ActiveOrdersProps {
    ordersInProcess: OrderInfo[]
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
    ordersInProcess
}) => {
    const classes = useStyles();
    return (
        <OrdersInProcess
            paperClass={classes.paper}
            titleClass={classes.title}
            noOrdersToShowClass={classes.noOrdersText}
            orders={ordersInProcess} />
    );
};

const Page = connect(
    (state: State) => ({ ordersInProcess: selectActiveOrders(state) })
)(ActiveOrders);

export default Page;