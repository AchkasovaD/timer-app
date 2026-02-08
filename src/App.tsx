import React, { useState } from "react";
import "./App.css";
import { MainScreen } from "./components/MainScreen/MainScreen";
import { QuestionScreen } from "./components/QuestionScreen/QuestionScreen";
import { TimerScreen } from "./components/TimerScreen/TimerScreen";
import { ResultScreen } from "./components/ResultScreen/ResultScreen";
import crossIcon from "./assets/images/cross.svg";
import heardIcon from "./assets/images/heart-logo-res.svg";

type AppScreen = "main" | "question" | "timer" | "result";

function App() {
  const [screenState, setScreenState] = useState<AppScreen>("main");
  const [timerDuration, setTimerDuration] = useState<number>(25); // значение по умолчанию

  const handleSetDuration = (minutes: number) => {
    setTimerDuration(minutes);
  };

  const renderScreen = () => {
    switch (screenState) {
      case "main":
        return (
          <MainScreen
            onStateChange={(state: string) =>
              setScreenState(state as AppScreen)
            }
          />
        );
      case "question":
        return (
          <QuestionScreen
            onStateChange={(state: string) =>
              setScreenState(state as AppScreen)
            }
            onSetDuration={handleSetDuration}
          />
        );
      case "timer":
        return (
          <TimerScreen
            onStateChange={(state: string) =>
              setScreenState(state as AppScreen)
            }
            duration={timerDuration}
          />
        );
      case "result":
        return (
          <ResultScreen
            onStateChange={(state: string) =>
              setScreenState(state as AppScreen)
            }
          />
        );
      default:
        return (
          <MainScreen
            onStateChange={(state: string) =>
              setScreenState(state as AppScreen)
            }
          />
        );
    }
  };

  const crossClick = () => {
    setScreenState("main");
  };

  return (
    <div className="App">
      <header className="App-header">
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={`header-${index}`}
            className="Header-icons"
            src={heardIcon}
            alt="heart-icon"
          />
        ))}
        <a onClick={crossClick} style={{ cursor: "pointer" }}>
          <img className="Header-icons" src={crossIcon} alt="cross-icon" />
        </a>
      </header>
      <main>{renderScreen()}</main>
      <footer className="App-footer">
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            key={`footer-${index}`}
            className="Header-icons"
            src={heardIcon}
            alt="heart-icon"
          />
        ))}
      </footer>
    </div>
  );
}

export default App;
