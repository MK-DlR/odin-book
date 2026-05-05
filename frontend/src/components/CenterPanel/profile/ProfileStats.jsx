// frontend/src/components/CenterPanel/profile/ProfileStats.jsx

// props: stats (object with counts), username
// once numbers are calculated, this becomes a simple presentational component

function ProfileStats() {
    // code

    return (
        <>
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
        </>
    )
}

export default ProfileStats;

/*
FULL TODO:
- should display:
    - [#] followers [#] following [#] posts
        - needs to be calculated
        - followers + following are links
            - opens new page that lists them
            - icon, display name, username, bio (snippet), follow/following button
        - posts = original content (posts + replies) only
*/