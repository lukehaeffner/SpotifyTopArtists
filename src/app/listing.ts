/**
 * Data model for a top artist result
 */
export interface Artist {
    personalRank?: number;
    artistName: string;
    followers:number;
    imgURL: string;
    listenURL?: string;
}

/**
 * Data mmodel for a top track result
 */
export interface Track {
    personalRank?: number;
    artistName: string;
    albumName: string;
    topTrackName: string;
    imgURL: string;
    listenURL?: string;
}