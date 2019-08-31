interface RequestResult {
    title: string,
    text: {
        createdOrganizationManager: (email: string) => string,
        registeredUser: (email: string) => string
    }
}

export default RequestResult;