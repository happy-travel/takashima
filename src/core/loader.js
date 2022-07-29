import React from 'react';

const Loader = ({ page, segment, white }) => (
    <div
        className={
            'loader' +
            (page || segment ? ' full-page' : '') +
            (white ? ' white' : '') +
            (segment ? ' segment' : '')
        }
    >
        <div className="inside">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
        </div>
    </div>
);

export default Loader;
