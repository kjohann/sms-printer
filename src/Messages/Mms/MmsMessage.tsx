import React, { FunctionComponent } from 'react';
import { MmsBackupPart, MmsPartType } from '../../Upload/messageParser';
import MmsMessageImagePart from './MmsMessageImagePart';
import mmsStyles from './Mms.module.scss';
import styles from '../Message.module.scss';
import MessageSender from '../components/MessageSender';
import MessageBubble from '../components/MessageBubble';

export type MmsMessageProps = {
  image?: string,
  fallbackIdentifier: string,
  content: MmsBackupPart[],
  timeStamp: string,
  isYou: boolean | undefined
}

const MmsMessage: FunctionComponent<MmsMessageProps> = ( { 
  image,
  fallbackIdentifier,
  content,
  timeStamp,
  isYou
 } ) => {

  const parts = content.map((part, i) => {
    return part.type === MmsPartType.Image
      ? (
        <MmsMessageImagePart 
          key={`mmsPart-${timeStamp}-${i}`} 
          name={part.name} 
          contentType={part.contentType} 
          base64EncodedImage={part.base64EncodedImage} 
        />)
      : (
        <div key={`mmsPart-${timeStamp}-${i}`} className={mmsStyles['Mms-content']}>
          {part.text}
        </div>
      )
  });

  return (
    <div className={`${styles.Message}${isYou ? ` ${styles['Message--right']}` : ''}`}>
      <MessageSender
        image={image}
        fallbackIdentifier={fallbackIdentifier}
      />
      <MessageBubble timeStamp={timeStamp}>
        {parts}
      </MessageBubble>
  </div>
  )
};

export default MmsMessage;
