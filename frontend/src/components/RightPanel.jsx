// frontend/src/components/RightPanel.jsx

// imports
import { useEffect, useState } from "react";
import getIconUrl from "../helpers/getIconUrl";
import suggestUsers from "../helpers/suggestUsers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function RightPanel() {
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
    // add follow button functionality
    // NOTE: suggested users only displays on home page, no other tabs/pages
    const listOfSuggestedUsers = suggestedUsers.map(user =>
        <div 
            key={user.id}
            className="suggested-user"
        >
            <img 
                className="suggested-icon icon" 
                src={getIconUrl(user.icon)} 
            /> 
                <b>{user.username}</b> 
                <FontAwesomeIcon icon={faUserPlus} className="follow-icon" />
        </div>
    )

    const displaySuggestedUsers = 
        <div id="suggested-container">
            Suggested Users
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