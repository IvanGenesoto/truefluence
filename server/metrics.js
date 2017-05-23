const Metrics = (user, medias) => {
    console.log(user.username, 'followers:', user.follower_count, 'following:', user.following_count);
    if (medias.length > 0) {
        const recentMediaCount = medias.length;
        const recentLikeCount = medias.map(media => { return media.like_count}).reduce((tot, val) => {
            return val + tot;
        }, 0);
        const recentCommentCount = medias.map(media => { return media.comment_count}).reduce((tot, val) => {
            return val + tot;
        }, 0);
        console.log('stats for last', recentMediaCount, 'posts - total likes:', recentLikeCount, 'average likes:', (recentLikeCount/recentMediaCount).toFixed(2), 
        'total comments:', recentCommentCount, 'average comments:', (recentCommentCount/recentMediaCount).toFixed(2), 'average like/follower ratio:', 
        ((recentLikeCount/recentMediaCount)/user.follower_count).toFixed(2));
    } else {
        // console.log('no posts or user is private');
    }
}

module.exports = Metrics;