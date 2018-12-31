import React from 'react';
import styles from './styles.less';

export default ({ error }) => (
  <div className={styles.Error}>
    <p>Oops! {error.message}</p>
  </div>
);
