(function() {
const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorContainer = container.querySelector('#indicators-container');
const indicatorItems = container.querySelectorAll('.indicator');
const pauseButton = container.querySelector('#pause-btn');
const previousButton = container.querySelector('#previous-btn');
const nextButton = container.querySelector('#next-btn ');

const SLIDES_LENGTH = slides.length;
const CODE_ARROW_LEFT = 'ArrowLeft';
const CODE_ARROW_RIGHT = 'ArrowRight';
const CODE_SPACE = 'Space';
const FA_PAUSE='<i class="fas fa-pause-circle"></i>';
const FA_PLAY = '<i class="fas fa-play-circle"></i>'


let currentSlide = 0; 
let timerId = null;
let isPlaying = true;
let interval = 2000;
let startPosX = null;
let endPosX = null;

function gotoSlide(n) {
 slides[currentSlide].classList.toggle('active');
 indicatorItems[currentSlide].classList.toggle('active');
 currentSlide= (n + SLIDES_LENGTH) % SLIDES_LENGTH;
 slides[currentSlide].classList.toggle('active');
 indicatorItems[currentSlide].classList.toggle('active');
}

function gotoNext(){
    gotoSlide(currentSlide + 1);
}

function gotoPrev(){
    gotoSlide(currentSlide - 1);
}

function tick(){
    timerId = setInterval(gotoNext,interval);    

}

function pauseHandler(){
    if(isPlaying){
    clearInterval(timerId);
    pauseButton.innerHTML = FA_PLAY;
    isPlaying=false;
    }
}

function playHandler(){
    tick()
    pauseButton.innerHTML= FA_PAUSE;
    isPlaying = true;
}

function pauseplayhandler() {
    if (isPlaying){
pauseHandler();
    }else{
playHandler();
    }
}

function nexthandler(){
    gotoNext();
    pauseHandler();
}

function previoushandler(){
    gotoPrev();
    pauseHandler();
}

function indicate(e){
    const target = e.target;

if(target && target.classList.contains('indicator')){
    pauseHandler();
    console.log(target.getAttribute('data-slide-to'));
    gotoSlide(+target.dataset.slideTo);

}
}

function pressKey(e){
console.log(e);
if (e.code === CODE_SPACE) pauseplayhandler();
if (e.code === CODE_ARROW_RIGHT) nexthandler();
if (e.code === CODE_ARROW_LEFT) previoushandler();
}

function swipeStart(e){
startPosX = e instanceof MouseEvent 
? e.pageX 
: e.changedTouches[0].pageX;
}

function swipeEnd(e){
endPosX = e instanceof MouseEvent 
? e.pageX 
: e.changedTouches[0].pageX;

   if(endPosX - startPosX > 100)previoushandler();
   if(endPosX - startPosX < -100)nexthandler();
}

function initListeners(){

    pauseButton.addEventListener('click',pauseplayhandler);
    nextButton.addEventListener('click',nexthandler);
    previousButton.addEventListener('click',previoushandler);
    indicatorContainer.addEventListener('click',indicate);
    container.addEventListener('touchstart', swipeStart);
    container.addEventListener('mousedown', swipeStart);
    container.addEventListener('mouseup', swipeEnd);
    container.addEventListener('touchend', swipeEnd);
    document.addEventListener('keydown',pressKey);
}

function initApp(){
    tick();
    initListeners();
}

initApp();
}());