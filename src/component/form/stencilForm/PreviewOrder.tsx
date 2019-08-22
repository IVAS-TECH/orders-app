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

export interface PreviewOrderProps {
    preview: boolean,
    stencilData?: StencilDataType,
    onClose: () => void
};

const PreviewOrderDialog: React.FC<PreviewOrderProps> = ({
    preview,
    stencilData,
    onClose
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
                    <Button onClick={onClose} color='primary' variant='contained'>
                        {text.action.makeOrder}
                    </Button>
                </DialogActions>
            </Dialog>
        )}
    </TextContext.Consumer>
);

const PreviewOrder = connect(
    (state: State) => {
        const preview = selectPreviewOrder(state);
        const stencilFormState = selectStencilForm(state);
        const stencilData = formData(stencilFormState);
        return {
            preview,
            stencilData: stencilData === null
                ? undefined
                : convertStencilFormDataToStencilData(stencilData)
        };
    }, { onClose: closeOrderPreview }
)(PreviewOrderDialog);

export default PreviewOrder;