import React, { useState } from 'react';
import profilePic from './noprofile.png'
import { parseSmsBackup, SmsBackup, SmsType } from './Upload/smsParser';
import EntryForm from './EntryForm';
import MessageView from './MessageView';
import Message from './Message';

function App() {
  const [backup, setBackup] = useState<SmsBackup[]>([]);
  const [loading, setLoading] = useState(false);

  
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
    <EntryForm setBackup={setBackup} setLoading={setLoading} />
  );
}

export default App;
