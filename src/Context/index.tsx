import React, { createContext, useState, ReactNode } from 'react';
import { SongData } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import { dataWithDate } from '../utils';
import jsonData from '../data.json';

type FilterContextType = {
  activeFilter: string;
  setFilter: (filter: string, options: any) => void;
  resetData: () => void;
  songData: SongData[];
  originalData: SongData[];
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

/**
 * Filter songs by date range
 */
const filterSongsDates = ({
  data,
  startDate,
  endDate,
}: {
  data: SongData[];
  startDate: Dayjs;
  endDate: Dayjs;
}) => {
  return data.filter((song) => {
    const releaseDate = dayjs(song.date);
    return releaseDate.isAfter(startDate) && releaseDate.isBefore(endDate);
  });
};

/**
 * Slice Song data by percentage
 */
const sliceData = ({
  data,
  percent,
  direction,
}: {
  data: SongData[];
  percent: number;
  direction: 'top' | 'bottom';
}) => {
  const slice = Math.floor((percent / 100) * data.length);
  const slicedData =
    direction === 'top'
      ? data.slice(0, slice)
      : data.slice(data.length - slice);
  return slicedData;
};

const defaultData = dataWithDate(jsonData as SongData[]).sort(
  (a, b) => b.streams - a.streams
);

/**
 * Filter dataset by artist
 */
const filterByArtist = ({
  data,
  artist,
}: {
  data: SongData[];
  artist: string;
}) => data.filter((d) => d.artist.includes(artist));

/**
 * Filter dataset by year
 */
const filterByYear = ({ data, year }: { data: SongData[]; year: string }) =>
  data.filter((d) => d.released_year === parseInt(year, 10));

export const FilterProvider: React.FC<{
  data?: SongData[];
  children: ReactNode;
}> = ({ data = defaultData, children }) => {
  const [activeFilter, setActiveFilter] = useState('');
  const [songData, setSongData] = useState(data);
  const originalData = data.slice();
  const resetData = () => {
    setActiveFilter('');
    setSongData(originalData);
  };
  // TODO: Implement this as dispatch pattern
  const setFilter = (filter: string, options: any) => {
    if (filter === 'dateRange') {
      setSongData(
        filterSongsDates({
          data: originalData,
          startDate: dayjs(options.startDate),
          endDate: dayjs(options.endDate),
        })
      );
    }
    if (filter === 'slice') {
      setSongData(
        sliceData({
          data: originalData,
          percent: options.percent,
          direction: options.direction,
        })
      );
    }
    if (filter === 'byArtist') {
      setSongData(
        filterByArtist({
          data: originalData,
          artist: options.artist,
        })
      );
    }
    if (filter === 'byYear') {
      setSongData(
        filterByYear({
          data: originalData,
          year: options.year,
        })
      );
    }
    setActiveFilter(filter);
  };

  return (
    <FilterContext.Provider
      value={{ originalData, songData, activeFilter, setFilter, resetData }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
