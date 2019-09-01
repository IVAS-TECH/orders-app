import create from './../flag';

const { reducer, action: { turnOn, turnOff } } = create({
    email: true,
    password: true
}, 'login');

export const showEmailError = () => turnOn('email');
export const dontShowEmailError = () => turnOff('email');
export const showPasswordError = () => turnOn('password');
export const dontShowPasswordError = () => turnOff('password');

export default reducer;