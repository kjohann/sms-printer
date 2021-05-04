import React, { FunctionComponent } from 'react';
import styles from './Mms.module.scss';

export type MmsMessageImagePartProps = {
  base64EncodedImage: string | null,
  contentType: string | null,
  name: string | null
}

const MmsMessageImagePart: FunctionComponent<MmsMessageImagePartProps> = ({
  base64EncodedImage,
  contentType,
  name
}) => {
  return (
    <div className={styles['Mms-content']}>
      <img src={`data:${contentType};charset=utf-8;base64,${base64EncodedImage}`} alt={name || 'MMS image'} />
    </div>
  );
}

export default MmsMessageImagePart;