
import React from 'react';
import { Bar } from '@ant-design/charts';
export const PollStatistics = ({choices}) => {
  const data = choices;
  var config = {
    data,
    xField: 'vote',
    yField: 'choice',
    seriesField: 'year',
    barStyle: { fill: '#1890ff' },
    legend: { position: 'top-left' },
    yAxis:{
        label:{
            formatter: (choice) => choice.substring(0, 60)
        },
    } 
  };
  return <Bar {...config} />;
};
