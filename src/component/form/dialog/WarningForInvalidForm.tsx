import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
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

export default WarningForInvalidForm;