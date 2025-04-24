import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Play, Pause, Trash2 } from 'lucide-react';

import styles from './trackPlayer.module.scss';

type Props = {
  src: string;
  id: string;
  handleDelete: () => void;
};

const TrackPlayer = ({ src, id, handleDelete }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#C2185B',
      progressColor: '#6A1B9A',
      height: 20,
    });

    wavesurfer.load(src);
    wavesurferRef.current = wavesurfer;

    return () => wavesurfer.destroy();
  }, [src]);

  return (
    <div className={styles.visualiseWrapper}>
      <div
        className={styles.visualProgress}
        ref={containerRef}
        data-testid={`audio-progress-${id}`}
      />
        <div data-testid={`audio-player-${id}`} className={styles.visualControls}>
          <button data-testid={`play-button-${id}`} onClick={() => wavesurferRef.current?.play()}>
            <Play />
          </button>
          <button data-testid={`pause-button-${id}`} onClick={() => wavesurferRef.current?.pause()}>
            <Pause />
          </button>
          <button onClick={handleDelete}>
            <Trash2 />
          </button>
        </div>
    </div>
  );
};

export default TrackPlayer;
