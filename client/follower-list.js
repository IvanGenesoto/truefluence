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
    console.log('props', props);

    if (!props.hasOwnProperty(0)) return null;
    async.mapSeries(props.followers, (follower, next) => {
        fetch('/media-stats', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: follower.external_id })
        })
            .then(result => result.json())
            .then(medias => {
                console.log(medias);
                next();
            })
    })
    console.log(props);
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
                { FollowerItem(props[0]) }
                { FollowerItem(props[1]) }
                { FollowerItem(props[2]) }
                { FollowerItem(props[3]) }
                { FollowerItem(props[4]) }
                { FollowerItem(props[5]) }
                { FollowerItem(props[6]) }
                { FollowerItem(props[7]) }
                { FollowerItem(props[8]) }
                { FollowerItem(props[9]) }
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