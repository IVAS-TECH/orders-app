import React from 'react';
import EmailField from './field/EmailField';
import PasswordField from './field/PasswordField';
import RememberMeField from './field/RememberMeField';
import SignInButton from './SignInButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    button: { margin: theme.spacing(3, 0, 2) },
}));

const Form: React.FC<{}> = () => {
    const classes = useStyles();
    return (
        <form className={classes.form} noValidate>
            <EmailField />
            <PasswordField />
            <RememberMeField />
            <SignInButton />
        </form>
    );
};

export default Form;