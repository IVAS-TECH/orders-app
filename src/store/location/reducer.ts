import { connectRoutes } from 'redux-first-router';
import {
    ROUTE_SIGN_IN,
    ROUTE_SIGN_UP,
    ROUTE_CREATE_ORGANIZATION,
    ROUTE_ACTIVE_ORDERS,
    ROUTE_ORDER,
    ROUTE_ORDER_HISTORY
} from './route';

const routeMap = {
    [ROUTE_SIGN_IN]: '/signIn',
    [ROUTE_SIGN_UP]: '/signUp',
    [ROUTE_CREATE_ORGANIZATION]: '/createOrganization',
    [ROUTE_ACTIVE_ORDERS]: '/active',
    [ROUTE_ORDER]: '/order',
    [ROUTE_ORDER_HISTORY]: '/history'
};

const { reducer, enhancer, middleware } = connectRoutes(routeMap);

export { enhancer, middleware };

export default reducer;