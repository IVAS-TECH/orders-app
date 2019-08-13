import React from 'react';
import MUIButton from '@material-ui/core/Button';
import { connect } from 'react-redux';
import stencilForm, { FormValues } from './../../../store/stencilForm';
import { selectStencilForm, selectLanguage, State } from './../../../store/reducer';

interface PreviewOrderButtonProps {
    text: string,
    isFormValid: () => boolean,
    formValues: () => FormValues,
    validateForm: () => void
}

const Button: React.FC<PreviewOrderButtonProps> = ({
    text,
    isFormValid,
    formValues,
    validateForm
}) => (
    <MUIButton variant='contained' color='primary' onClick={() => {
        if(isFormValid()) {
            console.log(formValues());
        } else {
            validateForm();
        }
    }}>
        {text}
    </MUIButton>
);

const PreviewOrderButton = connect(
    (state: State) => {
        const language = selectLanguage(state);
        const formState = selectStencilForm(state);
        const { isValid, values } = stencilForm.selectors.form;
        return {
            text: language.forms.stencilForm.previewOrder,
            isFormValid: () => isValid(formState),
            formValues: () => values(formState)
        }
    }, { validateForm: stencilForm.actions.validateForm }
)(Button);

export default PreviewOrderButton;