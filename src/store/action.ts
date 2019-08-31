import { createAction } from './utils';

export const SIGN_IN = 'ivas-tech/orders-app/action/SIGN_IN';

export const CREATE_ORGANIZATION = 'ivas-tech/orders-app/action/CREATE_ORGANIZATION';

export const SIGN_UP = 'ivas-tech/orders-app/action/SIGN_UP';

export const signIn = createAction(SIGN_IN);

export const createOrganization = createAction(CREATE_ORGANIZATION);

export const signUp = createAction(SIGN_UP);