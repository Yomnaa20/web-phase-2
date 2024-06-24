const questions = [
    {
      question:
        "Do you follow digital marketing blogs or news sources to stay updated?",
      id: 1,
    },
  
    {
      question:
        "Have you ever posted content on social media to attract customers?",
      id: 1,
    },
  
    {
      question: "Do you enjoy exploring different digital marketing channels?",
      id: 1,
    },
  
    {
      question: "Do you think logos and slogans are important for businesses?",
      id: 2,
    },
  
    {
      question:
        "Do you believe a strong brand can help a company charge higher prices for its products?",
      id: 2,
    },
  
    {
      question:
        "Have you ever noticed how certain colors or designs affect your perception of a brand?",
      id: 2,
    },
  
    {
      question: "Do you prefer teamwork over individual work?",
      id: 3,
    },
  
    {
      question: "Do you have good communication skills?",
      id: 3,
    },
  
    {
      question: "Do you like doing presentations in front of a crowd?",
      id: 3,
    },
  ];
  
  const questionElement = document.getElementById("question");
  const yesButton = document.getElementById("yes-btn");
  const noButton = document.getElementById("no-btn");
  const nextButton = document.getElementById("next-btn");
  
 

  let currentQuestionIndex = 0;
  let pr = 0;
  let digital = 0;
  let branding = 0;
  let n = 0;
  
  function showScore() {
    if (currentQuestionIndex === questions.length) {
      nextButton.style.display = "block";
      let result = "";
      if (pr > digital && pr > branding) {
        result = "We recommend 'Managing Social Media with Public Relations' courses for you";
      } else if (pr < digital && digital > branding) {
        result = "We recommend 'Marketing Fundamentals: Discover The 5 Marketing Pillars' course for you";
      } else if (pr < branding && digital < branding) {
        result = "We recommend 'Intro to Branding' course for you";
      } 
      else if (pr == 0 && digital == 0 && branding == 0) {
        result =
          "We see this major doesn't match with your interests, You can view more majors on our website";
      }
      else if (digital==pr && branding==pr) {
        result = "We see you have equal interests in this major! feel free to choose any course";
      } 
      else if (digital==branding) {
        result = "We suggest 'Marketing Fundamentals: Discover The 5 Marketing Pillars' or 'Intro to Branding' courses for you";
      } 
      else if (branding==pr) {
        result = "We suggest 'Intro to Branding' or 'Managing Social Media with Public Relations' courses for you";
      }  
      else if (digital==pr) {
        result = "We suggest 'Marketing Fundamentals: Discover The 5 Marketing Pillars' or 'Managing Social Media with Public Relations' courses for you";
      } 
      
      questionElement.innerHTML = result;
      yesButton.style.display = "none";
      noButton.style.display = "none";
      nextButton.innerHTML = "Play Again";
    } 
    else {
      showQuestion();
    }
  }
  
  function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;
    nextButton.style.display = "none";
  }
  
  function handleAnswer(isCorrect) {
    if (isCorrect) {
      if (questions[currentQuestionIndex].id === 1) {
        digital++;
      } else if (questions[currentQuestionIndex].id === 2) {
        branding++;
      } else {
        pr++;
      }
    } else {
      n++;
    }
    currentQuestionIndex++;
    showScore();
  }
  
  yesButton.addEventListener("click", () => {
    handleAnswer(true);
  });
  
  noButton.addEventListener("click", () => {
    handleAnswer(false);
  });
  
  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex === questions.length) {
      currentQuestionIndex = 0;
      pr = 0;
      digital = 0;
      branding = 0;
      yesButton.style.display = "block";
      noButton.style.display = "block";
      showQuestion();
    } else {
      showQuestion();
    }
  });
  
  showQuestion();
  
  