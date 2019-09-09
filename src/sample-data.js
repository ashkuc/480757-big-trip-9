import {shuffleArray, getRandomBetween, getRandomFromArray} from './components/utils.js';

const getRandomLink = () => `http://picsum.photos/300/150?r=${Math.random()}`;

export const getEvent = () => {
  return {
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
    place: getRandomFromArray([
      `norwegian fjords`,
      `paris`,
      `iceland`,
      `australia`,
      `fiji`,
      `canary islands`,
      `singapore`,
      `ireland`,
    ]),
    photos: new Array(getRandomBetween(4, 10)).fill(``).map(getRandomLink),
    description: shuffleArray(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`. `).map((el) => el.replace(`.`, ``) + `.`)).slice(0, getRandomBetween(1, 3)).join(` `),
    timeStart: Date.now() + getRandomBetween(1, 5) * 24 * 60 * 60 * 1000 + getRandomBetween(0, 180) * 60 * 1000,
    duration: getRandomBetween(30, 240) * 60 * 1000,
    price: getRandomBetween(2, 20) * 10,
    offers: shuffleArray([
      `luggage`,
      `comfort`,
      `meal`,
      `seats`,
    ]).slice(0, getRandomBetween(0, 4)),
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
