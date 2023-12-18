/* 장바구니 */
const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}

window.addEventListener('click', function() {
  hideBasket()       // window를 클릭하면 basketEl을 숨기는 이벤트
})

basketStarterEl.addEventListener('click', function(event) {
  event.stopPropagation()    // 상위 요소로 가는 '이벤트 버블링' 막기 (basketStarterEl을 누르면 이벤트 버블링은 basketStarterEl에서만 끝난다)
  if (basketEl.classList.contains('show')) {
    // hide - 만약 show 클래스가 있다면, 감추기
    hideBasket();
  } else {
    // show - 그렇지 않다면(show 클래스가 없다면) 보여주기
    showBasket()
  }
})

basketEl.addEventListener('click', function(event) {
  event.stopPropagation()     // '이벤트 버를링'이 basketEl가 최고단계
})


/* 검색 */
const headerEl = document.querySelector('header')
const searchWrapEl = document.querySelector('.search-wrap')
const searchStarterEl = document.querySelector('.search-starter')
const searchCloserEl = document.querySelector('.search-closer')
const searchShadowEl = document.querySelector('.shadow')

function showSearching() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
}
function hideSearching() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
}

searchStarterEl.addEventListener('click', showSearching)
searchCloserEl.addEventListener('click', hideSearching)
searchShadowEl.addEventListener('click', hideSearching)
