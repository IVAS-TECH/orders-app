import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ClosableDialogTitle from './../../dialog/ClosableDialogTitle';
import { connect } from 'react-redux';
import { State, selectInvalidFormWarning } from './../../../store/reducer';
import { closeInvalidFormWarning } from './../../../store/invalidFormWarning';
import TextContext from './../../../text/TextContext';

export interface WarningForInvalidFormProps {
    open: boolean,
    title: string,
    warning: string,
    okAction: string,
    onClose: () => void
};

const WarningForInvalidForm: React.FC<WarningForInvalidFormProps> = ({
    open,
    title,
    warning,
    okAction,
    onClose
}) => (
    <Dialog open={open} onClose={onClose}>
        <ClosableDialogTitle onClose={onClose}>
            {title}
        </ClosableDialogTitle>
        <DialogContent dividers>
            <DialogContentText>
                {warning}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={onClose} color='primary'>
                {okAction}
            </Button>
        </DialogActions>
    </Dialog>
);

type WarningForInvalidFormWithTextProps = Omit<WarningForInvalidFormProps, 'title' | 'warning' | 'okAction'>;

const WarningForInvalidFormWithText: React.FC<WarningForInvalidFormWithTextProps> = ({
    open,
    onClose
}) => (
    <TextContext.Consumer>
        {text => (
            <WarningForInvalidForm
                open={open}
                onClose={onClose}
                title={text.form.warning.formIsInvalid}
                warning={text.form.warning.fieldValueIsInvalid}
                okAction={text.action.ok} />
        )}
    </TextContext.Consumer>
);

const Connnected = connect(
    (state: State) => ({ open: selectInvalidFormWarning(state) }),
    { onClose: closeInvalidFormWarning }
)(WarningForInvalidFormWithText);

export default Connnected;