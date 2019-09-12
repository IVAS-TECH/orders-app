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
import requestResult from './resquestResult';
import errorMessage from './errorMessage';
import accessDeniedDialog from './accessDeniedDialog';
import couldNotLoadDataDialog from './couldNotLoadDataDialog';
import orderInfo from './orderInfo';

const bg: Language = {
    action,
    bool,
    language,
    tab,
    form,
    stencilForm,
    orderStatus,
    orderFilter,
    orderFilterStepLabel,
    ordersSearchFilters: 'Филтри за търсене на поръчки',
    selectedOrdersSearchFilters: 'Избрани филтри за търсене на поръчки',
    fileNamePatternPlaceholder: 'Използвайте ? за кой да е символ и * за нула или повече символи',
    requestFor,
    requestResult,
    errorMessage,
    accessDeniedDialog,
    couldNotLoadDataDialog,
    orderInfo
};

export default bg;

