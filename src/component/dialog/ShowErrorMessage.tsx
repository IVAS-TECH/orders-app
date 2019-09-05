import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextContext from '../../text/TextContext';
import Text from '../../text/language/Text';
import { ErrorMessage, isTextErrorMessage } from '../../type/RequestError';
import { State, selectShowErrorMessage } from '../../store/reducer';
import { hideErrorMessage } from '../../store/showErrorMessage';
import { connect } from 'react-redux';

interface ShowErrorMessageProps {
    show: ErrorMessage | null,
    onOk: () => void
}

const ShowErrorMessage: React.FC<ShowErrorMessageProps> = ({ show, onOk }) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={show !== null} maxWidth='md'>
                <DialogTitle>
                    {text.requestResult.title}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        {show && textForErrorMessage(text, show)}
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
    (state: State) => ({ show: selectShowErrorMessage(state) }),
    { onOk: hideErrorMessage }
)(ShowErrorMessage);

export default Connected;

function textForErrorMessage(text: Text, errorMessage: ErrorMessage): string {
    if(isTextErrorMessage(errorMessage)) {
        return text.errorMessage.text[errorMessage];
    }
    const { error, data } = errorMessage;
    return text.errorMessage.data[error](data);
}