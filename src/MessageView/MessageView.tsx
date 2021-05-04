import React, { FunctionComponent } from 'react';
import { MessageBackup, MessageSenderType, isSms, isMms } from '../Upload/messageParser';
import { SmsMessage, MmsMessage} from '../Messages';
import styles from './MessageView.module.scss';
import profilePic from '../noprofile.png'

type MessageViewProps = {
  backup: MessageBackup[],
  contactName: string,
  contactPhone: string,
  yourName: string
}

const MessageView: FunctionComponent<MessageViewProps> = ({ 
  backup,
  contactName,
  contactPhone,
  yourName
}) => {
  if (backup.length === 0) return null;
  
  const resolvePhone = (phoneNumber: string) => {
    return phoneNumber.startsWith('+47') ? phoneNumber : `+47${phoneNumber}`;
  }

  const getFirstLetter = (name:string) => name.substr(0, 1).toUpperCase();

  const getFallBackIdentifier = (message: MessageBackup) => message.type === MessageSenderType.Outgoing ? getFirstLetter(yourName) : getFirstLetter(contactName)

  const mappedMessages = backup
  .filter(sms => sms.contactName === contactName || sms.address === resolvePhone(contactPhone))
  .map((message, index) => {
    if (isSms(message)) {
      return (
        <SmsMessage 
          key={`Message-${index}`} 
          image={profilePic}
          content={message.body}
          timeStamp={message.readableDate}
          isYou={message.type === MessageSenderType.Outgoing}
          fallbackIdentifier={getFallBackIdentifier(message)}
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
          fallbackIdentifier={getFallBackIdentifier(message)}
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
