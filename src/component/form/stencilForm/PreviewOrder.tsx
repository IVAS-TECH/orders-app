import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Language from './../../../store/language/Language';
import { StencilData as StencilDataType } from './../../../type/StencilData';
import StencilData from './../../stencilData/StencilData';
import { formData } from './../../../store/stencilForm';
import { closeOrderPreview } from './../../../store/orderPreview';
import convertStencilFormDataToStencilData from './../../../logic/convertStencilFormDataToStencilData';
import { connect } from 'react-redux';
import { State, selectLanguage, selectPreviewOrder, selectStencilForm } from './../../../store/reducer';

export interface PreviewOrderProps {
    preview: boolean,
    language: Language,
    stencilData?: StencilDataType,
    onClose: () => void
};

const PreviewOrderDialog: React.FC<PreviewOrderProps> = ({
    preview,
    language,
    stencilData,
    onClose
}) => (
    <Dialog open={preview} onClose={onClose} fullWidth maxWidth='md' scroll='body'>
        <DialogTitle>
            {language.forms.stencilForm.previewOrder}
        </DialogTitle>
        <DialogContent>
            {stencilData && <StencilData language={language} stencilData={stencilData!} />}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color='primary' variant='contained'>
                {language.action.makeOrder}
            </Button>
        </DialogActions>
    </Dialog>
);

const PreviewOrder = connect(
    (state: State) => {
        const preview = selectPreviewOrder(state);
        const language = selectLanguage(state);
        const stencilFormState = selectStencilForm(state);
        const stencilData = formData(stencilFormState);
        return {
            preview,
            language,
            stencilData: stencilData === null
                ? undefined
                : convertStencilFormDataToStencilData(stencilData)
        }
    }, { onClose: closeOrderPreview }
)(PreviewOrderDialog);

export default PreviewOrder;