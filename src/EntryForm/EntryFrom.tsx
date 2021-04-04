import React, { FunctionComponent } from 'react';
import styles from './EntryForm.module.scss';
import { parseSmsBackup, SmsBackup } from '../Upload/smsParser';

export type EntryFormProps = {
  setBackup: React.Dispatch<React.SetStateAction<SmsBackup[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const EntryForm: FunctionComponent<EntryFormProps> = (props) => {
  const { setBackup, setLoading } = props;

  const handleFileChosen = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => { 
      setBackup(parseSmsBackup(fileReader.result as string)); 
      setLoading(false); 
    };
    setLoading(true);
    fileReader.readAsText(file);
  }
  
  return (
    <div>
      <input
        type="file"
        accept=".xml"
        onChange={e => {
          if (e.target && e.target.files && e.target.files[0]) {
            handleFileChosen(e.target.files[0])
          }
        }}
      />
    </div>
  );
}

export default EntryForm;
