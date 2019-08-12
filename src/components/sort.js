const SORT_ITEMS_TITLES = [`Event`, `Time`, `Price`];

const getSortMarkup = (itemsOptions) => {
  const renderSotrItem = (sortItemTitle) => {
    let sortItemStatus = ``;
    let sortItemIcon = ``;
  
    if (sortItemTitle.toLowerCase() === itemsOptions.CHECKED_ITEM.toLowerCase()) {
      sortItemStatus = `checked`;
    }
  
    if (itemsOptions.ITEMS_WITH_ICON.map((item) => item.toLowerCase()).includes(sortItemTitle.toLowerCase())) {
      sortItemIcon = `
        <svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>
      `;
    }
  
    return `
      <div class="trip-sort__item  trip-sort__item--${sortItemTitle.toLowerCase()}">
        <input id="sort-${sortItemTitle}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortItemTitle}" ${sortItemStatus}>
        <label class="trip-sort__btn" for="sort-${sortItemTitle}">
          ${sortItemTitle}
          ${sortItemIcon}
        </label>
      </div>
    `;
  };

  return `
    <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      <span class="trip-sort__item  trip-sort__item--day">Day</span>

      ${SORT_ITEMS_TITLES.map(renderSotrItem).join(``)}
  
      <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
    </form>
  `;
};

export {getSortMarkup};
