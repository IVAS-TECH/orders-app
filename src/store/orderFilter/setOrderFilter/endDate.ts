import dateFilter from './dateFilter';

const SET_DATE = 'ivas-tech/orders-app/orderFilter/endDate/SET_DATE';

const endDate = dateFilter(SET_DATE);

const { setDate, setNow } = endDate.action;

export { setDate, setNow };

export default endDate.reducer;