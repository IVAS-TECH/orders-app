import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextContext from './../../text/TextContext';
import LoginForm from './../form/loginForm/Form';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    }
}));

const SignIn: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <Container component='main' maxWidth='sm'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <TextContext.Consumer>
                        {text => text.action.signIn}
                    </TextContext.Consumer>
                </Typography>
                <LoginForm />
            </Paper>
        </Container>
    );
};

export default SignIn;