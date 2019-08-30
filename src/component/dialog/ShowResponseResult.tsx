import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextContext from '../../text/TextContext';
import ResponseResult from '../../type/ResponseResult';
import { State, selectShowResponseResult } from '../../store/reducer';
import { hideResponseResult } from '../../store/showResponseResult';
import { connect } from 'react-redux';

interface ShowResponseResultProps {
    show: ResponseResult | null,
    onOk: () => void
}

const ShowResponseResult: React.FC<ShowResponseResultProps> = ({ show, onOk }) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={show !== null} maxWidth='sm'>
                <DialogTitle>
                    {text.responseResult.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {show && text.responseResult.text[show]}
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
    (state: State) => ({ show: selectShowResponseResult(state) }),
    { onOk: hideResponseResult }
)(ShowResponseResult);

export default Connected;