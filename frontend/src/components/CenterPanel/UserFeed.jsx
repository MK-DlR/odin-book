// frontend/src/components/CenterPanel/UserFeed.jsx

// imports
import { useState } from "react";
import apiFetch from "../../helpers/apiFetch";

function UserFeed() {
    const [userFeed, setUserFeed] = useState("");

    // TODO:
    // fetch logged in user's feed
    async function getFeed() {
        const response = apiFetch(
            // TODO:
            // fetch all posts/reposts/replies
            // created by logged in user
            // and users that they follow
            // ordered by newest to oldest
        )
    
        const data = await response.json();
        // setUserFeed(data./* ??? */);
    }

    return (
        <div>i'm the user feed</div>
    )
}

export default UserFeed;