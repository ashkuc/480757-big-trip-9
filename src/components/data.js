import {shuffleArray, getMinMax, getRandomBoolean} from './utils.js';

const getRandomLink = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const getEvent = () => {
  return {
    types: [
      {
        name: `taxi`,
        pretext: `to`,
        icon: `taxi.png`,
        isChecked: false,
        isMovement: true,
      },
      {
        name: `bus`,
        pretext: `to`,
        icon: `bus.png`,
        isChecked: false,
        isMovement: true,
      },
      {
        name: `train`,
        pretext: `to`,
        icon: `train.png`,
        isChecked: false,
        isMovement: true,
      },
      {
        name: `ship`,
        pretext: `to`,
        icon: `ship.png`,
        isChecked: false,
        isMovement: true,
      },
      {
        name: `transport`,
        pretext: `to`,
        icon: `transport.png`,
        isChecked: false,
        isMovement: true,
      },
      {
        name: `drive`,
        pretext: `to`,
        icon: `drive.png`,
        isChecked: false,
        isMovement: true,
      },
      {
        name: `flight`,
        pretext: `to`,
        icon: `flight.png`,
        isChecked: true,
        isMovement: true,
      },
      {
        name: `check-in`,
        pretext: ``,
        icon: `check-in.png`,
        isChecked: false,
        isMovement: false,
      },
      {
        name: `sightseeing`,
        pretext: `at`,
        icon: `sightseeing.png`,
        isChecked: false,
        isMovement: false,
      },
      {
        name: `restaurant`,
        pretext: `in`,
        icon: `restaurant.png`,
        isChecked: false,
        isMovement: false,
      },
    ],
    places: [
      `norwegian fjords`,
      `paris`,
      `iceland`,
      `australia`,
      `fiji`,
      `canary islands`,
      `singapore`,
      `ireland`,
    ],
    photos: new Array(getMinMax(4, 10)).fill(``).map(getRandomLink),
    description: shuffleArray(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `).map((el) => el.replace(`.`, ``) + `.`)).slice(0, getMinMax(1, 3)).join(` `),
    date: Date.now() + getMinMax(1, 7) * 24 * 60 * 60 * 1000,
    time: {
      start: Date.now() + getMinMax(1, 5) * 24 * 60 * 60 * 1000 + getMinMax(0, 180) * 60 * 1000,
      end: Date.now() + getMinMax(5, 10) * 24 * 60 * 60 * 1000 + getMinMax(0, 180) * 60 * 1000,
    },
    price: getMinMax(2, 20) * 10,
    additionalOptions: [
      {
        name: `add luggage`,
        cost: `10`,
        isChecked: getRandomBoolean(),
      },
      {
        name: `switch to comfort`,
        cost: `150`,
        isChecked: getRandomBoolean(),
      },
      {
        name: `add meal`,
        cost: `2`,
        isChecked: getRandomBoolean(),
      },
      {
        name: `choose seats`,
        cost: `9`,
        isChecked: getRandomBoolean(),
      },
    ],
  }
};

const getMenu = () => {
  return [
    {
      name: `table`,
      isActive: true,
    },
    {
      name: `stats`,
      isActive: false,
    },
  ]
};

const getFilter = () => {
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
  ]
};

const getSort = () => {
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
      name: `prise`,
      isChecked: false,
      hasIcon: true,
    },
  ]
};

export {getEvent, getMenu, getFilter, getSort};
