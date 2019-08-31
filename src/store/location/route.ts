import { createAction } from './../utils';

export const ROUTE_HOME = 'ivas-tech/orders-app/location/ROUTE_HOME';

export const ROUTE_SIGN_IN = 'ivas-tech/orders-app/location/ROUTE_SIGN_IN';

export const ROUTE_SIGN_UP = 'ivas-tech/orders-app/location/ROUTE_SIGN_UP';

export const ROUTE_CREATE_ORGANIZATION = 'ivas-tech/orders-app/location/CREATE_ORGANIZATION';

export const ROUTE_ACTIVE_ORDERS = 'ivas-tech/orders-app/location/ACTIVE_ORDERS';

export const ROUTE_ORDER = 'ivas-tech/orders-app/location/ORDER';

export const ROUTE_ORDER_HISTORY = 'ivas-tech/orders-app/location/ORDER_HISTORY';

export const navigateToSignIn = createAction(ROUTE_SIGN_IN);

export const navigateToSignUp = createAction(ROUTE_SIGN_UP);

export const navigateToCreateOrganization = createAction(ROUTE_CREATE_ORGANIZATION);

export const navigateToActiveOrders = createAction(ROUTE_ACTIVE_ORDERS);

export const navigateToOrder = createAction(ROUTE_ORDER);

export const navigateToOrderHistory = createAction(ROUTE_ORDER_HISTORY);