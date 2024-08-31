export type SongType = {
    id: number;
    title: string;
    artist: string;
    description: string;
    coverPhotoUrl: string;
    audioUrl: string;
    duration: number;
    category: Category;
    createdDate: Date;
    updatedDate: Date;
}

export interface Category {
    id: number;
    name: string;
}

export type SongSliceState = {
    songs: SongType[];
    isLoading: boolean;
    error: string | null;
}
export const SONGS = 'songs';


export type SingleAPIResponse = {
    data: SongType | null;
    error: string | null;
    isSuccess: boolean;
}
export type MultipleAPIResponse = {
    data: SongType[] | null;
    error: string | null;
    isSuccess: boolean;
}
export type CategoryAPIResponse = {
    data: Category[] | null;
    error: string | null;
    isSuccess: boolean;
}

export type playerSliceState = {
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    currentTrack: SongType | null;
}

export const PLAYER = 'player';

