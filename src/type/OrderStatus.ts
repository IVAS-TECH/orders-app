export type OrderStatus
= 'waiting'
| 'accepted'
| 'rejected'
| 'canceled'
| 'processing'
| 'ready'
| 'delivered';

export type OrderStatusMap<T> = Record<OrderStatus, T>;

export default OrderStatus;