import React, { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';

const DrilldownChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState('none');
  const [selectedGranularity, setSelectedGranularity] = useState('by time');

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      // Sample data for the chart
      const data = {
        categories: [
          { name: 'Category 1' },
          { name: 'Category 2' },
          { name: 'Category 3' },
        ],
        series: [
          {
            name: 'Level 1',
            data: [
              { name: 'Subcategory 1', value: 10 },
              { name: 'Subcategory 2', value: 20 },
              { name: 'Subcategory 3', value: 30 },
            ],
          },
        ],
      };

      const getSeriesData = (level: number) => {
        switch (level) {
          case 0:
            return data.series[level].data;
          case 1:
            return [
              { name: 'Subcategory A', value: 15 },
              { name: 'Subcategory B', value: 25 },
            ];
          case 2:
            return [
              { name: 'Subcategory X', value: 8 },
              { name: 'Subcategory Y', value: 12 },
              { name: 'Subcategory Z', value: 18 },
            ];
          default:
            return [];
        }
      };

      const option: echarts.EChartOption<echarts.EChartOption.SeriesBar> = {
        xAxis: [
          {
            type: 'category',
            data: getSeriesData(currentLevel).map((item: any) => item.name),
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: 'black',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Time -->',
            nameLocation: 'middle',
            nameGap: 30,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: 'black',
              formatter: '{value}',
            },
            splitLine: {
              lineStyle: {
                color: 'grey',
              },
            },
          },
        ],
        series: [
          {
            type: 'bar',
            barWidth: 20,
            data: getSeriesData(currentLevel).map((item: any) => ({
              ...item,
              itemStyle: {
                color: '#1890ff',
              },
            })),
            emphasis: {
              itemStyle: {
                color: '#40a9ff',
              },
            },
            label: {
              show: true,
              position: 'top',
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow',
          },
        },

      };

      chart.setOption(option);

      chart.on('click', (params: any) => {
        if (params.componentType === 'series') {
          const { name } = params;

          if (name === 'Subcategory 1' && currentLevel === 0) {
            setCurrentLevel(1);
          } else if (name === 'Subcategory 2' && currentLevel === 0) {
            setCurrentLevel(2);
          }
        }
      });

      return () => {
        chart.dispose();
      };
    }
  }, [currentLevel]);

  const handleBackClick = () => {
    setCurrentLevel(currentLevel - 1);
  };

  const handleDurationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDuration(event.target.value);
  };

  const handleGranularityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGranularity(event.target.value);
  };

  return (
    <div className="flex flex-col relative">
      <h2 className="absolute top-0 left-4 text-lg font-semibold">Stoppage Duration</h2>
      <div
        className="w-full bg-white-200 rounded-lg p-4 mb-4 transition-all duration-300"
        style={{ height: '400px', marginBottom: '1rem' }}
      >
        <div className="flex justify-end">
          <div className="mr-4">
            <label htmlFor="duration" className="text-sm font-semibold">
              Duration:
            </label>
            <select
              id="duration"
              value={selectedDuration}
              onChange={handleDurationChange}
              className="px-2 py-1 rounded bg-gray-200 ml-2"
            >
              <option value="none">None</option>
              <option value="2">2 mins</option>
              <option value="5">5 mins</option>
              <option value="10">10 mins</option>
            </select>
          </div>
          <div>
            <label htmlFor="granularity" className="text-sm font-semibold">
              Granularity:
            </label>
            <select
              id="granularity"
              value={selectedGranularity}
              onChange={handleGranularityChange}
              className="px-2 py-1 rounded bg-gray-200 ml-2"
            >
              <option value="by time">By Time</option>
              <option value="by count">By Count</option>
            </select>
          </div>
        </div>
        <div ref={chartRef} className="w-full" style={{ height: '100%' }} />
      </div>
      {currentLevel > 0 && (
        <button
          onClick={handleBackClick}
          className="absolute left-4 top-4 text-black font-semibold py-2 px-4 rounded transition-colors duration-300"
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default DrilldownChart;
