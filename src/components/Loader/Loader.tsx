import { Loader2 } from 'lucide-react';

import styles from './loader.module.scss';


const Loader = () => {
  return (
    <div className={styles.wrapper} data-testid='loading-indicator'>
      <Loader2 className={styles.loader} />
    </div>
  );
};

export default Loader;