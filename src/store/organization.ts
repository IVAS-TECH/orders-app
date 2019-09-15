import Organization from './../type/Organization';
import { createReducer } from './utils';

export const LOAD_ORGANIZATION_DATA = 'ivas-tech/orders-app/organization/LOAD_ORGANIZATION_DATA';

export interface LoadOrganizationData {
    type: typeof LOAD_ORGANIZATION_DATA,
    organization: Organization
};

export function loadOrganizationData(organization: Organization): LoadOrganizationData {
    return { type: LOAD_ORGANIZATION_DATA, organization };
};

export type State = null | Organization;

const reducer = createReducer(null as State, {
    [LOAD_ORGANIZATION_DATA]: (
        _state: State,
        { organization }: LoadOrganizationData
    ) => organization
});

export default reducer;