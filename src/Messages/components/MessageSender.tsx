import React, { FunctionComponent } from 'react';
import styles from '../Message.module.scss';

export type MessageSenderProps = {
  image: string | undefined,
  fallbackIdentifier: string
}

const MessageSender: FunctionComponent<MessageSenderProps> = ({
  image,
  fallbackIdentifier
}) => {
  const identifierMoniker = image 
    ? <img src={image} alt={`Profile for ${fallbackIdentifier}`} /> 
    : <div>{fallbackIdentifier}</div>

  return (
    <div className={styles['Message-sender']}>
      {identifierMoniker}
    </div>
  );
};

export default MessageSender;
