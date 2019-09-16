import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from './../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectRegisterForm } from './../../../store/reducer';
import form from './../../../store/registerForm/form';
import { signUp } from './../../../store/action';

interface SignUpButtonProps {
    className?: string,
    isFormValid: boolean,
    showFormErrors: () => void,
    signUp: () => void
}

const SignUpButton: React.FC<SignUpButtonProps> = ({
    className,
    isFormValid,
    showFormErrors,
    signUp
}) => (
    <Button
        fullWidth
        variant='contained'
        color='primary'
        className={className}
        onClick={isFormValid ? signUp : showFormErrors}>
        {<TextContext.Consumer>
            {text => text.action.signUp}
        </TextContext.Consumer>}
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        isFormValid: form.selectors.form.isValid(selectRegisterForm(state))
    }),
    {
        signUp,
        showFormErrors: form.actions.showErrors
    }
)(SignUpButton);

export default ConnectedButton;