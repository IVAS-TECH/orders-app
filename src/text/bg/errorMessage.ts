import ErrorMessage from './../language/ErrorMessage';

const errorMessage: ErrorMessage = {
    title: 'Възникна грешка',
    text: {
        internalError: 'Възникна вътрешна грешка на сървъра. Опитайте отново след известно време. Ако видите отново това съобщение моля свържете се с нас.',
        invalidData: 'Бяха изпратени валидни данни, но отговорът на съвръра е, че са невалидни. Моля свържете се с нас.',
        badResponse: 'Полученият отгвор не беше очакван, моля свържете се с нас.',
        failedToSignIn: 'Комбинацията от електронна поща и парола не е разпозната.',
        invalidOrganizationToken: 'Ключът за достъп до регистрация в организацията е невалиден. Уверете се, че използвате правилния линк за регистраиця. Ако линка за достъп е правилния опитайте след известно време, ако отново видите това съобщние, моля свържете се с нас.',
        couldNotRememberSignIn: 'Не успешно запомняне. Може да продължите да използвате приложението, но няма да бъдете запомненни. Това се случва заради грешка на web browser-а, който използвате.',
        permissionDenied: 'Нямате необходимите права за да извършите заявката. Ако вярвате, че това не е така моля да се свържете с нас. Вероятно е възникнала грешка',
        permissionDeniedForFile: 'Опитвате се да направите нова поръчка, като използвате файл от по-стара. Но нямате достъп до файла. Това вероятно е недоразумение. Ако е така моля да се свържете с нас.',
        couldNotFindFile: 'Опитвате се да направите нова поръчка, като използвате файл от по-стара. Но файла не може да бъде намерен. Това вероятно е недоразумение. Ако е така моля да се свържете с нас.',
        networkError: 'Мрежова грешка. Моля уверете се, че сте свързани с интернет. Опитайте отново след известно време. Ако видите отново това съобщение моля свържете се с нас.',
        unknownError: 'Неразпозната грешка. Опитайте отново след известно време. Ако видите отново това съобщение моля свържете се с нас.' 
    },
    data: {
        userWithThisEmailExists: email => `Същесвува потребител с електронна поща: (${email}). Моля проверете въведения адрес на електронна поща, ако въведения адрес е ваш, моля незабавно се свържете с нас.`,
        organizationExists: name => `Съществува организация с името: (${name}). Проверете въведеното име, ако е регистрирана търговска марка, която е ваша собственост моля незабавно да се свържете с нас.`,
        userWithThisUserNameExistsInTheOrganization: name => `Потребителското име: (${name}) е заето в организацията, в която се регистрирате. Моля изберете друго потребителско име.`,
        orderNotFound: id => `Не е намерена поръчка с идентификатор: ${id}. Опитайте отново след известно време. Ако видите отново това съобщение моля свържете се с нас.`
    }
};

export default errorMessage;