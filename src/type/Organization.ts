import OrganizationUser from "./OrganizationUser";

interface Organization {
    manager: OrganizationUser,
    users: OrganizationUser[]
}

export default Organization;