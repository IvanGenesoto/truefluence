const ParseScrape = objJSON => {
    const user = {
        username: objJSON.user.username,
        picture_url: objJSON.user.profile_pic_url,
        full_name: objJSON.user.full_name,
        external_id: objJSON.user.id,
        private: objJSON.user.is_private,
        following_count: objJSON.user.follows.count,
        follower_count: objJSON.user.followed_by.count,
        bio: objJSON.user.biography,
        post_count: objJSON.user.media.count,
        external_url: objJSON.user.external_url
    };
    const medias = objJSON.user.media.nodes.map(media => {
        const formattedMedia = {
            external_id: media.id,
            user_id: media.owner.id,
            image_standard: media.display_src,
            image_thumbnail: media.thumbnail_src,
            caption: media.caption,
            link: 'https://www.instagram.com/p/' + media.code,
            like_count: media.likes.count,
            comment_count: media.comments.count,
            posted_at: media.date
        }
        return formattedMedia;
    });
    return {
        user: user,
        medias: medias
    };
};

module.exports = ParseScrape;