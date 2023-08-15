// import { debounce } from "debounce";
import { createHTML } from "./renderHtml";

async function fetchOn (country, name) {
  const APIKEY = "1Tzj1AqHPQoo0k9AET8HkQMHIUOGPgAP";
  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${name}&countryCode=${country}&apikey=${APIKEY}&size=20`)
  .then((response) => {
    return response.json();
  });
  const eventData = data._embedded.events;
  createHTML(eventData);
}

export default fetchOn;