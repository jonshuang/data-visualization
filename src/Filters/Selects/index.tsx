// FilterAutocompletes.tsx
import { Autocomplete } from '@mui/material';
import { TextField, Stack } from '@mui/material';
import { getArtistNames, getYearReleased } from '../../utils';
import useFilter from '../../Context/useFilter';

interface Option {
  label: string;
  value: string;
  key: string;
  objKey: string;
}

export const FilterAutocompletes: React.FC = () => {
  const { originalData, setFilter, resetData } = useFilter();
  const names = getArtistNames(originalData).sort((a, b) => b.count - a.count);
  const years = getYearReleased(originalData);
  // Map the names and years to the combined options
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
        renderInput={(params) => (
          <TextField {...params} label="Artist or Year" />
        )}
        onChange={(_e, value) => {
          if (value?.objKey === 'artist') {
            setFilter('byArtist', { artist: value.value });
          } else if (value?.objKey === 'date') {
            setFilter('byYear', { year: value.value });
          } else {
            resetData();
          }
        }}
      />
    </Stack>
  );
};

export default FilterAutocompletes;
