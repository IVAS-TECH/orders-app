import create from '../flag';

const { reducer, action: { turnOn, turnOff } } = create({
    email: true,
    password: false,
    confirmPassword: false,
    userName: false,
    phone: false
}, 'register');

export const showEmailError = () => turnOn('email');
export const dontShowEmailError = () => turnOff('email');
export const showPasswordError = () => turnOn('password');
export const dontShowPasswordError = () => turnOff('password');
export const showConfirmPasswordError = () => turnOn('confirmPassword');
export const dontShowConfirmPasswordError = () => turnOff('confirmPassword');
export const showUserNameError = () => turnOn('userName');
export const dontShowUserNameError = () => turnOff('userName');
export const showPhoneError = () => turnOn('phone');
export const dontShowPhoneError = () => turnOff('phone');

export default reducer;