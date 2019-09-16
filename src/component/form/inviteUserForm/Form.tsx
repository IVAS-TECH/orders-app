import React from 'react';
import EmailField from './field/EmailField';
import UserNameField from './field/UserNameField';
import PhoneField from './field/PhoneField';

const Form: React.FC<{}> = () => (
    <form noValidate>
        <EmailField />
        <PhoneField />
        <UserNameField />
    </form>
);

export default Form;