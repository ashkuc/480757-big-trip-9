import Statistic from '../statistic.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {render, Position} from '../utils.js';
import {Types} from '../../data-info/types.js';
import moment from 'moment';

// Глобальные настройки для Chart.js
Chart.helpers.merge(Chart.defaults, {
  scale: {
    gridLines: {
      drawBorder: false,
      drawOnChartArea: false,
      drawTicks: false,
      zeroLineBorderDashOffset: 100,
    },
    lineWidth: 100,
    ticks: {
      fontColor: `#000000`,
      fontStyle: `bold`,
      padding: 10,
    },
  },
  global: {
    tooltips: {
      enabled: false,
    },
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
      },
    },
  },
});

export default class StatisticController {
  constructor(container, data) {
    this._container = container;
    this._data = data;
    this._statistic = new Statistic(this._data);
    this._moneyStatsContainer = this._statistic.getElement().querySelector(`.statistics__chart--money`);
    this._transportStatsContainer = this._statistic.getElement().querySelector(`.statistics__chart--transport`);
    this._timeStatsContainer = this._statistic.getElement().querySelector(`.statistics__chart--time`);
    this._moneyChart = null;
    this._transportChart = null;
    this._timeChart = null;
  }

  init() {
    this.hide();
    this._getChartContainerHeight(this._moneyStatsContainer, this._getMoneyStats());
    this._getChartContainerHeight(this._transportStatsContainer, this._getTransportStats());
    this._getChartContainerHeight(this._timeStatsContainer, this._getTimeStats());

    this._moneyChart = new Chart(this._moneyStatsContainer, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: Array.from(this._getMoneyStats().keys()),
        datasets: [{
          data: Array.from(this._getMoneyStats().values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#078ff0`,
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false,
            },
          }],
          yAxes: [{
            barThickness: 40,
          }]
        },
        title: {
          text: `MONEY`,
        },
        plugins: {
          datalabels: {
            formatter(value) {
              return `€ ${value}`;
            }
          },
        },
      }
    });

    this._transportChart = new Chart(this._transportStatsContainer, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: Array.from(this._getTransportStats().keys()),
        datasets: [{
          data: Array.from(this._getTransportStats().values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#078ff0`,
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false,
            },
            display: false,
          }],
          yAxes: [{
            barThickness: 40,
          }]
        },
        title: {
          text: `TRANSPORT`,
        },
        plugins: {
          datalabels: {
            formatter(value) {
              return `${value}x`;
            }
          },
        },
      }
    });

    this._timeChart = new Chart(this._timeStatsContainer, {
      type: `horizontalBar`,
      data: {
        plugins: [ChartDataLabels],
        labels: Array.from(this._getTimeStats().keys()),
        datasets: [{
          data: Array.from(this._getTimeStats().values()),
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#078ff0`,
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              display: false,
            },
            display: false,
          }],
          yAxes: [{
            barThickness: 40,
          }]
        },
        title: {
          text: `TIME SPENT`,
        },
        plugins: {
          datalabels: {
            formatter(value) {
              return `${value}H`;
            }
          },
        },
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
    this._transportChartUpdate();
    this._timeChartUpdate();
  }

  _getChartContainerHeight(container, stats) {
    container.style.height = stats.size * 55 + `px`;
  }

  _getMoneyStats() {
    const types = Array.from(new Set(this._data.map((item) => item.type)));
    const moneyStats = new Map(types.map((type) => [type.toUpperCase(), this._data.filter((item) => item.type === type).map((item) => item.basePrice).reduce((a, b) => Number(a) + Number(b))]));
    return moneyStats;
  }

  _getTransportStats() {
    const transportTypes = Types.filter((type) => type.IS_MOVEMENT).map((item) => item.NAME);
    const types = Array.from(new Set(this._data.map((item) => item.type))).filter((type) => transportTypes.find((transportType) => transportType === type));
    const transportStats = new Map(types.map((type) => [type.toUpperCase(), this._data.filter((item) => item.type === type).length]));
    return transportStats;
  }

  _getTimeStats() {
    const destinations = Array.from(new Set(this._data.map((item) => item.destination)));
    const timeStats = new Map(destinations.map((destination) => [destination.toUpperCase(), Math.round(this._data.filter((item) => item.destination === destination).map((item) => moment.duration(moment(item.dateTo).diff(moment(item.dateFrom))).asHours()).reduce((a, b) => a + b))]));
    return timeStats;
  }

  _moneyChartUpdate() {
    this._moneyChart.data.labels = Array.from(this._getMoneyStats().keys());
    this._moneyChart.data.datasets[0].data = Array.from(this._getMoneyStats().values());
    this._getChartContainerHeight(this._moneyStatsContainer, this._getMoneyStats());
    this._moneyChart.update();
  }

  _transportChartUpdate() {
    this._transportChart.data.labels = Array.from(this._getTransportStats().keys());
    this._transportChart.data.datasets[0].data = Array.from(this._getTransportStats().values());
    this._getChartContainerHeight(this._transportStatsContainer, this._getTransportStats());
    this._transportChart.update();
  }

  _timeChartUpdate() {
    this._timeChart.data.labels = Array.from(this._getTimeStats().keys());
    this._timeChart.data.datasets[0].data = Array.from(this._getTimeStats().values());
    this._getChartContainerHeight(this._timeStatsContainer, this._getTimeStats());
    this._timeChart.update();
  }
}
