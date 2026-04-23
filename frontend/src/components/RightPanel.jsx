// frontend/src/components/RightPanel.jsx

// imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function RightPanel() {
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
    // suggested users box
    // map through and display
    // 4 - 5 randomized users (icon + username)
    // from all (not followed) users
    // and +follow button
    // NOTE: only displays on home page, no other tabs/pages
    const suggestedUsers = 
        <div id="suggested-container">
            Suggested Users
            <hr />
            <div className="suggested-content">
                [icon] [name] <FontAwesomeIcon icon={faUserPlus} className="follow-icon" />
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
                {suggestedUsers}
                {mediaLinks}
            </div>
        </div>
    )
}

export default RightPanel;