// frontend/src/pages/Home.jsx

// imports
import CenterPanel from "../components/CenterPanel";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

function Home() {
    // code here

    return (
        <div className="panel-container">
            <LeftPanel />
            <CenterPanel />
            <RightPanel />
        </div>
    )
}

export default Home;