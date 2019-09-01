import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from './../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectOrganizationManagerForm } from './../../../store/reducer';
import form from './../../../store/organizationManagerForm/form';
import { createOrganization } from './../../../store/action';

interface SignInButtonProps {
    className?: string,
    isFormValid: boolean,
    showFormErrors: () => void,
    createOrganization: () => void
}

const SignInButton: React.FC<SignInButtonProps> = ({
    className,
    isFormValid,
    showFormErrors,
    createOrganization
}) => (
    <Button
        fullWidth
        variant='contained'
        color='primary'
        className={className}
        onClick={isFormValid ? createOrganization : showFormErrors}>
        {<TextContext.Consumer>
            {text => text.action.createOrganization}
        </TextContext.Consumer>}
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        isFormValid: form.selectors.form.isValid(selectOrganizationManagerForm(state))
    }),
    {
        createOrganization,
        showFormErrors: form.actions.showErrors
    }
)(SignInButton);

export default ConnectedButton;