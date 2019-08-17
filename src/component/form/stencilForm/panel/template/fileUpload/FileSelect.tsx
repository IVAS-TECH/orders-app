import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core';

interface FileInputProps {
    className: string,
    id: string,
    onFileChange: (file: File) => void
}

interface FileSelectButtonProps {
    selectedFile: boolean,
    fileSelectedText: string,
    fileNotSelectedText: string
}

export type FileSelectProps
= Omit<FileInputProps, 'className'>
& { className?: string }
& FileSelectButtonProps;

const FileInput: React.FC<FileInputProps> = ({
    className,
    id,
    onFileChange
}) => <input
    accept='.zip,.rar,.tar.gz,.tgz'
    className={className}
    id={id}
    type='file'
    onChange={handleInputChange(onFileChange)} />;

const Input = styled(FileInput)({ display: 'none' });

const FileSelectButton: React.FC<FileSelectButtonProps> = ({
    selectedFile,
    fileNotSelectedText,
    fileSelectedText
}) => (
    <Button
        component='span'
        variant='contained'
        color='primary' >
        {selectedFile ? fileSelectedText : fileNotSelectedText}
    </Button>
);

const FileSelect: React.FC<FileSelectProps> = ({
    id,
    className,
    onFileChange,
    selectedFile,
    fileNotSelectedText,
    fileSelectedText
}) => (
    <span className={className}>
        <Input id={id} onFileChange={onFileChange} />
        <label htmlFor={id}>
            <FileSelectButton
                selectedFile={selectedFile}
                fileNotSelectedText={fileNotSelectedText}
                fileSelectedText={fileSelectedText} />
        </label>
    </span>
);

export default FileSelect;

function handleInputChange(onFileChange: (file: File) => void): React.ChangeEventHandler<HTMLInputElement> {
    return event => onFileChange(event.target.files![0]);
}