// const scrollContainer = document.getElementById("js-scroll");

// scrollContainer.addEventListener("wheel", (evt) => {
//     evt.preventDefault();
//     scrollContainer.scrollLeft += evt.deltaY;
// });

(function () {
    init();

    var g_containerInViewport;
    function init() {
        setStickyContainersSize();
        bindEvents();
    }

    function bindEvents() {
        window.addEventListener("wheel", wheelHandler);
    }

    function setStickyContainersSize() {
        document.querySelectorAll('.js-sticky-container').forEach(function (container) {
            const stikyContainerHeight = container.querySelector('.js-scroll').scrollWidth;
            container.setAttribute('style', 'height: ' + stikyContainerHeight + 'px');
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= 0 && rect.bottom > document.documentElement.clientHeight;
    }

    function wheelHandler(evt) {

        const containerInViewPort = Array.from(document.querySelectorAll('.js-sticky-container')).filter(function (container) {
            return isElementInViewport(container);
        })[0];

        if (!containerInViewPort) {
            return;
        }

        var isPlaceHolderBelowTop = containerInViewPort.offsetTop < document.documentElement.scrollTop;
        var isPlaceHolderBelowBottom = containerInViewPort.offsetTop + containerInViewPort.offsetHeight > document.documentElement.scrollTop;
        let g_canScrollHorizontally = isPlaceHolderBelowTop && isPlaceHolderBelowBottom;

        if (g_canScrollHorizontally) {
            containerInViewPort.querySelector('.js-scroll').scrollLeft += evt.deltaY;
        }
    }
})();

var body = document.getElementsByClassName('js-scroll')[0];
body.style.backgroundColor = '#F5834F';

// trigger this function every time the user scrolls
window.onscroll = function (event) {
    var scroll = window.pageYOffset;
    if (scroll < 800) {
        // green
        body.style.backgroundColor = "#F5834F";
    } else if (scroll >= 800 && scroll < 1500) {
        // yellow
        body.style.backgroundColor = '#39A5EC';
    } else {
        // blue
        body.style.backgroundColor = '#A6D48C';
    }
}