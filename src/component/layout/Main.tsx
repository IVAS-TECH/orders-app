import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const width = 900;

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

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const classes = useStyles();
    return (
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                {children}
            </Paper>
        </main>
    );
};

export default Main;