export interface Artist {
    personalRank?: number;
    artistName: string;
    followers:number;
    imgURL: string;
    listenURL?: string;
}

export interface Track {
    personalRank?: number;
    artistName: string;
    albumName: string;
    topTrackName: string;
    imgURL: string;
    listenURL?: string;
}