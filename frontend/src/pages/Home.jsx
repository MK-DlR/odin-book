// frontend/src/pages/Home.jsx

// imports
import CenterPanel from "../components/CenterPanel";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

function Home() {
    // code here

    return (
        <div className="panel-container">
            i'm the home page, i contain the:
            <LeftPanel />
            <CenterPanel />
            <RightPanel />
        </div>
    )
}

export default Home;