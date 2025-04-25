import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

import { TrackSchema, TrackFormValues } from '../../containers/TracksPage/types/validation';
import { useTracksHandlers } from '../../containers/TracksPage/hooks/useTracksHandlers';

import PopupWrap from '../PopupWrap';

import styles from './popupEditTrack.module.scss';

type Props = {
  onClose: () => void;
}

const PopupEditTrack = ({ onClose } : Props) => {
  const { updateTrack, selectedTrack, genres} = useTracksHandlers();

  if (!selectedTrack) return null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<TrackFormValues>({
    resolver: zodResolver(TrackSchema),
    defaultValues: {
      title: selectedTrack.title,
      artist: selectedTrack.artist,
      album: selectedTrack.album || '',
      genres: selectedTrack.genres,
      coverImage: selectedTrack.coverImage || '',
    },
  });

  const selectedGenres = watch('genres');
  const coverImage = watch('coverImage');

  const addGenre = (genre: string) => {
    if (!selectedGenres.includes(genre)) {
      setValue('genres', [...selectedGenres, genre]);
    }
  };

  const removeGenre = (genre: string) => {
    setValue(
      'genres',
      selectedGenres.filter((g) => g !== genre)
    );
  };

  const onSubmit = (data: TrackFormValues) => {
    updateTrack(selectedTrack.id, data);
    onClose();
  };
  
  const availableGenres = genres.filter((g) => !selectedGenres.includes(g));

  return (
    <PopupWrap isOpen={true} onClose={onClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        data-testid='track-form'
        className={styles.formWrapper}
      >
        <h2 className={styles.formTitle}>Edit Track</h2>

        <div className={styles.formInput}>
          <label>Title *</label>
          <input {...register('title')} data-testid='input-title'/>
          {errors.title && <p className={styles.error} data-testid='error-title'>{errors.title.message}</p>}
        </div>

        <div className={styles.formInput}>
          <label>Artist *</label>
          <input {...register('artist')} data-testid='input-artist'/>
          {errors.artist && <p className={styles.error} data-testid='error-artist'>{errors.artist.message}</p>}
        </div>

        <div className={styles.formInput}>
          <label>Album</label>
          <input {...register('album')} data-testid='input-album'/>
        </div>

        <div className={styles.genresWrap}>
          <label>Genres *</label>
          <div className={styles.selectedGenres}>
            {selectedGenres.map((genre) => (
              <span
                key={genre}
                className={styles.selectedGenresItem}
              >
                {genre}
                <button
                  type='button'
                  onClick={() => removeGenre(genre)}
                  className={styles.selectedGenresDelete}
                >
                  <X />
                </button>
              </span>
            ))}
          </div>

          <div className={styles.genresSelector} data-testid='genre-selector'>
            {availableGenres.map((genre) => (
              <button
                key={genre}
                type='button'
                onClick={() => addGenre(genre)}
              >
                + {genre}
              </button>
            ))}
          </div>

          {errors.genres && <p className={styles.error} data-testid='error-genre'>{errors.genres.message}</p>}
        </div>

        <div className={styles.coverImageWrap}>
          <label>Cover Image URL</label>
          <img
            src={coverImage || '/images/track-cover.png'}
            alt='Cover preview'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/track-cover.png';
            }}
          />
          <input {...register('coverImage')} data-testid='input-cover-image'/>
          {errors.coverImage && <p className={styles.error} data-testid='error-cover-image'>{errors.coverImage.message}</p>}
        </div>

        <button
          type='submit'
          className={styles.submitButton}
          data-testid='submit-button'
        >
          Save Track
        </button>
      </form>
    </PopupWrap>
  );
};

export default PopupEditTrack;

