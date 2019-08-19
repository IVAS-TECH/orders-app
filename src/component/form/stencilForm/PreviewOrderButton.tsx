import React from 'react';
import MuiButton from '@material-ui/core/Button';
import { connect } from 'react-redux';
import stencilForm from './../../../store/stencilForm';
import { openOrderPreview } from './../../../store/orderPreview';
import { openStencilFormIsInvalidWarning } from './../../../store/stencilFormIsInvalidWarning';
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
    <MuiButton
        variant='contained'
        color='primary'
        onClick={isFormValid ? previewOrder : showFormErrors}>
        {text}
    </MuiButton>
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
    },
    dispatch => ({
        showFormErrors: () => {
            dispatch(stencilForm.actions.showErrors());
            dispatch(openStencilFormIsInvalidWarning());
        },
        previewOrder: () => dispatch(openOrderPreview())
    })
)(Button);

export default PreviewOrderButton;