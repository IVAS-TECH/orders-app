import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CurrentFilters from './filters/currentFilters/CurrentFilters';
import SetFilters from './filters/setFilters/SetFilters';
import ChangeFilters from './filters/ChangeFilters';
import { connect } from 'react-redux';
import { State, selectCurrentOrderFilter, selectChangeOrderFilter } from './../../../store/reducer';

interface OrderHistoryProps {
    isOderFilterSet: boolean,
    changeOrderFilters: boolean
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
    }
}));

const OrderHistory: React.FC<OrderHistoryProps> = ({
    isOderFilterSet,
    changeOrderFilters
}) => {
    const classes = useStyles();
    return (
        <main className={classes.layout}>
            <Paper className={classes.filters}>
                {isOderFilterSet ? <CurrentFilters /> : <SetFilters />}
            </Paper>
            <ChangeFilters changeFilters={changeOrderFilters} />
        </main>
    );
};

const OrderHistoryPage = connect(
    (state: State) => ({
        isOderFilterSet: selectCurrentOrderFilter(state) !== null,
        changeOrderFilters: selectChangeOrderFilter(state)
    })
)(OrderHistory)

export default OrderHistoryPage;