import { createAction } from './utils';
import { OrderData } from './../type/OrderData';

export const SIGN_IN = 'ivas-tech/orders-app/action/SIGN_IN';

export const CREATE_ORGANIZATION = 'ivas-tech/orders-app/action/CREATE_ORGANIZATION';

export const SIGN_UP = 'ivas-tech/orders-app/action/SIGN_UP';

export const MAKE_ORDER = 'ivas-tech/orders-app/action/MAKE_ORDER';

export const FETCH_ORDER_DATA = 'ivas-tech/orders-app/action/FETCH_ORDER_DATA';

export interface MakeOrder {
    type: typeof MAKE_ORDER,
    orderData: OrderData
};

export interface FetchOrderData {
    type: typeof FETCH_ORDER_DATA,
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
