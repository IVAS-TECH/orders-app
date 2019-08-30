import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextContext from '../../text/TextContext';
import RequestFor from '../../type/RequestFor';
import { State, selectShowRequestFor } from '../../store/reducer';
import { connect } from 'react-redux';

interface ShowRequestForProps {
    show: RequestFor | null
}

const ShowRequestFor: React.FC<ShowRequestForProps> = ({ show }) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={show !== null} maxWidth='sm'>
                <DialogTitle>
                    {text.requestFor.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {show && text.requestFor.text[show]}
                    </DialogContentText>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        )}
    </TextContext.Consumer>
);

const Connected = connect(
    (state: State) => ({ show: selectShowRequestFor(state) })
)(ShowRequestFor);

export default Connected;