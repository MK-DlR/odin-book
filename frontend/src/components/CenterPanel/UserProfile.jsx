// frontend/src/components/CenterPanel/UserProfile.jsx

// imports

// TODO: display selected user's profile
function UserProfile({ username, isOwnProfile }) {
    return (
        <div className="user-profile">
            <h2>{username}</h2>

            {isOwnProfile ? (
                <button>Edit Profile</button>
            ) : (
                <button>Follow</button>
            )}
        </div>
    );
}

export default UserProfile;