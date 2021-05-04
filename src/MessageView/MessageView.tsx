import React, { FunctionComponent } from 'react';
import { MessageBackup, MessageSenderType, isSms, isMms } from '../Upload/messageParser';
import { SmsMessage, MmsMessage} from '../Messages';
import styles from './MessageView.module.scss';
import profilePic from '../noprofile.png'

type MessageViewProps = {
  backup: MessageBackup[]
}

const MessageView: FunctionComponent<MessageViewProps> = ( { backup } ) => {
  if (backup.length === 0) return null;
  const mappedMessages = backup
  .filter(sms => sms.contactName === 'Mamma')
  // .slice(0, 40)
  .map((message, index) => {
  if (isSms(message)) {
    return (
      <SmsMessage 
        key={`Message-${index}`} 
        image={profilePic}
        content={message.body}
        timeStamp={message.readableDate}
        isYou={message.type === MessageSenderType.Outgoing}
        fallbackIdentifier={message.type === MessageSenderType.Outgoing ? 'K' : 'M'}
      />
    );
  } else if (isMms(message)) {
    return (
      <MmsMessage
        key={`Message-${index}`} 
        image={profilePic}
        content={message.parts}
        timeStamp={message.readableDate}
        isYou={message.type === MessageSenderType.Outgoing}
        fallbackIdentifier={message.type === MessageSenderType.Outgoing ? 'K' : 'M'}
      />
    )
  } else {
    throw new Error("This should not happen");
  }    
})
  return (
    <div className={styles['Message-View']}>
      {mappedMessages}
    </div>
  )
};

export default MessageView;
