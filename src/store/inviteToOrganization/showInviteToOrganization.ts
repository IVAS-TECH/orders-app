import { createReducer } from '../utils';

export const OPEN_INVITE_TO_ORGANIZATION = 'ivas-tech/orders-app/inviteToOrganizattion/showInviteToOrganization/OPEN_INVITE_TO_ORGANIZATION';

export const CLOSE_INVITE_TO_ORGANIZATION = 'ivas-tech/orders-app/inviteToOrganizattion/showInviteToOrganization/CLOSE_INVITE_TO_ORGANIZATION';

export interface OpenInviteToOrganization {
    type: typeof OPEN_INVITE_TO_ORGANIZATION
};

export interface CloseInviteToOrganization {
    type: typeof CLOSE_INVITE_TO_ORGANIZATION
};

export function openInviteToOrganization(): OpenInviteToOrganization {
    return { type: OPEN_INVITE_TO_ORGANIZATION };
};

export function closeInviteToOrganization(): CloseInviteToOrganization {
    return { type: CLOSE_INVITE_TO_ORGANIZATION };
};

const reducer = createReducer(false, {
    [OPEN_INVITE_TO_ORGANIZATION]: (
        _state: boolean,
        _action: OpenInviteToOrganization
    ) => true,
    [CLOSE_INVITE_TO_ORGANIZATION]: (
        _state: boolean,
        _action: CloseInviteToOrganization
    ) => false
});

export default reducer;