/*  장바구니  */
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


/*  검색  */
const headerEl = document.querySelector('header')
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]  // 얕은 복사(전개 연산자 사용)
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]  // 배열로 복사

function showSearch() {
  headerEl.classList.add('searching')
  document.documentElement.classList.add('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'  // 요소마다 차등으로 delay를 변경하는 식
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {   // 0.6초 후에 실행되도록
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  document.documentElement.classList.remove('fixed')
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'  // 요소마다 차등으로 delay를 변경하는 식
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = ''
}

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', hideSearch)
searchShadowEl.addEventListener('click', hideSearch)


/* 요소의 가시성 관찰 */
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return 
    }
    entry.target.classList.add('show')
  })
})
const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})


/* 비디오 재생! */
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function () {
  video.play()
  playBtn.classList.add('hide')
  pauseBtn.classList.remove('hide')
})

pauseBtn.addEventListener('click', function () {
  video.pause()
  pauseBtn.classList.add('hide')
  playBtn.classList.remove('hide')
})
