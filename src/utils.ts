import { SongData } from './types';
import { sortOptions } from './constants';

export const dataWithDate = (data: SongData[]) => {
  return data.map((d) => ({
    ...d,
    date: new Date(d.released_year, d.released_month, d.released_day),
  }));
};

export const sortOptionsMap = sortOptions.reduce(
  (map, option) => {
    map[option.value] = {
      label: option.label,
      text: option.text,
      value: option.value,
    };
    return map;
  },
  {} as { [key: string]: { label: string; text: string; value: string } }
);

export const getArtistNames = (data: SongData[]) => {
  const artistNames = data.flatMap((d) =>
    d.artist.split(',').map((name) => name.trim())
  );
  const uniqueArtistNames = Array.from(new Set(artistNames));

  return uniqueArtistNames.map((name) => ({
    name,
    count: artistNames.filter((artistName) => artistName === name).length,
  }));
};

export const getYearReleased = (data: SongData[]) => {
  const years = data.map(({ released_year }) => released_year.toString());
  const uniqueYears = Array.from(new Set(years));
  return uniqueYears.sort((a, b) => parseInt(b, 10) - parseInt(a, 10));
};
