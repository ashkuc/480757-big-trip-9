export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i]] = [array[j]];
  }

  return array;
};

export const toTimeForEdit = (miliseconds) => {
  const dateTime = new Date(miliseconds).toLocaleString();
  let date = dateTime.split(/\.|,/).slice(0, 3).map((element) => element.slice(0, 2)).join(`/`);
  let time = dateTime.split(/\.| |,|:/).slice(4, 6).join(`:`);
  return `${date} ${time}`;
};

export const getRandomBoolean = () => Boolean(Math.round(Math.random()));
export const getRandomBetween = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
export const getRandomFromArray = (array) => array[getRandomBetween(0, array.length - 1)];
export const toCapitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTER: `after`,
  BEFORE: `before`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, position) => {
  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTER:
      container.after(element);
      break;
    case Position.BEFORE:
      container.before(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};
