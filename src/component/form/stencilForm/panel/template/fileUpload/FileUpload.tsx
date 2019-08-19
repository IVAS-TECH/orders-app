import React from 'react';
import FileSelect from './FileSelect';
import SelectedFile from './SelectedFile';
import { styled } from '@material-ui/styles';

export interface FileUploadProps {
    id: string,
    onFileChange: (file: File) => void,
    fileName?: string,
    error: boolean,
    notSelectedText: string,
    fileSelectedText: string,
    fileNotSelectedText: string
};

const FileSelectWithMarginRight = styled(FileSelect)({ marginRight: 16 });

const FileUpload: React.FC<FileUploadProps> = ({
    id,
    onFileChange,
    fileName,
    error,
    notSelectedText,
    fileNotSelectedText,
    fileSelectedText
}) => (
    <span>
        <FileSelectWithMarginRight
            id={id}
            onFileChange={onFileChange}
            selectedFile={!!fileName}
            fileNotSelectedText={fileNotSelectedText}
            fileSelectedText={fileSelectedText} />
        <SelectedFile
            fileName={fileName}
            error={error}
            notSelectedText={notSelectedText} />
    </span>
);

export default FileUpload;