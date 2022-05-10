import bellImage from "../../assets/images/bell.png";
import dragImage from "../../assets/images/drag.png";
import cycleImgae from "../../assets/images/repeat.png";
import longBreakImage from "../../assets/images/lunch-time.png";
import statsImage from "../../assets/images/stats.png";

export const pomodoroDetails = [
  {
    title: "Decide what you're going to do",
    description:
      "Pick a task that will take roughly 25-minutes to accomplish. Bigger tasks should be split into smaller chunks.",
  },
  {
    title: "Set a timer for 25 minutes.",
    description:
      "Get to work, and don't stop until the timer rings. Ignore any distractions or notifications from emails, texts, or the like. (You should really have everything silenced while you work.)",
  },
  {
    title: "When the timer rings, you've done one Pomodoro.",
    description:
      "Take a 5-minute break to clear your head. You can stretch, get coffee, or check social media. Basically, any of the things you're not allowed to do when you're working are now fair game. Use the timer to keep yourself honest.",
  },
  {
    title: "After a total of two Pomodoros, take a longer break.",
    description:
      "Somewhere between 15 and 30 minutes is normally right; it depends on how you feel. Grab lunch, read a book, or go for a quick walk.",
  },
  {
    title: "Start another Pomodoro cycle over again.",
    description: "Keep going until your work or study session is done.",
  },
];

export const featuresData = [
  {
    title: "Drag & Drop",
    description: "Drag n Drop the task once completed!",
    imgUrl: dragImage,
  },
  {
    title: "Automatic switch modes",
    description:
      "Once the timer for work mode starts, it automatically switches between work and short break for 2 cycles!",
    imgUrl: cycleImgae,
  },
  {
    title: "Long Break",
    description: "After a cycle, take a long break for refreshing the mind!",
    imgUrl: longBreakImage,
  },
  {
    title: "Alarm",
    description: "Alarm once a mode is switched",
    imgUrl: bellImage,
  },
  {
    title: "Statictics",
    description: "Coming soon ...",
    imgUrl: statsImage,
  },
];
