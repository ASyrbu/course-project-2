class Carousel {
  constructor(params) {

    const settings = { ...{ interval: 3000, containerID: '#carousel', slideID: '.slide', isPlaying: false }, ...params };

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.isPlaying = settings.isPlaying;
    this.interval = settings.interval;

    this.slidesContainer = document.querySelector('#slides');
  }

  _initProps() {
    this.SLIDES_COUNT = this.slideItems.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fa-sharp fa-regular fa-circle-pause"></i>';
    this.FA_PLAY = '<i class="fa-sharp fa-regular fa-circle-play"></i>';
    this.FA_PREV = '<i class="fa-sharp fa-regular fa-circle-left"></i>';
    this.FA_NEXT = '<i class="fa-sharp fa-regular fa-circle-right"></i>';

    this.currentSlide = 0;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<div id="pause-btn" class="control pause-play">
    <span id="fa-pause-icon">${this.FA_PAUSE}</span>
    <span id="fa-play-icon">${this.FA_PLAY}</span>
    </div>`;
    const PREV = `<span id="prev-btn" class="control prev">${this.FA_PREV}</span>`;
    const NEXT = `<span id="next-btn" class="control next">${this.FA_NEXT}</span>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.slidesContainer.append(controls);

    this.pauseBtn = this.container.querySelector('#pause-btn');
    this.prevBtn = this.container.querySelector('#prev-btn');
    this.nextBtn = this.container.querySelector('#next-btn');


    this.pauseIcon = this.container.querySelector('#fa-pause-icon');
    this.playIcon = this.container.querySelector('#fa-play-icon');

    this.isPlaying ? this._pauseVisible() : this._playVisible();

  }

  _initIndicators() {
    const indicators = document.createElement('div');

    indicators.setAttribute('class', 'indicators');

    for (let i = 0, n = this.SLIDES_COUNT; i < n; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', 'indicator');
      indicator.dataset.slideTo = `${i}`;
      i === 0 && indicator.classList.add('active');

      indicators.appendChild(indicator);
    };

    this.slidesContainer.appendChild(indicators);

    this.indContainer = this.container.querySelector('.indicators');
    this.indItems = this.container.querySelectorAll('.indicator');
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indContainer.addEventListener('click', this._indicate.bind(this));
    this.indContainer.addEventListener('mouseenter', this._pause.bind(this));
    this.container.addEventListener('mouseleave', this._play.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _goToNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indItems[this.currentSlide].classList.toggle('active');
  }

  _goToPrev() {
    this._goToNth(this.currentSlide - 1)
  }

  _goToNext() {
    this._goToNth(this.currentSlide + 1)
  }

  _tick(flag = true) {
    if (!flag) return;
    if (this.timerID) return;
    this.timerID = setInterval(() => this._goToNext(), this.interval);
  }

  _pause() {
    if (this.isPlaying) {
      this._playVisible();
      this.isPlaying = false;
      clearInterval(this.timerID);
      this.timerID = null;
    }
  }

  _play() {
    if (!this.isPlaying) {
      this._tick();
      this._pauseVisible();
      // this.pauseBtn.innerHTML = this.FA_PAUSE;
      this.isPlaying = true;
      // this.timerID = setInterval(() => this._goToNext(), this.interval);
    }
  }

  _indicate(e) {
    const target = e.target

    if (target && target.classList.contains('indicator')) {
      this._pause();
      this._goToNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }


  _pauseVisible(isVisible = true) {
    this.pauseIcon.style.opacity = isVisible ? 1 : 0;
    this.playIcon.style.opacity = !isVisible ? 1 : 0;

  }

  _playVisible() {
    this._pauseVisible(false);
  }

  pausePlay() {
    this.isPlaying ? this._pause() : this._play();
  }

  next() {
    this._pause();
    this._goToNext();
  }

  prev() {
    this._pause();
    this._goToPrev();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlaying);
    // if (this.isPlaying) this.timerID = setInterval(() => this._goToNext(), this.interval);
  }
}

export default Carousel;