const ParseScrape = objJSON => {
    // return new Promise((resolve, reject) => {
        var medias = [];
        console.log('objJSON:', objJSON);
        const user = {
            username: objJSON.user.username,
            picture_url: objJSON.user.profile_pic_url,
            full_name: objJSON.user.full_name ? objJSON.user.full_name : '',
            external_id: objJSON.user.id,
            private: objJSON.user.is_private,
            following_count: objJSON.user.follows.count,
            follower_count: objJSON.user.followed_by.count,
            bio: objJSON.user.biography ? objJSON.user.biography : '',
            post_count: objJSON.user.media.count,
            external_url: objJSON.user.external_url ? objJSON.user.external_url : ''
        };
        if (objJSON.user.media.nodes.length > 0) {
            medias = objJSON.user.media.nodes.map(media => {
                const formattedMedia = {
                    external_id: media.id,
                    user_id: media.owner.id,
                    image_standard: media.display_src,
                    image_thumbnail: media.thumbnail_src,
                    caption: media.caption,
                    link: 'https://www.instagram.com/p/' + media.code,
                    like_count: media.likes.count,
                    comment_count: media.comments.count,
                    user_tags: [],
                    posted_at: new Date(media.date*1000).toISOString()
                }
                return formattedMedia;
            });
        }
        return {
            user: user,
            medias: medias
        };
        // resolve(user, medias);
    // })
};

module.exports = ParseScrape;