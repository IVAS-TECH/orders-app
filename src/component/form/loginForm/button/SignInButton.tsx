import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from '../../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectLoginForm } from '../../../../store/reducer';
import loginForm from '../../../../store/loginForm/form';
import { signIn } from '../../../../store/action';

interface SignInButtonProps {
    className?: string,
    isFormValid: boolean,
    showFormErrors: () => void,
    signIn: () => void
}

const SignInButton: React.FC<SignInButtonProps> = ({
    className,
    isFormValid,
    showFormErrors,
    signIn
}) => (
    <Button
        fullWidth
        variant='contained'
        color='primary'
        className={className}
        onClick={isFormValid ? signIn : showFormErrors}>
        <TextContext.Consumer>
            {text => text.action.signIn}
        </TextContext.Consumer>
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        isFormValid: loginForm.selectors.form.isValid(selectLoginForm(state))
    }),
    {
        signIn,
        showFormErrors: loginForm.actions.showErrors
    }
)(SignInButton);

export default ConnectedButton;