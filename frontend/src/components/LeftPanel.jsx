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
    // faHouse as faHomeSolid, 
    faSearch as faExploreRegular, 
    // faMagnifyingGlassPlus as faExploreSolid, 
    // faBell as faNotifSolid,
    // faBookmark as faSavedSolid,
    // faAddressBook as faUsersSolid,
    // faCircleUser as faProfileSolid,
    faToggleOff as faSettingsRegular,
    // faToggleOn as faSettingsSolid,
} from "@fortawesome/free-solid-svg-icons";

function LeftPanel() {
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
    // TODO: 
    // when window is narrow
    // only show icons, no text
    // "twitter style breakpoint behaviour"
    // TODO: 
    // conditionally show solid icons
    // when they're clicked/their tab is active
        <div className="tabs-container">
            <div className="home-tab">
                <FontAwesomeIcon icon={faHomeRegular} className="home-icon nav-icon" /> Home
            </div>

            <div className="explore-tab">
                <FontAwesomeIcon icon={faExploreRegular} className="explore-icon nav-icon" /> Explore
            </div>

            <div className="notif-tab">
                <FontAwesomeIcon icon={faNotifRegular} className="notif-icon nav-icon" /> Notifications
            </div>

            <div className="users-tab">
                <FontAwesomeIcon icon={faUsersRegular} className="users-icon nav-icon" /> Users
            </div>

            <div className="saved-tab">
                <FontAwesomeIcon icon={faSavedRegular} className="saved-icon nav-icon" /> Saved
            </div>

            <div className="profile-tab">
                <FontAwesomeIcon icon={faProfileRegular} className="profile-icon nav-icon" /> Profile
            </div>

            <div className="settings-tab">
                <FontAwesomeIcon icon={faSettingsRegular} className="settings-icon nav-icon" /> Settings
            </div>
        </div>

    const newPost = 
        <div className="new-post button">
            <FontAwesomeIcon icon={faNewPost} className="new-post-icon" /> New Post
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

// <FontAwesomeIcon icon={faHomeSolid} className="home-icon nav-icon" /> 
// <FontAwesomeIcon icon={faExploreSolid} className="explore-icon nav-icon" /> 
// <FontAwesomeIcon icon={faNotifSolid} className="notif-icon nav-icon" /> 
// <FontAwesomeIcon icon={faUsersSolid} className="users-icon nav-icon" />
// <FontAwesomeIcon icon={faSavedSolid} className="saved-icon nav-icon" />
// <FontAwesomeIcon icon={faProfileSolid} className="profile-icon nav-icon" />
// <FontAwesomeIcon icon={faSettingsSolid} className="settings-icon nav-icon" />

export default LeftPanel;