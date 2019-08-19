import valueFilter from './valueFilter';

const SET_FILE_NAME = 'ivas-tech/orders-app/orderFilter/fileName/SET_FILE_NAME';

const { reducer, action } = valueFilter(SET_FILE_NAME, '');

const setFileName = action.set;

export { setFileName };

export default reducer;