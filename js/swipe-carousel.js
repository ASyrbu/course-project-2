function SwipeCarousel() {
    Carousel.apply(this, arguments);
    this.slidesContainer = this.container.querySelector('.slides');
}

SwipeCarousel.prototype = Object.create(Carousel.prototype);
SwipeCarousel.prototype.constructor = SwipeCarousel;

SwipeCarousel.prototype._initListeners = function () {
    Carousel.prototype._initListeners.apply(this);
    this.slidesContainer.addEventListener('touchstart', this.swipeStart.bind(this));
    this.slidesContainer.addEventListener('mousedown', this.swipeStart.bind(this));
    this.slidesContainer.addEventListener('touchend', this.swipeEnd.bind(this));
    this.slidesContainer.addEventListener('mouseup', this.swipeEnd.bind(this));
};

SwipeCarousel.prototype.swipeStart = function (e) {
    this.startPosX = e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX;
};

SwipeCarousel.prototype.swipeEnd = function (e) {
    this.endPosX = e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX;

    if (this.endPosX - this.startPosX > 100) this.previoushandler();
    if (this.endPosX - this.startPosX < -100) this.nexthandler();
};
