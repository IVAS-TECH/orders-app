import React from 'react';
import MUIButton from '@material-ui/core/Button';
import { connect } from 'react-redux';
import stencilForm from './../../../store/stencilForm';
import { openOrderPreview } from './../../../store/orderPreview';
import { selectStencilForm, selectLanguage, State } from './../../../store/reducer';

interface PreviewOrderButtonProps {
    text: string,
    isFormValid: boolean,
    showFormErrors: () => void,
    previewOrder: () => void
}

const Button: React.FC<PreviewOrderButtonProps> = ({
    text,
    isFormValid,
    showFormErrors,
    previewOrder
}) => (
    <MUIButton
        variant='contained'
        color='primary'
        onClick={isFormValid ? previewOrder : showFormErrors}>
        {text}
    </MUIButton>
);

const PreviewOrderButton = connect(
    (state: State) => {
        const language = selectLanguage(state);
        const formState = selectStencilForm(state);
        const { isValid } = stencilForm.selectors.form;
        return {
            text: language.forms.stencilForm.previewOrder,
            isFormValid: isValid(formState)
        }
    }, {
        showFormErrors: stencilForm.actions.showErrors,
        previewOrder: openOrderPreview
    }
)(Button);

export default PreviewOrderButton;