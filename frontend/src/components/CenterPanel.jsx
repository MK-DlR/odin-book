// frontend/src/components/CenterPanel.jsx

// imports
import UserFeed from "./CenterPanel/UserFeed";

function CenterPanel(centerPanelView, setCenterPanelView) {
    // code here

    return (
        <div className="center-panel">
            <div className="center-content">
                center panel
                <UserFeed />
            </div>
        </div>
    )
}

export default CenterPanel;

// will utilize a switch statement
// to determine content
// see: messaging-app