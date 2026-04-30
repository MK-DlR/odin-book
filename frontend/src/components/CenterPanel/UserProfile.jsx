// frontend/src/components/CenterPanel/UserProfile.jsx

// imports
import followUser from "../../helpers/followUser";

// TODO: display selected user's profile information
// TODO: add edit button functionality
// TODO: update follow button
// conditionally render 
// "+ Follow" (blue/white - if not following)
// "✓ Following" (grey/grey - if already following)
function UserProfile({ username, isOwnProfile }) {
    return (
        <div className="user-profile">
            <h2>{username}</h2>

            {isOwnProfile ? (
                <button>Edit Profile</button>
            ) : (
                <button onClick={() => followUser({ username })}>Follow</button>
            )}
        </div>
    );
}

export default UserProfile;