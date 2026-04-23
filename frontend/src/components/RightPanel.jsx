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

    // TODO: suggested users
    const suggestedUsers = 
        <div id="suggested-container">
            suggested users goes here
        </div>

    return (
        <div className="right-panel">
            <div className="right-content">
                {searchBar}
                {suggestedUsers}
                <div className="right-links">
                    <a href="https://github.com/MK-DlR">Github</a> ∙ <a href="https://www.linkedin.com/in/adrien-newman/">LinkedIn</a>
                </div>
            </div>
        </div>
    )
}

export default RightPanel;