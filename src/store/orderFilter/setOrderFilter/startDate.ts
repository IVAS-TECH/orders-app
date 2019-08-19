import dateFilter from './dateFilter';

const SET_DATE = 'ivas-tech/orders-app/orderFilter/startDate/SET_DATE';

const startDate = dateFilter(SET_DATE);

const { setDate, setNow } = startDate.action;

export { setDate, setNow };

export default startDate.reducer;