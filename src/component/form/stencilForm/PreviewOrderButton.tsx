import React from 'react';
import MuiButton from '@material-ui/core/Button';
import { connect } from 'react-redux';
import stencilForm from './../../../store/stencilForm';
import { openOrderPreview } from './../../../store/orderPreview';
import { State, selectStencilForm } from './../../../store/reducer';
import TextContext from './../../../text/TextContext';

interface PreviewOrderButtonProps {
    isFormValid: boolean,
    showFormErrors: () => void,
    previewOrder: () => void
}

const Button: React.FC<PreviewOrderButtonProps> = ({
    isFormValid,
    showFormErrors,
    previewOrder
}) => (
    <TextContext.Consumer>
        {text => (
            <MuiButton
                variant='contained'
                color='primary'
                onClick={isFormValid ? previewOrder : showFormErrors}>
                {text.action.previewOrder}
            </MuiButton>
        )}
    </TextContext.Consumer>

);

const PreviewOrderButton = connect(
    (state: State) => {
        const formState = selectStencilForm(state);
        const { isValid } = stencilForm.selectors.form;
        return { isFormValid: isValid(formState) };
    },
    {
        showFormErrors: stencilForm.actions.showErrors,
        previewOrder: openOrderPreview
    }
)(Button);

export default PreviewOrderButton;