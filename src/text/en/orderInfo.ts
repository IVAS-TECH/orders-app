import OrderInfo from './../language/OrderInfo';

const orderInfo: OrderInfo = {
    orderId: 'Order id',
    orderedBy: 'Ordered by',
    orderDate: 'Order date',
    file: 'File',
    orderStatus: 'Order status',
    ordersInProcess: 'Orders in process',
    noOrdersToShow: 'No orders to show',
    searchResult: 'Search result',
    noOrdersFound: 'No orders found',
    ordersPerPage: 'Orders per page',
    ordersInfo: ({from, to, count}) => `${from} - ${to} of ${count}`
};

export default orderInfo;