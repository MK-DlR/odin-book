// frontend/src/helpers/suggestUsers.jsx

// imports
import apiFetch from "./apiFetch";

// fetch random users to suggestion
async function suggestUsers() {
  try {
    const [getAllUsers, getActiveUser] = await Promise.all([
      // get all users
      apiFetch(`${import.meta.env.VITE_API_URL}/users/all-users/`, {
        method: "GET",
      }),
      // get active user
      apiFetch(`${import.meta.env.VITE_API_URL}/users/me/`, { method: "GET" }),
    ]);

    // parse both json responses
    const [allUsers, activeUser] = await Promise.all([
      getAllUsers.json(),
      getActiveUser.json(),
    ]);

    // destructure wrapped data
    const { users } = allUsers;
    const { userData } = activeUser;

    // extract followingId values and put into a set
    const followedUserIds = new Set(
      userData.following.map((user) => user.followingId),
    );

    // filter out followed users and logged in user
    const filteredUsers = users.filter(function (user) {
      return user.id !== userData.id && !followedUserIds.has(user.id);
    });

    // randomize filteredUsers
    function randomizedUsers(filteredUsers) {
      let currentIndex = filteredUsers.length;

      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [filteredUsers[currentIndex], filteredUsers[randomIndex]] = [
          filteredUsers[randomIndex],
          filteredUsers[currentIndex],
        ];
      }
    }

    randomizedUsers(filteredUsers);

    // get 4 users from randomized list
    const selectedUsers = filteredUsers.slice(0, 4);

    return selectedUsers;
  } catch (err) {
    console.error("Error fetching suggested users:", err);
    return [];
  }
}

export default suggestUsers;
