import { Button, Stack, Typography } from '@mui/material';
import useFilter from '../../Context/useFilter';

export const FilterButtonsSection: React.FC = () => {
  const { setFilter, resetData } = useFilter();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={2}
      sx={{ padding: '12px' }}
    >
      <Typography>Slice by streams</Typography>
      <Button
        variant="contained"
        onClick={() => setFilter('slice', { percent: 10, direction: 'top' })}
      >
        Top 10%
      </Button>
      <Button
        variant="contained"
        onClick={() => setFilter('slice', { percent: 25, direction: 'top' })}
      >
        Top 25%
      </Button>
      <Button
        variant="contained"
        onClick={() => setFilter('slice', { percent: 50, direction: 'top' })}
      >
        Top 50%
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setFilter('slice', { percent: 50, direction: 'bottom' })}
      >
        Bottom 50%
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setFilter('slice', { percent: 25, direction: 'bottom' })}
      >
        Bottom 25%
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setFilter('slice', { percent: 10, direction: 'bottom' })}
      >
        Bottom 10%
      </Button>
      <Button variant="contained" color="warning" onClick={resetData}>
        Reset
      </Button>
    </Stack>
  );
};

export default FilterButtonsSection;
