import FileUploadWithText from './../fileUpload/FileUploadWithText';
import form from './../../../../../../store/stencilForm';
import { formField } from './../../../../../../store/form/reducer';
import { State, selectStencilForm } from './../../../../../../store/reducer';
import { configure } from './../../../../../../component/utils';
import { connect } from 'react-redux';

const formKey = 'file';

const {
    value,
    error,
    setValue
} = formField(form, formKey);

const Field = configure(FileUploadWithText, { id: form.id(formKey) });

const FileField = connect(
    (state: State) => {
        const formState = selectStencilForm(state);
        const fieldValue = value(formState);
        return {
            fileName: fieldValue ? fieldValue.name : undefined,
            error: error(formState) !== undefined
        }
    }, { onFileChange: setValue }
)(Field);

export default FileField;