// frontend/src/components/LeftPanel.jsx

// imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHouse as faHomeRegular, 
    faBell as faNotifRegular,
    faBookmark as faSavedRegular,
    faAddressBook as faUsersRegular,
    faCircleUser as faProfileRegular,
    faPenToSquare as faNewPost,
} from "@fortawesome/free-regular-svg-icons";
import { 
    faHouse as faHomeSolid, 
    faSearch as faExploreRegular, 
    faMagnifyingGlassPlus as faExploreSolid, 
    faBell as faNotifSolid,
    faBookmark as faSavedSolid,
    faAddressBook as faUsersSolid,
    faCircleUser as faProfileSolid,
    faToggleOff as faSettingsRegular,
    faToggleOn as faSettingsSolid,
} from "@fortawesome/free-solid-svg-icons";

function LeftPanel({ centerPanelView, setCenterPanelView }) {
    const isActive = (type) => centerPanelView?.type === type;

    const tabs = [
        { type: "home", label: "Home", icon: faHomeRegular, activeIcon: faHomeSolid },
        { type: "explore", label: "Explore", icon: faExploreRegular, activeIcon: faExploreSolid },
        { type: "notifications", label: "Notifications", icon: faNotifRegular, activeIcon: faNotifSolid },
        { type: "allUsers", label: "Users", icon: faUsersRegular, activeIcon: faUsersSolid },
        { type: "saved", label: "Saved", icon: faSavedRegular, activeIcon: faSavedSolid },
        { type: "ownProfile", label: "Profile", icon: faProfileRegular, activeIcon: faProfileSolid },
        { type: "settings", label: "Settings", icon: faSettingsRegular, activeIcon: faSettingsSolid },
    ];

    const activeUser = 
    // TODO: 
    // check for active user and render their icon
    // should toggle dropdown
    // with options:
    // "[svg icon] go to profile"
    // "[svg icon] log out"
        <div className="active-user">
            active user icon
        </div>

    const panelTabs = 
        <div className="tabs-container">
            {tabs.map(tab => (
                <div
                    key={tab.type}
                    className={`tab ${isActive(tab.type) ? "active" : ""}`}
                    onClick={() => setCenterPanelView({ type: tab.type })}
                >
                    <FontAwesomeIcon 
                        icon={
                            isActive(tab.type) && tab.activeIcon
                                ? tab.activeIcon
                                : tab.icon
                        } 
                        className="nav-icon"
                    />
                    {tab.label}
                </div>
            ))}
        </div>

    const newPost = 
        <div className="new-post button">
            <FontAwesomeIcon 
                icon={faNewPost} 
                className="new-post-icon" 
            /> New Post
        </div>

    return (
        <div className="left-panel">
            <div className="left-content">
                {activeUser}
                {panelTabs}
                {newPost}
            </div>
        </div>
    )
}

export default LeftPanel;