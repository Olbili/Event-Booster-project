// import { debounce } from "debounce";
import { createHTML, pag } from './renderHtml';

async function fetchOn(country, name) {
  const APIKEY = '1Tzj1AqHPQoo0k9AET8HkQMHIUOGPgAP';
  let size = 20;
  if(window.screen.width >= 768 && window.screen.width <= 1199) {
      size = 21;
      };
  const data = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${name}&countryCode=${country}&apikey=${APIKEY}&size=${size}`
  ).then(response => {
    return response.json();
  });

  

 
  
//  console.log(window.screen.width);


// let size = 20;
// if (window.screen.width = 768) {
//   size = 21;
// } const data = await fetch(https://app.ticketmaster.com/discovery/v2/events.json?keyword=${name}&countryCode=${country}&apikey=${APIKEY}&size=${size})
//     .then((response) => {
//       return response.json();
//     });

// let size = 20;
// if(window.screen.width != 768) {
//   const data = await fetch(https://app.ticketmaster.com/discovery/v2/events.json?keyword=${name}&countryCode=${country}&apikey=${APIKEY}&size=${size})
//       .then((response) => {
//         return response.json();
//       });
// } else size = 21;
  const eventData = data._embedded.events;
  const obj = {
    data,
    country,
    name,
  };
  createHTML(eventData);
  pag(obj);
}

export default fetchOn;

