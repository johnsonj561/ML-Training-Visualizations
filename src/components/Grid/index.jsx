import React from 'react';
import {
  ScatterChart, Cell, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from 'recharts';

const colors = {
  0: 'blue',
  1: 'red'
};


const Grid = (props) => {
  const { data, plotConfig, handleChartClick, hyperplaneData } = props;
  return (
    <ScatterChart width={plotConfig.width} height={plotConfig.height} onClick={handleChartClick}>
      <CartesianGrid />
      <XAxis dataKey={'x'} type="number" name='X' domain={[plotConfig.xMin, plotConfig.xMax]} />
      <YAxis dataKey={'y'} type="number" name='Y' domain={[plotConfig.yMin, plotConfig.yMax]} />
      <ReferenceLine x={0} stroke="black" />
      <ReferenceLine y={0} stroke="black" />
      <Scatter data={data}>
        {data.map(sample => <Cell key={sample.id} fill={colors[sample.z]} /> )}
      </Scatter>
      <Scatter data={hyperplaneData} fill="lightgreen" line isAnimationActive={false} />
    </ScatterChart>
  )
};

export default Grid;
