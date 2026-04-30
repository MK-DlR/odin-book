// frontend/src/pages/Home.jsx

// imports
import { useState, useEffect } from "react";
import apiFetch from "../helpers/apiFetch";

import LeftPanel from "../components/LeftPanel";
import CenterPanel from "../components/CenterPanel";
import RightPanel from "../components/RightPanel";

function Home() {
    const [currentUser, setCurrentUser] = useState(null);
    const [centerPanelView, setCenterPanelView] = useState({
        type: "home"
    });

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

    return (
        <div className="panel-container">
            <LeftPanel 
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                centerPanelView={centerPanelView} 
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