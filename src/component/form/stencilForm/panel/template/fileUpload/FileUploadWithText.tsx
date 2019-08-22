import React from 'react';
import FileUpload, { FileUploadProps } from './FileUpload';
import TextContext from './../../../../../../text/TextContext';

type KeyOfTextProps = 'notSelectedText' | 'fileSelectedText' | 'fileNotSelectedText';

export type FileUploadWithTextProps = Omit<FileUploadProps, KeyOfTextProps>;

const FileUploadWithText: React.FC<FileUploadWithTextProps> = (props) => (
    <TextContext.Consumer>
        {text => (
            <FileUpload
                {...props}
                notSelectedText={text.stencilForm.file.noFileIsSelected}
                fileNotSelectedText={text.stencilForm.file.selectFile}
                fileSelectedText={text.stencilForm.file.changeFile} />
        )}
    </TextContext.Consumer>
);

export default FileUploadWithText;