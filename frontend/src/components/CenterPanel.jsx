// frontend/src/components/CenterPanel.jsx

import UserFeed from "./MainPanel/UserFeed";

// imports

function CenterPanel() {
    // code here

    return (
        <div className="center-panel">
            center panel
            <UserFeed />
        </div>
    )
}

export default CenterPanel;

// will utilize a switch statement
// to determine content
// see: messaging-app