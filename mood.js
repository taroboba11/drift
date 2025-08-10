//moods + steps
const moods = {
  "Happy": [
    "Smile at yourself in the mirror.",
    "Listen to your favorite upbeat song.",
    "Share your happiness with a friend."
  ],
  "Sad": [
    "Take a few deep breaths.",
    "Write down your feelings.",
    "Reach out to someone you trust."
  ],
  "Stressed": [
    "Try a 2-minute breathing exercise.",
    "Take a short walk.",
    "List three things you're grateful for."
  ],
  "Tired": [
    "Close your eyes and rest for 5 minutes.",
    "Drink some water to refresh yourself.",
    "Do light stretching to re-energize.",
    "Step outside for fresh air.",
    "Plan an earlier bedtime tonight."
  ],
  "Overwhelmed": [
    "Pause and take deep breaths.",
    "Write down what’s on your mind.",
    "Prioritize just one task to start with.",
    "Say no to non-urgent requests.",
    "Take a 10-minute walk to reset."
  ],
  "Nervous": [
    "Practice slow, steady breathing.",
    "Visualize a calm, safe place.",
    "Speak positive affirmations to yourself.",
    "Loosen your muscles with light stretching.",
    "Prepare for what’s ahead with small steps."
  ],
  "Angry": [
    "Pause and count to ten.",
    "Write down what's making you angry.",
    "Do a quick physical activity."
  ],
  "Lonely": [
    "Reach out to a friend or family member.",
    "Join an online group with shared interests.",
    "Go to a public space like a park or café.",
    "Do something you enjoy by yourself.",
    "Adopt a small routine for daily connection."
  ],
  "Anxious": [
    "Breathe in for 4, hold 4, out for 6.",
    "Ground yourself by naming 5 things you see.",
    "Remind yourself that feelings pass.",
    "Avoid caffeine if you can.",
    "Listen to calming nature sounds."
  ],
  "Excited": [
    "Write down what you’re looking forward to.",
    "Share your excitement with a friend.",
    "Channel energy into preparation.",
    "Take a moment to breathe and stay present.",
    "Celebrate small wins."
  ],
  "Confused": [
    "Write down what you know so far.",
    "Ask someone for their perspective.",
    "Break the problem into smaller questions.",
    "Step away to clear your head.",
    "Come back with fresh eyes."
  ],
  "Inspired": [
    "Capture your ideas in writing.",
    "Create something immediately.",
    "Share your inspiration with someone.",
    "Seek out related content or art.",
    "Take a short walk to keep energy flowing."
  ],
  "Bored": [
    "Try a new hobby or small activity.",
    "Listen to music or a podcast.",
    "Change your environment.",
    "Read a short article or book chapter.",
    "Organize something small around you."
  ],
  "Grateful": [
    "Write down 3 things you appreciate.",
    "Tell someone you’re thankful for them.",
    "Do a small act of kindness.",
    "Take a photo of something beautiful.",
    "Reflect on positive changes in your life."
  ],
  "Hopeful": [
    "Set a small, achievable goal.",
    "Visualize a positive outcome.",
    "Read something uplifting.",
    "Spend time in nature.",
    "Write down your dreams for the future."
  ],
  "Guilty": [
    "Acknowledge your feelings honestly.",
    "Consider if an apology is needed.",
    "Forgive yourself and learn from it.",
    "Do something good for someone else.",
    "Focus on making better choices ahead."
  ],
  "Calm": [
    "Enjoy a moment of silence.",
    "Do slow, mindful breathing.",
    "Sip a warm drink.",
    "Stretch gently.",
    "Observe your surroundings without judgment."
  ],
  "Proud": [
    "Acknowledge your hard work.",
    "Share your achievement.",
    "Treat yourself to something nice.",
    "Help someone else succeed.",
    "Write down what you learned."
  ],
  "Relaxed": [
    "Listen to soothing music.",
    "Lie down and rest your body.",
    "Close your eyes and daydream.",
    "Do gentle stretches.",
    "Enjoy a warm drink or bath."
  ],
  "Motivated": [
    "Write down your main goal.",
    "Break it into smaller steps.",
    "Start with the easiest win.",
    "Eliminate distractions.",
    "Reward yourself for progress."
  ]
};

// populate the select dropdown
const moodSelect = document.getElementById('mood');
for (const mood in moods) {
  const option = document.createElement('option');
  option.value = mood;
  option.textContent = mood;
  moodSelect.appendChild(option);
}

//show steps based on selected mood
function showSteps() {
  const selectedMood = moodSelect.value;
  const stepsDiv = document.getElementById('stepsOutput');
  if (!selectedMood || !moods[selectedMood]) {
    stepsDiv.innerHTML = "<em>Please select a mood.</em>";
    return;
  }
  const steps = moods[selectedMood];
  stepsDiv.innerHTML = `<h2>${selectedMood} Steps</h2>` +
    steps.map((s, i) => `${i + 1}. ${s}`).join('<br>');
}