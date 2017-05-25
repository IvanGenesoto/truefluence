const React = require('react');
const store = require('./store');

const FollowerList = props => {
    return (
        <table className="ui sortable celled table">
            <thead>
                <tr>
                <th>Name</th>
                <th className="sorted descending">Status</th>
                <th>Notes</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>John</td>
                    <td>No Action</td>
                    <td>None</td>
                </tr><tr>
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