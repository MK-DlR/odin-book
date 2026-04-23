// frontend/src/helpers/suggestUsers.jsx

// imports
import apiFetch from "./apiFetch";

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

    // TEMP
    console.log(allUsers);
    console.log(activeUser);

    // destructure wrapped data
    const { users } = allUsers;
    const { userData } = activeUser;

    // TODO:
    // filter out already followed users:
    // create set of followed user ids
    // map over following array and extract followingId from each object
    // put those objects into a set

    // filter users where
    // user.id !== userData.id (not the active user)
    // && user.id is not in set of followed ids
  } catch (err) {
    return err;
  }
}

export default suggestUsers;
