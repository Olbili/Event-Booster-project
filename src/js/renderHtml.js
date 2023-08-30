import { paginationMarkup } from './pagination';

const refs = {
  ul: document.querySelector('.cards'),
  ulPag: document.querySelector('.pagination'),
  country: document.querySelector('.locatio-input'),
  name: document.querySelector('.name-input'),
};

function createHTML(eventData) {
  eventData.map(({ name, dates: { start }, images }) => {
    const place = eventData[0]._embedded.venues[0].name;
    const markup = `<li class="card">
  <div class="before">
  <img class="image" src="${images[3].url}" alt="" loading="lazy">
  </div>
  <div class="information">
  <p class="name">${name}</p>
  <p class="date">${start.localDate}</p>
  <p class="place"><img src="../images/svg/location.svg" alt="">${place}</p></div>
</li>`;
    refs.ul.insertAdjacentHTML('beforeend', markup);
  });
}
function pag({ data, country, name }) {
  const optionPagination = {
    showStart: false,
    showEnd: false,
    baseTag: 'a',
    link: 'https://app.ticketmaster.com/discovery/v2//events.json?apikey=bdHFOjAkpUBvne7gzKAkA6SZNtgLzUV4&page=',
    baseClass: 'pageCount',
    query: `countryCode=${country}&keyword=${name}`,
  };
  if (data.page.totalPages > 29) {
    data.page.totalPages = 29;
  }
  const renderPageMarkup = paginationMarkup(
    data.page.totalPages,
    data.page.number + 1,
    optionPagination
  );

  refs.ulPag.innerHTML = renderPageMarkup;
}

export { createHTML, pag };
