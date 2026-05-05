// frontend/src/components/CenterPanel/profile/UserProfile.jsx

// imports
import ProfileHeader from "./ProfileHeader";

import getBannerUrl from "../../../helpers/getBannerUrl";
import getIconUrl from "../../../helpers/getIconUrl";
import useFollowStatus from "../../../helpers/useFollowStatus";
import useUserProfile from "../../../helpers/useUserProfile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowLeft as faBackArrow, 
    faCheck as faCheck, 
    faPlus as faPlus 
} from "@fortawesome/free-solid-svg-icons";

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

    // TODO:
    // switch statement (like CenterPanel)
    // to handle what posts-display shows

    // render actual profile
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
                        {/*
                            TODO:
                                calculate and display [#] amounts
                        */}
                        <div className="indiv-stats">
                            <a href="TO_DO_LINK" className="stat">
                                <span className="white-link bold-link">[#]</span> followers
                            </a>
                            
                            <a href="TO_DO_LINK" className="stat">
                                <span className="white-link bold-link">[#]</span> following
                            </a>

                            <span className="post-stat">
                                <span className="white-link bold-link">[#]</span> posts
                            </span>
                        </div>
                    </div>
                    <p className="user-bio">{profileUser.bio}</p>
                    {/*
                        TODO:
                        if not own profile
                        display "followed by"
                        that logged in user is also following
                    */}
                    <p className="users-common">"followed by"</p>
                </div>
                {/* 
                TODO: 
                    tab "links" that change the user-posts view 
                */}
                <div className="user-tabs">
                    <a href="TO_DO_LINK" className="profile-tab bold-link lightblue-link">
                        Posts
                    </a>
                    <a href="TO_DO_LINK" className="profile-tab bold-link lightblue-link">
                        Replies
                    </a>
                    <a href="TO_DO_LINK" className="profile-tab bold-link lightblue-link">
                        Media
                    </a>
                    <a href="TO_DO_LINK" className="profile-tab bold-link lightblue-link">
                        Likes
                    </a>
                </div>
                {/* 
                TODO: 
                    default display posts 
                    reposts + original content + replies
                */}
                <div className="posts-display">posts display</div>
            </div>
    );
}

export default UserProfile;

/*
- profile should display:
    - back button
        - returns user to previous view
    - banner
        - if custom banner: clicking opens it in fullsize
    - icon
        - if custom icon: clicking opens it in fullsize
    - edit profile button (if viewing own profile)
        - opens edit profile modal
    - [#] followers [#] following [#] posts
        - needs to be calculated
        - followers + following are links
            - opens new page that lists them
            - icon, display name, username, bio (snippet), follow/following button
        - posts = original content (posts + replies) only
    - "folowed by..."
        - if viewing other user's profile
        - icons "followed by" display names
            - is a link
                - displays the users same as followers/following pages
    - tabs: 
        - change posts display to show content
    - all reposted content
        - posts, replies, etc
*/