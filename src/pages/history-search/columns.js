import React from 'react';
import { ArrowRight } from 'iconsax-react';

export const columns = (navigationState, selectRow) => [
    {
        header: <div style={{ paddingLeft: 42 }}>Merge</div>,
        cell: (item) => (
            <div onClick={() => selectRow(item)} className="row-link">
                <div className="arrow-holder">
                    <span>
                        <ArrowRight size={14} />
                    </span>
                </div>
                <div>
                    {item.mergedAccommodations.length + 1} Accommodations
                    <br />
                    <small>{item.sourceAccommodation.htId}</small>
                </div>
            </div>
        ),
    },
    {
        header: 'Name',
        cell: (item) => item.sourceAccommodation.name + ', ' + item.sourceAccommodation.country,
    },
    {
        header: 'Location',
        cell: (item) => item.sourceAccommodation.locality + ', ' + item.sourceAccommodation.country,
    },
];
