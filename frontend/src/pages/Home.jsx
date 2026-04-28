// frontend/src/pages/Home.jsx

// imports
import { useState, useEffect } from "react";
import apiFetch from "../helpers/apiFetch";

import LeftPanel from "../components/LeftPanel";
import CenterPanel from "../components/CenterPanel";
import RightPanel from "../components/RightPanel";

function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userFeed, setUserFeed] = useState("");
    const [centerPanelView, setCenterPanelView] = useState("");

    // fetch and store current user's data
    useEffect(() => {
        let isMounted = true;

        async function getCurrentUser() {
            const response = await apiFetch(
                `${import.meta.env.VITE_API_URL}/users/me`
            )
    
            const data = await response.json();
            
            if (isMounted) {
                setCurrentUser(data.userData);
            }
        }

        getCurrentUser();

        return () => {
            isMounted = false;
        };
    }, []);

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
        <div className="panel-container">
            <LeftPanel 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                setCenterPanelView={setCenterPanelView}
            />
            <CenterPanel
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                centerPanelView={centerPanelView} 
                setCenterPanelView={setCenterPanelView}
            />
            <RightPanel 
                setCenterPanelView={setCenterPanelView}
            />
        </div>
    )
}

export default Home;