// frontend/src/components/CenterPanel.jsx

// imports
import EditProfile from "./CenterPanel/EditProfile";
import Explore from "./CenterPanel/Explore";
import Notifications from "./CenterPanel/Notifications";
import Saved from "./CenterPanel/Saved";
import Settings from "./CenterPanel/Settings";
import UserFeed from "./CenterPanel/UserFeed";
import UserProfile from "./CenterPanel/UserProfile";
import Users from "./CenterPanel/Users";

function CenterPanel({
    currentUser, 
    setCurrentUser, 
    centerPanelView, 
    setCenterPanelView
}) {
    let title;
    let content;
    
    switch (centerPanelView) {
        case "userFeed": // display user's feed
            content = <UserFeed />
            break;
        case "userProfile": // display selected user's profile details
            content = <UserProfile />
            break;
        default:
            content = <UserFeed />
    }
    

    return (
        <div className="center-panel">
            <div className="center-content">
                center panel
                {content}
            </div>
        </div>
    )
}

export default CenterPanel;