//afirmations list
const affirmations = [
  "I am worthy of love and respect.",
  "I believe in myself and my abilities.",
  "Every day, I am growing stronger and wiser.",
  "I choose to focus on the good in my life.",
  "I am calm, peaceful, and centered.",
  "I deserve happiness and success.",
  "I am proud of who I am becoming.",
  "I attract positive energy and people.",
  "I am grateful for all that I have.",
  "I trust the process of life.",
  "I am confident and courageous.",
  "I handle challenges with grace and strength.",
  "My mind is clear and focused.",
  "I am open to new opportunities.",
  "I radiate kindness and compassion.",
  "I forgive myself and others easily.",
  "I am in control of my emotions.",
  "I am worthy of all good things.",
  "I am creative and full of ideas.",
  "I am surrounded by love and support.",
  "I believe in my dreams and goals.",
  "I am healthy, strong, and vibrant.",
  "I release fear and embrace love.",
  "I am patient with myself and others.",
  "I am worthy of success.",
  "I am becoming the best version of myself.",
  "I am grateful for my body and mind.",
  "I choose peace over worry.",
  "I am open to learning and growth.",
  "I am worthy of forgiveness.",
  "I am surrounded by positive people.",
  "I trust myself to make good decisions.",
  "I am resilient and bounce back quickly.",
  "I attract abundance in all areas of life.",
  "I am worthy of respect and kindness.",
  "I love and accept myself unconditionally.",
  "I am full of energy and enthusiasm.",
  "I embrace change and welcome growth.",
  "I am calm in stressful situations.",
  "I am a source of inspiration to others.",
  "I am worthy of love and kindness.",
  "I am proud of my achievements.",
  "I am deserving of rest and relaxation.",
  "I am surrounded by positive opportunities.",
  "I am worthy of good health.",
  "I am grateful for each new day.",
  "I am confident in my talents.",
  "I am open to giving and receiving love.",
  "I am worthy of peace and happiness.",
  "I believe in the power of positivity.",
  "I am kind to myself and others.",
  "I am in charge of how I feel.",
  "I am worthy of abundance.",
  "I attract success effortlessly.",
  "I am focused and determined.",
  "I am a magnet for positive energy.",
  "I choose joy in every moment.",
  "I am patient and understanding.",
  "I am worthy of achieving my goals.",
  "I am confident in who I am.",
  "I am grateful for my unique talents.",
  "I am worthy of happiness.",
  "I embrace my strengths and weaknesses.",
  "I am calm and relaxed throughout the day.",
  "I am open to new possibilities.",
  "I am worthy of love and friendship.",
  "I am proud of my progress.",
  "I am capable of overcoming challenges.",
  "I am filled with positive thoughts.",
  "I am worthy of kindness.",
  "I am a beacon of light and hope.",
  "I am grateful for my support system.",
  "I choose to see the best in others.",
  "I am worthy of respect and dignity.",
  "I am filled with gratitude and joy.",
  "I am deserving of success and prosperity.",
  "I am surrounded by love every day.",
  "I believe in my ability to succeed.",
  "I am calm and centered in difficult moments.",
  "I am worthy of self-care and compassion.",
  "I am open to abundance and joy.",
  "I am confident in my decisions.",
  "I am grateful for the lessons life teaches me.",
  "I am worthy of peace and calm.",
  "I am surrounded by positive energy.",
  "I am kind and compassionate to myself.",
  "I am worthy of joy and laughter.",
  "I am focused on my goals and dreams.",
  "I am open to growth and new experiences.",
  "I am proud of my resilience.",
  "I am deserving of love and acceptance.",
  "I am filled with hope and positivity.",
  "I am worthy of good things in life.",
  "I am calm and confident in every situation.",
  "I am open to healing and happiness.",
  "I am grateful for the present moment.",
  "I am worthy of love and happiness.",
  "I am confident in my unique path.",
  "I am surrounded by peace and calm.",
  "I am worthy of all the good life has to offer."
];

let history = [];
let currentIndex = null;

//shows 
function showAffirmation() {
  if (currentIndex !== null) {
    history.push(currentIndex);
  }
  currentIndex = Math.floor(Math.random() * affirmations.length);
  document.getElementById('affirmation').textContent = affirmations[currentIndex];
  updateButtons();
}

//reset
function clearAffirmation() {
  document.getElementById('affirmation').textContent = "Click the button for a positive thought!";
  currentIndex = null;
  history = [];
  updateButtons();
}

//shows previous
function showPrevious() {
  if (history.length > 0) {
    currentIndex = history.pop();
    document.getElementById('affirmation').textContent = affirmations[currentIndex];
  }
  updateButtons();
}

//updates button states
function updateButtons() {
  document.getElementById('prevBtn').disabled = history.length === 0;
}