import Form from './../language/Form';

const form: Form = {
    notSelected: subject => {
        switch(subject) {
            case 'he': return 'Не избран';
            case 'she': return 'Не избрана';
            case 'it': return 'Не избрано';
        }
    },
    fieldError: {
        required: 'Полето е задължително',
        min: min => `Минималната стойност на полето е ${min}`
    },
    warning: {
        formIsInvalid: 'Формата е невалидна',
        fieldValueIsInvalid: 'Има поле с невалидна стойност'
    }
};

export default form;