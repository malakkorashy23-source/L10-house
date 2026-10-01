// ________________________________ navbar ________________________________

function navScrolled(){
  if (window.scrollY > 20) {
    $navbar.addClass("scrolled");
  } else {
    $navbar.removeClass("scrolled");
  }

  if (window.scrollY > $navbar.outerHeight(true)) {
    $(".fixIedcon").addClass("show");
  } else {
    $(".fixIedcon").removeClass("show");
  }
}

function  changeLinksActiveOfNavbar() {
  let sections = $("header ,section");
  sections.each(function (index, section) {
    let $section=$(section)
      linkId = $section.attr("id"),
      sectionTop = ( ($section.offset())?$section.offset().top:0)  - ($navbar.outerHeight()) ,
      sectionBottom = ($section.outerHeight(true) + sectionTop) ,
      scrollYy=window.scrollY ;

    if( scrollYy >= sectionTop &&  scrollYy <= sectionBottom){
      $("a.nav-link.active").removeClass("active");
      $(`a.nav-link[href="#${linkId}"]`).addClass("active");
    }
  });
}

function sectionsScroll(){
  navbarLinks.each(function (index, link) {
    let $link = $(link);
    $link.click(function (e) {
      e.preventDefault();
      let sectionId = $link.attr("href"),
        sectionTop = ( ($(sectionId).offset())?$(sectionId).offset().top:0)  - $navbar.outerHeight();
      console.log(sectionTop);
      window.scrollTo(0, sectionTop); //can't do it by jQuery
    });
  });
}

// ________________________________ services section and service popup ________________________________

function prepareText(des){
  let regex=/L10N House/gmi;
  return des.replaceAll(regex,`<span class="fw-semibold"><span class="firstColor">L10N</span><span class="secondColor"> House</span></span> `)
}

function showServicesData(icon){
  let service=servicesData.filter(service=> service.icon == icon)[0];
  prepareServicesComponent(service);
  openPopup('service');
}

function  prepareServicesComponent(service){
  $(`.popup[data-popup-name="service"] .box`).html(`
      <div class="part1 py-2">
          <h6>Service</h6>
          <i class="fa-regular fa-circle-xmark" onclick="closePopup()"></i>
      </div>
      <div class="part2 p-3">
          <h3 class="firstColor text-center mb-3">${service.title}</h3>
          <div class="body">
              <div class="img">
                  <img src="./images/${service.img}"  alt="">
                  <div class="layout">
                      <p>${prepareText(service.description)}</p>
                  </div>
              </div>
          </div>
      </div>
      <div class="part3 mt-3">
          ${prepareSectionsOfService(service.sections)}        
      </div>
    
  `)
 
}

function prepareSectionsOfService(sections){
  let sectionsData=``;
  let i=0;
  for(let section of sections){
    sectionsData+=`
      <div class="head d-flex justify-content-start align-items-center mb-3">
          <i class="fa-solid fa-clipboard-list me-2 fs-4 fs-lg-1 firstColor ${(i==1)? 'd-none':''}"></i>
          <h5 class="mb-0">${section.title}</h5>
      </div>
      <div class="body" mt-3>
          <ol>
              ${preparePointsOfSection(section.points)}
          </ol>
      </div>
    
    `;
    i++;
  }
  return sectionsData;
}

function preparePointsOfSection(points){
  let pointsData=``;
   for(let point of points){
    pointsData+=`
      <li>${point}</li>
    `;
  }
  return pointsData;
}

// ________________________________ language popup call from self invoke language function  ________________________________

function prepareLiLanguages(languages) {
  let languagesData = ``;
  for (let language of languages) {
    languagesData += `
      <li><i class="fa-regular fa-circle-dot"></i> ${language}</li>
    `;
  }
  return languagesData;
}

// ________________________________ popup functions ________________________________

function openPopup(name){

  if(name == "language"){
    $(`.popup[data-popup-name="${name}"]`).fadeIn(1000,function(){
      $(`.popup[data-popup-name="${name}"]`).find(".box").addClass("show")
    });
  }else{
    $(`.popup[data-popup-name="${name}"]`).fadeIn(1000);
  }

  let box=$(`.popup[data-popup-name="${name}"] .box`);
  box.click(function(e){
    e.stopPropagation();
  })
}

function closePopup(name){
   
  if( name == "language"){
    $(`.popup[data-popup-name="${name}"] .box`).removeClass("show");
    $(`.popup[data-popup-name="${name}"]`).fadeOut(1000).delay(500);

  }else{
    $(`.popup`).fadeOut(1000);
  }
  
}