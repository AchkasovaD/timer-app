import React, { useEffect, useRef, useState } from "react";
import { MusicTrack, getNextTrack, getPreviousTrack } from "../../data/music";
import "./MusicPlayer.css";

interface MusicPlayerProps {
  initialTrack?: MusicTrack;
  onTrackChange?: (track: MusicTrack) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  initialTrack,
  onTrackChange,
}) => {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(
    initialTrack || {
      id: 1,
      filename: "music_1.mp3",
      title: "Расслабляющая мелодия 1",
      artist: "Для концентрации",
    },
  );

  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Инициализация аудио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      // Обработчики событий аудио
      const audio = audioRef.current;

      const handleEnded = () => {
        // Автоматически переключаем на следующий трек
        handleNext();
      };

      audio.addEventListener("ended", handleEnded);

      // Начинаем воспроизведение
      if (isPlaying) {
        audio.play().catch((e) => {
          console.log("Автовоспроизведение музыки заблокировано:", e);
          setIsPlaying(false);
        });
      }

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, []);

  // Обновление источника при смене трека
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = `${process.env.PUBLIC_URL}/sounds/${currentTrack.filename}`;
      audioRef.current.load();

      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log("Ошибка воспроизведения:", e);
        });
      }

      if (onTrackChange) {
        onTrackChange(currentTrack);
      }
    }
  }, [currentTrack]);

  // Управление воспроизведением
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => {
          console.log("Ошибка воспроизведения:", e);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    const nextTrack = getNextTrack(currentTrack.id);
    setCurrentTrack(nextTrack);
  };

  const handlePrevious = () => {
    const prevTrack = getPreviousTrack(currentTrack.id);
    setCurrentTrack(prevTrack);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="music-player">
      {/* Скрытый аудио элемент */}
      <audio ref={audioRef} />

      <div className="player-controls">
        <button
          className="control-btn prev-btn"
          onClick={handlePrevious}
          title="Предыдущий трек"
        >
          ⏮
        </button>

        <button
          className="control-btn play-pause-btn"
          onClick={togglePlayPause}
          title={isPlaying ? "Пауза" : "Воспроизведение"}
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>

        <button
          className="control-btn next-btn"
          onClick={handleNext}
          title="Следующий трек"
        >
          ⏭
        </button>
      </div>

      <div className="player-volume">
        <span className="volume-icon">🔊</span>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <span className="volume-percent">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};
