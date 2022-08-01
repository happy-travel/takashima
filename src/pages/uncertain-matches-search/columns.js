import React from 'react';
import { ArrowRight } from 'iconsax-react';

export const columns = (navigationState, selectRow) => [
    {
        header: <div style={{ paddingLeft: 42 }}>Name</div>,
        cell: (item) => (
            <div onClick={() => selectRow(item)} className="row-link">
                <div className="arrow-holder">
                    <span>
                        <ArrowRight size={14} />
                    </span>
                </div>
                <div>
                    {item.accommodations.length} Accommodations
                    <br />
                    <small>{item.relationAccommodationId}</small>
                </div>
            </div>
        ),
    },
    {
        header: 'Name',
        cell: (item) => item.accommodations[0].name,
    },
    {
        header: 'Location',
        cell: (item) => item.accommodations[0].locality + ', ' + item.accommodations[0].country,
    },
];
