// frontend/src/components/CenterPanel.jsx

// imports
import EditProfile from "./CenterPanel/EditProfile";
import UserFeed from "./CenterPanel/UserFeed";
import UserProfile from "./CenterPanel/UserProfile";

function CenterPanel({
    currentUser, 
    setCurrentUser, 
    centerPanelView, 
    setCenterPanelView
}) {
    // TODO:
    // switch statement 
    // to determine which view is selected

    let title;
    let content;
    
    switch (centerPanelView) {
        case "editProfile": // user can edit own profile
            content = <EditProfile />
            break;
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

// will utilize a switch statement
// to determine content
// see: messaging-app