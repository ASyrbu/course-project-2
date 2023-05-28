function Carousel(){
    this.container = document.querySelector('#carousel');
    this.slides = this.container.querySelectorAll('.slide');
    this.indicatorContainer = this.container.querySelector('#indicators-container');
    this.indicatorItems = this.container.querySelectorAll('.indicator');
    this.pauseButton = this.container.querySelector('#pause-btn');
    this.previousButton = this.container.querySelector('#previous-btn');
    this.nextButton = this.container.querySelector('#next-btn ');
    
this.SLIDES_LENGTH = this.slides.length;
this.CODE_ARROW_LEFT = 'ArrowLeft';
this.CODE_ARROW_RIGHT = 'ArrowRight';
this.CODE_SPACE = 'Space';
this.FA_PAUSE='<i class="fas fa-pause-circle"></i>';
this.FA_PLAY = '<i class="fas fa-play-circle"></i>'
    
this.currentSlide = 0; 
this.isPlaying = true;
this.interval = 2000;
}

Carousel.prototype={
gotoSlide(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    this.currentSlide= (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicatorItems[this.currentSlide].classList.toggle('active');
    },
        gotoNext(){
        this.gotoSlide(this.currentSlide + 1);
    },
    
     gotoPrev(){
        this.gotoSlide(this.currentSlide - 1);
    },
    
     tick(){
    this.timerId = setInterval(() => this.gotoNext(),this.interval);    
    
    },
    
     pauseHandler(){
        if(this.isPlaying){
        clearInterval(this.timerId);
        this.pauseButton.innerHTML = this.FA_PLAY;
        this.isPlaying=false;
        }
    },
    
     playHandler(){
        this.tick();
        this.pauseButton.innerHTML= this.FA_PAUSE;
        this.isPlaying = true;
    },
    
     pauseplayhandler() {
        if (this.isPlaying){
            this.pauseHandler();
        }else{
            this.playHandler();
        }
    },
    
     nexthandler(){
        this.gotoNext();
        this.pauseHandler();
    },
    
     previoushandler(){
        this.gotoPrev();
        this.pauseHandler();
    },
    
     indicate(e){
        const target = e.target;
    
    if(target && target.classList.contains('indicator')){
        this.pauseHandler();
        this.gotoSlide(+target.dataset.slideTo);
    }
    },
    
     pressKey(e){
    console.log(e);
    if (e.code === this.CODE_SPACE) this.pauseplayhandler();
    if (e.code === this.CODE_ARROW_RIGHT) this.nexthandler();
    if (e.code === this.CODE_ARROW_LEFT) this.previoushandler();
    },
    
     swipeStart(e){
        this.startPosX = e instanceof MouseEvent 
    ? e.pageX 
    : e.changedTouches[0].pageX;
    },
    
     swipeEnd(e){
        this.endPosX = e instanceof MouseEvent 
    ? e.pageX 
    : e.changedTouches[0].pageX;
    
       if(this.endPosX - this.startPosX > 100)this.previoushandler();
       if(this.endPosX - this.startPosX < -100)this.nexthandler();
    },
    
     initListeners(){
        this.pauseButton.addEventListener('click',this.pauseplayhandler.bind(this));
        this.nextButton.addEventListener('click',this.nexthandler.bind(this));
        this.previousButton.addEventListener('click',this.previoushandler.bind(this));
        this.indicatorContainer.addEventListener('click',this.indicate.bind(this));
        this.container.addEventListener('touchstart', this.swipeStart.bind(this));
        this.container.addEventListener('mousedown', this.swipeStart.bind(this));
        this.container.addEventListener('mouseup', this.swipeEnd.bind(this));
        this.container.addEventListener('touchend', this.swipeEnd.bind(this));
        document.addEventListener('keydown',this.pressKey.bind(this));
    },
    
     init(){
        this.initListeners();
        this.tick();
    }
};

Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();

carousel.init();