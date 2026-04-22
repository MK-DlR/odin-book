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

    // TODO: active vs inactive search 
    // should have different colored icons

    return (
        <div className="right-panel">
            {searchBar}
            <div className="right-links">
                <a href="https://github.com/MK-DlR">Github</a> ∙ <a href="https://www.linkedin.com/in/adrien-newman/">LinkedIn</a>
            </div>
        </div>
    )
}

export default RightPanel;