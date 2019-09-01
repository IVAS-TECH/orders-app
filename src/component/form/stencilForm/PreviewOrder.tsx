import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { StencilData as StencilDataType } from './../../../type/StencilData';
import StencilData from './../../stencilData/StencilData';
import { formData } from './../../../store/stencilForm';
import { closeOrderPreview } from './../../../store/orderPreview';
import convertStencilFormDataToStencilData from './../../../logic/convertStencilFormDataToStencilData';
import { connect } from 'react-redux';
import { State, selectPreviewOrder, selectStencilForm } from './../../../store/reducer';
import TextContext from './../../../text/TextContext';
import { createSelector } from 'reselect';
import { makeOrder } from './../../../store/action';

export interface PreviewOrderProps {
    preview: boolean,
    stencilData: null | StencilDataType,
    onClose: () => void,
    makeOrder: (stencilData: StencilDataType) => void
};

const PreviewOrderDialog: React.FC<PreviewOrderProps> = ({
    preview,
    stencilData,
    onClose,
    makeOrder
}) => (
    <TextContext.Consumer>
        {text => (
            <Dialog open={preview} onClose={onClose} fullWidth maxWidth='md' scroll='body'>
                <DialogTitle>
                    {text.action.previewOrder}
                </DialogTitle>
                <DialogContent>
                    {stencilData && <StencilData text={text} stencilData={stencilData!} />}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={stencilData ? (() => makeOrder(stencilData)) : onClose}
                        color='primary'
                        variant='contained'>
                        {text.action.makeOrder}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);


const stencilData = createSelector(
    formData,
    stencilData => stencilData === null ? null : convertStencilFormDataToStencilData(stencilData)
);

const PreviewOrder = connect(
    (state: State) => {
        const preview = selectPreviewOrder(state);
        return {
            preview,
            stencilData: preview ? stencilData(selectStencilForm(state)) : null
        };
    },
    {
        onClose: closeOrderPreview,
        makeOrder
    }
)(PreviewOrderDialog);

export default PreviewOrder;