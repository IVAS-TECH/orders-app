import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from './../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectRegisterForm } from './../../../store/reducer';
import form from './../../../store/registerForm/form';
import { signUp } from './../../../store/action';

interface SignInButtonProps {
    className?: string,
    disabled: boolean,
    onSignUp: () => void
}

const SignInButton: React.FC<SignInButtonProps> = ({
    className,
    disabled,
    onSignUp
}) => (
    <Button
        fullWidth
        variant='contained'
        color='primary'
        className={className}
        disabled={disabled}
        onClick={onSignUp}>
        {<TextContext.Consumer>
            {text => text.action.signUp}
        </TextContext.Consumer>}
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        disabled: !form.selectors.form.isValid(selectRegisterForm(state))
    }),
    { onSignUp: signUp }
)(SignInButton);

export default ConnectedButton;