import React, { useRef, useEffect, useState } from "react";
import { CAT_VIDEOS, getRandomVideo, VideoInfo } from "../../data/videos";

interface ResultScreenProps {
  onStateChange?: (state: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  onStateChange,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedVideo, setSelectedVideo] =
    useState<VideoInfo>(getRandomVideo());

  // Функция для воспроизведения мяу (только для видео без звука)
  const playMeowIfNeeded = (video: VideoInfo) => {
    // Если у видео нет звука, воспроизводим мяу
    if (!video.hasSound) {
      try {
        const audio = new Audio("/sounds/meow_10.mp3");
        // Уменьшаем громкость мяу, чтобы не перекрывало музыку если она еще играет
        audio.volume = 0.7;

        // Ждем немного перед воспроизведением мяу
        setTimeout(() => {
          audio.play().catch((e) => {
            console.log("Не удалось воспроизвести мяу:", e);
          });
        }, 500); // Задержка 500мс для плавного перехода
      } catch (error) {
        console.log("Ошибка загрузки звука мяу:", error);
      }
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnded = () => {
      videoElement.currentTime = 0;
      videoElement.play();
    };

    const handleCanPlay = () => {
      // Включаем/выключаем звук видео в зависимости от hasSound
      videoElement.muted = !selectedVideo.hasSound;

      // Воспроизводим мяу если видео без звука
      playMeowIfNeeded(selectedVideo);

      // Начинаем воспроизведение видео
      videoElement.play().catch((e) => {
        console.log("Автовоспроизведение заблокировано:", e);
      });
    };

    // Когда видео загружено
    const handleLoadedData = () => {
      console.log(
        `Видео загружено: ${selectedVideo.filename}, звук: ${selectedVideo.hasSound ? "включен" : "выключен"}`,
      );
    };

    videoElement.addEventListener("ended", handleVideoEnded);
    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("loadeddata", handleLoadedData);

    // Очистка при размонтировании или смене видео
    return () => {
      videoElement.removeEventListener("ended", handleVideoEnded);
      videoElement.removeEventListener("canplay", handleCanPlay);
      videoElement.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [selectedVideo]);

  const handleClick = () => {
    // Выбираем новое случайное видео при следующем запуске
    const newVideo = getRandomVideo();
    setSelectedVideo(newVideo);

    if (onStateChange) {
      onStateChange("main");
    }
  };

  // Функция для принудительной смены видео (опционально)
  const handleChangeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newVideo = getRandomVideo();
    setSelectedVideo(newVideo);
    console.log(`Смена видео на: ${newVideo.filename}`);
  };

  return (
    <div className="Result" onClick={handleClick}>
      <video
        key={selectedVideo.id}
        ref={videoRef}
        className="result-video"
        autoPlay
        loop
        muted={!selectedVideo.hasSound} // Отключаем muted только если есть звук
        playsInline
        preload="auto"
      >
        {/* Используем рандомное видео */}
        <source
          src={`${process.env.PUBLIC_URL}/videos/${selectedVideo.filename}`}
          type="video/mp4"
        />
        Ваш браузер не поддерживает видео.
      </video>

      <div className="result-content">
        <p className="result-text">
          Ты справилась!
          <br />Я тобой так горжусь! ❤️
        </p>
        <p className="instruction">Кликни, чтобы начать заново</p>
      </div>
    </div>
  );
};
