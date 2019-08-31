type RequestResult
= {
    result: 'createdOrganizationManager',
    data: string
} | {
    result: 'registeredUser',
    data: string
};

export default RequestResult;