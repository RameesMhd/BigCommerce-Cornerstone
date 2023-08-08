import React, { useState } from "react";
import StoreList from './StoreList';
import SearchPostalCode from "./SearchPostalCode";
import './BestbuyModal.css'

const BestbuyModal = () => {
    const [modal, setModal] = useState(false);
    const [isActiveFirstItem, setIsActiveFirstItem] = useState(true);
    const [isActiveSecondItem, setIsActiveSecondItem] = useState(false);

    const storesData = {
        "ispuEligible": true,
        "stores": [
            {
                "storeID": "201",
                "name": "North Star",
                "address": "125 NW Loop 410",
                "city": "San Antonio",
                "state": "TX",
                "postalCode": "78216",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 1.20
            },
            {
                "storeID": "1082",
                "name": "Legacy",
                "address": "2003 N Loop 1604 E",
                "city": "San Antonio",
                "state": "TX",
                "postalCode": "78232",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 5.30
            },
            {
                "storeID": "864",
                "name": "La Cantera",
                "address": "17414 La Cantera",
                "city": "San Antonio",
                "state": "TX",
                "postalCode": "78257",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 7.50
            },
            {
                "storeID": "152",
                "name": "San Antonio Ingram",
                "address": "6001 NW Loop 410",
                "city": "San Antonio",
                "state": "TX",
                "postalCode": "78238",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 8.00
            },
            {
                "storeID": "181",
                "name": "Forum",
                "address": "8210 Agora Pkwy",
                "city": "Selma",
                "state": "TX",
                "postalCode": "78154",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": true,
                "distance": 10.50
            },
            {
                "storeID": "1459",
                "name": "Alamo Ranch",
                "address": "5419 W Loop 1604 N",
                "city": "San Antonio",
                "state": "TX",
                "postalCode": "78253",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 13.10
            },
            {
                "storeID": "1081",
                "name": "City Base",
                "address": "3142 SE Military Dr",
                "city": "San Antonio",
                "state": "TX",
                "postalCode": "78223",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 13.60
            },
            {
                "storeID": "828",
                "name": "San Marcos",
                "address": "1050 McKinley Place Dr",
                "city": "San Marcos",
                "state": "TX",
                "postalCode": "78666",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 39.20
            },
            {
                "storeID": "2516",
                "name": "Southpark Meadows",
                "address": "9600 S Interstate 35",
                "city": "Austin",
                "state": "TX",
                "postalCode": "78748",
                "storeType": "Big_Box_Store",
                "minPickupHours": null,
                "lowStock": false,
                "distance": 60.30
            }
        ]
    }
    const toggleModal = () => {
        setModal(!modal);
    };

    // const divCount = 5;
    // const divArray = Array.from({ length: divCount }, (_, index) => index + 1);
    const toggleActiveClass = (item) => {
        if (item === 'first') {
            setIsActiveFirstItem(true);
            setIsActiveSecondItem(false);
        } else {
            setIsActiveFirstItem(false);
            setIsActiveSecondItem(true);
        }

    }
    return (
        <>
            <div className="bby-wrapper-section">
                <div className="bby-content-text">
                    <img src="https://sadectip.sirv.com/Assets/store.svg" alt="" />
                    <p className="pick-up">
                        Store Pickup
                    </p>
                </div>
                <span> Ready  at <strong >BEST BUY</strong> Stores</span>
                <a onClick={toggleModal} className="bby-btn-modal">
                    See all pickup locations
                </a>
            </div>


            {modal && (
                <div className="bby-location-popup">
                    <div onClick={toggleModal} className="bby-overlay"></div>
                    <div className="bby-popup-content">
                        <div className="bby-top-section">
                            <div className="panel-top-container">

                                <div className="pn-top-text">
                                    Pickup Availability near <span className="postel-code">78216</span>
                                </div>
                                <SearchPostalCode />

                            </div>
                            <div className="panel-list-content">
                                <div className={isActiveFirstItem ? 'main-item-active first-item' : 'first-item'} onClick={() => toggleActiveClass('first')}>
                                    <div className={isActiveFirstItem ? 'item-active first-item-content' : 'first-item-content'}>
                                        All Eligible Items
                                    </div>
                                </div>
                                <div className={isActiveSecondItem ? 'main-item-active second-item' : 'second-item'} onClick={() => toggleActiveClass('second')}>
                                    <div className={isActiveSecondItem ? 'item-active second-item-content' : 'second-item-content'}>
                                        <div className="item-img-box">
                                            <img className="item-img" src="https://sadectip.sirv.com/Assets/622.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="panel-bottom-text"><strong>Pickup Location for : </strong>
                                <span>
                                    {isActiveFirstItem ? 'All Eligible Items' : '622GW Dash Cam'}
                                </span>
                            </div>
                        </div>

                        <div className="location-map-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d888813.1931412118!2d-99.55072402954099!3d29.518500480769003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c60080b3a8683%3A0xa1efdeee07c5cf83!2sNorth%20Star%20Mall!5e0!3m2!1sen!2sin!4v1691132606327!5m2!1sen!2sin" width="100%" height="500px" loading="lazy" />

                            <div className="location-panel-pop">
                                <ul>
                                    <li>
                                        <StoreList stores={storesData.stores} />
                                    </li>

                                    {/* {divArray.map((number) => (
                                        <li>
                                            <div className="lc-item-box">
                                                <div className="item-distance-box">
                                                    <div className="item-number">{number}</div>
                                                    <div className="item-distance" data-tkey="number.miles.away">1.7 Miles Away</div>
                                                </div>
                                                <div className="item-title">Best Buy Store, North Avenue
                                                </div>
                                                <div className="item-status">
                                                    <span className="weight-text"
                                                    >In Stock,
                                                    </span>
                                                    <span >Ready Today</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))} */}
                                </ul>
                            </div>
                        </div>
                        <button className="close-modal" onClick={toggleModal}>
                            <img src="https://sadectip.sirv.com/Assets/close.svg" alt="" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default BestbuyModal;