export type UserRole = 'unknown' | 'user' | 'organizationManager' | 'employee' | 'admin';

interface User {
    authToken: string,
    name: string,
    role: Exclude<UserRole, 'unknown'>
}

export default User;