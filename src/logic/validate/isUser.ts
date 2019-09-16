import User from './../../type/User';

const roles = ['unknown', 'user', 'organizationManager', 'employee', 'admin'];

function isUser(user: unknown): user is User {
    if(typeof user !== 'object') {
        return false;
    }
    if(user === null) {
        return false;
    }
    const userObj = user as { authToken: any, name: any, role: any };
    if((typeof userObj.authToken !== 'string') || (userObj.authToken === '')) {
        return false;
    }
    if((typeof userObj.name !== 'string') || (userObj.name === '')) {
        return false;
    }
    if(!roles.includes(userObj.role)) {
        return false;
    }
    return true;
}

export default isUser;