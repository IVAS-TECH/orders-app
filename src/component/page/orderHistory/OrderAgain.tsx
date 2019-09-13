import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import StencilForm from './../../form/stencilForm/Form';
import ClosableDialogTitle from './../../dialog/ClosableDialogTitle';
import TextContext from '../../../text/TextContext';

export interface OrderAgainProps {
    open: boolean,
    onClose: () => void
};

const OrderAgain: React.FC<OrderAgainProps> = ({
    open,
    onClose
}) => (
    <Dialog maxWidth='md' fullWidth scroll='body' open={open} onClose={onClose}>
        <ClosableDialogTitle onClose={onClose}>
            <TextContext.Consumer>
                {text => text.action.orderAgain}
            </TextContext.Consumer>
        </ClosableDialogTitle>
        <DialogContent dividers>
            <StencilForm />
        </DialogContent>
    </Dialog>
);

export default OrderAgain;