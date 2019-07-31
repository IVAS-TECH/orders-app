import React from 'react';
import FileField from './FileField';
import FileIsFromRackelSideField from './FileIsFromRackelSideField';
import CountField from './CountField';

const Form: React.FC = () => (
    <div>
        <FileField />
        <FileIsFromRackelSideField />
        <CountField />
    </div>
);

export default Form;