interface RequestResult {
    title: string,
    text: {
        createdOrganizationManager: (email: string) => string,
        registeredUser: (email: string) => string,
        createdOrder: (id: string) => string,
        inviteUser: (link: string) => string
    }
}

export default RequestResult;