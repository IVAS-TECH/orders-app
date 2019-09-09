import { TextErrorMessage } from './../../type/RequestError';

interface ErrorMessage {
    title: string,
    text: Record<TextErrorMessage, string>,
    data:{
        userWithThisEmailExists: (email: string) => string,
        organizationExists: (organization: string) => string,
        userWithThisUserNameExistsInTheOrganization: (userName: string) => string,
        orderNotFound: (orderID: string) => string
    }
}

export default ErrorMessage;