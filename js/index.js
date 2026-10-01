 // ------------------------------------------- loading Page -------------------------------------------

$(window).on("load", function () {
  setTimeout(function () {
    $(".loadingPage").fadeOut(1000);
  }, 2000);
});

// ------------------------------------------- Navbar -------------------------------------------

let $navbar = $("nav.navbar"),
  navbarLinks = $("nav.navbar ul li a.nav-link");

navScrolled();

changeLinksActiveOfNavbar();

sectionsScroll();

$(window).on("scroll", function () {
  navScrolled();

  changeLinksActiveOfNavbar();
});

// ------------------------------------------- services section -------------------------------------------

let servicesData = null;

(async function () {
  let promise = await fetch("https://semicode.tech/api/v1/l10nhouse/services");
  servicesData = await promise.json();
  let i=0;
  for (let item of servicesData) {
    $("#Services .row").append(`
          <div class="col-md-6 mb-5 d-flex justify-content-center align-content-center wow ${( ((i + 1 ) % 2 ) == 0) ?'animate__backInRight': 'animate__backInLeft'}" data-wow-duration="1.5s" data-wow-delay="${i *.2} s">
            <div class="item text-center p-2 ">
                <div class="content">
                    <img src="./images/${item.icon}" class="img-fluid" alt="">
                    <h4 class="my-3">${item.title}</h4>
                    <p>${prepareText(item.description.slice(0, 150))}... <span class="firstColor read" onclick="showServicesData('${item.icon}')">Read More</span></p>
                </div> 
            </div>
          </div>
        `);
    i++;
  }
})();

// -------------------------------------------  languages section -------------------------------------------

//____________________________ sectors

(async function () {
  let promise = await fetch("https://semicode.tech/api/v1/l10nhouse/sectors"),
    sectorsData = await promise.json();
  console.log(sectorsData);
  for (let item of sectorsData) {
    $(".popup[data-popup-name='sectors'] .part2 .row").append(`
        <div class="col-xl-3 col-gl-4  col-md-6 part">
            <div class="item">
                <div class="product">
                    <img src="./images/sec/${item.icon}" alt="">
                    <p>${item.name}</p>
                </div>
            </div>
        </div>
    `);
  }
})();

//____________________________ languages

(async function () {
  let promise = await fetch("https://semicode.tech/api/v1/l10nhouse/languages"),
    languages = await promise.json();
  console.log(languages);
  for (let language of languages) {
    $(".popup[data-popup-name='language'] .part2 .body").append(`
        <div class="item">
            <h5>${language.continent}</h5>
            <ul class="list-unstyled">
              ${prepareLiLanguages(language.languages)}
            </ul>
        </div>
    `);
  }
})();