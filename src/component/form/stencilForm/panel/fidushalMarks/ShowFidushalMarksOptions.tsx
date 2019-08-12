import showContent from  '../../../connect/layout/ShowContent';
import form from '../../../../../store/stencilForm';
import { selectStencilForm } from '../../../../../store/reducer';

const ShowFidushalMarksOptions = showContent({
    form,
    showWhenFieldValueFormKey: 'fidushalMarks',
    extractFormState: selectStencilForm,
});

export default ShowFidushalMarksOptions;