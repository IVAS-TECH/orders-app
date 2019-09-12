interface OrderInfo {
    orderId: string,
    orderedBy: string,
    orderDate: string,
    file: string,
    orderStatus: string,
    ordersInProcess: string,
    noOrdersToShow: string,
    searchResult: string,
    noOrdersFound: string,
    ordersPerPage: string,
    ordersInfo: (info: { from: number, to: number, count: number }) => string
}

export default OrderInfo;