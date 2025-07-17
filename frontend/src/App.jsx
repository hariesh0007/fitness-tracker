import React, { useState, useEffect, useRef } from "react";
import BmiCalculator from "./components/BmiCalculator";
import FatCalculator from "./components/FatCalculator";
import Workouts from "./components/Workouts";
import WorkoutSplits from "./components/WorkoutSplits";
import CustomWorkouts from "./components/CustomWorkouts";
import CalorieMonitor from "./components/CalorieMonitor";
import DietPlan from "./components/DietPlan";
import UserProfile from "./components/UserProfile";
import ProgressChart from "./components/ProgressChart";
import AutoPlan from "./components/AutoPlan";
import WorkoutLogger from "./components/WorkoutLogger";
import ProgressPhotos from "./components/ProgressPhotos";
import SocialShare from "./components/SocialShare";
import Reminders from "./components/Reminders";
import SleepTracker from "./components/SleepTracker";
import Analytics from "./components/Analytics";
import WaterIntake from "./components/WaterIntake";
import Challenges from "./components/Challenges";
import Profiles from "./components/Profiles";
import AiTrainer from "./components/AiTrainer";
import "./App.css";

function App() {
  // States & localStorage sync
  const [profiles, setProfiles] = useState(
    () => JSON.parse(localStorage.getItem("profiles")) || [{ id: 1, name: "Default User" }]
  );
  const [currentProfile, setCurrentProfile] = useState(
    () => JSON.parse(localStorage.getItem("currentProfile")) || profiles[0]
  );
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => localStorage.setItem("profiles", JSON.stringify(profiles)), [profiles]);
  useEffect(() => localStorage.setItem("currentProfile", JSON.stringify(currentProfile)), [currentProfile]);
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Sample data for analytics
  const bmi = 22.5,
    fatPercentage = 18;
  const sleepRecords = [
    { date: "5/29/2025", hours: 7.5 },
    { date: "5/30/2025", hours: 6.8 },
  ];
  const workoutsLogged = [{ workoutName: "Chest Day", date: "5/29/2025" }];

  // Example calories data & goal for ProgressChart
  const caloriesData = [
    { date: "5/28/2025", calories: 1800 },
    { date: "5/29/2025", calories: 2000 },
    { date: "5/30/2025", calories: 1900 },
  ];
  const goalCalories = 2000;

  const getAnalytics = () => {
    const messages = [];
    if (bmi < 18.5) messages.push("You are underweight. Consider gaining muscle mass.");
    else if (bmi > 24.9) messages.push("You are overweight. Consider adjusting your diet.");
    else messages.push("Your BMI is normal. Keep maintaining a balanced lifestyle!");

    if (fatPercentage < 10) messages.push("Body fat is very low. Ensure you're not under-fueling.");
    else if (fatPercentage > 25) messages.push("Body fat is high. Consider a fat loss routine.");
    else messages.push("Body fat percentage looks good!");

    const avgSleep =
      sleepRecords.reduce((acc, r) => acc + r.hours, 0) / sleepRecords.length;
    if (avgSleep >= 7) messages.push("Great sleep habits! Keep it up.");
    else messages.push("Try to improve sleep quality and duration.");

    messages.push(
      workoutsLogged.length > 0
        ? `You have logged ${workoutsLogged.length} workouts. Consistency is key!`
        : "Try logging workouts to track your fitness!"
    );

    return messages;
  };

  const analyticsMessages = getAnalytics();

  // Scroll refs for navigation
  const scrollRefs = {
    dashboard: useRef(null),
    workouts: useRef(null),
    calories: useRef(null),
    progress: useRef(null),
    settings: useRef(null),
  };

  const scrollTo = (section) => {
    scrollRefs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={darkMode ? "app-container dark-mode" : "app-container"}>
     
      <aside className="sidebar">
        <h2>Fitness Tracker</h2>
        <nav>
          <ul>
            <li onClick={() => scrollTo("dashboard")}>Dashboard</li>
            <li onClick={() => scrollTo("workouts")}>Workouts</li>
            <li onClick={() => scrollTo("calories")}>Calorie Monitor</li>
            <li onClick={() => scrollTo("progress")}>Progress</li>
            <li onClick={() => scrollTo("settings")}>Settings</li>
          </ul>
        </nav>
        <button className="mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </aside>

      
      <main className="main-content">
        <header className="app-header">
          <h1>🏋️ Fitness Tracker - {currentProfile?.name}</h1>
        </header>

        
        <div className="top-area" ref={scrollRefs.dashboard}>
          <section className="user-profile-section">
            <UserProfile />
          </section>

          <section className="indicators-section">
            <div className="indicator-card">
              <BmiCalculator />
            </div>
            <div className="indicator-card">
              <FatCalculator />
            </div>
          </section>
        </div>

        
        <div className="main-sections-grid">
          <section ref={scrollRefs.workouts} className="card workouts-section">
            <Workouts bmi={bmi} fatPercent={fatPercentage} />
            <WorkoutSplits />
            <CustomWorkouts />
            <WorkoutLogger />
            <SocialShare />
            <Reminders />
            <SleepTracker />
          </section>

          <section ref={scrollRefs.calories} className="card calories-section">
            <CalorieMonitor />
            <DietPlan />
          </section>

          <section ref={scrollRefs.progress} className="card progress-section">
            {caloriesData && caloriesData.length > 0 ? (
              <ProgressChart caloriesData={caloriesData} goalCalories={goalCalories} />
            ) : (
              <p style={{ textAlign: "center", padding: 20 }}>
                No calories data available to show progress chart.
              </p>
            )}
            <ProgressPhotos />
            <WaterIntake />
            <Challenges />
          </section>

          <section ref={scrollRefs.settings} className="card settings-section">
            <Profiles
              currentProfile={currentProfile}
              setCurrentProfile={setCurrentProfile}
              profiles={profiles}
              setProfiles={setProfiles}
            />
            <Analytics
              bmi={bmi}
              fatPercentage={fatPercentage}
              sleepRecords={sleepRecords}
              workoutsLogged={workoutsLogged}
            />
          </section>
        </div>

        <section style={{ marginTop: 40 }}>
          <AiTrainer
            bmi={bmi}
            fatPercentage={fatPercentage}
            sleepRecords={sleepRecords}
            workoutsLogged={workoutsLogged}
            currentProfile={currentProfile}
          />
        </section>

        
        <section className="card analytics-footer" style={{ marginTop: 40 }}>
          <h2>📊 Advanced Analytics & Suggestions</h2>
          <ul>
            {analyticsMessages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </section>

        <footer style={{ marginTop: 40, borderTop: "2px solid #ddd", paddingTop: 20 }}>
          <AutoPlan />
        </footer>
      </main>
    </div>
  );
}

export default App;
