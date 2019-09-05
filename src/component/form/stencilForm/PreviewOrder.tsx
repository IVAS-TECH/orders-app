import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ClosableDialogTitle from './../../dialog/ClosableDialogTitle';
import { OrderData as OrderDataType } from './../../../type/OrderData';
import OrderData from './../../orderData/OrderData';
import { formData } from './../../../store/stencilForm';
import { closeOrderPreview } from './../../../store/orderPreview';
import convertStencilFormDataToOrderData from './../../../logic/convertStencilFormDataToOrderData';
import { connect } from 'react-redux';
import { State, selectPreviewOrder, selectStencilForm } from './../../../store/reducer';
import TextContext from './../../../text/TextContext';
import { createSelector } from 'reselect';
import { makeOrder } from './../../../store/action';

export interface PreviewOrderProps {
    preview: boolean,
    orderData: null | OrderDataType,
    onClose: () => void,
    makeOrder: (orderData: OrderDataType) => void
};

const PreviewOrderDialog: React.FC<PreviewOrderProps> = ({
    preview,
    orderData,
    onClose,
    makeOrder
}) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={preview} onClose={onClose} fullWidth maxWidth='md' scroll='body'>
                <ClosableDialogTitle onClose={onClose}>
                    {text.action.previewOrder}
                </ClosableDialogTitle>
                <DialogContent dividers>
                    {orderData && <OrderData text={text} orderData={orderData!} />}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={orderData ? (() => makeOrder(orderData)) : onClose}
                        color='primary'
                        variant='contained'>
                        {text.action.makeOrder}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);


const orderData = createSelector(
    formData,
    orderData => orderData === null ? null : convertStencilFormDataToOrderData(orderData)
);

const PreviewOrder = connect(
    (state: State) => {
        const preview = selectPreviewOrder(state);
        return {
            preview,
            orderData: preview ? orderData(selectStencilForm(state)) : null
        };
    },
    {
        onClose: closeOrderPreview,
        makeOrder
    }
)(PreviewOrderDialog);

export default PreviewOrder;