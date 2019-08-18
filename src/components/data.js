import {shuffleArray, getRandomBoolean, getMinMax} from './utils.js';

const getRandomLink = (link) => link + Math.random();

const getEvent = () => {
  return {
    type: [
      {
        name: `taxi`,
        icon: `taxi.png`,
      },
      {
        name: `bus`,
        icon: `bus.png`,
      },
      {
        name: `train`,
        icon: `train.png`,
      },
      {
        name: `ship`,
        icon: `ship.png`,
      },
      {
        name: `transport`,
        icon: `transport.png`,
      },
      {
        name: `drive`,
        icon: `drive.png`,
      },
      {
        name: `Flight`,
        icon: `Flight.png`,
      },
      {
        name: `check-in`,
        icon: `check-in.png`,
      },
      {
        name: `sightseeing`,
        icon: `sightseeing.png`,
      },
      {
        name: `restaurant`,
        icon: `restaurant.png`,
      },
    ][Math.round(Math.random() * 10)],
    place: [
      `Norwegian Fjords`,
      `Eiffel Tower`,
      `Iceland`,
      `Australia`,
      `Fiji`,
      `Canary Islands`,
      `Singapore`,
      `Ireland`,
    ][Math.round(Math.random() * 8)],
    photos: new Array(getMinMax(4, 10)).fill(getRandomLink(`http://picsum.photos/300/150?r=$`)),
    description: shuffleArray(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(". ").map((el) => el.replace('.', '') + '.')).slice(0, getMinMax(1, 3)).join(' '),
    date: Date.now() + getMinMax(1, 7) * 24 * 60 * 60 * 1000,
    timeStart: Date.now() + 1 * getMinMax(0, 24) * 60 * 60 * 1000,
    timeEnd: Date.now() + 1 * getMinMax(0, 24) * 60 * 60 * 1000,
    price: `€ ${getMinMax(2, 20) * 10}`,
  }
};

export {getEvent};
