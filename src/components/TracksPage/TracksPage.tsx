import { Modals } from '../../containers/Modals/Modals';

import TracksHeader from './components/TracksHeader'
import TracksList from './components/TracksList';

import styles from './tracksPage.module.scss';

const TracksPage = () => {
  
  return (
    <div className={styles.tracksWrapper}>
      <TracksHeader />
      <TracksList />
      <Modals />
    </div>
  );
};

export default TracksPage;
