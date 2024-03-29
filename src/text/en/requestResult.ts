import RequestResult from '../language/RequestResult';

const requestResult: RequestResult = {
    title: 'Request result',
    text: {
        createdOrganizationManager: email => `Organization and user profile were successfully created. Confirmation email was send to: (${email}). Follow instructions there to activate your user profile.`,
        registeredUser: email => `User profile successfully created. Confirmation email was send to: (${email}). Follow instructions there to activate your user profile.`,
        createdOrder: id => `Created order with id: ${id}`,
        inviteUser: link => `Send this link: (${link}) to invite the user`
    }
};

export default requestResult;