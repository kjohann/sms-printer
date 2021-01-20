import React, { FunctionComponent } from 'react';
import styles from './Message.module.scss';

export type MessageProps = {
  image?: string,
  fallbackIdentifer: string,
  content: string,
  isYou: boolean | undefined
}

const Message: FunctionComponent<MessageProps> = ( { 
  image,
  fallbackIdentifer,
  content,
  isYou
 } ) => {

  const identifierMoniker = image 
    ? <img src={image} alt="profile pic" /> 
    : <div>{fallbackIdentifer}</div>

  return (
    <div className={`${styles.Message}${isYou ? ` ${styles['Message--right']}` : ''}`}>
      <div className={styles['Message-sender']}>
        {identifierMoniker}
      </div>
      <div className={styles['Message-content']}>
        {content}
      </div>
  </div>    
  )
};

export default Message;
