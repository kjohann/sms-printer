import React, { FunctionComponent } from 'react';
import styles from '../Message.module.scss';

export type MessageBubbleProps = {
  timeStamp: string
}

const MessageBubble: FunctionComponent<MessageBubbleProps> = ({
  children,
  timeStamp
}) => {
  return (
    <div className={styles['Message-bubble']}>
      {children}
      <div className={styles['Message-timestamp']}>
        {timeStamp}
      </div>
  </div>
  )
};

export default MessageBubble;
