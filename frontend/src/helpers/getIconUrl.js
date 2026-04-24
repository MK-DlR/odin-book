// frontend/src/helpers/getIconUrl.js

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

function getIconUrl(icon) {
  if (!icon) return `${API_BASE}/default-user.png`;

  return icon.startsWith("http")
    ? icon
    : `${API_BASE}/${icon.replace(/^\/+/, "")}`;
}

export default getIconUrl;
