// frontend/src/helpers/useUserProfile.js

// imports
import { useEffect, useState } from "react";
import apiFetch from "./apiFetch";

function useUserProfile(user, username) {
  const [profileUser, setProfileUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch user data if only username is passed
  useEffect(() => {
    // use existing user object if available
    if (user) {
      setProfileUser(user);
      return;
    }

    // only fetch if there's a username and no user object
    if (!username) return;

    // track if component is still mounted
    let isMounted = true;

    async function fetchUserProfile() {
      setLoading(true);
      setError(null);

      try {
        const response = await apiFetch(
          `${import.meta.env.VITE_API_URL}/users/${username}`,
        );

        // check response status
        if (!response.ok) {
          throw new Error("User not found");
        }

        const data = await response.json();

        if (isMounted) {
          setProfileUser(data.result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchUserProfile();

    return () => {
      isMounted = false;
    };
  }, [user, username]);

  return { profileUser, loading, error };
}

export default useUserProfile;
