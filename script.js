const apiKey = "97769e703a044d5686c20521260607";

const place = document.querySelector("#place");
const weather = document.querySelector("#weather");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const degree = document.querySelector("#degree");
const heat = document.querySelector("#heat");
const weatherIcon = document.querySelector("#weatherIcon");

const video = document.getElementById("bgVideo");

function setWeatherIcon(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("sun") || condition.includes("clear")) {
    weatherIcon.className = "fa-solid fa-sun";
    weatherIcon.style.color = "#FFD54F";
  } else if (condition.includes("cloud")) {
    weatherIcon.className = "fa-solid fa-cloud";
    weatherIcon.style.color = "#E0E0E0";
  } else if (condition.includes("rain")) {
    weatherIcon.className = "fa-solid fa-cloud-rain";
    weatherIcon.style.color = "#4FC3F7";
  } else if (condition.includes("drizzle")) {
    weatherIcon.className = "fa-solid fa-cloud-rain";
    weatherIcon.style.color = "#81D4FA";
  } else if (condition.includes("thunder")) {
    weatherIcon.className = "fa-solid fa-bolt";
    weatherIcon.style.color = "#FFD600";
  } else if (condition.includes("snow")) {
    weatherIcon.className = "fa-regular fa-snowflake";
    weatherIcon.style.color = "#ffffff";
  } else if (
    condition.includes("mist") ||
    condition.includes("fog") ||
    condition.includes("haze")
  ) {
    weatherIcon.className = "fa-solid fa-smog";
    weatherIcon.style.color = "#CFD8DC";
  } else {
    weatherIcon.className = "fa-solid fa-cloud-sun";
    weatherIcon.style.color = "#FFD54F";
  }
}

function setWeatherVideo(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("thunder")) {
    video.src = "./assets/thunderstorm.mp4";
  } else if (condition.includes("snow")) {
    video.src = "./assets/snow.mp4";
  } else if (condition.includes("sleet")) {
    video.src = "./assets/sleet.mp4";
  } else if (condition.includes("rain")) {
    video.src = "./assets/rain.mp4";
  } else if (condition.includes("drizzle")) {
    video.src = "./assets/drizzle.mp4";
  } else if (condition.includes("mist") || condition.includes("fog")) {
    video.src = "./assets/mist.mp4";
  } else if (condition.includes("overcast") || condition.includes("cloudy")) {
    video.src = "./assets/cloud.mp4";
  } else if (condition.includes("partly")) {
    video.src = "./assets/partly-cloudy.mp4";
  } else {
    video.src = "./assets/sunny.mp4";
  }

  video.load();
  video.play();
}

navigator.geolocation.getCurrentPosition(
  async (position) => {
    try {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=yes`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Unable to fetch weather.");
      }

      const data = await response.json();

      console.log(data);

      place.textContent = data.location.name;

      document.getElementById("state").textContent =
        `${data.location.region}, ${data.location.country}`;

      weather.textContent = data.current.condition.text;

      degree.textContent = `${Math.round(data.current.temp_c)}°C`;

      heat.textContent = `${Math.round(data.current.feelslike_c)}°C`;

      humidity.textContent = `${data.current.humidity}%`;

      wind.textContent = `${Math.round(data.current.wind_kph)} km/h`;

      setWeatherIcon(data.current.condition.text);
      setWeatherVideo(data.current.condition.text);
    } catch (error) {
      console.error(error);
      weather.textContent = "Unable to load weather";
    }
  },
  (error) => {
    console.error(error);

    alert("Please allow location access to view weather.");
  },
);

const main = document.querySelector(".main");
let todoSection = document.querySelector(".todo-section");
let plannerContainer = document.querySelector(".planner-container");
let quoteCard = document.querySelector(".quote-card ");
let pomodoroCard = document.querySelector(".pomodoro-card");
let goalsCard = document.querySelector(".goals-card");

document.querySelectorAll(".feature").forEach((btn) => {
  const featureVideo = btn.querySelector("video");

  btn.addEventListener("mouseenter", () => {
    featureVideo.style.display = "block";
    featureVideo.playbackRate = 4;
    featureVideo.play();
  });

  btn.addEventListener("mouseleave", () => {
    featureVideo.style.display = "none";
    featureVideo.pause();
    featureVideo.currentTime = 0;
  });

  btn.addEventListener("click", () => {
    main.style.display = "none";
    if (btn.classList.contains("todo")) {
      todoSection.style.display = "flex";
      plannerContainer.style.display = "none";
      quoteCard.style.display = "none";
      pomodoroCard.style.display = "none";
      goalsCard.style.display = "none";

    }
    if (btn.classList.contains("planners")) {
      plannerContainer.style.display = "flex";
      todoSection.style.display = "none";
      quoteCard.style.display = "none";
      pomodoroCard.style.display = "none";
      goalsCard.style.display = "none";

    }
    if (btn.classList.contains("quotes")) {
      quoteCard.style.display = "flex";
      todoSection.style.display = "none";
      plannerContainer.style.display = "none";
      pomodoroCard.style.display = "none";
      goalsCard.style.display = "none";

    }
    if (btn.classList.contains("pomodoro")) {
      pomodoroCard.style.display = "flex";
      quoteCard.style.display = "none";
      todoSection.style.display = "none";
      plannerContainer.style.display = "none";
      goalsCard.style.display = "none";
    }
     if(btn.classList.contains("goals")){
      goalsCard.style.display = "flex";
       pomodoroCard.style.display = "none";
      quoteCard.style.display = "none";
      todoSection.style.display = "none";
      plannerContainer.style.display = "none";
     }
  });
});

const time = document.getElementById("time");
const date = document.getElementById("date");
const day = document.getElementById("day");
const plannerDate = document.getElementById("plannerDate");
const plannerTime = document.getElementById("plannerTime");

function updateDateTime() {
  const now = new Date();
  let hours = now.getHours();

  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  time.innerHTML = `${hours}:${minutes}:${seconds} <span>${ampm}</span>`;
  plannerTime.innerHTML = `${hours}:${minutes}:${seconds} <span>${ampm}</span>`;
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  day.textContent = days[now.getDay()];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  date.textContent = `${String(now.getDate()).padStart(2, "0")} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;

  plannerDate.textContent = `${String(now.getDate()).padStart(2, "0")} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;
}

updateDateTime();

setInterval(updateDateTime, 1000);

let addTask = document.querySelector("#addTask");
let taskInput = document.querySelector("#taskInput");
let taskList = document.querySelector("#taskList");
let count = document.querySelector("#count");

let taskListArr = JSON.parse(localStorage.getItem("task")) || [];
let ui = () => {
  taskList.innerHTML = "";
  taskListArr.forEach((elem, index) => {
    taskList.innerHTML += `
        <li class="task">

    <p>${elem.task}</p>

    <div class="actions">

        <button onclick="markedImp(${elem.id})" class=" btns important ${elem.marked ? "active-imp" : ""}">
            <i class="fa-regular fa-star"></i>
        </button>

        <button onclick="completed(${elem.id})" class="btns complete ${elem.completed ? "active-complete" : ""}">
            <i class="fa-solid fa-check"></i>
        </button>

        <button onclick="deleteTask(${index})" class="btns delete">
            <i class="fa-solid fa-trash"></i>
        </button>

    </div>

</li>
        `;
  });
  count.innerHTML = taskListArr.length;
};

ui();

addTask.addEventListener("click", (e) => {
  console.log("click");
  let obj = {
    id: Date.now(),
    task: taskInput.value,
    marked: false,
    completed: false,
  };
  taskListArr.push(obj);
  localStorage.setItem("task", JSON.stringify(taskListArr));
  ui();
  taskInput.value = "";
});

let backBtn = document.querySelectorAll(".back-btn");

backBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.style.display = "block";
    todoSection.style.display = "none";
    plannerContainer.style.display = "none";
    quoteCard.style.display = "none";
    pomodoroCard.style.display = "none";
    goalsCard.style.display = "none";

  });
});

function markedImp(id) {
  taskListArr = taskListArr.map((task) => {
    if (task.id === id) {
      return { ...task, marked: !task.marked };
    }
    return task;
  });
  localStorage.setItem("task", JSON.stringify(taskListArr));
  ui();
}
function completed(id) {
  taskListArr = taskListArr.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  localStorage.setItem("task", JSON.stringify(taskListArr));
  ui();
}

function deleteTask(id) {
  taskListArr.splice(id, 1);
  localStorage.setItem("task", JSON.stringify(taskListArr));
  ui();
}

let newQuoteBtn = document.querySelector("#newQuoteBtn");
let quoteStatus = document.querySelector("#quoteStatus");
let quoteText = document.querySelector("#quoteText");
let quoteAuthor = document.querySelector("#quoteAuthor");

const loadQuotes = async () => {
  try {
    quoteStatus.textContent = "Loading....";

    const res = await fetch("https://dummyjson.com/quotes");
    const quoteData = await res.json();

    const quotesArray = quoteData.quotes;

    if (!quotesArray || quotesArray.length === 0) {
      throw new Error("quote not found...");
    }

    const randomQuote =
      quotesArray[Math.floor(Math.random() * quotesArray.length)];

    quoteText.textContent = `"${randomQuote.quote}"`;
    quoteAuthor.textContent = randomQuote.author
      ? `— ${randomQuote.author}`
      : "— Unknown";

    quoteStatus.textContent = "";
  } catch (error) {
    quoteText.textContent = "Keep going! Success is built on consistency 💪";
    quoteAuthor.textContent = "— Study Motivation";
    quoteStatus.textContent = "";
  }
};

newQuoteBtn.addEventListener("click", loadQuotes);
loadQuotes();

let timerDisplay = document.querySelector("#timerDisplay");
let startBtn = document.querySelector("#startBtn");
let pauseBtn = document.querySelector("#pauseBtn");
let resetBtn = document.querySelector("#resetBtn");
let timeOver = document.querySelector(".time-over");
let timerStatus = document.querySelector("#timerStatus");

let defaultValue = 25 * 60;
let leftValue = defaultValue;
let interval = null;
function updateTimer() {
  let min = Math.floor(leftValue / 60);
  let sec = leftValue % 60;

  timerDisplay.textContent = `${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`;
}

function pauseTimer() {
  if (pauseBtn.textContent === "Pause") {
    clearInterval(interval);
    interval = null;
    timerStatus.textContent = "paused.....";
    pauseBtn.textContent = "resume";
  } else {
    pauseBtn.textContent = "Pause";
    if (interval !== null) return;
    timerStatus.textContent = "Timer Running...";

    interval = setInterval(() => {
      if (leftValue > 0) {
        leftValue--;
        updateTimer();
      } else {
        clearInterval(interval);
        interval = null;
        timeOver.textContent = "Time over! 🎉";
      }
    }, 1000);
  }
}

startBtn.addEventListener("click", () => {
  if (interval !== null) return;
  timerStatus.textContent = "Timer Running...";
  interval = setInterval(() => {
    if (leftValue > 0) {
      leftValue--;
      updateTimer();
    } else {
      clearInterval(interval);
      interval = null;
      timeOver.textContent = "Time over! 🎉";
    }
  }, 1000);
});

function resetTimer() {
  clearInterval(interval);
  interval = null;
  leftValue = defaultValue;
  updateTimer();
  pauseBtn.textContent = "Pause";
  timerStatus.textContent = "Reset Done";
}

pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimer();



const planner = document.querySelectorAll(".planner-slot");

let planArr = JSON.parse(localStorage.getItem("plans")) ||[];

let planUI = ()=> {
    planArr.forEach((elem)=>{
       let id = elem.id;
       let input = document.querySelector(`#${id}`);
       input.value = elem.plan;
    })
}

planner.forEach((plan)=>{
  //  let save = plan.querySelector(".save");
   let clear = plan.querySelector(".clear");
   let input = plan.querySelector("input");
   input.addEventListener("input",()=>{
      let obj ={
        "id":input.id,
         "plan" : input.value,
      }
      planArr = planArr.map((elem)=>{
        if(elem.id == input.id) {
          return {...elem , "plan" : input.value};
        }
        return elem;
      });
      let findExist = planArr.some(elem=> elem.id === input.id);
      if(!findExist){
        planArr.push(obj);
      }
      localStorage.setItem("plans",JSON.stringify(planArr));
      planUI();
   });

   clear.addEventListener("click",()=>{
      let id = input.id;
      let index = planArr.findIndex((elem)=> elem.id === id);
      console.log(index);
      planArr.splice(index,1);
      localStorage.setItem("plans",JSON.stringify(planArr));
      input.value = "";
      planUI();
   });
});

planUI();

const goalList = document.querySelector("#goalList");
const addGoalBtn = document.querySelector("#addGoalBtn");
const goalInput = document.querySelector("#goalInput");
const completedG = document.querySelector(".completedG");
const totalG = document.querySelector(".totalG");


let goalArr = JSON.parse(localStorage.getItem("goals")) ||[];

let goalCount;
let total ;

function goalCounter(){
  goalCount = 0;
  total = 0;
     goalArr.forEach((elem)=>{
        if(elem.status === "completed"){
           goalCount++;
        }
        total++;
     })
    completedG.textContent = goalCount;
    totalG.textContent = total;
}

let goalUI = ()=> {
  goalList.innerHTML = "";
  goalArr.forEach((elem,index)=>{
     goalList.innerHTML += `
     <li class="goal-item">

    <div class="goal-left">

        <input
            type="checkbox"
            class="goal-check"
        data-id="${elem.id}"
    ${elem.checked ? "checked" : ""}>

        <div class="goal-details">

            <p class="goal-title">
                ${elem.goal}
            </p>

            <span class="goal-status ${elem.checked ? "goal-status-completed" : ""}">
              ${elem.checked ? "Completed ✔" : "In Progress"}
            </span>

        </div>

    </div>

    <button onclick= "deleteGoals(${index})" class="delete-goal">

        <i class="fa-solid fa-trash"></i>

    </button>

</li>
     `
  });
  goalCounter();
}



addGoalBtn.addEventListener("click", (e) => {
  console.log("click");
  let obj = {
    id: Date.now(),
    goal: goalInput.value,
    status: "In Progress",
    checked : false
  };
  goalArr.push(obj);
  localStorage.setItem("goals", JSON.stringify(goalArr));
  goalUI();
  goalInput.value = "";
});

goalUI();

function deleteGoals(index){
   goalArr.splice(index,1);
  localStorage.setItem("goals", JSON.stringify(goalArr));
  goalUI();
}

function completedGoals(id) {
    goalArr = goalArr.map(goal => {
        if (goal.id === id) {
            return {
                ...goal,
                checked: !goal.checked,
                status: !goal.checked?"completed":"In Progress"
            };
        }
        return goal;
    });
    localStorage.setItem("goals", JSON.stringify(goalArr));
    goalUI();
}

goalList.addEventListener("change", (e) => {

    if (!e.target.classList.contains("goal-check")) return;

    const id = Number(e.target.dataset.id);

    completedGoals(id);

});

let github = document.querySelector(".github");

github.addEventListener("click",()=>{
   window.open("https://github.com/kashish-56", "_blank");
})


const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("#toggle");

// Load saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.classList.replace("fa-moon", "fa-sun");
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeIcon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "light");
        video.src = "./assets/sunny.mp4";

    } else {

        themeIcon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "dark");
        video.src = "./assets/rain.mp4";
    }

});
