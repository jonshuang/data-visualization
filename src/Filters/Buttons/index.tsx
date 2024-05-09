// FilterButtons.tsx
import { Button, Stack } from '@mui/material';

interface FilterButtonsProps {
  sliceData: (percent: number, direction: 'top' | 'bottom') => void;
  resetData: () => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  sliceData,
  resetData,
}) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent="center"
    gap={2}
    sx={{ padding: '12px' }}
  >
    <Button variant="contained" onClick={() => sliceData(10, 'top')}>
      Top 10%
    </Button>
    <Button variant="contained" onClick={() => sliceData(25, 'top')}>
      Top 25%
    </Button>
    <Button variant="contained" onClick={() => sliceData(50, 'top')}>
      50%
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => sliceData(25, 'bottom')}
    >
      Bottom 25%
    </Button>
    <Button
      variant="contained"
      color="secondary"
      onClick={() => sliceData(10, 'bottom')}
    >
      Bottom 10%
    </Button>
    <Button variant="contained" onClick={resetData}>
      Reset
    </Button>
  </Stack>
);

export default FilterButtons;
