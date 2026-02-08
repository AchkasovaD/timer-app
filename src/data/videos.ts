export interface VideoInfo {
  id: number;
  filename: string;
  hasSound: boolean;
  description?: string; // опционально: описание видео
}

export const CAT_VIDEOS: VideoInfo[] = [
  { id: 1, filename: "cat_1.mp4", hasSound: false, description: "Котик 1" },
  {
    id: 2,
    filename: "cat_2.mp4",
    hasSound: true,
    description: "Котик 2 (со звуком)",
  },
  { id: 3, filename: "cat_3.mp4", hasSound: false, description: "Котик 3" },
  { id: 4, filename: "cat_4.mp4", hasSound: false, description: "Котик 4" },
  {
    id: 5,
    filename: "cat_5.mp4",
    hasSound: true,
    description: "Котик 5 (со звуком)",
  },
  {
    id: 6,
    filename: "cat_6.mp4",
    hasSound: true,
    description: "Котик 6 (со звуком)",
  },
  { id: 7, filename: "cat_7.mp4", hasSound: false, description: "Котик 7" },
  { id: 8, filename: "cat_8.mp4", hasSound: false, description: "Котик 8" },
  { id: 9, filename: "cat_9.mp4", hasSound: false, description: "Котик 9" },
  { id: 10, filename: "cat_10.mp4", hasSound: false, description: "Котик 10" },
  { id: 11, filename: "cat_11.mp4", hasSound: false, description: "Котик 11" },
  { id: 12, filename: "cat_12.mp4", hasSound: false, description: "Котик 12" },
  { id: 13, filename: "cat_13.mp4", hasSound: false, description: "Котик 13" },
  { id: 14, filename: "cat_14.mp4", hasSound: false, description: "Котик 14" },
  { id: 15, filename: "cat_15.mp4", hasSound: false, description: "Котик 15" },
  { id: 16, filename: "cat_16.mp4", hasSound: false, description: "Котик 16" },
];

// Функция для получения случайного видео
export const getRandomVideo = (): VideoInfo => {
  const randomIndex = Math.floor(Math.random() * CAT_VIDEOS.length);
  return CAT_VIDEOS[randomIndex];
};

// Функция для получения видео по ID
export const getVideoById = (id: number): VideoInfo | undefined => {
  return CAT_VIDEOS.find((video) => video.id === id);
};
