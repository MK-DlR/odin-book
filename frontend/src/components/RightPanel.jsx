// frontend/src/components/RightPanel.jsx

// imports
import { useEffect, useState } from "react";
import followUser from "../helpers/followUser";
import getIconUrl from "../helpers/getIconUrl";
import suggestUsers from "../helpers/suggestUsers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function RightPanel(setCenterPanelView) {
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    // get randomized suggested users
    useEffect(() => {
        const fetchSuggestions = async () => {
          const users = await suggestUsers();
          setSuggestedUsers(users);
        };
        
        fetchSuggestions();
      }, []);

    // search input
    const searchBar = 
        <div id="search-container">
            <input 
                type="text" 
                id="search-input" 
                placeholder="Search"
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>

    // TODO:
    // add link to user's profile
    // figure out profile preview on hover
    // hover preview will also be used for usernames on feeds
    const listOfSuggestedUsers = suggestedUsers.map(user =>
        <div 
            key={user.id}
            className="suggested-user"
        >
            <div className="icon-username">
                <img 
                    className="sm-icon" 
                    src={getIconUrl(user.icon)} 
                /> 
                <a href="PROFILE_LINK" className="bold-link suggested-links">{user.username}</a> 
            </div>
            <FontAwesomeIcon 
                icon={faUserPlus} 
                className="follow-icon" 
                onClick={() => followUser(user)}
            />
        </div>
    )

    const displaySuggestedUsers = 
        <div id="suggested-container">
            <h3 id="suggested-header">Suggested Users</h3>
            <hr />
            <div className="suggested-content">
                {listOfSuggestedUsers}
            </div>
        </div>

    const mediaLinks = 
        <div className="right-links">
            <a href="https://github.com/MK-DlR">Github</a> ∙ <a href="https://www.linkedin.com/in/adrien-newman/">LinkedIn</a>
        </div>

    return (
        <div className="right-panel">
            <div className="right-content">
                {searchBar}
                {displaySuggestedUsers}
                {mediaLinks}
            </div>
        </div>
    )
}

export default RightPanel;