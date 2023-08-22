// import { F } from './f';
import { startModalAnimation } from './animation_modal';
import { closeModalAnimation } from './animation_modal';

const refs = {
  pricesBox: document.querySelector('.modal__prices'),
  imageS: document.querySelector('.modal__img-s'),
  imageL: document.querySelector('.modal__img-l'),
  floatText: document.querySelector('.modal__float'),
  openModalBtns: document.querySelectorAll('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  modalWindow: document.querySelector('.modal'),
};

const ticketIcon = `<svg width="29" height="19" viewBox="0 0 44 32"
            xmlns="http://www.w3.org/2000/svg"><path d="M4.91 1.27h-4.91v29.46h4.91v-29.46z"></path>
            <path d="M17.26 1.27h-4.91v29.46h4.91v-29.46z"></path>
            <path d="M24.699 1.27h-4.91v29.46h4.91v-29.46z"></path>
            <path d="M44.19 1.27h-7.291v29.46h7.291v-29.46z"></path>
            <path d="M9.82 1.27h-2.381v29.46h2.381v-29.46z"></path>
            <path d="M29.46 1.27h-2.381v29.46h2.381v-29.46z"></path>
            <path d="M34.37 1.27h-2.381v29.46h2.381v-29.46z"></path></svg>`;

refs.closeModalBtn.addEventListener('click', closeModalBtn);
export function closeModalBtn() {
  refs.modal.classList.add('is-hidden');
  closeModalAnimation();
}

refs.modal.addEventListener('click', closeModalBack);
function closeModalBack(ev) {
  if (ev.target === refs.modal) {
    refs.modal.classList.add('is-hidden');
    closeModalAnimation();
  } else {
    return;
  }
}

window.addEventListener('keydown', closeModalKey);
function closeModalKey(ev) {
  if (ev.code === 'Escape') {
    refs.modal.classList.add('is-hidden');
    closeModalAnimation();
  }
}

export function onCardModalOpen(ev) {
  startModalAnimation();
  setTimeout(() => refs.modal.classList.remove('is-hidden'), 400);

  const fetchInfo = new FetchService();
  fetchInfo.config.params.id = ev.currentTarget.dataset.id;

  addInfo();

  function addInfo() {
    refs.floatText.innerHTML = '';
    fetchInfo.baseFetch().then(response => {
      const wholeInfo = response._embedded.events[0];

      const imagesSortByWidth = wholeInfo.images.sort(
        (a, b) => b.width - a.width
      );

      let infoPlaceHolder = '';
      if (wholeInfo.info === undefined) {
        infoPlaceHolder = `Sorry, there is no info about this event.`;
      } else {
        infoPlaceHolder = wholeInfo.info;
      }

      let datePlaceHolder = '';
      if (wholeInfo.dates) {
        if (wholeInfo.dates.start.localTime === undefined) {
          datePlaceHolder = ` `;
        } else if (
          wholeInfo.dates.start.localTime !== undefined &&
          wholeInfo.dates.timezone === undefined
        ) {
          datePlaceHolder = `${wholeInfo.dates.start.localTime.slice(0, 5)}`;
        } else {
          datePlaceHolder = `${wholeInfo.dates.start.localTime.slice(0, 5)} (${
            wholeInfo.dates.timezone
          })`;
        }
      }

      let pricesList = [];
      let whoValue;
      if (wholeInfo._embedded.attractions === undefined) {
        //   refs.imageS.setAttribute('src', `${imagesSortByWidth[0].url}`);
        //   refs.imageL.setAttribute('src', `${imagesSortByWidth[0].url}`);
        //   const emptyModalMarkup = `<div class="modal__text-three"><div class="modal__text-two">
        // <div class="modal__text-block">
        //   <h3 class="modal__title">Info</h3>
        //   <p class="modal__text modal__info">${infoPlaceHolder}</p>
        // </div>`;
        //   refs.floatText.insertAdjacentHTML('afterbegin', emptyModalMarkup);
        //   document.querySelector('.modal__btn').classList.add('is-hidden');
        //   return;
        whoValue = wholeInfo.name;
      } else {
        whoValue = wholeInfo._embedded.attractions[0].name;
      }
      if (wholeInfo.priceRanges !== undefined) {
        for (let i = 0; i < wholeInfo.priceRanges.length; i++) {
          let pricesItem = `<li class="modal__thumb-item">
            <p class="modal__text text-flex">
              <span class="modal__prices-icon">${ticketIcon}</span> 
              ${wholeInfo.priceRanges[i].type} ${wholeInfo.priceRanges[i].min}-${wholeInfo.priceRanges[i].max} ${wholeInfo.priceRanges[i].currency}
            </p>
            <a class="modal__btn modal__link-buy" href="${wholeInfo.url}" target="_blank" rel="noreferrer noopener">Buy ticket</a>
            </li>`;
          pricesList.push(pricesItem);
        }
      } else {
        pricesList.push(`<li class="modal__thumb-item">
            <p class="modal__text">
        Sorry, there is no info about prices.
        </p>
        </li>
        `);
      }
      document.querySelector('.modal__btn').classList.remove('is-hidden');
      refs.imageS.setAttribute('src', `${imagesSortByWidth[0].url}`);
      refs.imageL.setAttribute('src', `${imagesSortByWidth[0].url}`);

      const markup = `<div class="modal__text-three"><div class="modal__text-two">
      <div class="modal__text-block">
        <h3 class="modal__title">Info</h3>
        <p class="modal__text modal__info">${infoPlaceHolder}</p>
      </div>
      <div class="modal__text-block">
        <h3 class="modal__title">When</h3>
        <p class="modal__text">${
          wholeInfo.dates.start.localDate
        }</br>${datePlaceHolder}</p>
      </div>
      </div>
      <div class="modal__text-block">
        <h3 class="modal__title">Where</h3>
        <p class="modal__text">${wholeInfo._embedded.venues[0].city.name}, ${
        wholeInfo._embedded.venues[0].country.name
      }</br>${wholeInfo._embedded.venues[0].name}</p>
      </div>
      </div>
      <div class="modal__text-block">
        <h3 class="modal__title">Who</h3>
        <p class="modal__text author-name-js">${whoValue}</p>
      </div>
      <div class="modal__prices-block">
        <h3 class="modal__title">Prices</h3>
        <ul class="modal__prices">
        ${pricesList.join('')}
        </ul>
        </div>`;

      refs.floatText.insertAdjacentHTML('afterbegin', markup);
      let objEvent;
      if (wholeInfo._embedded.attractions === undefined) {
        objEvent = {
          imgEvent: wholeInfo.images[4].url,
          name: wholeInfo.name,
          country: wholeInfo._embedded.venues[0].country.name,
          city: wholeInfo._embedded.venues[0].city.name,
          urlBuyTicket: wholeInfo.url,
          dataEvents: wholeInfo.dates.start.localDate,
        };
      } else {
        objEvent = {
          imgEvent: wholeInfo.images[4].url,
          name: wholeInfo._embedded.attractions[0].name,
          country: wholeInfo._embedded.venues[0].country.name,
          city: wholeInfo._embedded.venues[0].city.name,
          urlBuyTicket: wholeInfo.url,
          dataEvents: wholeInfo.dates.start.localDate,
        };
      }

    });
  }
}
