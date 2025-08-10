//questions
const quizData = [
  { q: "What's your ideal weekend vibe?", a: ["Chill at home", "Explore outdoors", "Hang out with friends", "Learn something new", "Get creative"] },
  { q: "Pick a favorite time of day:", a: ["Morning", "Afternoon", "Evening", "Late night"] },
  { q: "What’s your go-to drink?", a: ["Coffee", "Smoothie", "Tea", "Soda", "Water"] },
  { q: "How do you like to move?", a: ["Walking", "Dancing", "Team sports", "Yoga", "I prefer to relax"] },
  { q: "Pick a genre:", a: ["Pop", "Rock", "Hip Hop", "Classical", "Indie"] },
  { q: "What’s your social energy?", a: ["High!", "Medium", "Low", "Depends on the day"] },
  { q: "Favorite way to relax:", a: ["Read a book", "Watch TV", "Play games", "Meditate", "Listen to music"] },
  { q: "What inspires you most?", a: ["Nature", "Art", "Technology", "People", "Stories"] }
];

// results
const results = [
  { 
    caption: "Creative Spark", 


    img: "https://png.pngtree.com/background/20230612/original/pngtree-an-artist-making-a-painting-with-colorful-paint-brushes-picture-image_3187404.jpg", 
    desc: "You thrive when expressing yourself! Try painting, writing, or crafting something totally new." 
  },
  { 
     caption: "Nature Explorer", 
    img: "https://allthemountainsarecalling.com/wp-content/uploads/2020/10/matt-collamer-73I_KhnzxRQ-unsplash.jpg", 
    desc: "Fresh air fuels your soul. Go hiking, visit a park, or take a scenic walk.",
    imgStyle: "max-width:400px; height:auto;"
  },
  { 
    caption: "Social Butterfly", 
    img: "https://cdn.greenvelope.com/blog/wp-content/uploads/group-of-friends-playing-Jenga.jpeg", 
    desc: "You love connecting with others. Plan a game night or meet up with friends." 
  },
  { 
    caption: "Mindful Relaxer", 
    img: "https://wallpaperaccess.com/full/654400.jpg", 
    desc: "Peace and quiet help you recharge. Try meditation, gentle yoga, or a calming playlist." 
  },
  { 
    caption: "Adventurous Spirit", 
    img: "https://jetinternational.com/wp-content/uploads/2016/11/iStock-177708665-5.jpg", 
    desc: "You’re always ready for something new. Take a trip or find an activity in your area.",
    imgStyle: "max-width:250px; height:auto;" 
  },
  { 
    caption: "Knowledge Seeker", 
    img: "https://picjumbo.com/wp-content/uploads/girl-reading-a-book-at-home-2210x1473.jpg", 
    desc: "You’re curious and love to learn. Take a class, read up on something fascinating, or visit a museum." 
  }
];

// quiz variables
let currentQ = 0;
let score = [0, 0, 0, 0, 0, 0];

//start quiz
function startQuiz() {
  currentQ = 0;
  score = [0, 0, 0, 0, 0, 0];
  document.getElementById("result").innerHTML = "";
  loadQuestion();
}

//displeys question
function loadQuestion() {
  const quiz = document.getElementById("quiz");
  quiz.innerHTML = `
    <div class="question">
      <h3>${quizData[currentQ].q}</h3><br>
      ${quizData[currentQ].a.map((ans, i) => 
        `<button class="btn" onclick="selectAnswer(${i})">${ans}</button><br><br>`
      ).join("")}
    </div>
  `;
}

//select answer
function selectAnswer(i) {
  score[i % score.length]++;
  currentQ++;
  if (currentQ < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

//show result
function showResult() {
  const topScore = Math.max(...score);
  const resultIndex = score.indexOf(topScore);
  const result = results[resultIndex];
  document.getElementById("quiz").innerHTML = `<button class="btn" id="startBtn" onclick="startQuiz()">Restart Quiz</button> <br>`;
  document.getElementById("result").innerHTML = `
    <h2>${result.caption}</h2>
    <img src="${result.img}" alt="${result.caption}"${result.imgStyle ? ` style="${result.imgStyle}"` : ""}>
    <p>${result.desc}</p>
  `;
}