import React from 'react';
import Button from '@material-ui/core/Button';
import TextContext from '../../../text/TextContext';
import { connect } from 'react-redux';
import { State, selectInviteUserForm } from '../../../store/reducer';
import form from '../../../store/inviteToOrganization/inviteUserForm';
import { inviteToOrganization } from '../../../store/action';

interface InviteToOrganizationButtonProps {
    isInviteUserFormValid: boolean,
    showInviteUserErrors: () => void,
    inviteToOrganization: () => void
}

const InviteToOrganizationButton: React.FC<InviteToOrganizationButtonProps> = ({
    isInviteUserFormValid,
    showInviteUserErrors,
    inviteToOrganization
}) => (
    <Button
        variant='contained'
        color='primary'
        onClick={isInviteUserFormValid ? inviteToOrganization : showInviteUserErrors}>
        {<TextContext.Consumer>
            {text => text.action.inviteToOrganization}
        </TextContext.Consumer>}
    </Button>
);

const ConnectedButton = connect(
    (state: State) => ({
        isInviteUserFormValid: form.selectors.form.isValid(selectInviteUserForm(state))
    }),
    {
        inviteToOrganization,
        showInviteUserErrors: form.actions.showErrors
    }
)(InviteToOrganizationButton);

export default ConnectedButton;