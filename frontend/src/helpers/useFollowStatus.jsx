// frontend/src/helpers/useFollowStatus.js

// imports
import { useState } from "react";
import followUser from "./followUser";

function useFollowStatus(initialIsFollowing, username) {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    const [loading, setLoading] = useState(false);
    
    const toggleFollow = async () => {
        setLoading(true);
        try {
            const data = await followUser({ username });
            setIsFollowing(data.isFollowing);
        } catch (err) {
            console.error("Failed to toggle follow:", err)
        } finally {
            setLoading(false);
        }
    };
    
    return { isFollowing, toggleFollow, loading };
}

export default useFollowStatus;
