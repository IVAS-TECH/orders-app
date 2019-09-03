type RequestResult
= {
    result: 'createdOrganizationManager',
    data: string
} | {
    result: 'registeredUser',
    data: string
} | {
    result: 'createdOrder',
    data: string
};

export default RequestResult;