import OrderInfo from './../language/OrderInfo';

const orderInfo: OrderInfo = {
    orderId: 'Идентификатор на поръчката',
    orderedBy: 'Поръчана от',
    orderDate: 'Дата на поръчване',
    file: 'Файл',
    orderStatus: 'Статус на поръчката',
    ordersInProcess: 'Поръчки в процес',
    noOrdersToShow: 'Няма поръчки за показване',
    searchResult: 'Резултат от търсенето',
    noOrdersFound: 'Не са намерени поръчки',
    ordersPerPage: 'Брой поръчки на страница',
    ordersInfo: ({from, to, count}) => `${from} - ${to} от общо ${count}`
};

export default orderInfo;