import React, { ReactNode, Fragment } from 'react';

const ShowContent: React.FC<{
    show: boolean,
    children: ReactNode
}> = ({ show, children }) => (<Fragment>
    {show && children}
</Fragment>);

export default ShowContent;