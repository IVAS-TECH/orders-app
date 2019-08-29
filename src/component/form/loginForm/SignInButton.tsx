import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from './../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectLoginForm } from './../../../store/reducer';
import loginForm from './../../../store/loginForm/form';

interface SignInButtonProps {
    className?: string,
    disabled: boolean
}

const SignInButton: React.FC<SignInButtonProps> = ({
    className,
    disabled
}) => (
    <Button
        fullWidth
        variant='contained'
        color='primary'
        className={className}
        disabled={disabled}>
        {<TextContext.Consumer>
            {text => text.action.signIn}
        </TextContext.Consumer>}
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        disabled: !loginForm.selectors.form.isValid(selectLoginForm(state))
    })
)(SignInButton);

export default ConnectedButton;