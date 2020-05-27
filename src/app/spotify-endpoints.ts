export abstract class SpotifyEndpoints {
    static readonly TYPES = {
       SHORT_TERM: "short_term",
       MEDIUM_TERM: "medium_term",
       LONG_TERM: "long_term" ,
       ARTIST: "artists",
       TRACKS: "tracks"
    }
    static readonly BASE_URL = "https://api.spotify.com/v1/me"
    static readonly PERSONALIZATION = {
        TOP_TRACKS:(type) => `/top/${type}`,
        TIME_RANGE:(duration) => `time_range=${duration}`,
        OFFSET:(offset) => `offset=${offset}`,
        LIMIT:(limit) => `limit=${limit}`
    }
}
