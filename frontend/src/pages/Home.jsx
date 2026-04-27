// frontend/src/pages/Home.jsx

// imports
import { useState } from "react";

import CenterPanel from "../components/CenterPanel";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

function Home() {
    const [centerPanelView, setCenterPanelView] = useState("");

    return (
        <div className="panel-container">
            <LeftPanel 
                setCenterPanelView={setCenterPanelView}
            />
            <CenterPanel
                centerPanelView={centerPanelView} 
                setCenterPanelView={setCenterPanelView}
            />
            <RightPanel 
                setCenterPanelView={setCenterPanelView}
            />
        </div>
    )
}

export default Home;