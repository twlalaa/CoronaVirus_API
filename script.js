"use strict";

const cardCountainer = document.querySelector(".card-container");

const searchInput = document.getElementById("searchInput");

let api = [];

const title = document.getElementById("header-title");

const darkBtn = document.getElementById("dark");

const searchIcon = document.getElementById("searchIcon");

const countryName = document.getElementById("countryName");

darkBtn.addEventListener("click", (e) => {
  document.body.classList.toggle("body-color");
  title.classList.toggle("a-color");
  darkBtn.classList.toggle("dark-mode-color");
});

const scrollToTopButton = document.getElementById("scrollToTopButton");

scrollToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = "inline-block";
  } else {
    scrollToTopButton.style.display = "none";
  }
});

searchIcon.addEventListener("click", () => {
  const searchedValue = searchInput.value.trim();
  fetch(`https://api.api-ninjas.com/v1/covid19?country=${searchedValue}`, {
    headers: {
      "X-Api-Key": `14I46t10KHlTvs2qL1wcKQ==y84nxuztnx838eMd`,
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data.length === 0) {
        countryName.innerText = "Country is not defined, please try again.";
        return;
      }
      countryName.innerText = data[0].country;
      console.log(data);
      // const cases = data[0].cases; //this is an object, inside it there are case objects
      // console.log(Object.entries(cases));

      // console.log(objLength);

      cardCountainer.innerHTML = "";
      data.forEach((d) => {
        const p = document.createElement("p");
        p.innerText = d.region;
      });

      const regions = data.length;
      console.log(regions);
      data.forEach((r) => {
        const reg = document.createElement("h2");
        reg.innerText = r.region ? `Region: ${r.region} ` : "No region";
        reg.style.width = "1500px";
        reg.className = "region";
        cardCountainer.append(reg);
        // console.log(r.region);
        // console.log(r.cases);
        let objLength = Object.entries(r.cases).length;
        for (let i = 0; i < objLength; i++) {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `<img id="coronaPic" src="Coronavirus-Shutterstock-CMS.jpg" alt="" />
          <div class="card-content">
            <p id="date">${Object.entries(r.cases)[i][0]}</p>
            <p>Total: <span id="total">${
              Object.entries(r.cases)[i][1]["total"]
            }</span></p>
            <p>New: <span id="new">${
              Object.entries(r.cases)[i][1]["new"]
            }</span></p>
          </div>`;
          cardCountainer.append(card);
          darkBtn.addEventListener("click", () => {
            card.classList.toggle("card-color");
          });
        }
      });
    });
});
