import { connect } from 'react-redux';
import { State, selectLanguage } from '../../../store/reducer';
import { ComponentType } from 'react';
import WarningForInvalidForm from '../../../component/form/dialog/WarningForInvalidForm';

export default function warningForInvalidForm({ open, onClose } : {
    open: (state: State) => boolean,
    onClose: () => { type: string }
}): ComponentType<{}> {
    return connect(
        (state: State) => {
            const language = selectLanguage(state);
            const { formIsInvalid, fieldValueIsInvalid } = language.forms.warning;
            return {
                open: open(state),
                title: formIsInvalid,
                warning: fieldValueIsInvalid,
                okAction: language.action.ok
            }
        }, { onClose }
    )(WarningForInvalidForm);
};