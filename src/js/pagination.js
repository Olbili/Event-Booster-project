// import fetchOn from "./request"
// // const pagination = document.querySelector(".pagination_list");

import { createHTML } from "./renderHtml";

// // // const pages =  / 20;
// const postsEl = document.querySelector(".pagination");
// async function pagination() {
//     const posts = await fetchOn();
//     console.log(posts);
//     let currentPage = 1;
//     let rows = 20;

//     function displayList(arrData, rowPerPage, page) {
//     const start = rowPerPage * page;
//     const end = start + rowPerPage;
//     const paginatedData = arrData.slice(start, end);
//     paginatedData.forEach(el => {
//         const postEll = document.createElement("div");
//         postEll.classList.add("post");
//         postEl.appendChild(postEll);
//     });  
//     };

//     function displayPagination(arrData, rowPerPage){
//         const pagesCount = Math.ceil(arrData.length / rowPerPage);
//         const ulEl = document.createElement("ul");
//         ulEl.classList.add("pagination_list");
//         for (let i = 0; i < pagesCount; i++) {
//             const liEl = displayPaginationButton(i + 1);
//             ulEl.appendChild(liEl);
//         };
//         postsEl.appendChild(ulEl);
//      };

//      function displayPaginationButton(page) {
//         const liEl = document.createElement("li");
//         liEl.classList.add("pagination_item");
//         liEl.innerText = page;

//         liEl.addEventListener("click", () => {
//             currentPage = page
//             displayList(posts, rows, currentPage )
//         })
//         return liEl;
//      };

//     displayList(posts, rows, currentPage);
//     displayPagination(posts, rows);
// };
// pagination();



// export const paginationMarkup = (totalPage, nowPage,
//     {
//         countItemShow = 4,
//         showStart = true,
//         contentStart = '&lArr;',
//         showEnd = true,
//         contentEnd = '&rArr;',
//         dotTag = 'span',
//         baseTag = 'b',
//         link = '',
//         baseClass = '',
//         classActive = 'active',
//         query = ''
//     } = {}) => {
//     const genElement = (page = 1, text = page) =>
//         (link && baseTag === 'a') ?
//             `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}" href="${link + (+page -1)}${query ? '&' + query : ''}">${text}</${baseTag}>` :
//             `<${baseTag} class="${(page === nowPage ? (baseClass ? classActive : `${baseClass} ${classActive}`) : baseClass)}">${text}</${baseTag}>`;
//     let markup = showStart ? genElement(1, contentStart) : '';
//     const startShow = nowPage - countItemShow;
//     const endShow = nowPage + countItemShow;
//     for (let i = 1; i <= totalPage; i++) {
//         if (i > endShow) i = totalPage;
//         if (startShow === i && i > 1)
//             markup += `<${dotTag}>...</${dotTag}>`;
//         if (i === 1 || i === totalPage || (i >= nowPage - 2 && i <= nowPage + 2))
//             markup += genElement(i);
//         if (endShow === i)
//             markup += `<${dotTag}>...</${dotTag}>`;
//         if (i < startShow) i = startShow - 1;
//     }
//     return markup += showEnd ? genElement(totalPage, contentEnd) : '';
//   };





// let page = 0;
// const postsEl = document.querySelector(".pagination");
// const name = document.querySelector(".name-input");
// const country = document.querySelector(".locatio-input");
// const cards = document.querySelector(".cards");
// postsEl.addEventListener("click", onClick);
// function onClick(e) {
//     e.preventDefault();
//     if (e.target.nodeName !== "A") return;
//     if (e.target.class.contains('active') ) {
//         e.preventDefault();
//         return;
//     };
//     const nameData = name.value;
//     const countryData = country.value;
//     const optionPagination = {
//         showStart: false,
//         showEnd: false,
//         baseTag: 'a',
//         link: 'https://app.ticketmaster.com/discovery/v2//events.json?apikey=1Tzj1AqHPQoo0k9AET8HkQMHIUOGPgAP&page=',
//         baseClass: 'pageCount',
//         query: `countryCode=${countryData}&keyword=${nameData}`,
//       };

//       const data = e.target.href;
//       fetch(data).then((response) => {
//         return response.json();
//       }).then( ({_embedded, page}) => {
//         e.preventDefault;
        
//         cards.innerHTML = createHtml(_embedded.events);
//         if (page.totalPages > 50) {
//             page.totalPages = 50;
//           };
//           postsEl.innerHTML = paginationMarkup(page.totalPages,
//             page.number + 1,
//             optionPagination);
//     }
//       );
// };



