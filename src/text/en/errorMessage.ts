import ErrorMessage from './../language/ErrorMessage';

const errorMessage: ErrorMessage = {
    title: 'Error occured',
    text: {
        internalError: 'Internal server error happend. Try again after some time. If this message shows again please contact us.',
        invalidData: 'Valid data was sent to the server but it was reported that is invalid. Please contact us.',
        badResponse: 'The received response was not expected. Please contact us.',
        failedToSignIn: 'Invalid email and password combination.',
        networkError: 'Network error occured. Please check your connection. Try again after some time if you are connected to the internet. If this message shows again please contact us.',
        unknownError: 'Unknown error occured. Try again after some time. If this message shows again please contact us.' 
    },
    data: {
        userWithThisEmailExists: email => `There is a user with email: (${email}). Please check the entered email. If you own the email contact us immediately.`,
        organizationExists: name => `Organization with name ${name} already exists. Check the entered name if it is a trademark and you own it contact us immediately.`
    }
};

export default errorMessage;