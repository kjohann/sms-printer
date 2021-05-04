import React, { FunctionComponent } from 'react';
import MessageSender from '../components/MessageSender';
import MessageBubble from '../components/MessageBubble';
import styles from '../Message.module.scss';

export type SmsMessageProps = {
  image?: string,
  fallbackIdentifier: string,
  content: string,
  timeStamp: string,
  isYou: boolean | undefined
}

const SmsMessage: FunctionComponent<SmsMessageProps> = ( { 
  image,
  fallbackIdentifier,
  content,
  timeStamp,
  isYou
 } ) => {  

  return (
    <div className={`${styles.Message}${isYou ? ` ${styles['Message--right']}` : ''}`}>
      <MessageSender
        image={image}
        fallbackIdentifier={fallbackIdentifier}
      />
      <MessageBubble timeStamp={timeStamp}>
        <div>
          {content}
        </div>
      </MessageBubble>
  </div>
  )
};

export default SmsMessage;
