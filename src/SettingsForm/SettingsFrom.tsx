import React, { FunctionComponent } from 'react';
import { TextField } from '@material-ui/core';
import styles from './SettingsForm.module.scss';
import { parseMessageBackup, MessageBackup } from '../Upload/messageParser';
import FileInput from './components/FileInput';

export type SettingsFormProps = {
  setBackup: React.Dispatch<React.SetStateAction<MessageBackup[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setContactName: React.Dispatch<React.SetStateAction<string>>,
  setContactPhone: React.Dispatch<React.SetStateAction<string>>,
  setYourName: React.Dispatch<React.SetStateAction<string>>,
}

const SettingsForm: FunctionComponent<SettingsFormProps> = (props) => {
  const { 
    setBackup, 
    setLoading, 
    setContactName,
    setContactPhone, 
    setYourName 
  } = props;

  const handleFileChosen = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => { 
      setBackup(parseMessageBackup(fileReader.result as string)); 
      setLoading(false); 
    };
    setLoading(true);
    fileReader.readAsText(file);
  }
  
  return (
    <div className={styles['SettingsForm']}>
      <div className={styles['SettingsForm-block']}>
        <FileInput 
          id="backup-input"
          accept=".xml"
          label="Velg backup-fil"
          onChange={handleFileChosen}
        />
      </div>
      <div className={styles['SettingsForm-block']}>
        <div className={styles['SettingsForm-inputControl']}>
          <TextField id="contact-name-input" label="Navn på kontakt" variant="standard" fullWidth onBlur={(e) => setContactName(e.target.value)} />
        </div>
        <div className={styles['SettingsForm-inputControl']}>
          <TextField id="contact-number-input" label="Telefonnummer til kontakt" variant="standard" fullWidth onBlur={(e) => setContactPhone(e.target.value)} />
        </div>
        <div className={styles['SettingsForm-inputControl']}>
          <TextField id="your-name-input" label="Ditt navn" variant="standard" fullWidth onBlur={(e) => setYourName(e.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default SettingsForm;
