
class Carousel {
    constructor(containerID = '#carousel',slideID = '.slide',interval = 5000,isPlaying = false){

    this.container = document.querySelector(containerID);
    this.slideItems = this.container.querySelectorAll(slideID);

    this.SLIDES_LENGTH = this.slideItems.length;
    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE='<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fa-solid fa-caret-left"></i>';
    this.FA_NEXT = '<i class="fa-solid fa-caret-right"></i>';
        
    this.currentSlide = 0; 
    this.isPlaying = true;
    this.interval = interval;

    }
    _initControls(){
        const controls = document.createElement('div');

        const PAUSE = `<div id="pause-btn" class="control control-pause">${this.FA_PAUSE}</div>`;
        const PREV = `<div id="previous-btn" class="control control-previous">${this.FA_PREV}</div>`;
        const NEXT = `<div id="next-btn" class="control control-next">${this.FA_NEXT}</div>`;
        
        controls.setAttribute('id','controls-container');
        controls.setAttribute('class','controls');
        controls.innerHTML = PAUSE + PREV + NEXT;

        this.container.append(controls);

        this.pauseButton = this.container.querySelector('#pause-btn');
        this.previousButton = this.container.querySelector('#previous-btn');
        this.nextButton = this.container.querySelector('#next-btn ');
    }

    _initIndicators(){
        const indicators = document.createElement('div'); 

        indicators.setAttribute('id','indicators-container');
        indicators.setAttribute('class','indicators');

        for (let i =0 ;i < this.SLIDES_LENGTH; i++) {
          const indicator = document.createElement('div');

          indicator.setAttribute('class', i === 0 ?'indicator active' : 'indicator');
          indicator.dataset.slideTo= `${i}`;

          indicators.append(indicator);
}

this.container.append(indicators);

        this.indicatorContainer = this.container.querySelector('#indicators-container');
        this.indicatorItems = this.container.querySelectorAll('.indicator');
    }

    _initListeners(){
        this.pauseButton.addEventListener('click',this._pausePlayHandler.bind(this));
        this.nextButton.addEventListener('click',this.nexthandler.bind(this));
        this.previousButton.addEventListener('click',this.previoushandler.bind(this));
        this.indicatorContainer.addEventListener('click',this._indicate.bind(this));
        this.container.addEventListener('mouseenter',this._pauseHandler.bind(this));
        this.container.addEventListener('mouseleave',this._playHandler.bind(this));
        document.addEventListener('keydown',this._pressKey.bind(this));
    }

_gotoSlide(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide= (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    }
        _gotoNext(){
        this._gotoSlide(this.currentSlide + 1);
    }
    
     _gotoPrev(){
        this._gotoSlide(this.currentSlide - 1);
    }
    
     _tick(){
    this.timerId = setInterval(() => this._gotoNext(),this.interval);    
    
    }
    
     _pauseHandler(){
        if(this.isPlaying){
        clearInterval(this.timerId);
        this.pauseButton.innerHTML = this.FA_PLAY;
        this.isPlaying=false;
        }
    }
    
     _playHandler(){
        if(!this.isPlaying){
            this._tick();
            this.pauseButton.innerHTML= this.FA_PAUSE;
            this.isPlaying = true;
        }

    }
    
     _pausePlayHandler() {
        if (this.isPlaying){
            this._pauseHandler();
        }else{
            this._playHandler();
        }
    }
        
     _indicate(e){
        const target = e.target;
    
    if(target && target.classList.contains('indicator')){
        this._pauseHandler();
        this._gotoSlide(+target.dataset.slideTo);
    }
    }
    
     _pressKey(e){
    console.log(e);
    if (e.code === this.CODE_SPACE) this._pausePlayHandler();
    if (e.code === this.CODE_ARROW_RIGHT) this.nexthandler();
    if (e.code === this.CODE_ARROW_LEFT) this.previoushandler();
    }

    nexthandler(){
        this._gotoNext();
        this._pauseHandler();
    }
    
     previoushandler(){
        this._gotoPrev();
        this._pauseHandler();
    }
    
     init(){
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this._tick();
    }
};

Carousel.prototype.constructor = Carousel;



export default Carousel;