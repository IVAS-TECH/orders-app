import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextContext from '../../text/TextContext';
import { State, selectShowAccessDenied } from '../../store/reducer';
import { logout } from '../../store/user';
import { connect } from 'react-redux';

interface ShowAccessDeniedProps {
    show: boolean,
    onOk: () => void
}

const ShowAccessDenied: React.FC<ShowAccessDeniedProps> = ({ show, onOk }) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={show} maxWidth='md'>
                <DialogTitle>
                    {text.accessDeniedDialog.title}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        {text.accessDeniedDialog.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onOk} color='primary'>
                        {text.action.ok}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);

const Connected = connect(
    (state: State) => ({ show: selectShowAccessDenied(state) }),
    { onOk: logout }
)(ShowAccessDenied);

export default Connected;