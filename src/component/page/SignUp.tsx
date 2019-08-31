import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import IdentityIcon from '@material-ui/icons/PermIdentityOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextContext from './../../text/TextContext';
import RegisterForm from './../form/registerForm/Form';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(9),
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main
    }
}));

const SignUp: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <Container component='main' maxWidth='sm'>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <IdentityIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    <TextContext.Consumer>
                        {text => text.action.signUp}
                    </TextContext.Consumer>
                </Typography>
                <RegisterForm />
            </Paper>
        </Container>
    );
};

export default SignUp;