import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from './../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectOrganizationManagerForm } from './../../../store/reducer';
import form from './../../../store/organizationManagerForm/form';
import { createOrganization } from './../../../store/action';

interface SignInButtonProps {
    className?: string,
    disabled: boolean,
    onCreateOrganization: () => void
}

const SignInButton: React.FC<SignInButtonProps> = ({
    className,
    disabled,
    onCreateOrganization
}) => (
    <Button
        fullWidth
        variant='contained'
        color='primary'
        className={className}
        disabled={disabled}
        onClick={onCreateOrganization}>
        {<TextContext.Consumer>
            {text => text.action.createOrganization}
        </TextContext.Consumer>}
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        disabled: !form.selectors.form.isValid(selectOrganizationManagerForm(state))
    }),
    { onCreateOrganization: createOrganization }
)(SignInButton);

export default ConnectedButton;