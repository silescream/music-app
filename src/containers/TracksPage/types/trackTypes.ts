export enum TRACKS_FILTER_FIELD {
  TITLE = 'title',
  ARTIST = 'artist',
  ALBUM = 'album',
  CREATED_AT = 'createdAt',
}

export enum SORT_ORDER {
  ASC = 'asc',
  DESC = 'desc',
}

export enum GENRE {
  ROCK = 'Rock',
  POP = 'Pop',
  HIP_HOP = 'Hip Hop',
  JAZZ = 'Jazz',
  CLASSICAL = 'Classical',
  ELECTRONIC = 'Electronic',
  R_N_B = 'R&B',
  COUNTRY = 'Country',
  FOLK = 'Folk',
  REGGAE = 'Reggae',
  METAL = 'Metal',
  BLUES = 'Blues',
  INDIE = 'Indie',
}

export enum POP_UP {
  CREATE_TRACK = 'createTrack',
  EDIT_TRACK = 'editTrack',
  UPLOAD_TRACK = 'uploadTrack',
  CONFIRMATION = 'confirmation',
}

export enum CONFIRMATION_TYPE {
  DELETE_TRACK = 'deleteTrack',
  DELETE_FILE = 'deleteFile',
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  slug: string;
  coverImage?: string;
  audioFile?: string;
  createdAt: string;
  updatedAt: string;
  isPending?: boolean;
}

export interface GetTracksQueryVariables {
  page?: number;
  limit?: number;
  sort?: TRACKS_FILTER_FIELD ;
  order?: SORT_ORDER;
  search?: string;
  genre?: string;
  artist?: string;
}

export type TrackMutationVariables = {
  title: string;
  artist: string;
  album?: string;
  genres: string[];
  coverImage?: string;
};

export interface TracksResponse {
  data: Track[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UploadForm {
  file: FileList;
}