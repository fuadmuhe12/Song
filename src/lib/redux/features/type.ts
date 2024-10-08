//#region Song Types
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
/// #endregion 

// #region API Types

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
// #Endregion


// #region Player Types
export type playerSliceState = {
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    currentTrack: SongType | null;
    isActive: boolean;
    repeat: boolean;
    shuffle: boolean;
    songList: SongType[];
}

export const PLAYER = 'player';

// #endregion


//#region Filter Types

export type FilterStateType = {
    search: string | undefined;
    categoryID: number | undefined;
}

export const FILTER = 'filter';