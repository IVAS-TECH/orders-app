import { connectRoutes } from 'redux-first-router';
import {
    /*ROUTE_SIGN_IN,
    ROUTE_SIGN_UP,
    ROUTE_REGISTER_ORGANIZATION,*/
    ROUTE_ACTIVE_ORDERS,
    ROUTE_ORDER,
    ROUTE_ORDER_HISTORY
} from './route';

const routeMap = {
    [ROUTE_ACTIVE_ORDERS]: '/',
    [ROUTE_ORDER]: '/order',
    [ROUTE_ORDER_HISTORY]: '/history'
};

const { reducer, enhancer, middleware } = connectRoutes(routeMap);

export { enhancer, middleware };

export default reducer;