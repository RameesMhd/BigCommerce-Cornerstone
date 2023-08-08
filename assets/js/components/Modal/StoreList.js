import React from 'react';
import './BestbuyModal.css';
const StoreList = ({ stores }) => {
    return (
        <div>
            {stores.map((store, index) => (
                <div className="lc-item-box">
                    <div className="item-distance-box">
                        <div className="item-number">{index + 1}</div>
                        <div className="item-distance" data-tkey="number.miles.away">{store.distance} Miles Away</div>
                    </div>
                    <div className="item-title">{store.name}
                    </div>
                    <p className='store-address'>{store.address}</p>
                    <div className="item-status">
                        <span className="weight-text"
                        >{store.lowStock ? <p>Low Stock</p> : <p>In Stock</p>}
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