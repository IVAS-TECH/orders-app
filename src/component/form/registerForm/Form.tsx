import React from 'react';
import EmailField from './field/EmailField';
import PasswordField from './field/PasswordField';
import ConfirmPasswordField from './field/ConfirmPasswordField';
import UserNameField from './field/UserNameField';
import PhoneField from './field/PhoneField';
import SignUpButton from './SignUpButton';
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
            <ConfirmPasswordField />
            <UserNameField />
            <PhoneField />
            <SignUpButton className={classes.button} />
        </form>
    );
};

export default Form;