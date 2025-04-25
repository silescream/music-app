import { z } from 'zod';

export const TrackSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artist: z.string().min(1, 'Artist is required'),
  album: z.string().optional(),
  genres: z.array(z.string()).min(1, 'At least one genre is required'),
  coverImage: z
    .string()
    .refine(
      (val) => {
        if (val === '') return true;
        try {
          new URL(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: 'Cover image must be a valid URL or empty' }
    ),
});

export type TrackFormValues = z.infer<typeof TrackSchema>;