let gameArea = document.querySelector('.game-area')
let bubbles = []
let score = 0;
const AMOUNTOFBUBBLES = document.querySelector('.bubblesQuantity')
const SECONDS = document.querySelector('.seconds')
const START = document.querySelector('.start')
let started = false;
const PARAMS = {
    amountOfBubbles: 0,
    seconds: 0
};

START.addEventListener('click', (e) => {
    started = true;
    PARAMS.amountOfBubbles = +Math.abs(AMOUNTOFBUBBLES.value) + 1;
    PARAMS.seconds = +Math.abs(SECONDS.value) * 1000;
    startTheGame()
})


function createBubble(){
    let bubble = document.createElement('div')
    bubble.classList.add('bubble')
    bubble.setAttribute('value', 'activated')
    bubble.style.background = `radial-gradient(at 25% 25%, rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}) , rgb(0, 0, 0, 1))`
    return bubble
}

function bubbleDissapear(bubbleArray){
    setInterval(() =>{
        if(bubbleArray.length > 1){
         bubbleArray.shift().style.display = 'none'
        }
    },400)
}

function giveRandomSize(bubble){
    let ball = Math.random() * 300;

    if(ball < 20) ball *= 4 
    if(ball < 40) ball *= 2.4

    bubble.style.width = ball + 'px'
    bubble.style.height = ball + 'px'

    return ball
}

function setRandomPosition(bubble, ballSize){
    bubble.style.left = Math.random() * (900 - ballSize) + 'px' 
    bubble.style.top = Math.random() * (500 - ballSize) + 'px'
}

function endGame(count){
    let endText = document.createElement('p')
    endText.style.color = 'snow'
    endText.style.fontSize = '50px'
    endText.style.background = 'rgba(10,10,255,0.8)'
    endText.style.position = 'absolute'
    endText.style.top = '50%'
    endText.style.transform = 'translateY(-50%)'
    endText.textContent = `Among ${PARAMS.amountOfBubbles - 1} bubbles you have destroyed ${score} bubbles`
    if(count == PARAMS.amountOfBubbles){
        document.body.innerHTML = ""
        if(score >= PARAMS.amountOfBubbles / 2){
            let sound = new Audio('rick.mp3')
            document.body.append(sound)
            sound.volume = 0.5;
            sound.play()
             endAnimation('https://www.gifcen.com/wp-content/uploads/2022/11/rickroll-gif-9.gif')
        } else {
            let sound = new Audio('shout.mp3')
            document.body.append(sound)
            sound.play()
            sound.volume = 0.1;
            endAnimation('https://i.makeagif.com/media/12-04-2017/fdsF7-.gif')
        }
        document.body.append(endText)
    }    
}

function endAnimation(url){
    for(let i = 0; i < 59; i++){
        let endAnim = document.createElement('div')
        endAnim.classList.add('end-animation')
        endAnim.style.position = 'absolute'
        endAnim.style.width = 150+'px'
        endAnim.style.height = 150+'px'
        endAnim.style.left = Math.random() * (window.innerWidth - 150) +'px'
        endAnim.style.top = Math.random() * (window.innerHeight - 150) +'px'
        endAnim.style.zIndex = '-2'
        endAnim.style.background = `url(${url}) -56px 0/cover no-repeat`
        document.body.append(endAnim)
    }
}

function destroyinBubble(bubbles ,randomBubbleSize){
    bubbles.forEach((bubble) => {
        bubble.addEventListener("click", (e) => {
            //Запретить нажимать несколько раз на один и тот же объект и проигрывать звук 1 раз при нажатии нескольких раз
          if(bubble.getAttribute('value') == 'activated'){
              let explosion = new Audio("explosion.mp3");
              explosion.volume = 0.2;
              e.target.append(explosion);
              explosion.play();
              score++;
              bubble.setAttribute('value', 'diactivated');    
        }         

         //создание анимации при клике
          e.target.style.background = `url('https://i.gifer.com/origin/a0/a07ad08920f303f655251b1a0b353b86_w200.gif') center/${randomBubbleSize}px no-repeat`;
          setInterval(() => {
            e.target.style.display = "none"; // удаление элемента с экрана после определенного времени
          }, PARAMS.seconds * 1.3);

          bubbles.splice(bubbles.indexOf(e.target), 1); // убрать элемент из списка, чтобы небыло переполнения
        });
      });
}

function startTheGame() {
  if (started && PARAMS.seconds != 0 && PARAMS.amountOfBubbles != 0) {
    START.style.background = '#10b720' // ПОКАЗЫВАЕТ ЧТО ИГРА НАЧАЛАСЬ, кнопка загорается зеленым
    for (let i = 1; i <= PARAMS.amountOfBubbles; i++) {
      //GAME STARTS

      setTimeout(() => {
        let bubble = createBubble();
        giveRandomSize(bubble);
        
        let randomBubbleSize = giveRandomSize(bubble);
        setRandomPosition(bubble, randomBubbleSize);

        bubbles.push(bubble);
        gameArea.append(bubble);
        destroyinBubble(bubbles, randomBubbleSize);


        endGame(i);
      }, i * PARAMS.seconds);
    }
  } // МОжно добавить вывод на экран ЧТО НЕ ВВЕДЕНЫ ДАННЫЕ В ПОЛЯ
  
}

bubbleDissapear(bubbles)








    