import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ClosableDialogTitle from '../ClosableDialogTitle';
import InviteToOrganizationButton from './InviteToOrganizationButton';
import TextContext from '../../../text/TextContext';
import InviteUserForm from '../../form/inviteUserForm/Form';
import { State, selectShowInviteToOrganization } from '../../../store/reducer';
import { closeInviteToOrganization } from '../../../store/inviteToOrganization/showInviteToOrganization';
import { connect } from 'react-redux';

interface ShowInviteToOrganizationProps {
    show: boolean,
    close: () => void
}

const ShowInviteToOrganization: React.FC< ShowInviteToOrganizationProps> = ({ show, close }) => (
    <Dialog open={show} maxWidth='sm' fullWidth>
        <ClosableDialogTitle onClose={close}>
            <TextContext.Consumer>
                {text => text.action.inviteToOrganization}
            </TextContext.Consumer>
        </ClosableDialogTitle>
        <DialogContent dividers>
            <InviteUserForm />
        </DialogContent>
        <DialogActions>
            <InviteToOrganizationButton />
        </DialogActions>
    </Dialog>
);

const Connected = connect(
    (state: State) => ({ show: selectShowInviteToOrganization(state) }),
    { close: closeInviteToOrganization }
)(ShowInviteToOrganization);

export default Connected;