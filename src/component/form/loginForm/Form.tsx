import React from 'react';
import EmailField from './field/EmailField';
import PasswordField from './field/PasswordField';
import RememberMeField from './field/RememberMeField';
import SignInButton from './button/SignInButton';
import ForgotPasswordButton from './button/ForgotPasswordButton';
import CreateOrganizationButton from './button/CreateOrganizationButton';
import Grid from '@material-ui/core/Grid';
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
            <SignInButton className={classes.button} />
            <Grid container direction='row'>
                <Grid item xs>
                    <ForgotPasswordButton className={classes.button} />
                </Grid>
                <Grid item xs>
                    <CreateOrganizationButton className={classes.button} />
                </Grid>
            </Grid>
        </form>
    );
};

export default Form;