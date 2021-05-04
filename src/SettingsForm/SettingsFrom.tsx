import React, { FunctionComponent } from 'react';
import styles from './SettingsForm.module.scss';
import { parseMessageBackup, MessageBackup } from '../Upload/messageParser';

export type SettingsFormProps = {
  setBackup: React.Dispatch<React.SetStateAction<MessageBackup[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsForm: FunctionComponent<SettingsFormProps> = (props) => {
  const { setBackup, setLoading } = props;

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

export default SettingsForm;
