import { Container, Stack } from '@mui/material';
import FilterButtonsSection from './Filters/Buttons';
import FilterAutocompletes from './Filters/Selects';
import { DataVisualization } from './DataVisualization/index';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { sortOptions } from './constants';
import { useState } from 'react';
import './App.css';

import { sortOptionsMap } from './utils';
import useFilter from './Context/useFilter';
import DatepickerFilter from './Filters/Datepicker';

const Page = () => {
  const { activeFilter, songData } = useFilter();
  const [xAxis, setXAxis] = useState('date');
  const [yAxis, setYAxis] = useState('streams');

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ padding: '4px' }}>
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
      </Stack>
      <Stack alignItems="center" justifyContent="center" gap={2}>
        <Typography>
          Filter options (only one will apply) Active filter:{' '}
          {activeFilter || 'None'}
        </Typography>
        <Stack direction="row" gap={2}>
          <FilterAutocompletes />
          <DatepickerFilter />
        </Stack>
        <FilterButtonsSection />
      </Stack>
      <Typography>
        X-Axis {sortOptionsMap[xAxis].label}: {sortOptionsMap[xAxis].text}
      </Typography>
      <Typography>
        Y-Axis {sortOptionsMap[yAxis].label}: {sortOptionsMap[yAxis].text}
      </Typography>
      <Stack direction="row" spacing={2}>
        <DataVisualization x={xAxis} y={yAxis} data={songData} />
      </Stack>
    </Container>
  );
};

export default Page;
