import React, { useState } from 'react';
import { MessageBackup } from './Upload/messageParser';
import SettingsForm from './SettingsForm';
import MessageView from './MessageView';

function App() {
  const [backup, setBackup] = useState<MessageBackup[]>([]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <>Loading</>;
  }

  return (
    <div className="App">
      <SettingsForm setBackup={setBackup} setLoading={setLoading} />
      <MessageView backup={backup} />
    </div>        
  );
}

export default App;
