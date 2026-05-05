// frontend/src/components/CenterPanel.jsx

// imports
import EditProfile from "./CenterPanel/EditProfile";
import Explore from "./CenterPanel/Explore";
import Notifications from "./CenterPanel/Notifications";
import Saved from "./CenterPanel/Saved";
import Settings from "./CenterPanel/Settings";
import UserFeed from "./CenterPanel/UserFeed";
import UserProfile from "./CenterPanel/profile/UserProfile";
import Users from "./CenterPanel/Users";

function CenterPanel({
    currentUser, 
    setCurrentUser, 
    centerPanelView, 
    setCenterPanelView
}) {
    let title;
    let content;
    
    switch (centerPanelView.type) {
        // LeftPanel tabs
        case "home": // display user's feed
            content = <UserFeed />
            break;
        case "explore": // display all posts from all users
            content = <Explore />
            break;
        case "notifications": // display all notifications
            title = 
                <div className="header">
                    <h2>Notifications</h2>
                </div>
            content = <Notifications />
            break;
        case "allUsers": // display all registered users
            title = 
                <div className="header">
                    <h2>All Users</h2>
                </div>
            content = <Users />
            break;
        case "saved": // display all liked content
            title = 
                <div className="header">
                    <h2>Saved Posts</h2>
                </div>
            content = <Saved />
            break;
        case "ownProfile": // display logged in user's profile details
            content = (
                <UserProfile 
                    user={currentUser}
                    isOwnProfile={true}
                />
            );
            break;
        case "settings": // display settings menu
            title = 
                <div className="header">
                    <h2>Settings</h2>
                </div>
            content = <Settings />
            break;
        // other
        case "userProfile": // display selected user's profile details
            content = (
                <UserProfile 
                    username={centerPanelView.username} 
                    isOwnProfile={false}
                />
            );
            break;
        default:
            content = <UserFeed />
    }
    

    return (
        <div className="center-panel">
            <div className="center-content">
                {title}
                {content}
            </div>
        </div>
    )
}

export default CenterPanel;