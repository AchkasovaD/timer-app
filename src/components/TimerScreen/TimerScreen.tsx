import React, { useState, useEffect, useRef } from "react";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";
import { getRandomTrack } from "../../data/music";
import "./TimerScreen.css";

interface TimerScreenProps {
  onStateChange: (state: string) => void;
  duration: number; // Длительность таймера в минутах
}

export const TimerScreen: React.FC<TimerScreenProps> = ({
  onStateChange,
  duration,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // в секундах
  const [isRunning, setIsRunning] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(() => getRandomTrack());

  const videoRef = useRef<HTMLVideoElement>(null);

  const playMeowSound = () => {
    try {
      const audio = new Audio("sounds/meow_10.mp3");
      audio
        .play()
        .catch((e) => console.log("Не удалось воспроизвести звук:", e));
    } catch (error) {
      console.log("Ошибка загрузки звука:", error);
    }
  };

  // Циклическое воспроизведение видео
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("ended", () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      });

      // Начинаем воспроизведение
      videoRef.current.play().catch((e) => {
        console.log("Автовоспроизведение заблокировано:", e);
      });
    }
  }, []);

  // Логика таймера
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRunning(false);

          // Ждем завершения таймера и переходим на ResultScreen
          setTimeout(() => onStateChange("result"), 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, onStateChange]);

  // Форматирование времени в MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEarlyFinish = () => {
    if (window.confirm("Завершить таймер досрочно?")) {
      onStateChange("result");
    }
  };

  const handleTrackChange = (track: any) => {
    setCurrentTrack(track);
  };

  return (
    <div className="Timer">
      <video
        ref={videoRef}
        className="timer-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src={`${process.env.PUBLIC_URL}/videos/cat_video.mp4`}
          type="video/mp4"
        />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="timer-content">
        <div className="timer-label">Осталось времени:</div>
        <div className="timer-display">{formatTime(timeLeft)}</div>

        <div
          className="timer-instruction clickable-instruction"
          onClick={handleEarlyFinish}
        >
          Кликни, чтобы завершить досрочно
        </div>
      </div>

      {/* Музыкальный плеер */}
      <MusicPlayer
        initialTrack={currentTrack}
        onTrackChange={handleTrackChange}
      />
    </div>
  );
};
