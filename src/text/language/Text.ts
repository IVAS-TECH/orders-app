import Action from './Action';
import Bool from './Bool';
import Form from './Form';
import Langage from './Language';
import Tab from './Tab';
import StencilForm from './stencilForm/StencilForm';
import OrderStatus from './OrderStatus';
import OrderFilter from './OrderFilter';
import OrderFilterStepLabel from './OrderFilterStepLabel';
import RequestFor from './RequestFor';
import RequestResult from './RequestResult';
import ErrorMessage from './ErrorMessage';
import AccessDeniedDialog from './AccessDeniedDialog';
import CouldNotLoadDataDialog from './CouldNotLoadDataDialog';

interface Text {
    action: Action,
    bool: Bool,
    form: Form,
    language: Langage,
    tab: Tab,
    stencilForm: StencilForm,
    orderStatus: OrderStatus,
    orderFilter: OrderFilter,
    orderFilterStepLabel: OrderFilterStepLabel,
    ordersSearchFilters: string,
    fileNamePatternPlaceholder: string,
    requestFor: RequestFor,
    requestResult: RequestResult,
    errorMessage: ErrorMessage,
    accessDeniedDialog: AccessDeniedDialog,
    couldNotLoadDataDialog: CouldNotLoadDataDialog
}

export default Text;