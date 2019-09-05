import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextContext from '../../text/TextContext';
import RequestResult from '../../type/RequestResult';
import { State, selectShowRequestResult } from '../../store/reducer';
import { hideRequestResult } from '../../store/showRequestResult';
import { connect } from 'react-redux';

interface ShowRequestResultProps {
    show: RequestResult | null,
    onOk: () => void
}

const ShowRequestResult: React.FC<ShowRequestResultProps> = ({ show, onOk }) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={show !== null} maxWidth='md'>
                <DialogTitle>
                    {text.requestResult.title}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        {show && text.requestResult.text[show.result](show.data)}
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
    (state: State) => ({ show: selectShowRequestResult(state) }),
    { onOk: hideRequestResult }
)(ShowRequestResult);

export default Connected;