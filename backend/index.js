const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());


const workouts = [
  { id: 1, name: 'Push-ups', caloriesBurned: 100 },
  { id: 2, name: 'Running', caloriesBurned: 300 }
];

const splits = {
  push: ['Bench Press', 'Shoulder Press', 'Triceps Dips'],
  pull: ['Deadlift', 'Pull-ups', 'Bicep Curls'],
  legs: ['Squats', 'Lunges', 'Leg Press']
};

const customWorkouts = [];
const calorieEntries = [];
const dietPlan = [
  { meal: 'Breakfast', food: 'Oats + Banana', calories: 350 },
  { meal: 'Lunch', food: 'Grilled Chicken + Rice + Veggies', calories: 600 },
  { meal: 'Dinner', food: 'Salad + Soup', calories: 400 }
];


app.get('/', (req, res) => res.send('Fitness Tracker Backend Running'));

app.get('/api/workouts', (req, res) => res.json(workouts));
app.get('/api/splits', (req, res) => res.json(splits));

app.post('/api/custom-workouts', (req, res) => {
  const { name, exercises } = req.body;
  customWorkouts.push({ id: customWorkouts.length + 1, name, exercises });
  res.json({ message: 'Custom workout added!' });
});

app.post('/api/calories', (req, res) => {
  const { date, calories } = req.body;
  calorieEntries.push({ date, calories });
  res.json({ message: 'Calorie data recorded!' });
});

app.get('/api/diet', (req, res) => res.json(dietPlan));

app.listen(port, () => console.log(`Backend listening on port ${port}`));
app.use(express.json());

app.post('/api/generate-plan', (req, res) => {
  const { fatPercent, weight, height, goalCalories } = req.body;

 
  let workoutPlan = [];
  let dietPlan = [];

  if (fatPercent > 25) {
    workoutPlan = ['Cardio 30 min', 'Full Body Strength 3x week'];
    dietPlan = [
      { meal: 'Breakfast', food: 'Oatmeal + fruit', calories: 350 },
      { meal: 'Lunch', food: 'Grilled chicken salad', calories: 500 },
      { meal: 'Dinner', food: 'Steamed veggies + fish', calories: 450 }
    ];
  } else {
    workoutPlan = ['Strength Training 4x week', 'HIIT 2x week'];
    dietPlan = [
      { meal: 'Breakfast', food: 'Egg whites + spinach', calories: 300 },
      { meal: 'Lunch', food: 'Turkey sandwich + salad', calories: 550 },
      { meal: 'Dinner', food: 'Quinoa + grilled chicken', calories: 500 }
    ];
  }

  res.json({ workoutPlan, dietPlan });
});
const workoutsLog = []; 

app.post('/api/log-workout', (req, res) => {
  const { date, workoutName, sets, reps, weight } = req.body;
  workoutsLog.push({ date, workoutName, sets, reps, weight });
  res.json({ message: 'Workout logged successfully' });
});

app.get('/api/workout-history', (req, res) => {
  res.json(workoutsLog);
});
const progressPhotos = [];

app.post('/api/upload-photo', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  
  progressPhotos.push({ filename: req.file.filename, uploadedAt: new Date() });

  res.json({ message: 'Photo uploaded', filename: req.file.filename });
});

app.get('/api/photos', (req, res) => {
  res.json(progressPhotos);
});


app.use('/uploads', express.static(uploadDir));


