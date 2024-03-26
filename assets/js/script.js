let gameOver = true
let mots = ["horcruxe", "baguette", "potions", "poudlard"];
let motsSelec = "";
let motsCache = "";
let audioOne = new Audio("./assets/sounds/bruit.wav");
let audioTwo = new Audio("./assets/sounds/failure-synth.mp3");
let gagneContainer = document.querySelector("#gagne");
let perdu = `Vous avez perdu ... Le mot été ${motsCache}`;
let erreur = 0;
let bouton = document.querySelector("#rejoue");
let chars = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
let clavier = document.querySelector("#clavier");
bouton.addEventListener("click", () => {
  rejoue();
});
function cache() {
  gameOver = false
  motsCache = "";
  motsSelec = mots[randomize(0, mots.length - 1)];
  console.log(motsSelec);
  for (let i = 0; i < motsSelec.length; i++) {
    motsCache = motsCache + "_";
  }
  document.querySelector("#motsAdevine").textContent = motsCache;
}

function valide(para) {
  console.log("vjbjknkjn");
  let lettreUser = para.textContent.toLowerCase();
  let motInter = motsCache.split("");
  let finded = false;
  for (let i = 0; i < motsSelec.length; i++) {
    if (lettreUser == motsSelec[i]) {
      finded = true;
      motInter[i] = lettreUser;
      audioOne.play();
    }
  }
  if (finded == false) {
    erreur++;
    let image = document.createElement("img");
    image.src = `./assets/images/${erreur}.png`;
    document.querySelector("#imgContainer").innerHTML = "";
    document.querySelector("#imgContainer").appendChild(image);
  }
  motsCache = motInter.join("");
  console.log(motsCache);

  if (motsSelec === motsCache) {
    gagneContainer.innerHTML = `Félicitation vous avez trouvé le mot ${motsSelec}`;

    document.querySelector("#rejoue").classList.remove("hidden");
  } else if (erreur >= 11) {
    gagneContainer.textContent = `Vous avez perdu ... Le mot été ${motsSelec}`;
    document.querySelector("#containerGlobal").classList.add("hidden");
    audioTwo.play();
    bouton.classList.remove("hidden");
  }
  document.querySelector("#motsAdevine").textContent = motsCache;
}

function rejoue() {
  gagneContainer.textContent = "";
  erreur = 0;
  document.querySelector("#rejoue").classList.add("hidden");
  document.querySelector("#imgContainer").innerHTML = "";
  document.querySelector("#containerGlobal").classList.remove("hidden");

  cache();
}

function displayClavier() {
  chars.forEach((letter) => {
    let para = document.createElement("p");
    para.textContent = letter;
    clavier.appendChild(para);
    para.addEventListener("click", () => {
      if (gameOver == false) {
        valide(para);
      }
      
    });
  });
}
displayClavier();
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
