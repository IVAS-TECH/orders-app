import React from 'react';

const DivWithClassName: React.FC<{ className: string }> = ({ className, children }) => (
    <div className={className}>
        {children}
    </div>
);

export default DivWithClassName;