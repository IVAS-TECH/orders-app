import showContent from  '../../../../../connect/form/layout/showContent';
import form from '../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../store/reducer';

const ShowFidushalMarksOptions = showContent({
    form,
    showWhenFieldValueFormKey: 'multiply',
    extractFormState: selectStencilForm,
});

export default ShowFidushalMarksOptions;