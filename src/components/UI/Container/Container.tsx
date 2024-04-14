import React from 'react';
import styles from './Container.module.scss';

const Container = ({children}: {children: React.ReactNode}) => {
  return (
    <main className={styles.container}>{children}</main>
  )
}

export default Container;