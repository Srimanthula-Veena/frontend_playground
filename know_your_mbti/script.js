//constants
const homeScreen = document.getElementById("home-screen");
const testScreen = document.getElementById("test-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const questionText = document.getElementById("question-text");
const testAnswers = document.getElementById("answers-container");
const currentQuestion = document.getElementById("question-number");
const totalQuestions = document.getElementById("total-questions");
const mbtiCode = document.getElementById("mbti-code");
const mbtiDescription = document.getElementById("mbti-description");
const restartButton = document.getElementById("restart-button");
const progressBar = document.getElementById("progress");

const testQuestions = [
    {
        question: "At a party, you usually...",
        answers: [
            { text: "Talk to many people, including strangers", value: "E" },
            { text: "Stick with a few people you know", value: "I" }
        ]
    },
    {
        question: "A perfect weekend looks like...",
        answers: [
            { text: "Going out and doing things with others", value: "E" },
            { text: "Staying home and relaxing", value: "I" }
        ]
    },
    {
        question: "When faced with a challenge, you first...",
        answers:[
            { text: "Discuss it with others", value: "E" },
            { text: "Think it through privately", value: "I" }
        ]
    },
    {
        question: "When learning something new, you prefer...",
        answers: [
            { text:"Concrete facts and examples", value: "S" },
            { text:"Patterns and Possibilities", value: "N" }
        ]
    },
    {
        question: "You enjoy conversations about...",
        answers: [
            { text:"Real-life experiences, social affairs and practical matters", value: "S" },
            { text:"Abstract ideas and theories", value: "N" }
        ]
    },
    {
        question: "When starting a project, you usually...",
        answers: [
            { text:"Focus on what is known and proven", value: "S" },
            { text:"Explore creative approaches and alternatives", value: "N" }
        ]
    },
    {
        question: "In decision-making, you rely more on...",
        answers: [
            { text:"Objective facts and logic", value: "T" },
            { text:"Personal values and people's feelings", value: "F" }
        ]
    },
    {
        question: "In disagreements, you're more likely to...",
        answers: [
            { text:"Stand your ground and argue your point", value: "T" },
            { text:"Seek harmony and avoid conflict", value: "F" }
        ]
    },
    {
        question: "When giving feedback, you tend to...",
        answers: [
            { text:"Be direct and straightforward", value: "T" },
            { text:"Be tactful and considerate", value: "F" }
        ]
    },
    {
        question: "For a vacation, you prefer...",
        answers: [
            { text:"A well-planned itinerary with set activities", value: "J" },
            { text:"A flexible schedule with room for spontaneity", value: "P" }
        ]
    },
    {
        question: "When working on a project, you prefer...",
        answers: [
            { text:"Finishing tasks well before the deadline", value: "J" },
            { text:"Working best under flexibility and last-minute pressure", value: "P" }
        ]
    },
    {
        question: "Your schedule is usually...",
        answers: [
            { text:"Organized and planned out", value: "J" },
            { text:"Spontaneous and adaptable", value: "P" }
        ]
    }
];

const mbtiResults = {
    "ISTJ": {
        description: "The Logistician: Responsible, organized, and practical. You value tradition and loyalty.",
    },
    "ISFJ": {
        description: "The Defender: Caring, supportive, and reliable. You prioritize harmony and helping others.",
    },
    "INFJ": {
        description: "The Advocate: Insightful, idealistic, and compassionate. You seek meaning and purpose in life.",
    },
    "INTJ": {
        description: "The Architect: Strategic, analytical, and independent. You enjoy solving complex problems.",  
    },
    "ISTP": {
        description: "The Virtuoso: Practical, adventurous, and spontaneous. You enjoy hands-on activities and new experiences.",   
    },
    "ISFP": {
        description: "The Adventurer: Artistic, sensitive, and easygoing. You value personal freedom and self-expression.",     
    },
    "INFP": {
        description: "The Mediator: Idealistic, empathetic, and creative. You seek harmony and meaning in relationships.",
    },
    "INTP": {
        description: "The Logician: Analytical, curious, and independent. You enjoy exploring ideas and theories.", 
    },
    "ESTP": {   
        description: "The Entrepreneur: Energetic, outgoing, and pragmatic. You thrive in fast-paced environments and enjoy taking risks.",
    },
    "ESFP": {
        description: "The Entertainer: Spontaneous, fun-loving, and sociable. You enjoy being the center of attention and living in the moment.",   
    },      
    "ENFP": {
        description: "The Campaigner: Enthusiastic, creative, and sociable. You value authenticity and enjoy connecting with others.",   
    }, 
    "ENTP": {
        description: "The Debater: Quick-witted, curious, and outspoken. You enjoy intellectual challenges and debating ideas.",   
    },
    "ESTJ": {
        description: "The Executive: Organized, assertive, and practical. You value tradition and enjoy leading others.",   
    },
    "ESFJ": {
        description: "The Consul: Caring, social, and popular. You value harmony and enjoy helping others.",
    },
    "ENFJ": {
        description: "The Protagonist: Charismatic, inspiring, and empathetic. You enjoy leading and motivating others.",
    },
    "ENTJ": {
        description: "The Commander: Confident, strategic, and assertive. You enjoy taking charge and achieving goals.",
    }
};

const scores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0
};

let currentQuestionIndex = 0;
let answerDisabled = false;

totalQuestions.textContent = testQuestions.length;

//event listeners
startButton.addEventListener("click", startTest);
restartButton.addEventListener("click", restartTest);

function startTest() {
    currentQuestionIndex = 0;
    testScreen.classList.add("active");
    homeScreen.classList.remove("active");

    showQuestion();

}

function showQuestion() {
    console.log("Showing question " + (currentQuestionIndex + 1));
    answerDisabled = false;
    currentQuestion.textContent = currentQuestionIndex + 1;
    const currentQuestionData = testQuestions[currentQuestionIndex];
    const progressPercent = ((currentQuestionIndex) / testQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    questionText.textContent = currentQuestionData.question;
    testAnswers.innerHTML = "";

    currentQuestionData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-button");
        button.addEventListener("click", () => selectAnswer(answer.value));
        testAnswers.appendChild(button);
    });
}

function selectAnswer(value) {
    if (answerDisabled) return;
    scores[value]++;
    answerDisabled = true;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < testQuestions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 500);
}

function showResult() {
    testScreen.classList.remove("active");
    resultScreen.classList.add("active");

    const mbtiType =
        (scores.E >= scores.I ? "E" : "I") +
        (scores.S >= scores.N ? "S" : "N") +
        (scores.T >= scores.F ? "T" : "F") +
        (scores.J >= scores.P ? "J" : "P");

    mbtiCode.textContent = mbtiType;
    mbtiDescription.textContent = mbtiResults[mbtiType].description;
}

function restartTest() {
    for (let key in scores) {
        scores[key] = 0;
    }
    resultScreen.classList.remove("active");
    homeScreen.classList.add("active");
    currentQuestionIndex = 0;
    answerDisabled = false;
}