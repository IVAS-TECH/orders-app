import React from 'react';
import EmailField from './field/EmailField';
import PasswordField from './field/PasswordField';
import RememberMeField from './field/RememberMeField';
import Button from '@material-ui/core/Button';
import TextContext from './../../../text/TextContext';
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
            <TextContext.Consumer>
                {text => (
                    <Button
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.button}>
                        {text.action.signIn}
                    </Button>

                )}
            </TextContext.Consumer>
        </form>
    );
};

export default Form;