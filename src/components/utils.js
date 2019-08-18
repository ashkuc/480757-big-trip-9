const shuffleArray = (array) => {
  let randomNumber;
  let temp;

  array.forEach((element, index) => {
    randomNumber = Math.floor(Math.random() * (index + 1));
    temp = array[randomNumber];
    array[randomNumber] = element;
    element = temp;
  });

  return array;
};

const getRandomBoolean = () => Boolean(Math.round(Math.random()));

const getMinMax = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export {shuffleArray, getRandomBoolean, getMinMax};
