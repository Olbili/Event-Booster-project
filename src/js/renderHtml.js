const refs = {
    ul: document.querySelector(".cards"),
};

function createHTML (eventData) {
  
    
    eventData.map(({name, dates:{start}, images}) => { 
    // console.log(eventData[0]._embedded.venues[0].name);
    const place = eventData[0]._embedded.venues[0].name;
    const markup =  `<li class="card">
  <div class="before">
  <img class="image" src="${images[0].url}" alt="" loading="lazy">
  </div>
  <div class="information">
  <p class="name">${name}</p>
  <p class="date">${start.localDate}</p>
  <p class="place"><img src="../images/svg/location.svg" alt="">${place}</p></div>
</li>`;
refs.ul.insertAdjacentHTML("beforeend", markup);
  });
};

export{createHTML};