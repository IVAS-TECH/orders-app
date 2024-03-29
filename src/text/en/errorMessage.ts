import ErrorMessage from './../language/ErrorMessage';

const errorMessage: ErrorMessage = {
    title: 'Error occured',
    text: {
        internalError: 'Internal server error happend. Try again after some time. If this message shows again please contact us.',
        invalidData: 'Valid data was sent to the server but it was reported that is invalid. Please contact us.',
        badResponse: 'The received response was not expected. Please contact us.',
        failedToSignIn: 'Invalid email and password combination.',
        invalidOrganizationToken: 'Organization token used to access sign up page is invalid. Ensure you are using the right sign up link. If the link is correct try again after some time. If this message shows again please contact us.',
        couldNotRememberSignIn: 'Could not remember singing in. You can continue to use the application but you will not be remembered. This is due to browser error.',
        permissionDenied: 'You do not have permissions to make such request. If you belive that you do have please contact us. There is probably some mistake.',
        permissionDeniedForFile: 'Trying to make new order that uses file from older order. But you do not have permissions for that file. This is probably a mistake. If it is please contact us.',
        couldNotFindFile: 'Trying to make new order that uses file from older order. But file can not be found. This is probably a mistake. If it is please contact us.',
        networkError: 'Network error occured. Please check your connection. Try again after some time if you are connected to the internet. If this message shows again please contact us.',
        unknownError: 'Unknown error occured. Try again after some time. If this message shows again please contact us.' 
    },
    data: {
        userWithThisEmailExists: email => `There is a user with email: (${email}). Please check the entered email. If you own the email contact us immediately.`,
        organizationExists: name => `Organization with name: (${name}) already exists. Check the entered name if it is a trademark and you own it contact us immediately.`,
        userWithThisUserNameExistsInTheOrganization: name => `(${name}) is taken user name in the organization in which you are signing up. Please choose different one.`,
        orderNotFound: id => `Order with id: ${id}  was not found. Try again after some time. If this message shows again please contact us.`
    }
};

export default errorMessage;