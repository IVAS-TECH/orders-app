import { closeStencilFormIsInvalidWarning } from '../../../store/stencilFormIsInvalidWarning';
import { selectWarnForStencilFormIsInvalid } from '../../../store/reducer';
import warningForInvalidForm from '../../../connect/form/dialog/warningForInvalidForm';

const FormIsInvalidWarning = warningForInvalidForm({
    open: selectWarnForStencilFormIsInvalid,
    onClose: closeStencilFormIsInvalidWarning
});

export default FormIsInvalidWarning;