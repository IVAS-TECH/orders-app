import Language from '../language/Text';
import action from './action';
import bool from './bool';
import language from './language';
import tab from './tab';
import form from './form';
import stencilForm from './stencilForm/stencilForm';
import orderStatus from './orderStatus';
import orderFilter from './orderFilter';
import orderFilterStepLabel from './orderFilterStepLabel';
import requestFor from './requestFor';
import requestResult from './requestResult';
import errorMessage from './errorMessage';
import accessDeniedDialog from './accessDeniedDialog';
import couldNotLoadDataDialog from './couldNotLoadDataDialog';
import orderInfo from './orderInfo';

const en: Language = {
    action,
    bool,
    language,
    tab,
    form,
    stencilForm,
    orderStatus,
    orderFilter,
    orderFilterStepLabel,
    ordersSearchFilters: 'Ordres search filters',
    fileNamePatternPlaceholder: 'Use ? to match any single character and * to match zero or more characters',
    requestFor,
    requestResult,
    errorMessage,
    accessDeniedDialog,
    couldNotLoadDataDialog,
    orderInfo
};

export default en;

