import User from './../../type/User';

function isUser(user: unknown): user is User {
    if(typeof user !== 'object') {
        return false;
    }
    if(user === null) {
        return false;
    }
    const userObj = user as { authToken: any, name: any };
    if((typeof userObj.authToken !== 'string') || (userObj.authToken === '')) {
        return false;
    }
    if((typeof userObj.name !== 'string') || (userObj.name === '')) {
        return false;
    }
    return true;
}

export default isUser;