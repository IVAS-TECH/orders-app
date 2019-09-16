import { createAction } from './utils';
import { OrderData } from './../type/OrderData';

export const SIGN_IN = 'ivas-tech/orders-app/action/SIGN_IN';

export const CREATE_ORGANIZATION = 'ivas-tech/orders-app/action/CREATE_ORGANIZATION';

export const SIGN_UP = 'ivas-tech/orders-app/action/SIGN_UP';

export const MAKE_ORDER = 'ivas-tech/orders-app/action/MAKE_ORDER';

export const FETCH_ORDER_DATA = 'ivas-tech/orders-app/action/FETCH_ORDER_DATA';

export const ORDER_AGAIN = 'ivas-tech/orders-app/action/ORDER_AGAIN';

export const INVITE_TO_ORGANIZATION = 'ivas-tech/orders-app/action/INVITE_TO_ORGANIZATION';

export interface MakeOrder {
    type: typeof MAKE_ORDER,
    orderData: OrderData
};

export interface FetchOrderData {
    type: typeof FETCH_ORDER_DATA,
    id: string
};

export interface OrderAgain {
    type: typeof ORDER_AGAIN,
    id: string
};

export const signIn = createAction(SIGN_IN);

export const createOrganization = createAction(CREATE_ORGANIZATION);

export const signUp = createAction(SIGN_UP);

export function makeOrder(orderData: OrderData): MakeOrder {
    return { type: MAKE_ORDER, orderData };
};

export function fetchOrderData(id: string): FetchOrderData {
    return { type: FETCH_ORDER_DATA, id };
};

export function orderAgain(id: string): OrderAgain {
    return { type: ORDER_AGAIN, id };
};

export const inviteToOrganization = createAction(INVITE_TO_ORGANIZATION);