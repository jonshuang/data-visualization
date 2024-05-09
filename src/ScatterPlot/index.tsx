import {
  VictoryScatter,
  VictoryAxis,
  VictoryChart,
  VictoryTooltip,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from 'victory';
import { useState } from 'react';
import { sortOptionsMap } from '../utils';
import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { SongData } from '../types';

const formatter = Intl.NumberFormat('en', { notation: 'compact' });

const COLORS = ['#A491D3', '#818AA3', '#C5DCA0', '#F5F2B8', '#F9DAD0'];

interface Props {
  x: string;
  y: string;
  data: SongData[];
}

interface ChartData {
  x: number | Date;
  y: number | Date;
  artist: string;
  title: string;
  id: string;
  streams: number;
  date?: Date;
}

export const ScatterPlot = ({ x, y, data }: Props) => {
  const chartData: ChartData[] = data.map((d) => ({
    x: d[x as keyof SongData] as number | Date,
    y: d[y as keyof SongData] as number | Date,
    artist: d.artist,
    title: d.title,
    id: d.title,
    streams: d.streams,
    date: d.date,
  }));

  const [zoomDomain, setZoomDomain] = useState();
  const [selectedDomain, setSelectedDomain] = useState();

  const tickFormat = (t: number | Date, axis: string) => {
    if (axis === 'date') {
      return new Date(t).getFullYear();
    }
    if (axis === 'streams') {
      return formatter.format(t as number);
    }
    return t;
  };

  return (
    <>
      <VictoryChart
        domainPadding={80}
        theme={VictoryTheme.material}
        width={1000}
        height={800}
        scale={{
          x: x === 'date' ? 'time' : 'linear',
          y: y === 'date' ? 'time' : 'linear',
        }}
        containerComponent={
          <VictoryZoomContainer
            responsive={false}
            zoomDomain={zoomDomain}
            onZoomDomainChange={setSelectedDomain}
          />
        }
      >
        <VictoryScatter
          data={chartData}
          size={5}
          labels={({ datum }) => `${datum.artist} - ${datum.title}`}
          labelComponent={<VictoryTooltip />}
          style={{
            data: {
              fill: ({ index }) => COLORS[(index as number) % COLORS.length],
            },
          }}
        />
        <VictoryAxis
          label={sortOptionsMap[x].label}
          style={{
            axisLabel: { padding: 30 },
          }}
          fixLabelOverlap
          tickFormat={(t: number | Date) => tickFormat(t, x) as string | number}
        />
        <VictoryAxis
          dependentAxis
          label={sortOptionsMap[y].label}
          style={{
            axisLabel: { padding: 30 },
          }}
          fixLabelOverlap
          tickFormat={(t: number | Date) => tickFormat(t, y) as string | number}
        />
      </VictoryChart>
      <Stack gap={2}>
        <VictoryChart
          domainPadding={80}
          theme={VictoryTheme.material}
          width={400}
          height={200}
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          scale={{ x: x === 'date' ? 'time' : 'linear' }}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={selectedDomain}
              onBrushDomainChange={setZoomDomain}
            />
          }
        >
          <VictoryScatter
            data={chartData}
            size={5}
            labels={({ datum }) => `${datum.artist} - ${datum.title}`}
            labelComponent={<VictoryTooltip />}
            style={{
              data: {
                fill: ({ index }) => COLORS[(index as number) % COLORS.length],
              },
            }}
          />
          <VictoryAxis
            fixLabelOverlap
            tickFormat={(t: number | Date) =>
              tickFormat(t, x) as string | number
            }
            style={{
              axisLabel: { paddingTop: 30 },
            }}
          />
          <VictoryAxis
            dependentAxis
            fixLabelOverlap
            tickFormat={(t: number | Date) =>
              tickFormat(t, y) as string | number
            }
            style={{
              axisLabel: { paddingTop: 30 },
            }}
          />
        </VictoryChart>
        <DataGrid
          rows={chartData}
          columns={[
            { field: 'artist', headerName: 'Artist', width: 150 },
            { field: 'title', headerName: 'Title', width: 150 },
            {
              field: 'date',
              headerName: 'Date',
              width: 150,
              renderCell: (params) => new Date(params.value).toDateString(),
            },
            {
              field: 'streams',
              headerName: 'Streams',
              width: 150,
              renderCell: (params) => formatter.format(params.value),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </Stack>
    </>
  );
};

export default ScatterPlot;
