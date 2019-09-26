import Statistic from '../statistic.js';
import Chart from 'chart.js';
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

    console.log(Chart.defaults);

    Chart.defaults.scale.gridLines.drawBorder = false;
    Chart.defaults.scale.gridLines.drawOnChartArea = false;
    Chart.defaults.scale.gridLines.drawTicks = false;
    Chart.defaults.scale.ticks.display = false;
    
    const moneysChart = new Chart(this._statisticMoney, {
      type: `horizontalBar`,
      data: {
        labels: [`01 FEB`, `02 FEB`, `03 FEB`, `04 FEB`, `05 FEB`, `06 FEB`, `07 FEB`],
        datasets: [{
          data: [4, 6, 3, 1, 5, 2, 0],
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#078ff0`,
        }]
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
