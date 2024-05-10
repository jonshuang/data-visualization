# Data-visualization

## Description

A simple project that presents the Spotify Top Songs data set. The data is taken from https://www.kaggle.com/datasets/arnavvvvv/spotify-music and saved in the `data.json` file. A live version of the main branch can be viewed at https://jonshuang.github.io/data-visualization/.

## Installation

```bash
git clone git@github.com:jonshuang/data-visualization.git
cd data-visualization
npm install
```

## Run Instructions

```
npm run dev
```

### Package choices

This project is created with

- [Vitejs](https://vitejs.dev/)
  - Modern front-end development build tool that provides fast builds and native ES Modules support.
- [MUI Core](https://mui.com/core/)
  - Ready to use React components
- [Victory](https://commerce.nearform.com/open-source/victory)
  - Ready to use charting and data visualization

### Findings

#### Top artists in the list

- Bad Bunny (40)
- Taylor Swift (38)
- The Weeknd (37)
- Kendrick Lamar (23)
- SZA (23)

#### Top streams in the list

- The Weeknd - Blinding Lights - 3.7B
- Ed Sheeran - Shape of You - 3.6B
- Lewis Capaldi - Someone You Loved - 2.9B

#### Top Years

- 2022 - 400 Songs
- 2023 - 175 Songs
- 2021 - 119 Songs

#### Top songs in spotify playlists

- Pharrell Williams, Nile Rodgers, Daft Punk - Get Lucky
- The Killers - Mr. Brightside
- Avicii - Wake Me Up

#### Christmas songs dominate the past

- If you zoom in from 1940-1990, you'll see 21/32 songs are Christmas songs. That's 65% of the top songs that span 5 decades.
- _Mariah Carey's - All I Want For Christmas Is You_ dominates the streams with _Wham! - Last Christmas_ taking second.

#### Architecture

- Used React Context / Provider to keep track of the active filter and filter logic. That way we have one source of truth of the data being filtered/updated.

#### Todo

- Add presets filters to some interesting data
- Add mobile views
- Add unit tests
- Update to connect directly to Spotify API
- Add more filters
