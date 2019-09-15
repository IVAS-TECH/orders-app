import OrganizationUser from "./OrganizationUser";

interface Organization {
    name: string,
    manager: OrganizationUser,
    users: OrganizationUser[]
}

export default Organization;