import create from '../flag';

const { reducer, action: { turnOn, turnOff } } = create({
    email: true,
    userName: true,
    phone: true
}, 'register');

export const showEmailError = () => turnOn('email');
export const dontShowEmailError = () => turnOff('email');
export const showUserNameError = () => turnOn('userName');
export const dontShowUserNameError = () => turnOff('userName');
export const showPhoneError = () => turnOn('phone');
export const dontShowPhoneError = () => turnOff('phone');

export default reducer;