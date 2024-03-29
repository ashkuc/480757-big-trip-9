import {shuffleArray, getRandomBetween, getRandomFromArray, getRandomBoolean} from '../components/utils.js';

export const getEvent = () => {
  return {
    basePrice: getRandomBetween(4, 18) * 100,
    dateFrom: Date.now() + getRandomBetween(1, 7) * 24 * 60 * 60 * 1000,
    dateTo: Date.now() + getRandomBetween(7, 14) * 24 * 60 * 60 * 1000,
    destination: getRandomFromArray([
      `Chamonix`,
      `Pitsburg`,
      `New York`,
      `Montenegro`,
      `Italy`,
      `Cuba`,
      `Argentina`,
      `Iceland`,
    ]),
    isFavorite: getRandomBoolean(),
    offers: shuffleArray([
      `add luggage`,
      `order uber`,
      `choose seats`,
      `switch to comfort`,
      `travel by train`,
    ]).slice(0, getRandomBetween(0, 4)),
    type: getRandomFromArray([
      `taxi`,
      `bus`,
      `train`,
      `ship`,
      `transport`,
      `drive`,
      `flight`,
      `check`,
      `sightseeing`,
      `restaurant`,
    ]),
  };
};

export const getMenuItems = () => {
  return [
    {
      name: `table`,
      isActive: true,
    },
    {
      name: `stats`,
      isActive: false,
    },
  ];
};

export const getFilterItems = () => {
  return [
    {
      name: `everything`,
      isChecked: true,
    },
    {
      name: `future`,
      isChecked: false,
    },
    {
      name: `past`,
      isChecked: false,
    },
  ];
};

export const getSortItems = () => {
  return [
    {
      name: `event`,
      isChecked: true,
      hasIcon: false,
    },
    {
      name: `time`,
      isChecked: false,
      hasIcon: true,
    },
    {
      name: `price`,
      isChecked: false,
      hasIcon: true,
    },
  ];
};
