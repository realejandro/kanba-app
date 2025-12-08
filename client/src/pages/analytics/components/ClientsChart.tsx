import React from 'react'
import { BarChart, XAxis, YAxis, Bar } from 'recharts';


const rangeData = [
  { day: '05-01', temperature: 10 },
  { day: '05-02', temperature: 15 },
  { day: '05-03', temperature: 12 },
  { day: '05-04', temperature: 12 },
  { day: '05-05', temperature: 16 },
  { day: '05-06', temperature: 16 },
  { day: '05-07', temperature: 12 },
  { day: '05-08', temperature: 8 },
  { day: '05-09', temperature: 5 },
];


const margin = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 25,
};

const formatAxisTick = (value: any): string => {
  return `*${value}*`;
};

const renderCustomBarLabel = ({ x, y, width, value }: any) => {
  return <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>{`value: ${value}`}</text>;
};


export const ClientsChart = () => {
  return (
    <BarChart width={600} height={300} data={rangeData} margin={margin}>
      <XAxis
        dataKey="day"
        tickFormatter={formatAxisTick}
        label={{ position: 'insideBottomRight', value: 'XAxis title', offset: -10 }}
      />
      <YAxis label={{ position: 'insideTopLeft', value: 'YAxis title', angle: -90, dy: 60 }} />
      <Bar dataKey="temperature" fill="#8884d8" label={renderCustomBarLabel} />
    </BarChart>
  )
}
