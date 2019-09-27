import Statistic from '../statistic.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, Position} from '../utils.js';

export default class StatisticController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statistic = new Statistic(this._data);
    this._statisticMoney = this._statistic.getElement().querySelector(`.statistics__chart--money`);
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

    console.log(Chart.defaults);
    
    const moneysChart = new Chart(this._statisticMoney, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: [`01 FEB`, `02 FEB`, `03 FEB`, `04 FEB`, `04 FEB`, `04 FEB`],
        datasets: [{
          label: `MONEY`,
          data: [43, 65, 31, 18, 18, 18],
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
            display: false,
          }],
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
}
