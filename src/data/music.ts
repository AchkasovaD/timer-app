export interface MusicTrack {
  id: number;
  filename: string;
  title: string;
  artist?: string;
  duration?: number; // в секундах (опционально)
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 1,
    filename: "music_1.mp3",
    title: "Расслабляющая мелодия 1",
    artist: "Для концентрации",
    duration: 180, // 3 минуты
  },
  {
    id: 2,
    filename: "music_2.mp3",
    title: "Спокойные звуки природы",
    artist: "Дождь и ветер",
    duration: 240, // 4 минуты
  },
  {
    id: 3,
    filename: "music_3.mp3",
    title: "Инструментальная музыка",
    artist: "Фортепиано",
    duration: 210, // 3.5 минуты
  },
  {
    id: 4,
    filename: "music_4.mp3",
    title: "Безмятежность",
    artist: "Атмосферные звуки",
    duration: 195, // 3:15
  },
  {
    id: 5,
    filename: "music_5.mp3",
    title: "Утренняя свежесть",
    artist: "Пение птиц",
    duration: 225, // 3:45
  },
  {
    id: 6,
    filename: "music_6.mp3",
    title: "Вечерний покой",
    artist: "Тихое пианино",
    duration: 180, // 3 минуты
  },
];

// Функция для получения случайного трека
export const getRandomTrack = (): MusicTrack => {
  const randomIndex = Math.floor(Math.random() * MUSIC_TRACKS.length);
  return MUSIC_TRACKS[randomIndex];
};

// Функция для получения следующего трека
export const getNextTrack = (currentId: number): MusicTrack => {
  const currentIndex = MUSIC_TRACKS.findIndex(
    (track) => track.id === currentId,
  );
  const nextIndex = (currentIndex + 1) % MUSIC_TRACKS.length;
  return MUSIC_TRACKS[nextIndex];
};

// Функция для получения предыдущего трека
export const getPreviousTrack = (currentId: number): MusicTrack => {
  const currentIndex = MUSIC_TRACKS.findIndex(
    (track) => track.id === currentId,
  );
  const prevIndex =
    (currentIndex - 1 + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
  return MUSIC_TRACKS[prevIndex];
};
