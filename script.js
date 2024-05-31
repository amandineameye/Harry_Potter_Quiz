fetch("questions.json")
  .then((response) => response.json())
  .then((questions) => {
    const MODAL = document.getElementById("modal");
    const QUIZ_CONTAINER = document.getElementById("quiz-container");
    const SCORE_CONTAINER = document.getElementById("score-container");

    const GRYFFONDOR = document.getElementById("Gryffondor");
    const SERPENTARD = document.getElementById("Serpentard");
    const SERDAIGLE = document.getElementById("Serdaigle");
    const POUFSOUFFLE = document.getElementById("Poufsouffle");
    const CHOIXPEAU = document.getElementById("choixpeau");

    const NUMBER = document.getElementById("number");
    const QUESTION = document.getElementById("question");
    const OPTION1 = document.getElementById("option1");
    const OPTION2 = document.getElementById("option2");
    const OPTION3 = document.getElementById("option3");
    const OPTION4 = document.getElementById("option4");
    const RADIO_INPUTS = document.querySelectorAll("input[type=radio]");

    const MODAL_TEXT = document.getElementById("modal-text");
    const SCORE_TEXT = document.getElementById("score-text");

    const NEXT_BUTTON = document.getElementById("next-button");
    const RESTART = document.getElementById("restart");

    const SPEAKER = document.getElementById("speaker");
    const MUSIC = new Audio(
      "./audio/13. John Williams - Fawkes Is Reborn copy.mp3"
    );

    let house;
    let questionIndex = 0;
    let score = 0;

    GRYFFONDOR.addEventListener("click", () => {
      MODAL.classList.add("hidden");
      QUIZ_CONTAINER.classList.remove("hidden");
      QUIZ_CONTAINER.classList.add("gryffondor");
      house = "Gryffondor";
      MUSIC.play();
    });

    SERPENTARD.addEventListener("click", () => {
      MODAL.classList.add("hidden");
      QUIZ_CONTAINER.classList.remove("hidden");
      QUIZ_CONTAINER.classList.add("serpentard");
      house = "Serpentard";
      MUSIC.play();
    });

    SERDAIGLE.addEventListener("click", () => {
      MODAL.classList.add("hidden");
      QUIZ_CONTAINER.classList.remove("hidden");
      QUIZ_CONTAINER.classList.add("serdaigle");
      house = "Serdaigle";
      MUSIC.play();
    });

    POUFSOUFFLE.addEventListener("click", () => {
      MODAL.classList.add("hidden");
      QUIZ_CONTAINER.classList.remove("hidden");
      QUIZ_CONTAINER.classList.add("poufsouffle");
      house = "Poufsouffle";
      MUSIC.play();
    });

    CHOIXPEAU.addEventListener("click", () => {
      let randomNumber = Math.ceil(Math.random() * 4);

      switch (randomNumber) {
        case 1:
          QUIZ_CONTAINER.classList.add("gryffondor");
          house = "Gryffondor";
          MODAL_TEXT.innerText = house + " !";
          break;

        case 2:
          QUIZ_CONTAINER.classList.add("serpentard");
          house = "Serpentard";
          MODAL_TEXT.innerText = house + " !";
          break;

        case 3:
          QUIZ_CONTAINER.classList.add("serdaigle");
          house = "Serdaigle";
          MODAL_TEXT.innerText = house + " !";
          break;

        case 4:
          QUIZ_CONTAINER.classList.add("poufsouffle");
          house = "Poufsouffle";
          MODAL_TEXT.innerText = house + " !";
          break;

        default:
          console.log("Erreur au niveau du switch du chapeau");
      }

      setTimeout(() => {
        MODAL.classList.add("hidden");
        QUIZ_CONTAINER.classList.remove("hidden");
        MUSIC.play();
      }, 2000);
    });

    NUMBER.innerText = questions[questionIndex].number;
    QUESTION.innerText = questions[questionIndex].question;
    OPTION1.innerText = questions[questionIndex].options[0];
    OPTION2.innerText = questions[questionIndex].options[1];
    OPTION3.innerText = questions[questionIndex].options[2];
    OPTION4.innerText = questions[questionIndex].options[3];

    NEXT_BUTTON.addEventListener("click", () => {
  
      let checkedRadioButton = document.querySelector(
        "input[type=radio]:checked"
      );

      if (checkedRadioButton.value === questions[questionIndex].answer) {
        console.log("right answer");
        ++score;
      } else {
        console.log("false answer");
      }

      if (questionIndex < questions.length - 1) {

        RADIO_INPUTS.forEach((radioInput) => {
          radioInput.checked = false;
        });

        NUMBER.innerText = questions[questionIndex + 1].number;
        QUESTION.innerText = questions[questionIndex + 1].question;
        OPTION1.innerText = questions[questionIndex + 1].options[0];
        OPTION2.innerText = questions[questionIndex + 1].options[1];
        OPTION3.innerText = questions[questionIndex + 1].options[2];
        OPTION4.innerText = questions[questionIndex + 1].options[3];

        questionIndex++;

      } else {

        let scoreDialogue;

        switch (true) {
          case score < 2:
            scoreDialogue =
              score +
              " point sur 20 pour " +
              house +
              ". Un moldu ferait mieux!";
            break;
          case score < 10:
            scoreDialogue =
              score + " points sur 20 pour " + house + ". Même pas la moitié!";
            break;
          case score < 15:
            scoreDialogue =
              score + " points sur 20 pour " + house + ". Pas trop mal!";
            break;
          case score < 18:
            scoreDialogue =
              score + " points sur 20 pour " + house + ". Félicitations!";
            break;
          case score < 21:
            scoreDialogue =
              score +
              " points sur 20 pour " +
              house +
              ". Impressionnant! Tu es le véritable élu.";
            break;
          default:
            console.log("Erreur au niveau du switch score");
        }

        QUIZ_CONTAINER.classList.add("hidden");
        SCORE_CONTAINER.classList.remove("hidden");
        SCORE_TEXT.innerText = scoreDialogue;
      }
    });

    SPEAKER.addEventListener("click", () => {
      if (MUSIC.paused === true) {
        MUSIC.play();
        SPEAKER.src = "./images/en-sourdine.png";
      } else {
        MUSIC.pause();
        SPEAKER.src = "./images/monter-le-son.png";
      }
    });

    RESTART.addEventListener("click", () => {

      SCORE_CONTAINER.classList.add("hidden");
      MODAL.classList.remove("hidden");
      MODAL_TEXT.innerText =
        "Choisissez votre maison ou laissez le Choixpeau décider de votre sort";
      QUIZ_CONTAINER.classList.remove(
        "gryffondor",
        "serpentard",
        "poufsouffle",
        "serdaigle"
      );
      
      RADIO_INPUTS.forEach((radioInput) => {
        radioInput.checked = false;
      });

      score = 0;
      questionIndex = 0;

      NUMBER.innerText = questions[questionIndex].number;
      QUESTION.innerText = questions[questionIndex].question;
      OPTION1.innerText = questions[questionIndex].options[0];
      OPTION2.innerText = questions[questionIndex].options[1];
      OPTION3.innerText = questions[questionIndex].options[2];
      OPTION4.innerText = questions[questionIndex].options[3];
    });
  })
  .catch((error) =>
    console.error("Erreur lors du chargement des questions :", error)
  );
