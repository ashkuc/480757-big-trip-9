import Statistic from '../statistic.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, Position} from '../utils.js';

// Глобальные настройки для Chart.js
Chart.helpers.merge(Chart.defaults, {
  scale: {
    gridLines: {
      drawBorder: false,
      drawOnChartArea: false,
      drawTicks: false,
    },
    ticks: {
      fontColor: `#000000`,
      fontStyle: `bold`,
      padding: 10,
    },
  },
  global: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      fontSize: `28`,
      fontColor: `#000000`,
      padding: 40,
      position: `left`,
    },
    plugins: {
      datalabels: {
        align: `start`,
        anchor: `end`,
        color: `#000000`,
        font: {
          weight: `bold`,
        },
        formatter: function(value) {
          return `€ ${value}`;
        }
      },
    },
  },
});

console.log(Chart.defaults.scale);

export default class StatisticController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statistic = new Statistic(this._data);
    this._moneyStatsContainer = this._statistic.getElement().querySelector(`.statistics__chart--money`);
    this._moneyChart = null;
  }
  
  init() {
    this.hide();

    this._getChartContainerHeight(this._moneyStatsContainer, this._getMoneyStats());
    
    this._moneyChart = new Chart(this._moneyStatsContainer, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: Array.from(this._getMoneyStats().keys()),
        datasets: [{
          label: `MONEY`,
          data: Array.from(this._getMoneyStats().values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#078ff0`,
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales:{
          xAxes: [{
            ticks: {
              beginAtZero:true,
              display: false,
            },
            display: false,
          }],
          yAxes: [{
            barThickness: 40,
          }]
        },
        title: {
          text: `MONEY`,
        }
      }
    });

    render(this._container, this._statistic.getElement(), Position.AFTER);
  }

  hide() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._statistic.getElement().classList.remove(`visually-hidden`);
  }

  update() {
    this._moneyChartUpdate();
  }

  _getChartContainerHeight(container, stats) {
    container.style.height = stats.size * 55 + `px`;
  }

  _getMoneyStats() {
    const types = Array.from(new Set(this._data.map((item) => item.type)));
    const moneyStats = new Map(types.map((type) => [type.toUpperCase(), this._data.filter((item) => item.type === type).map((item) => item.basePrice).reduce((a, b) => a + b)]));
    return moneyStats;
  }

  _moneyChartUpdate() {
    this._moneyChart.data.labels = Array.from(this._getMoneyStats().keys());
    this._moneyChart.data.datasets[0].data = Array.from(this._getMoneyStats().values());
    this._getChartContainerHeight(this._moneyStatsContainer, this._getMoneyStats());
    this._moneyChart.update();
  }
}
