// frontend/src/helpers/followUser.js

// imports
import apiFetch from "./apiFetch";

// follow user
async function followUser(user) {
  const response = await apiFetch(
    `${import.meta.env.VITE_API_URL}/users/${user.username}/follow`,
    {
      method: "POST",
    },
  );

  const data = await response.json();
  console.log(`followed/unfollowed ${user.username}`);
  console.log(data);
}

export default followUser;
