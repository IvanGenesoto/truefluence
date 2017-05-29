const React = require('react');
const store = require('./store');
const async = require('async');
const FollowerItem = user => {
    return (
        <tr>
            <td>
                <div className="item">
                    <div className="content">
                        <a href={ 'https://www.instagram.com/' + user.username }>
                            <img className="ui avatar image" src={ user.picture_url } />
                            <a className="header">{ user.username }</a>
                            <div className="description">Last seen watching <a><b>Bob's Burgers</b></a> 10 hours ago.</div>
                        </a>
                    </div>
                </div>
            </td>
            <td>{ user.follower_count }</td>
            <td>{ user.post_count }</td>
            <td>{ user.private ? 'Private' : user.avLikes.toFixed(2) }</td>
            <td>{ user.private ? 'Private' : user.avComments.toFixed(2) }</td>
        </tr>
    )
}

// const FollowerItem = user => {
    // fetch('/media-stats', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ userId: user.external_id })
    // })
//         .then(result => {
//             result.json()
//                 /*.then(results => {
//                     console.log(results);
//                     resolve (
//                         <tr>
//                             <td>
//                                 <div className="item">
//                                     <div className="content">
//                                         <a href={ 'https://www.instagram.com/' + user.username }>
//                                             <img className="ui avatar image" src={ user.picture_url } />
//                                             <a className="header">{ user.username }</a>
//                                             <div className="description">Last seen watching <a><b>Bob's Burgers</b></a> 10 hours ago.</div>
//                                         </a>
//                                     </div>
//                                 </div>
//                             </td>
//                             <td>{ user.follower_count }</td>
//                             <td>{ user.post_count }</td>

//                         </tr>
//                     )
//                 })*/
//         })
// }
                    // <td>{ medias.length == '0' ? 'Private' : (likes / medias.length).toFixed(2) }</td>
                    // <td>{ medias.length == '0' ? 'Private' : (comments / medias.length).toFixed(2) }</td>

const FollowerList = props => {
    if (!props.followers) return null;
    return (
        <table className="ui sortable celled table">
            <thead>
                <tr>
                <th>User</th>
                <th>Follower Count</th>
                <th>Post Count</th>
                <th>Average Likes/Post</th>
                <th>Average Comments/Post</th>
                </tr>
            </thead>

            <tbody>
                { FollowerItem(props.followers[0]) }
                { FollowerItem(props.followers[1]) }
                { FollowerItem(props.followers[2]) }
                { FollowerItem(props.followers[3]) }
                { FollowerItem(props.followers[4]) }
                { FollowerItem(props.followers[5]) }
                { FollowerItem(props.followers[6]) }
                { FollowerItem(props.followers[7]) }
                { FollowerItem(props.followers[8]) }
                { FollowerItem(props.followers[9]) }
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>

                </tr>
            </tfoot>
        </table>
    )

}

module.exports = FollowerList;