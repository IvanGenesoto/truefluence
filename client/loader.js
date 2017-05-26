const React = require('react');
const store = require('./store');

const Loader = props => {
    console.log('from loader', props);
    const { open } = props;
    if (open) {
        return (
            <div className="ui active centered inline loader"></div>
        )
    } else {
        return null;
    }
}

module.exports = Loader;

