// frontend/src/components/RightPanel.jsx

// imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
    // displays 4 - 5 randomized users (icon + username)
    // from all (not followed) users
    // and +follow button
    // NOTE: only displays on home page, no other tabs/pages
    const suggestedUsers = 
        <div id="suggested-container">
            suggested users goes here
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