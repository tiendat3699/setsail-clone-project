
// dot pagination
function renderDotPagination(quantityItem, quantityItemInOnePage, data) {
    let PaginationDot = document.querySelector(`.pagination-dot[data="${data}"]`);
    let childsElementPagination = PaginationDot.children;
    let htmlDot = '';
    for(let i = 0; i < quantityItem/quantityItemInOnePage; i++) {
        htmlDot += `
        <div class="pagination-dot__item" index="${i}"></div>
        `;
    }
    PaginationDot.innerHTML = htmlDot;
    childsElementPagination[0].classList.add('pagination-dot__item--active'); 
}

function activeDotPagination(index, data, quantityItemInOnePage) {
    let PaginationDot = document.querySelector(`.pagination-dot[data="${data}"]`);
    let childsElementPagination = PaginationDot.children;
    let page = Math.floor(index / quantityItemInOnePage);
    for(let child of childsElementPagination) {
        child.classList.remove('pagination-dot__item--active');
    }
    childsElementPagination[page].classList.add('pagination-dot__item--active'); 
}

function addEventClickDotPagination (data, callback) {
    var Pagination = document.querySelector(`.pagination-dot[data="${data}"`);
    var childsPagination = Pagination.children;
    for(let i=0; i < childsPagination.length; i++) {
        childsPagination[i].addEventListener('click', function() {
            let index = +childsPagination[i].attributes.index.value;
            callback(index);
        });
    }
}

// slide show
var slideIndex = 1;
var slides = document.querySelectorAll('.slider');
var slidesLength = slides.length;
var timerSlider = null;

function showSlide(n) {
    slideIndex += n;
    if(slideIndex > slidesLength - 1) {
        slideIndex = 0;
    }
    if(slideIndex < 0) {
        slideIndex = slidesLength - 1;
    }
    for(let slide of slides) {
        slide.classList.remove('slider--show');
    }
    slides[slideIndex].classList.add('slider--show');
}

function loopSlideShow() {
    timerSlider = setInterval(function () {
        showSlide(1);
    }, 5000);
}

function handleNextSlideBtn(n) {
    showSlide(n)
    clearInterval(timerSlider);
    loopSlideShow();
}

////// Tour slide show
var rowOfTour = document.querySelector('.row-of-tour')
var colTourWidth = rowOfTour.querySelector('.col-tour').clientWidth;
var rowOfTourChildElementCount = rowOfTour.childElementCount;
var tourRatingPointItems = document.querySelectorAll('.tour-rating-point');
var tourRatingDescItems = document.querySelectorAll('.tour-rating-desc');
var tourRatingIconItems = document.querySelectorAll('.tour__rating-icon');
var timerTour = null;

var quantityItemInOnePageTour = function() {
    if(PC.matches)  return 4;
    else if(tablet.matches)  return 2;
    return 1;
}

function handleNextPageTour(index) {
    index *= quantityItemInOnePageTour();
    nextPageTour(index);
    clearInterval(timerTour);
    loopSlideTour(index);
} 

function nextPageTour(index=0) {
    rowOfTour.style.transform = `translateX(-${colTourWidth * index}px)`;
    activeDotPagination(index, 'tour', quantityItemInOnePageTour());
}

function loopSlideTour(index = 0) {
    timerTour = setInterval(function() {
        nextPageTour(index);
        index += 1;
        if(index > rowOfTourChildElementCount - 4) {
            index = 0;
        }
    }, 5000)
    rowOfTour.onmouseenter = function() {
        clearInterval(timerTour);
    }
    rowOfTour.onmouseleave = function() {
        loopSlideTour(index);
    }
    window.onresize = function() {
        colTourWidth = rowOfTour.querySelector('.col-tour').clientWidth;
        UpdateDotPagination(index);
        clearInterval(timerTour);
        loopSlideTour(index);
    }
}

function addRatingTour() {
    let defaultStyle = 'fas';
    let fullStar = 'fa-star';
    let halfStar = 'fa-star-half-alt';
    let emptyStar = 'far';

    for(let i=0; i < tourRatingPointItems.length; i++) {
        if(+tourRatingPointItems[i].innerText >= 7) {
            tourRatingIconItems[i].classList.add(fullStar);
            tourRatingDescItems[i].innerText = 'Superb';
        } else if(+tourRatingPointItems[i].innerText >= 5) {
            tourRatingIconItems[i].classList.add(halfStar);
            tourRatingDescItems[i].innerText = 'Good';
        } else {
            tourRatingIconItems[i].classList.replace(defaultStyle, emptyStar);
            tourRatingIconItems[i].classList.add(fullStar);
            tourRatingDescItems[i].innerText = 'Bad';
        }
    }
}

// video ads
var videoHolder = document.querySelector('.video__holder');
var videoLink = videoHolder.querySelector('.video__link');
var videoPlayerOverLay = document.querySelector('.video__play-overlay');
var videoPlayer = document.querySelector('.video__player');
var srcVideo = 'https://www.youtube.com/embed/5qap5aO4i9A';


videoLink.onclick = function(e) {
    e.preventDefault();
}

function handleShowVideoPlayer() {
    videoPlayerOverLay.style.display = 'flex';
    videoPlayerOverLay.style.opacity = '1'
    // videoPlayer.src = srcVideo;
}

function handleCloseVideoPlayer(e) {
    e.stopPropagation();
    videoPlayerOverLay.style.opacity = '0';
    setTimeout(function() {
        videoPlayerOverLay.style.display = 'none';
        videoPlayer.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
    }, 300);
}

videoHolder.onclick = handleShowVideoPlayer;
videoPlayerOverLay.onclick = handleCloseVideoPlayer;

// review
var rowOfReview = document.querySelector('.row-review');
var reviewItems = document.querySelectorAll('.review__item');
var reviewItemQuantity = reviewItems.length;
var colReviewWidth = document.querySelector('.col-review').clientWidth;
var timerReview = null;

var quantityItemInOnePageReview = function() {
    if(PC.matches) return 3;
    else if(tablet.matches) return 2;
    return 1;
}

function handleNextPageReview(index) {
    index *= quantityItemInOnePageReview();
    nextPageReview(index);
    clearInterval(timerReview);
    loopSlideReview(index);
} 

function nextPageReview(index=0) {
    rowOfReview.style.transform = `translateX(-${colReviewWidth * index}px)`;
    activeDotPagination(index, 'review', quantityItemInOnePageReview());
}

function loopSlideReview(index = 0) {
    timerReview = setInterval(function() {
        nextPageReview(index);
        index += quantityItemInOnePageReview();
        if(index > rowOfReview.childElementCount - 3) {
            index = 0;
        }
    }, 5000)
    rowOfReview.onmouseenter = function() {
        clearInterval(timerReview);
    }
    rowOfReview.onmouseleave = function() {
        loopSlideReview(index);
    }
    window.onresize = function() {
        UpdateDotPagination(index);
        clearInterval(timerReview);
        loopSlideReview(index);
    }
}

function addStarRatingReview() {
    let reviewRatingItems = document.querySelectorAll('.review__rating')
    for (let item of reviewRatingItems) {
        var htmlStarRating = ''
        var star = +item.attributes.star.value;
        for(let i = 0; i < star; i++) {
            htmlStarRating += `
            <i class="review__rating-icon fas fa-star"></i>
            `
        }
        item.innerHTML += htmlStarRating;
    }
}

function parallaxBackgroundReview() {
    let reviewContainer = document.querySelector('.review__container');
    window.addEventListener('scroll', function() {
        let offSet = this.window.scrollY;
        reviewContainer.style.backgroundPositionY = offSet * 0.03 + 'px';
    })
}


// counter number

var counterNumberItems = document.querySelectorAll('.counter__number');
var counterAlreadyFired = false;
function counter() {
    counterNumberItems.forEach(function(item) {
        let counterCount = 0;
        const speed = 50
        const counterValue = +item.innerText;
        const conunterStep = counterValue / speed;
        const countUp = function() {
            if(counterCount < counterValue) {
                counterCount += conunterStep;
                item.innerText = Math.ceil(counterCount);
                setTimeout(countUp, 30);
            } else {
                item.innerText = counterValue;
            }
        }
        countUp();
    });
}

function isCounterInViwePort(el) {
    var scroll = window.scrollY;
    var boundsTop = el.getBoundingClientRect().top + scroll;
    var viewPort = {
        top: scroll,
        bottom: scroll + window.innerHeight
    }
    var counterBounds = {
        top: boundsTop,
        bottom: boundsTop + el.clientHeight
    }
    return (counterBounds.top >= viewPort.top && 
            counterBounds.bottom <= viewPort.bottom)
}

function handleScroll() {
    counterNumberItems.forEach(function(item) {
        if(counterAlreadyFired === true) return;
        if(isCounterInViwePort(item)) {
            counter();
            counterAlreadyFired = true;
        }
        return;
    });
}

// subnav mobile
var navbarMobileItems = document.querySelectorAll('.header-mobile__navbar-item');
let subnavItems = document.querySelectorAll('.header-mobile__subnav');

function handleShowSubnavMobile(item, subnavItem, iconItem) {
    subnavItem.classList.add('header-mobile__subnav--active');
    iconItem.style.transform = 'rotate(90deg)';
    item.classList.add('header-mobile__navbar-item--hover');
}

function handleHideSubnavMobile(item, subnavItem, iconItem) {
    subnavItem.classList.remove('header-mobile__subnav--active');
    iconItem.style.transform = 'rotate(0)';
    item.classList.remove('header-mobile__navbar-item--hover');
}

navbarMobileItems.forEach(function(item) {
    let subnavItem = item.querySelector('.header-mobile__subnav');
    let iconItem = item.querySelector('.header-mobile__navbar-more')
    item.addEventListener('click', function() {
        if(subnavItem.classList.contains('header-mobile__subnav--active')) {
            handleHideSubnavMobile(item, subnavItem, iconItem);
            return
        }
        navbarMobileItems.forEach(function(item) {
            let subnavItem = item.querySelector('.header-mobile__subnav');
            let iconItem = item.querySelector('.header-mobile__navbar-more')
            handleHideSubnavMobile(item, subnavItem, iconItem);
        })
        handleShowSubnavMobile(item, subnavItem, iconItem)
    })
})

// modal
var switchLoginBtns = document.querySelectorAll('.switch-btn--login');
var switchRegisterBtns = document.querySelectorAll('.switch-btn--register');
switchLoginBtns.forEach(function(item) {
    item.addEventListener('click', function () {
        document.querySelector('.auth-form--login').classList.add('auth-form--active');
        document.querySelector('.auth-form--register').classList.remove('auth-form--active');
    })
})

switchRegisterBtns.forEach(function(item) {
    item.addEventListener('click', function () {
        document.querySelector('.auth-form--register').classList.add('auth-form--active');
        document.querySelector('.auth-form--login').classList.remove('auth-form--active');
    })
})

// start
const tablet = window.matchMedia('(min-width: 740px)');
const PC = window.matchMedia('(min-width: 1113px)');

function setUp() {
    slides[slideIndex].classList.add('slider--show');
}

function UpdateDotPagination(index) {
    colTourWidth = rowOfTour.querySelector('.col-tour').clientWidth;
    colReviewWidth = document.querySelector('.col-review').clientWidth;
    renderDotPagination(rowOfTourChildElementCount, quantityItemInOnePageTour(), 'tour');
    addEventClickDotPagination('tour', handleNextPageTour);
    renderDotPagination(reviewItemQuantity, quantityItemInOnePageReview(), 'review');
    addEventClickDotPagination('review', handleNextPageReview);
    nextPageReview(index);
    nextPageTour(index)
}

function star() {
    setUp()   
    renderDotPagination(rowOfTourChildElementCount, quantityItemInOnePageTour(), 'tour');
    addEventClickDotPagination('tour', handleNextPageTour);
    renderDotPagination(reviewItemQuantity, quantityItemInOnePageReview(), 'review');
    addEventClickDotPagination('review', handleNextPageReview);
    addStarRatingReview();
    parallaxBackgroundReview();
    loopSlideShow();
    loopSlideTour();
    loopSlideReview();
    addRatingTour()
    window.addEventListener('scroll', handleScroll);
}

star();