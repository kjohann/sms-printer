import React, { useState } from 'react';
import profilePic from './noprofile.png'
import { parseSmsBackup, SmsBackup, SmsType } from './Upload/smsParser';
import MessageView from './MessageView';
import Message from './Message';

function App() {
  const [backup, setBackup] = useState<SmsBackup[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChosen = (file: Blob) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => { 
      setBackup(parseSmsBackup(fileReader.result as string)); 
      setLoading(false); 
    };
    setLoading(true);
    fileReader.readAsText(file);
  }
  if (backup.length > 0) {
    const mappedMessages = backup.filter(sms => sms.contactName === 'Mamma').slice(0, 40).map((sms, index) => {
      return <Message 
      key={`Message-${index}`} 
      image={profilePic}
      content={sms.body}
      timeStamp={sms.readableDate}
      isYou={sms.type === SmsType.Outgoing}
      fallbackIdentifer={sms.type === SmsType.Outgoing ? 'K' : 'M'}
    />;
    })
    return (
      <div className="App">
        <MessageView>
          {mappedMessages}
        </MessageView>
      </div>
    );
  }

  return (
    <div className="App">
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

export default App;
