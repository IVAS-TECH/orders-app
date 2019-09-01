import OrganizationMember from './../../type/OrganizationMember';

function isMembers(members: unknown): members is Array<OrganizationMember> {
    if(!(members instanceof Array)) {
        return false;
    }
    if(members.length === 0) {
        return false;
    }
    return members.every(member => {
        if(typeof member !== 'object') {
            return false;
        }
        if(Object.keys(member).length !== 2) {
            return false;
        }
        if(typeof member._id !== 'string') {
            return false;
        }
        if(typeof member.name !== 'string') {
            return false;
        }
        if((member._id === '') || (member.name === '')) {
            return false;
        }
        return true;
    });
}

export default isMembers;