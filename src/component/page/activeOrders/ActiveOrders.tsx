import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrdersInProcess from './OrdersInProcess';

const data = [
    {
        id: '483483583475',
        orderedBy: 'Ivo Stratev',
        date: new Date(),
        file: 'archive1.zip',
        status: 'waiting' as 'waiting'
    },
    {
        id: '483483583475',
        orderedBy: 'Ivo Stratev',
        date: new Date(),
        file: 'archive1.zip',
        status: 'waiting' as 'waiting'
    },
    {
        id: '483483583475',
        orderedBy: 'Ivo Stratev',
        date: new Date(),
        file: 'archive1.zip',
        status: 'waiting' as 'waiting'
    },
    {
        id: '483483583475',
        orderedBy: 'Ivo Stratev',
        date: new Date(),
        file: 'archive1.zip',
        status: 'waiting' as 'waiting'
    }
];

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

const ActiveOrders: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <OrdersInProcess
            paperClass={classes.paper}
            titleClass={classes.title}
            noOrdersToShowClass={classes.noOrdersText}
            orders={Math.random() < 0.5 ? data : []} />
    );
};

export default ActiveOrders;