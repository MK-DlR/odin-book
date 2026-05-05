// frontend/src/helpers/getBannerUrl.js

// imports
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getBannerUrl(banner) {
  if (!banner) return null;

  return banner.startsWith("http")
    ? banner
    : `${API_BASE}/${banner.replace(/^\/+/, "")}`;
}

export default getBannerUrl;