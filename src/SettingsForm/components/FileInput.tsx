import React, { FunctionComponent } from 'react';
import { Button } from '@material-ui/core';

export type FileInputProps = {
  onChange: (file: Blob) => void,
  id: string,
  accept: string | undefined,
  label: string
 }

const FileInput: FunctionComponent<FileInputProps> = ({
  onChange,
  id,
  accept,
  label
}) => {
  return (
    <label htmlFor={id}>
      <input
        hidden
        id={id}
        type="file"
        accept={accept}
        onChange={e => {
          if (e.target && e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
          }
        }}
      />
      <Button variant="outlined" component="span">
        {label}
      </Button>
    </label>
  )
};

export default FileInput;
