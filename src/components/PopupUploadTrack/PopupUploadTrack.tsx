import { useForm } from 'react-hook-form';

import { useTracksHandlers } from '../../containers/TracksPage/hooks/useTracksHandlers';
import { UploadForm } from '../../containers/TracksPage/types/trackTypes';

import PopupWrap from '../PopupWrap';

import styles from './popupUploadTrack.module.scss';

type Props = {
  onClose: () => void;
}

const PopupUploadTrack = ({ onClose } : Props) => {
  const { selectedTrack, uploadTrackFile } = useTracksHandlers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadForm>();

  const onSubmit = async (data: UploadForm) => {
    const file = data.file[0];
    if (!file || !selectedTrack) return null;
    uploadTrackFile(selectedTrack.id, file);
    onClose();
  };

  return (
    <PopupWrap isOpen={true} onClose={onClose}>
      <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.formTitle}>Upload Audio File</h2>
        <input
          type="file"
          accept="audio/mpeg, audio/wav, audio/mp3, audio/x-wav"
          {...register('file', {
            required: 'Please select an audio file',
            validate: {
              fileType: (files) => {
                const file = files?.[0];
                const allowed = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];
                return file && allowed.includes(file.type) || 'Unsupported file type';
              },
              fileSize: (files) => {
                const file = files?.[0];
                return file && file.size <= 10 * 1024 * 1024 || 'File must be <= 10MB';
              },
            },
          })}
        />
        {errors.file && <p style={{ color: 'red' }}>{errors.file.message}</p>}

        <div className={styles.btnWrap}>
          <button type='submit'>
            Upload
          </button>
          <button type='button' onClick={onClose}>Cancel</button>
        </div>
      </form>
    </PopupWrap>
  );
};

export default PopupUploadTrack;
