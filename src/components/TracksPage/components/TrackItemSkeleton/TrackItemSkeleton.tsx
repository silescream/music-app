import styles from '../TrackItem/trackItem.module.scss';
import skeleton from './skeleton.module.scss';

const TrackItemSkeleton = () => {
  return (
    <div className={styles.trackWrap} data-testid='loading-tracks'>
      <div className={`${styles.trackCover} ${skeleton.skeleton}`}></div>
      <div className={styles.trackMeta}>
        <div className={`${skeleton.skeleton} ${skeleton.skeletonText}`} style={{ width: '100px', height: '14px' }} />
        <div className={`${skeleton.skeleton} ${skeleton.skeletonText}`} style={{ width: '80px', height: '12px', marginTop: '4px' }} />
      </div>
      <div className={styles.trackControls}>
        <div className={`${skeleton.skeleton} ${skeleton.skeletonBtn}`} />
        <div className={`${skeleton.skeleton} ${skeleton.skeletonBtn}`} />
        <div className={`${skeleton.skeleton} ${skeleton.skeletonBtn}`} />
      </div>
    </div>
  );
};

export default TrackItemSkeleton;