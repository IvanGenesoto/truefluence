const React = require('react');
const store = require('./store');
// const Database = require('./../server/database').Database;
// const database = new Database();

const FollowerItem = user => {
    return (
        <tr>
            <td>
                <div className="item">
                    <div className="content">
                        <span>
                            <img className="ui avatar image" src={ user.picture_url } />
                            <a className="header">{ user.username }</a>
                            <div className="description">Last seen watching <a><b>Bob's Burgers</b></a> 10 hours ago.</div>
                        </span>
                    </div>
                </div>
            </td>
            <td>{ user.follower_count }</td>

        </tr>
    )
}

const FollowerList = props => {
    // const { followers } = props;
    if (props.length == 0) return null; 
    return (
        <table className="ui sortable celled table">
            <thead>
                <tr>
                <th>User</th>
                <th>Follower Count</th>
                </tr>
            </thead>

            <tbody>
                { FollowerItem(props) }
                <tr>
                    <td>John</td>
                    <td>No Action</td>
                    <td>None</td>
                </tr>
                <tr>
                    <td>Jill</td>
                    <td className="negative">Denied</td>
                    <td>None</td>
                </tr><tr>
                    <td>Jamie</td>
                    <td className="positive">Approved</td>
                    <td className="warning">Requires call</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>3 People</th>
                    <th>2 Approved</th>
                    <th></th>
                </tr>
            </tfoot>
        </table>
    )
}

module.exports = FollowerList;