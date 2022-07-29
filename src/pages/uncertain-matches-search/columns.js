import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'iconsax-react';

export const columns = (navigationState) => [
    {
        header: <div style={{ paddingLeft: 42 }}>Name</div>,
        cell: (cell) => (
            <Link to={`/match/${cell.relationAccommodationId}`} state={navigationState} className="row-link">
                <div className="arrow-holder">
                    <span>
                        <ArrowRight size={14} />
                    </span>
                </div>
                <div>
                    {cell.accommodations.length} Accommodations
                    <br />
                    <small>{cell.relationAccommodationId}</small>
                </div>
            </Link>
        ),
    },
    {
        header: 'Location',
        cell: (cell) => cell.city + ', ' + cell.countryName,
    },
];
