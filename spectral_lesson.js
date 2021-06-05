import * as chart from 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.3.2/chart.js';
import * as Utils from '../chart_utils.js';

const data = {
  labels: ['a', 'b', 'c', 'd'],
  datasets: [
    {
      label: 'Dataset 1',
      data: chart.Utils.numbers(NUMBER_CFG),
      borderColor: chart.Utils.CHART_COLORS.red,
      backgroundColor: chart.Utils.transparentize(chart.Utils.CHART_COLORS.red, 0.5),
    },
    {
      label: 'Dataset 2',
      data: chart.Utils.numbers(NUMBER_CFG),
      borderColor: chart.Utils.CHART_COLORS.blue,
      backgroundColor: chart.Utils.transparentize(chart.Utils.CHART_COLORS.blue, 0.5),
    }
  ]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }
    }
  },
};


const actions = [
  {
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = chart.Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
      });
      chart.update();
    }
  },
  {
    name: 'Add Dataset',
    handler(chart) {
      const data = chart.data;
      const dsColor = chart.Utils.namedColor(chart.data.datasets.length);
      const newDataset = {
        label: 'Dataset ' + (data.datasets.length + 1),
        backgroundColor: chart.Utils.transparentize(dsColor, 0.5),
        borderColor: dsColor,
        borderWidth: 1,
        data: chart.Utils.numbers({count: data.labels.length, min: -100, max: 100}),
      };
      chart.data.datasets.push(newDataset);
      chart.update();
    }
  },
  {
    name: 'Add Data',
    handler(chart) {
      const data = chart.data;
      if (data.datasets.length > 0) {
        data.labels = chart.Utils.months({count: data.labels.length + 1});

        for (var index = 0; index < data.datasets.length; ++index) {
          data.datasets[index].data.push(chart.Utils.rand(-100, 100));
        }

        chart.update();
      }
    }
  },
  {
    name: 'Remove Dataset',
    handler(chart) {
      chart.data.datasets.pop();
      chart.update();
    }
  },
  {
    name: 'Remove Data',
    handler(chart) {
      chart.data.labels.splice(-1, 1); // remove the label first

      chart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });

      chart.update();
    }
  }
];


new chart.Chart(document.getElementById("bar-chart"), config)

