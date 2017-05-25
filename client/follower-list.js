const React = require('react');
const store = require('./store');
// const Database = require('./../server/database').Database;
// const database = new Database();

const FollowerItem = props => {
    return (
        <tr>
            <td>
                <div className="item">
                    <div className="content">
                        <span>
                            <img className="ui avatar image" src='http://scontent.cdninstagram.com/t51.2885-19/12230863_691359027630917_506377473_a.jpg' />
                            <a className="header">John</a>
                            <div className="description">Last seen watching <a><b>Bob's Burgers</b></a> 10 hours ago.</div>
                        </span>
                    </div>
                </div>
            </td>
            <td>112,435</td>
            <td>3.52%</td>
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
                <th>Like Ratio</th>
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