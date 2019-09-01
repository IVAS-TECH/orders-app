import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextContext from '../../text/TextContext';
import Action from '../../type/Action';
import { State, selectShowCouldNotLoadData } from '../../store/reducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ShowCouldNotLoadDataProps {
    retryAction: null | Action,
    dispatch: Dispatch
}

const ShowCouldNotLoadData: React.FC<ShowCouldNotLoadDataProps> = ({ retryAction, dispatch }) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={retryAction !== null} maxWidth='md'>
                <DialogTitle>
                    {text.couldNotLoadDataDialog.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text.couldNotLoadDataDialog.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={retryAction ? (() => dispatch(retryAction)) : undefined}
                        color='primary'>
                        {text.couldNotLoadDataDialog.retry}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);

const Connected = connect(
    (state: State) => ({ retryAction: selectShowCouldNotLoadData(state) }),
)(ShowCouldNotLoadData);

export default Connected;