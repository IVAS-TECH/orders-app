import { createAction } from './utils';
import { StencilData } from './../type/StencilData';

export const SIGN_IN = 'ivas-tech/orders-app/action/SIGN_IN';

export const CREATE_ORGANIZATION = 'ivas-tech/orders-app/action/CREATE_ORGANIZATION';

export const SIGN_UP = 'ivas-tech/orders-app/action/SIGN_UP';

export const MAKE_ORDER = 'ivas-tech/orders-app/action/MAKE_ORDER';

export interface MakeOrder {
    type: typeof MAKE_ORDER,
    stencilData: StencilData
};

export const signIn = createAction(SIGN_IN);

export const createOrganization = createAction(CREATE_ORGANIZATION);

export const signUp = createAction(SIGN_UP);

export function makeOrder(stencilData: StencilData): MakeOrder {
    return { type: MAKE_ORDER, stencilData };
};

