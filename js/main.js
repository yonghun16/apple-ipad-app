import ipads from "../data/ipads.js";
import navigations from "../data/navigations.js";

/*  장바구니  */
const basketStarterEl = document.querySelector("header .basket-starter");
const basketEl = basketStarterEl.querySelector(".basket");

function showBasket() {
  basketEl.classList.add("show");
}
function hideBasket() {
  basketEl.classList.remove("show");
}

window.addEventListener("click", function () {
  hideBasket(); // window를 클릭하면 basketEl을 숨기는 이벤트
});

basketStarterEl.addEventListener("click", function (event) {
  event.stopPropagation(); // 상위 요소로 가는 '이벤트 버블링' 막기 (basketStarterEl을 누르면 이벤트 버블링은 basketStarterEl에서만 끝난다)
  if (basketEl.classList.contains("show")) {
    // hide - 만약 show 클래스가 있다면, 감추기
    hideBasket();
  } else {
    // show - 그렇지 않다면(show 클래스가 없다면) 보여주기
    showBasket();
  }
});

basketEl.addEventListener("click", function (event) {
  event.stopPropagation(); // '이벤트 버를링'이 basketEl가 최고단계
});

/*  검색  */
const headerEl = document.querySelector("header");
const headerMenuEls = [...headerEl.querySelectorAll("ul.menu > li")]; // 얕은 복사(전개 연산자 사용)
const searchWrapEl = headerEl.querySelector(".search-wrap");
const searchStarterEl = headerEl.querySelector(".search-starter");
const searchCloserEl = searchWrapEl.querySelector(".search-closer");
const searchShadowEl = searchWrapEl.querySelector(".shadow");
const searchInputEl = searchWrapEl.querySelector("input");
const searchDelayEls = [...searchWrapEl.querySelectorAll("li")]; // 배열로 복사

function showSearch() {
  headerEl.classList.add("searching");
  stopScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s"; // 요소마다 차등으로 delay를 변경하는 식
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    // 0.6초 후에 실행되도록
    searchInputEl.focus();
  }, 600);
}
function hideSearch() {
  headerEl.classList.remove("searching");
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s"; // 요소마다 차등으로 delay를 변경하는 식
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();
  searchInputEl.value = "";
}

searchStarterEl.addEventListener("click", showSearch);
searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearch();
});
searchShadowEl.addEventListener("click", hideSearch);

function playScroll() {
  document.documentElement.classList.remove("fixed");
}

function stopScroll() {
  document.documentElement.classList.add("fixed");
}

/* 헤더 메뉴 토글! */
const menuStarterEl = document.querySelector("header .menu-starter");
menuStarterEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    searchInputEl.value = "";
    playScroll();
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

/* 헤더 검색 */
const searchTextFieldEl = document.querySelector("header .textfield");
const searchCancelEl = document.querySelector("header .search-canceler");
searchTextFieldEl.addEventListener("click", function () {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});
searchCancelEl.addEventListener("click", function () {
  headerEl.classList.remove("searching--mobile");
});

/* 윈도우 크기 조절에 따른 헤더 검색 창 초기화 */
window.addEventListener("resize", function () {
  if (window.innerWidth <= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

/* menu-toggler 토글*/
const navEl = document.querySelector("nav");
const navMenuToggleEl = document.querySelector(".menu-toggler");
const navShadowEl = navEl.querySelector(".shadow");

navMenuToggleEl.addEventListener("click", function () {
  if (navEl.classList.contains("menuing")) {
    hideNavMenu();
  } else {
    showNavMenu();
  }
});

navEl.addEventListener("click", function (event) {
  event.stopPropagation();
});
navShadowEl.addEventListener("click", hideNavMenu);
window.addEventListener("click", hideNavMenu);

function showNavMenu() {
  navEl.classList.add("menuing");
}
function hideNavMenu() {
  navEl.classList.remove("menuing");
}

/* 요소의 가시성 관찰 */
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return;
    }
    entry.target.classList.add("show");
  });
});
const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

/* 비디오 재생! */
const video = document.querySelector(".stage video");
const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");

playBtn.addEventListener("click", function () {
  video.play();
  playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", function () {
  video.pause();
  pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

/* 당신에게 맞는 iPad는? 렌더링 */
const itemsEl = document.querySelector("section.compare .items");
ipads.forEach(function (ipad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  ipad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  itemEl.innerHTML = /* HTML */ `
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString("en-US")}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
  `;
  itemsEl.append(itemEl);
});

// 푸터 내비게이션 맵 랜더링!
const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach((nav) => {
  const mapEl = document.createElement("div");
  mapEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach((map) => {
    mapList += /* html */ `<li>
      <a href="${map.url}">${map.name}</a>
    </li>`;
  });

  mapEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
      <span class="icon">+</span>
    </h3>
    <ul>
      ${mapList}
    </ul>
  `;

  navigationsEl.append(mapEl);
});

/* copyright */
const thisYearEl = document.querySelector("footer .this-year");
thisYearEl.textContent = new Date().getFullYear();

// 푸터 내비게이션 맵 아코디언
const mapEls = [...document.querySelectorAll("footer .navigations .map")];
mapEls.forEach((el) => {
  const h3El = el.querySelector("h3");
  h3El.addEventListener("click", () => {
    el.classList.toggle("active");
  });
});
