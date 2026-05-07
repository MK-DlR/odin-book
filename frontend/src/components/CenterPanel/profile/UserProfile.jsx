// frontend/src/components/CenterPanel/profile/UserProfile.jsx

// imports
import PostsDisplay from "./PostsDisplay";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileTabs from "./ProfileTabs";
import UserFollowers from "./UserFollowers";

import useFollowStatus from "../../../helpers/useFollowStatus";
import useUserProfile from "../../../helpers/useUserProfile";

// display selected user's profile information
function UserProfile({ user, username, isOwnProfile }) {
    const { profileUser, loading, error } = useUserProfile(user, username);
    const { 
        isFollowing, 
        toggleFollow, 
        loading: followLoading 
    } = useFollowStatus(
        profileUser?.isFollowedByViewer || false, 
        profileUser?.username
    );

    // handle loading state
    if (loading) {
        return <div className="user-profile">Loading...</div>;
    }

    // handle error state
    if (error) {
        return <div className="user-profile">Error: {error}</div>;
    }

    // handle no user data
    if (!profileUser) {
        return <div className="user-profile">No user data available</div>;
    }

    // user profile
    return (
        <div className="user-profile">
            <ProfileHeader 
                profileUser={profileUser}
                isOwnProfile={isOwnProfile}
                isFollowing={isFollowing}
                toggleFollow={toggleFollow}
                followLoading={followLoading}
            />
                <div className="without-header">
                    <div className="username-display">
                        <h1>{profileUser.displayName}</h1>
                        <p className="user-username">@{profileUser.username}</p>
                    </div>
                    <div className="user-stats">
                        <ProfileStats />
                    </div>
                    <p className="user-bio">{profileUser.bio}</p>
                    <p className="users-common">
                        <UserFollowers />
                    </p>
                </div>
                <div className="user-tabs">
                    <ProfileTabs />
                </div>
                <div className="posts-display">
                    <PostsDisplay />
                </div>
            </div>
    );
}

export default UserProfile;