import Statistic from '../statistic.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, Position} from '../utils.js';

export default class StatisticController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statistic = new Statistic(this._data);
    this._moneyStatsContainer = this._statistic.getElement().querySelector(`.statistics__chart--money`);
    this._moneyStats = this._getMoneyStats();
    this._moneyChart = null;
  }
  
  init() {
    this.hide()
    render(this._container, this._statistic.getElement(), Position.AFTER);

    Chart.defaults.scale.gridLines.drawBorder = false;
    Chart.defaults.scale.gridLines.drawOnChartArea = false;
    Chart.defaults.scale.gridLines.drawTicks = false;
    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.title.display = true;
    Chart.defaults.global.title.fontSize = `28`;
    Chart.defaults.global.title.fontColor = `#000000`;
    Chart.defaults.global.title.padding = 40;
    Chart.defaults.global.title.position = `left`;

    this._moneyStatsContainer.style.height = this._moneyStats.size * 55 + `px`;
    
    this._moneyChart = new Chart(this._moneyStatsContainer, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: Array.from(this._moneyStats.keys()),
        datasets: [{
          label: `MONEY`,
          data: Array.from(this._moneyStats.values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#078ff0`,
        }]
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          datalabels: {
            anchor: `end`,
            align: `start`,
          }
        },
        scales:{
          xAxes: [{
            ticks: {
              beginAtZero:true,
              display: false
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
  }

  hide() {
    this._statistic.getElement().classList.add(`visually-hidden`);
  }

  show() {
    this._statistic.getElement().classList.remove(`visually-hidden`);
  }

  _getMoneyStats() {
    const types = Array.from(new Set(this._data.map((item) => item.type)));
    const moneyStats = new Map(types.map((type) => [type, this._data.filter((item) => item.type === type).map((item) => item.basePrice).reduce((a, b) => a + b)]));
    return moneyStats;
  }
}
