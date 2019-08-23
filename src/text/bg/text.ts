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
    fileNamePatternPlaceholder: 'Използвайте ? за кой да е символ и * за нула или повече символи'
};

export default bg;

