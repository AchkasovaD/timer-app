const isGitHubPages = window.location.hostname.includes("github.io");

export const PATHS = {
  videos: (filename: string) =>
    isGitHubPages ? `videos/${filename}` : `/videos/${filename}`,

  sounds: (filename: string) =>
    isGitHubPages ? `sounds/${filename}` : `/sounds/${filename}`,

  images: (filename: string) =>
    isGitHubPages ? `images/${filename}` : `/images/${filename}`,
};
