import React, { useState } from 'react';
import { MessageBackup } from './Upload/messageParser';
import SettingsForm from './SettingsForm';
import MessageView from './MessageView';

function App() {
  const [backup, setBackup] = useState<MessageBackup[]>([]);
  const [loading, setLoading] = useState(false);
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [yourName, setYourName] = useState<string>('');

  if (loading) {
    return <>Loading</>;
  }

  return (
    <div className="App">
      <SettingsForm 
        setBackup={setBackup}
        setLoading={setLoading}
        setContactName={setContactName}
        setContactPhone={setContactPhone}
        setYourName={setYourName}
      />
      <MessageView 
        backup={backup}
        contactName={contactName}
        contactPhone={contactPhone}
        yourName={yourName}
      />
    </div>        
  );
}

export default App;
