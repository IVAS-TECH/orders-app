import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ClosableDialogTitle from '../../dialog/ClosableDialogTitle';
import { OrderData as OrderDataType } from '../../../type/OrderData';
import OrderData from '../../orderData/OrderData';
import TextContext from '../../../text/TextContext';

export interface ViewOrderProps {
    orderData: null | OrderDataType,
    onClose: () => void,
};

const ViewOrder: React.FC<ViewOrderProps> = ({
    orderData,
    onClose
}) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={orderData !== null} onClose={onClose} fullWidth maxWidth='md' scroll='body'>
                <ClosableDialogTitle onClose={onClose}>
                    {text.action.previewOrder}
                </ClosableDialogTitle>
                <DialogContent dividers>
                    {orderData && <OrderData text={text} orderData={orderData} />}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={onClose}
                        color='primary'
                        variant='contained'>
                        {text.action.ok}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);

export default ViewOrder;