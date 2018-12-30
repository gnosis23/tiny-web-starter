import React from 'react';
import ErrorDisplay from '../ErrorDisplay';
import styles from './styles.less';

export default ({ pastDelay, error }) => {
  if (error)
    return <ErrorDisplay error={new Error('Failed to load component')} />;

  if (pastDelay)
    return (
      <div className={styles.Loading}>
        <p>Loading...</p>
      </div>
    );

  return null;
};
