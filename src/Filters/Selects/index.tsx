// FilterAutocompletes.tsx
import { Autocomplete } from '@mui/material';
import { TextField, Stack } from '@mui/material';
import { SongData } from '../../types';

interface Option {
  label: string;
  value: string;
  key: string;
  objKey: string;
}

interface FilterAutocompletesProps {
  setData: (data: SongData[]) => void;
  resetData: () => void;
  names: {
    name: string;
    count: number;
  }[];
  years: string[];
  jsonDataWithDate: SongData[];
}

export const FilterAutocompletes: React.FC<FilterAutocompletesProps> = ({
  setData,
  resetData,
  names,
  years,
  jsonDataWithDate,
}) => {
  const namesCollection: Option[] = names.map((option) => ({
    label: `${option.name} (${option.count})`,
    value: option.name,
    key: 'Artists',
    objKey: 'artist',
  }));
  const yearsCollection: Option[] = years.map((option) => ({
    label: option,
    value: option,
    key: 'Year released',
    objKey: 'date',
  }));
  const combined = [...namesCollection, ...yearsCollection];
  return (
    <Stack direction="row" gap={2}>
      <Autocomplete
        isOptionEqualToValue={(option, value) => option.value === value.value}
        sx={{
          width: 300,
        }}
        groupBy={(option) => option.key}
        options={combined}
        renderInput={(params) => <TextField {...params} label="Filter" />}
        onChange={(_e, value) => {
          if (value?.objKey === 'artist') {
            setData(
              jsonDataWithDate.filter((d) => d.artist.includes(value.value))
            );
          } else if (value?.objKey === 'date') {
            setData(
              jsonDataWithDate.filter(
                (d) => d.released_year === parseInt(value.value, 10)
              )
            );
          } else {
            resetData();
          }
        }}
      />
    </Stack>
  );
};

export default FilterAutocompletes;
