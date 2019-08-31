import RequestResult from '../language/RequestResult';

const requestResult: RequestResult = {
    title: 'Резултат от заявката',
    text: {
        createdOrganizationManager: email => `Създадени са организация и потребителски профил. Изпратено е електронно писмо за потвърждение до: (${email}). Изпълнете инструкциите за да активирате своя потребителски профил.`,
        registeredUser: email => `Успешно създаден потребителски профил. Изпратено е електронно писмо за потвърждение до: (${email}). Изпълнете инструкциите за да активирате своя потребителски профил.`
    }
};

export default requestResult;