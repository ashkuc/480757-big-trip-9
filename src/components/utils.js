const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  };

  return array;
};

const toTimeForEdit = (miliseconds) => {
  const dateTime = new Date(miliseconds).toLocaleString();
  let date = dateTime.split(/\.|,/).slice(0, 3).map((element) => element.slice(0, 2)).join(`/`);
  let time = dateTime.split(/\.| |,|:/).slice(4, 6).join(`:`);
  return `${date} ${time}`;
};

const getRandomBoolean = () => Boolean(Math.round(Math.random()));
const getMinMax = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
const toCapitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export {shuffleArray, getRandomBoolean, getMinMax, toCapitalize, toTimeForEdit};
