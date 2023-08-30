import { createHTML, pag } from './renderHtml';

const refs = {
  ul: document.querySelector('.cards'),
  ulPag: document.querySelector('.pagination'),
  country: document.querySelector('.locatio-input'),
  name: document.querySelector('.name-input'),
};

export const paginationMarkup = (
  totalPage,
  nowPage,
  {
    countItemShow = 4,
    showStart = true,
    contentStart = '&lArr;',
    showEnd = true,
    contentEnd = '&rArr;',
    dotTag = 'span',
    baseTag = 'b',
    link = '',
    baseClass = '',
    classActive = 'active',
    query = '',
  } = {}
) => {
  const genElement = (page = 1, text = page) =>
    link && baseTag === 'a'
      ? `<${baseTag} class="${
          page === nowPage
            ? baseClass
              ? classActive
              : `${baseClass} ${classActive}`
            : baseClass
        }" href="${link + (+page - 1)}${
          query ? '&' + query : ''
        }">${text}</${baseTag}>`
      : `<${baseTag} class="${
          page === nowPage
            ? baseClass
              ? classActive
              : `${baseClass} ${classActive}`
            : baseClass
        }">${text}</${baseTag}>`;
  let markup = showStart ? genElement(1, contentStart) : '';
  const startShow = nowPage - countItemShow;
  const endShow = nowPage + countItemShow;
  for (let i = 1; i <= totalPage; i++) {
    if (i > endShow) i = totalPage;
    if (startShow === i && i > 1) markup += `<${dotTag}>...</${dotTag}>`;
    if (i === 1 || i === totalPage || (i >= nowPage - 2 && i <= nowPage + 2))
      markup += genElement(i);
    if (endShow === i) markup += `<${dotTag}>...</${dotTag}>`;
    if (i < startShow) i = startShow - 1;
  }
  return (markup += showEnd ? genElement(totalPage, contentEnd) : '');
};

refs.ulPag.addEventListener('click', onClick);

function onClick(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'A') return;
  if (e.target.classList.contains('active')) {
    e.preventDefault();
    return;
  }

  const data = e.target.href;
  fetch(data)
    .then(response => response.json())
    .then(data => {
      e.preventDefault();
      refs.ul.innerHTML = '';
      createHTML(data._embedded.events);

      const country = refs.country.value.trim();
      const name = refs.name.value.trim();

      const obj = {
        data,
        country,
        name,
      };
      pag(obj);
    });
}
