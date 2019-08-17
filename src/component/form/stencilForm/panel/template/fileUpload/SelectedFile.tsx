import React from 'react';
import Chip from '@material-ui/core/Chip';
import FileCopyIcon from '@material-ui/icons/FileCopy';

export interface SelectedFileProps {
    fileName?: string,
    error: boolean,
    notSelectedText: string
}

const SelectedFile: React.FC<SelectedFileProps> = ({
    fileName,
    error,
    notSelectedText
}) => {
    const text = fileName ? fileName : notSelectedText;
    const color = error ? 'secondary' : fileName ? 'primary' : 'default';
    return <Chip
        variant='outlined'
        color={color}
        icon={fileName ? <FileCopyIcon /> : undefined}
        label={text} />;
};

export default SelectedFile;