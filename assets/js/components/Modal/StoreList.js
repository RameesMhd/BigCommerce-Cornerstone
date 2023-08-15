import React from 'react';
import './BestbuyModal.scss';
const StoreList = ({ stores, onStoreClick, selectedStoreIndex }) => {
    return (
        <div>
            {stores.map((store, index) => (
                <div key={index} className={`lc-item-box ${selectedStoreIndex === index ? 'selected-store' : ''}`} onClick={() => onStoreClick(store, index)}>
                    <div className="item-distance-box">
                        <div className="item-number">{index + 1}</div>
                        <div className="item-distance" data-tkey="number.miles.away">{store.distanceInMiles} Miles Away</div>
                    </div>
                    <div className="item-title">{store.displayName}
                    </div>
                    <p className='store-address'> {store.address}</p>
                    <div className="item-status">
                        <span className="weight-text">
                            <p>In Stock by {store.availabilityDate}</p>
                        </span>
                    </div>
                    <div className='item-address'>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StoreList;