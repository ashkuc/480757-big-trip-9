import {shuffleArray, getRandomBoolean, getMinMax} from './utils.js';

const getRandomLink = (link) => link + Math.random();

const getEvent = () => {
  return {
    type: [
      {
        name: `taxi to`,
        icon: `taxi.png`,
      },
      {
        name: `bus to`,
        icon: `bus.png`,
      },
      {
        name: `train to`,
        icon: `train.png`,
      },
      {
        name: `ship to`,
        icon: `ship.png`,
      },
      {
        name: `transport to`,
        icon: `transport.png`,
      },
      {
        name: `drive to`,
        icon: `drive.png`,
      },
      {
        name: `flight to`,
        icon: `flight.png`,
      },
      {
        name: `check-in`,
        icon: `check-in.png`,
      },
      {
        name: `sightseeing at`,
        icon: `sightseeing.png`,
      },
      {
        name: `restaurant in`,
        icon: `restaurant.png`,
      },
    ][Math.floor(Math.random() * 10)],
    place: [
      `norwegian fjords`,
      `eiffel tower`,
      `iceland`,
      `australia`,
      `fiji`,
      `canary islands`,
      `singapore`,
      `ireland`,
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
