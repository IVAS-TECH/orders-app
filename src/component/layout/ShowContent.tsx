import React, { ReactNode } from 'react';

const ShowContent: React.FC<{
    show: boolean,
    children: ReactNode
}> = ({ show, children }) => (<>{show && children}</>);

export default ShowContent;