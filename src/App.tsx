import { useState } from 'react';
import './App.css';
import { ScatterPlot } from './ScatterPlot/index';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { sortOptions } from './constants';
import {
  dataWithDate,
  getArtistNames,
  getYearReleased,
  sortOptionsMap,
} from './utils';
import jsonData from './data.json';
import { Container, Stack } from '@mui/material';
import Filters from './Filters/Buttons';
import FilterAutocompletes from './Filters/Selects';
import { SongData } from './types';

const jsonDataWithDate = dataWithDate(jsonData as SongData[]);

// christmas songs?
// songs before spotify existed? 06
// top artists
// songs after sppotify existed, way more streamss

function App() {
  const defaultData = jsonDataWithDate.sort((a, b) => b.streams - a.streams);
  const [xAxis, setXAxis] = useState('date');
  const [yAxis, setYAxis] = useState('streams');
  const names = getArtistNames(jsonDataWithDate).sort(
    (a, b) => b.count - a.count
  );
  const years = getYearReleased(jsonDataWithDate);
  const [data, setData] = useState<SongData[]>(defaultData);

  const sliceData = (percent: number, direction: 'top' | 'bottom') => {
    const slice = Math.floor((percent / 100) * defaultData.length);
    const slicedData =
      direction === 'top'
        ? defaultData.slice(0, slice)
        : defaultData.slice(defaultData.length - slice);
    setData(slicedData);
  };

  const resetData = () => setData([...defaultData]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ padding: '12px' }}>
        Spotify Top Songs
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{ padding: '12px' }}
      >
        <Stack gap={2}>
          <Typography id="x-axis">Chart options</Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <InputLabel id="x-axis">X Axis</InputLabel>
            <Select
              id="x-axis"
              value={xAxis}
              onChange={(e) => {
                setXAxis(e.target.value);
              }}
              sx={{
                width: 200,
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="y-axis">Y Axis</InputLabel>
            <Select
              id="y-axis"
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              sx={{
                width: 200,
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
        <Stack alignItems="center" justifyContent="center" gap={2}>
          <Typography>Filter options (artists or year)</Typography>
          <FilterAutocompletes
            names={names}
            years={years}
            setData={setData}
            resetData={resetData}
            jsonDataWithDate={jsonDataWithDate}
          />
        </Stack>
      </Stack>
      <Filters sliceData={sliceData} resetData={resetData} />
      <Stack>
        <Typography>
          {sortOptionsMap[xAxis].label}: {sortOptionsMap[xAxis].text}
        </Typography>
        <Typography>
          {sortOptionsMap[yAxis].label}: {sortOptionsMap[yAxis].text}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2}>
        <ScatterPlot x={xAxis} y={yAxis} data={data} />
      </Stack>
    </Container>
  );
}

export default App;
