import keyedFilter, { ToggleKeyAction, selectPicked } from './keyedFilter';
import { OrderedByFilter } from '../../../type/OrderFilter';
import OrganizationMember from '../../../type/OrganizationMember';
import { createReducer } from './../../utils';
import { createSelector } from 'reselect';

export const TOGGLE_KEY = 'ivas-tech/orders-app/orderFilter/orderedBy/TOGGLE_KEY';

export const LOAD_STATE_FROM_ORGANIZATION_MEMBERS = 'ivas-tech/orders-app/orderFilter/orderedBy/LOAD_STATE_FROM_ORGANIZATION_MEMBERS';

export type ToggleKey = ToggleKeyAction<typeof TOGGLE_KEY, string>;

export interface LoadStateFromOrganizationMembers {
    type: typeof LOAD_STATE_FROM_ORGANIZATION_MEMBERS,
    members: Array<OrganizationMember>
};

const initialState: OrderedByFilter = {
    idFilter: { },
    name: { }
};

const idKeyFilter = keyedFilter<typeof TOGGLE_KEY, string>(TOGGLE_KEY, initialState.idFilter);

const { toggleKey } = idKeyFilter.action;

export { toggleKey };

export function loadStateFromOrganizationMembers(members: Array<OrganizationMember>): LoadStateFromOrganizationMembers {
    return { type: LOAD_STATE_FROM_ORGANIZATION_MEMBERS, members };
};

const reducer = createReducer(initialState, {
    [TOGGLE_KEY]: (
        state: OrderedByFilter,
        action: ToggleKey
    ) => ({
        idFilter: idKeyFilter.reducer(state.idFilter, action),
        name: state.name
    }),
    [LOAD_STATE_FROM_ORGANIZATION_MEMBERS]: (
        _state: OrderedByFilter,
        { members }: LoadStateFromOrganizationMembers
    ) => {
        const idFilter: OrderedByFilter['idFilter'] = { };
        const name: OrderedByFilter['name'] = { };
        for(const member of members) {
            const id = member._id;
            idFilter[id] = true;
            name[id] = member.name;
        }
        return { idFilter, name };
    }
});

export default reducer;

export const selectPickedFromOrderedBy = createSelector(
    (state: OrderedByFilter) => state.name,
    (state: OrderedByFilter) => selectPicked(state.idFilter),
    (name: Record<string, string>, picked: string[]) => picked.map(id => name[id])
);