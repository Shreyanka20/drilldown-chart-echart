import { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// Sample data
const data = [
  {
    name: 'Category A',
    y: 50,
    drilldown: 'Category A',
  },
  {
    name: 'Category B',
    y: 30,
    drilldown: 'Category B',
  },
  {
    name: 'Category C',
    y: 20,
    drilldown: 'Category C',
  },
];

// Drilldown data
const drilldownData = {
  'Category A': [
    ['Subcategory A1', 30],
    ['Subcategory A2', 20],
  ],
  'Category B': [
    ['Subcategory B1', 10],
    ['Subcategory B2', 20],
  ],
  'Category C': [
    ['Subcategory C1', 15],
    ['Subcategory C2', 5],
  ],
};

const DrilldownChart = () => {
  const [currentData, setCurrentData] = useState(data);

  const handleDrilldown = (name: string) => {
    const drilldownData: { [key: string]: (string | number)[][] } = {
      'Category A': [
        ['Subcategory A1', 30],
        ['Subcategory A2', 20],
      ],
      'Category B': [
        ['Subcategory B1', 10],
        ['Subcategory B2', 20],
      ],
      'Category C': [
        ['Subcategory C1', 15],
        ['Subcategory C2', 5],
      ],
    }
    };
    
    

  const handleDrillup = () => {
    setCurrentData(data);
  };

  const chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Drilldown Chart',
    },
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}',
        },
      },
    },
    series: [
      {
        type: 'bar',
        name: 'Categories',
        colorByPoint: true,
        data: currentData,
      },
    ],
    drilldown: {
      series: [],
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />

      {currentData !== data && (
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={handleDrillup}
        >
          Drill Up
        </button>
      )}

      {currentData === data && (
        <div className="mt-4">
          <p>Select a category:</p>
          {data.map(({ name }) => (
            <button
              key={name}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
              onClick={() => handleDrilldown(name)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrilldownChart;
