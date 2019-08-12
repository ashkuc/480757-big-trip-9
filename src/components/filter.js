const FILTERS_HEADINGS = [`Everything`, `Future`, `Past`];

const getFilterMarkup = (checkedFilterName) => {
  const renderFilterItem = (filterHeading) => {
  let filterStatus = ``;

  if (filterHeading.toLowerCase() === checkedFilterName.toLowerCase()) {
    filterStatus = `checked`;
  }

  return `
    <div class="trip-filters__filter">
      <input id="filter-${filterHeading}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterHeading}" ${filterStatus}>
      <label class="trip-filters__filter-label" for="filter-${filterHeading}">${filterHeading}</label>
    </div>
  `;
};

  return `
    <form class="trip-filters" action="#" method="get">
      ${FILTERS_HEADINGS.map(renderFilterItem).join(``)}
  
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  `;
};

export {getFilterMarkup};
