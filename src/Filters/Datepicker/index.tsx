import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Button } from '@mui/material';
import useFilter from '../../Context/useFilter';

const DatepickerFilter = () => {
  const { setFilter } = useFilter();
  const [startDate, setStartDate] = useState(dayjs('1930'));
  const [endDate, setEndDate] = useState(dayjs('2024'));

  const filterSongs = () => {
    setFilter('dateRange', { startDate, endDate });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Start date"
        value={startDate}
        onChange={(newValue) => {
          if (newValue) {
            setStartDate(newValue);
          }
        }}
      />
      <DatePicker
        label="End date"
        value={endDate}
        onChange={(newValue) => {
          if (newValue) {
            setEndDate(newValue);
          }
        }}
      />
      <Button onClick={filterSongs} variant="contained">
        Filter by date range
      </Button>
    </LocalizationProvider>
  );
};

export default DatepickerFilter;
