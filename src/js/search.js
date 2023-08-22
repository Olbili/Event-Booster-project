import { debounce } from "debounce";
import fetchOn, { onLoad } from "./request";
import { createHTML } from "./renderHtml";

const refs = {
    country: document.querySelector(".locatio-input"),
    name: document.querySelector(".name-input"),
    poshuk: document.querySelector(".poshuk"),
    search: document.querySelector(".search"),
    cards: document.querySelector(".cards")
}

refs.poshuk.addEventListener("input", debounce(textContent, 300));

function textContent (e) {
    if (e.target.nodeName!=="INPUT") return;
    const country = refs.country.value.trim();
    const name = refs.name.value.trim();
    refs.cards.innerHTML=" ";
    fetchOn(country, name);
    const value = e.target.value.trim();


   
    // console.log('value :>> ', value);
    // console.log(refs.country.value);
}