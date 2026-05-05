// frontend/src/components/CenterPanel/profile/ProfileHeader.jsx

// imports
import getBannerUrl from "../../../helpers/getBannerUrl";
import getIconUrl from "../../../helpers/getIconUrl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faArrowLeft as faBackArrow, 
    faCheck as faCheck, 
    faPlus as faPlus 
} from "@fortawesome/free-solid-svg-icons";

function ProfileHeader({ 
    profileUser, 
    isOwnProfile, 
    isFollowing, 
    toggleFollow,
    followLoading
}) {
    const bannerUrl = getBannerUrl(profileUser.banner);

    return (
        <>
            <div 
                className={`banner ${!bannerUrl ? "banner--fallback" : ""}`}
                style={bannerUrl ? { backgroundImage: `url(${bannerUrl})` } : {}}
            /> 

            {/*
                TODO:
                if custom uploaded banner
                clicking on it opens it to fullsize
            */}

            <div className="without-banner">
                <div className="back-button">
                    <FontAwesomeIcon icon={faBackArrow} className="back-icon" />
                </div>

                <img 
                    className="profile-icon lg-icon" 
                    src={getIconUrl(profileUser.icon)} 
                /> 

                {/*
                    TODO:
                    if custom uploaded icon
                    clicking on it opens it to fullsize
                */}

                {/* conditionally render edit profile or follow button */}
                {/* 
                    TODO:
                    add edit button functionality
                */}
                {isOwnProfile ? (
                    <button className="button button-edit">Edit Profile</button>
                ) : (
                    <button 
                        className="button button-follow"
                        onClick={toggleFollow}
                        disabled={followLoading}
                    >
                        <FontAwesomeIcon 
                            icon={isFollowing ? faCheck : faPlus}
                            className="follow-icon"
                        /> {isFollowing ? "Following" : "Follow"}
                    </button>
                )}
            </div>
        </>
    );
}

export default ProfileHeader;