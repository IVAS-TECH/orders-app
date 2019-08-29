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
        min: min => `Минималната стойност на полето е ${min}`,
        email: 'Въведен е невалиден адрес на електронна поща',
        minLength: min => `Дължината на това поле е ${min} най-малко`,
        maxLength: max => `Дължината на това поле е ${max} най-много`,
        symbols: 'Позволените символи са малки и големи латински букви, цифри, - (тире) и _ (долна черта)',
        lowerCaseLetter: 'Полето трябва да съдържа поне 1 малка латинска буква',
        upperCaseLetter: 'Полето трябва да съдържа поне 1 главна латинска буква',
        digit: 'Полето трябва да съдържа поне 1 цифра'
    },
    field: {
        email: 'Електронна поща',
        password: 'Парола',
        rememberMe: 'Запомни ме'
    },
    warning: {
        formIsInvalid: 'Формата е невалидна',
        fieldValueIsInvalid: 'Има поле с невалидна стойност'
    }
};

export default form;