import {shuffleArray, getRandomBetween, getRandomFromArray, getRandomBoolean} from './components/utils.js';

export const getEvent = () => {
  return {
    base_price: 222,
    date_from: new Date(Date.now()).toISOString(),
    date_to: new Date(Date.now()).toISOString(),
    destination: getRandomFromArray([
      `chamonix`,
      `pitsburg`,
      `new york`,
      `montenegro`,
      `italy`,
      `cuba`,
      `argentina`,
      `iceland`,
    ]),
    is_favorite: getRandomBoolean(),
    offers: shuffleArray([
      `upgrade to a business class`,
      `choose the radio station`,
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
      `check-in`,
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
