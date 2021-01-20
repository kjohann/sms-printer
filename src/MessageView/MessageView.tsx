import React, { FunctionComponent } from 'react';
import styles from './MessageView.module.scss';

const MessageView: FunctionComponent = ( { children } ) => {
  return (
    <div className={styles['Message-View']}>
      {children}
    </div>
  )
};

export default MessageView;
