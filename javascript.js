// Get username from URL and display welcome message
const url = new URL(location.href);
const username = url.searchParams.get("username");
document.getElementById("welcome").innerText = `Welcome: ${username}`;

// Start button event listener
const startButton = document.getElementById("startbutton");
startButton.addEventListener("click", nowStart);

function nowStart() {
  // Remove start button and display username
  const startDiv = document.getElementById("divStart");
  startDiv.remove();
  document.getElementById("yourName").innerText = `Name: ${username}`;

  class Bird {
    constructor(top) {
      this.bird = document.createElement("img");
      this.type = ["../images/black.gif", "../images/white.gif", "../images/cyan.gif"];
      this.idx = Math.floor(Math.random() * 3);
      this.bird.src = this.type[this.idx];
      this.bird.style.position = "absolute";
      this.bird.style.width = "100px";
      this.bird.style.top = `${top}px`;
      this.bird.style.left = "-100px";
      Birds.container.append(this.bird);
    }

    start() {
      this.bird.addEventListener("click", () => {
        if (this.idx === 0)
          Birds.score += 10;
        else if (this.idx === 1)
          Birds.score += 5;
        else
          Birds.score -= 10;

        Birds.changeScore.innerText = `Score: ${Birds.score}`;
        this.bird.remove();
        Birds.changeKill.innerText = `Killed birds: ${++Birds.killed}`;
      });

      setInterval(() => {
        const leftPosition = parseInt(this.bird.style.left);
        if (leftPosition < window.innerWidth)
          this.bird.style.left = `${leftPosition + 20}px`;
        else
          this.bird.remove();
      }, 100);
    }
  }

  class Birds {
    static score = 0;
    static killed = 0;
    static container = document.getElementById("container");
    static changeScore = document.getElementById("score");
    static changeKill = document.getElementById("kill");

    static getScore() {
      return Birds.score;
    }
  }

  // Create birds at intervals
  const createBirdsInterval = setInterval(() => {
    const topPosition = Math.floor(Math.random() * 500 + 100);
    const bird = new Bird(topPosition);
    bird.start();
  }, 1000);

  // Timer function
  function timer() {
    let sec = 60;
    const timerInterval = setInterval(() => {
      document.getElementById('timerr').innerHTML = `Time: ${sec}`;
      sec--;
      if (sec < 0) {
        clearInterval(timerInterval);
        clearInterval(createBirdsInterval);
        document.getElementById("lastForm").style.display = "block";
        document.getElementById("container").remove();
        document.getElementById("appear").innerText = `Your score: ${Birds.getScore()}`;
        clearInterval(createBombInterval);
        document.getElementById("result").innerText = Birds.getScore() > 50 ? "You win" : "You lose";
      }
    }, 1000);
  }

  timer();

  // Create bomb at intervals
  const createBombInterval = setInterval(() => {
    const bombImg = document.createElement("img");
    bombImg.src = '../images/bomb.png';
    bombImg.style.position = "absolute";
    bombImg.style.width = "100px";
    bombImg.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    bombImg.style.top = "20px";
    document.body.append(bombImg);

    const moveBombInterval = setInterval(() => {
      let topPosition = parseInt(bombImg.style.top);
      if (topPosition <= window.innerHeight - 100)
        bombImg.style.top = `${topPosition + 10}px`;
      else {
        bombImg.remove();
        clearInterval(moveBombInterval);
      }
    }, 100);

    bombImg.addEventListener("click", () => {
      bombImg.src = '../images/boom.gif';
      setTimeout(() => {
        bombImg.style.display = "none";
      }, 300);

      const birds = document.querySelectorAll("img");
      const bombLeft = parseInt(bombImg.style.left);
      const bombTop = parseInt(bombImg.style.top);

      for (let bird of birds) {
        const birdLeft = parseInt(bird.style.left);
        const birdTop = parseInt(bird.style.top);

        if (
          birdLeft + bird.width >= bombLeft &&
          birdLeft <= bombLeft + bombImg.width &&
          birdTop + bird.height >= bombTop &&
          birdTop <= bombTop + bombImg.height
        ) {
          bird.click();
        }
      }
    });
  }, 14000);
}



















