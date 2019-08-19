import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import StencilForm from './../form/stencilForm/Form';

const width = 1000;

const useStyles = makeStyles(theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(width + 2 * theme.spacing(3))]: {
            width,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(3),
        [theme.breakpoints.up(width + 2 * theme.spacing(4))]: {
            marginTop: theme.spacing(7),
            marginBottom: theme.spacing(7),
            padding: theme.spacing(4)
        }
    }
}));

const Order: React.FC<{}> = (props) => {
    const classes = useStyles(props);
    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <StencilForm />
            </Paper>
        </main>
    );
};

export default Order;