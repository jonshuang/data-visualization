// See https://developer.spotify.com/documentation/web-api/reference/get-audio-features
export const sortOptions = [
  {
    label: 'Streams',
    value: 'streams',
    text: 'Total number of streams on Spotify',
  },
  { label: 'Date', value: 'date', text: 'Date when the song was released' },
  {
    label: 'Released Year',
    value: 'released_year',
    text: 'Year when the song was released',
  },
  {
    label: 'Released Month',
    value: 'released_month',
    text: 'Month when the song was released',
  },
  {
    label: 'Released Day',
    value: 'released_day',
    text: 'Day of the month when the song was released',
  },
  {
    label: 'In Spotify Playlists',
    value: 'in_spotify_playlists',
    text: 'Number of Spotify playlists the song is in',
  },
  {
    label: 'In Apple Playlists',
    value: 'in_apple_playlists',
    text: 'Number of Apple playlists the song is in',
  },
  {
    label: 'In Deezer Playlists',
    value: 'in_deezer_playlists',
    text: 'Number of Deezer playlists the song is in',
  },
  {
    label: 'Beats Per Minute',
    value: 'bpm',
    text: 'Beats per minute of the song',
  },
  { label: 'Key', value: 'key', text: 'What key the song is in' },
  { label: 'Mode', value: 'mode', text: 'Mode of the song (major or minor)' },
  {
    label: 'Energy',
    value: 'energy',
    text: 'Energy is a measure from 0.0 to 1.0 and represents a perceptual measure of intensity and activity.',
  },
  {
    label: 'Danceability',
    value: 'danceability',
    text: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.',
  },
  {
    label: 'Liveness',
    value: 'liveness',
    text: 'Detects the presence of an audience in the recording.',
  },
  {
    label: 'Valence',
    value: 'valence',
    text: 'A measure from 0.0 to 1.0 describing the musical positiveness conveyed by a track.',
  },
  {
    label: 'Acousticness',
    value: 'acousticness',
    text: 'A confidence measure from 0.0 to 1.0 of whether the track is acoustic.',
  },
  {
    label: 'Speechiness',
    value: 'speechiness',
    text: 'Speechiness detects the presence of spoken words in a track.',
  },
];
