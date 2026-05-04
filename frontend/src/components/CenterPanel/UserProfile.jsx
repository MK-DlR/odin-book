// frontend/src/components/CenterPanel/UserProfile.jsx

// imports
import { useEffect, useState } from "react";

import apiFetch from "../../helpers/apiFetch";
import followUser from "../../helpers/followUser";
import getBannerUrl from "../../helpers/getBannerUrl";
import getIconUrl from "../../helpers/getIconUrl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft as faBackArrow } from "@fortawesome/free-solid-svg-icons";

// TODO: 
// display selected user's profile information

// TODO: 
// add edit button functionality

// TODO:
// if custom uploaded banner
// clicking on it opens it to fullsize

// TODO: 
// add follow button styling
// conditionally render 
// "+ Follow" (blue/white - if not following)
// "✓ Following" (grey/grey - if already following)
function UserProfile({ user, username, isOwnProfile }) {
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // fetch user data if only username is passed
    useEffect(() => {
        // use existing user object if available
        if (user) {
            setProfileUser(user);
            return;
        }

        // only fetch if there's a username and no user object
        if (!username) return;

        // track if component is still mounted
        let isMounted = true;

        async function fetchUserProfile() {
            setLoading(true);
            setError(null);

            try {
                const response = await apiFetch(
                    `${import.meta.env.VITE_API_URL}/users/${username}`
                );

                // check response status
                if (!response.ok) {
                    throw new Error('User not found');
                }

                const data = await response.json();
                
                if (isMounted) {
                    setProfileUser(data.result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchUserProfile();

        return () => {
            isMounted = false;
        };
    }, [user, username]);

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

    // render actual profile
    return (
        <div className="user-profile">
            <div 
                className="banner" 
                style={{ backgroundImage: `url(${getBannerUrl(profileUser.banner)})` }}
            /> 

            <div><FontAwesomeIcon icon={faBackArrow} className="back-icon" /></div>

            <img 
                className="lg-icon" 
                src={getIconUrl(profileUser.icon)} 
            /> 

            {/* conditionally render edit profile or follow button */}
            {isOwnProfile ? (
                <button>Edit Profile</button>
            ) : (
                <button onClick={() => followUser({ username: profileUser.username })}>
                    Follow
                </button>
            )}

            <div className="username-display">
                <h1>{profileUser.displayName}</h1>
                <p className="user-username">@{profileUser.username}</p>
            </div>
            <div className="user-stats">
                TODO: 
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
            <p className="users-common">TODO: if not own profile, "followed by"</p>
            <div className="user-tabs">TODO: tabs - posts, replies, media, likes</div>
            <div className="user-posts">TODO: posts display here</div>
            
            {/* Now you have access to all the fields! */}
            {/* profileUser.icon, banner, followers, following, etc. */}

        </div>
    );
}

export default UserProfile;

/*
- profile should display:
    - back button
        - top left over banner image
        - returns user to previous view
    - banner
        - if custom banner: clicking opens it in fullsize
    - icon
        - if custom icon: clicking opens it in fullsize
        - positioned 50% of itself over banner
        - thin "cutout" where icon and banner overlap
    - edit profile button (if viewing own profile)
        - opens edit profile modal
    - following button (if viewing other user's profile)
        - + Follow (following = true)
        - ✓ Following (following = false)
    - [#] followers [#] following [#] posts
        - needs to be calculated
        - followers + following are links
            - opens new page that lists them
            - icon, display name, username, bio (snippet), follow/following button
        - posts = original content (posts + replies) only
        - note: [#] should be white and bolded
    - "folowed by..."
        - if viewing other user's profile
        - icons "followed by" display names
            - is a link
                - displays the users same as followers/following pages
    - tabs: 
        - posts
        - replies
        - media
        - likes
    - all reposted content
        - posts, replies, etc
*/