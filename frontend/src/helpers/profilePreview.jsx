// frontend/src/helpers/profilePreview.jsx

// imports
import apiFetch from "./apiFetch";

// TODO: display a preview of hovered user's profile
// should display
// icon, display name, username, follow/following button
// [#] followers, [#] following
// description
// other users followed by active user 
// "followed by [icons and usernames]"
async function profilePreview(user) {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_URL}/users/${user.username}`,
    {
      method: "GET",
    },
  );

  const data = await response.json();

  // LOGGING
  console.log(`user preview for: ${user.username}`);
  console.log(data);
}

export default profilePreview;
