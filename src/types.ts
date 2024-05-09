export interface SongData {
  title: string;
  artist: string;
  artist_count: number;
  released_year: number;
  released_month: number;
  released_day: number;
  in_spotify_playlists: number;
  in_spotify_charts: number;
  streams: number;
  in_apple_playlists: number;
  in_apple_charts: number;
  in_deezer_playlists: number;
  in_deezer_charts: number;
  in_shazam_charts: number;
  bpm: number;
  key: string;
  mode: string;
  danceability: number;
  valence: number;
  energy: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  date?: Date;
}
