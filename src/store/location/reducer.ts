import { connectRoutes } from 'redux-first-router';
import {
    ROUTE_HOME,
    ROUTE_SIGN_IN,
    ROUTE_SIGN_UP,
    ROUTE_CREATE_ORGANIZATION,
    ROUTE_ACTIVE_ORDERS,
    ROUTE_ORDER,
    ROUTE_ORDER_HISTORY,
    ROUTE_ORGANIZATION
} from './route';

const routeMap = {
    [ROUTE_HOME]: '/',
    [ROUTE_SIGN_IN]: '/signIn',
    [ROUTE_SIGN_UP]: '/signUp/:organzation/:email?',
    [ROUTE_CREATE_ORGANIZATION]: '/createOrganization',
    [ROUTE_ACTIVE_ORDERS]: '/active',
    [ROUTE_ORDER]: '/order',
    [ROUTE_ORDER_HISTORY]: '/history',
    [ROUTE_ORGANIZATION]: '/organization'
};

const { reducer, enhancer, middleware } = connectRoutes(routeMap);

export { enhancer, middleware };

export default reducer;