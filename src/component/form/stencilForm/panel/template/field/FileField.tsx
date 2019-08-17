import FileUpload from './../fileUpload/FileUpload';
import form from './../../../../../../store/stencilForm';
import { formField } from './../../../../../../store/form/reducer';
import { State, selectLanguage, selectStencilForm } from './../../../../../../store/reducer';
import { configure } from './../../../../../../component/utils';
import { connect } from 'react-redux';

const formKey = 'file';

const {
    value,
    error,
    setValue
} = formField(form, formKey);

const Field = configure(FileUpload, {
    id: form.id(formKey),
});

const FileField = connect(
    (state: State) => {
        const formState = selectStencilForm(state);
        const language = selectLanguage(state);
        const { noFileIsSelected, selectFile, changeFile } = language.forms.stencilForm.file;
        const fieldValue = value(formState);
        return {
            fileName: fieldValue ? fieldValue.name : undefined,
            error: error(formState) !== undefined,
            notSelectedText: noFileIsSelected,
            fileSelectedText: changeFile,
            fileNotSelectedText: selectFile
        }
    }, { onFileChange: setValue }
)(Field);

export default FileField;