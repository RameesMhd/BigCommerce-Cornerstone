import React, { useState } from "react";
import StoreList from './StoreList';
import './BestbuyModal.css'

const BestbuyModal = (pageContext) => {
    const [modal, setModal] = useState(true);
    const [isActiveFirstItem, setIsActiveFirstItem] = useState(true);
    const [isActiveSecondItem, setIsActiveSecondItem] = useState(false);

    let myContext = pageContext.pageContext.getContext  // Get Context in myContext
    let productDetails = myContext.productData
    // var storesData = {
    //     "stores": [
    //         {
    //             "storeID": "201",
    //             "name": "North Star",
    //             "address": "125 NW Loop 410",
    //             "city": "San Antonio",
    //             "state": "TX",
    //             "postalCode": "78216",
    //             "storeType": "Big_Box_Store",
    //             "minPickupHours": null,
    //             "lowStock": false,
    //             "distance": 1.20
    //         },
    //         {
    //             "storeID": "1082",
    //             "name": "Legacy",
    //             "address": "2003 N Loop 1604 E",
    //             "city": "San Antonio",
    //             "state": "TX",
    //             "postalCode": "78232",
    //             "storeType": "Big_Box_Store",
    //             "minPickupHours": null,
    //             "lowStock": false,
    //             "distance": 5.30
    //         },
    //         {
    //             "storeID": "864",
    //             "name": "La Cantera",
    //             "address": "17414 La Cantera",
    //             "city": "San Antonio",
    //             "state": "TX",
    //             "postalCode": "78257",
    //             "storeType": "Big_Box_Store",
    //             "minPickupHours": null,
    //             "lowStock": false,
    //             "distance": 7.50
    //         }
    //     ]
    // }
    var storesData = {
        "pickupAvailabilities": [
            {
                "availabilityDate": "2023-08-11",
                "distanceInMiles": 11111,
                "fulfillmentMode": "PICKUP",
                "locationCriterion": "BEST",
                "locationId": "Test JSON Data",
                "pickupReadyInMinutes": 120
            },
            {
                "availabilityDate": "2023-08-14",
                "distanceInMiles": 11111,
                "fulfillmentMode": "PICKUP",
                "locationCriterion": "NEAREST",
                "locationId": "Test JSON Data"
            },
            {
                "availabilityDate": "2023-08-11",
                "distanceInMiles": 11111,
                "fulfillmentMode": "PICKUP",
                "locationCriterion": "FASTEST",
                "locationId": "Test JSON Data",
                "pickupReadyInMinutes": 120
            }
        ],
        "search": {
            "countryCode": "US",
            "postalCode": "94901",
            "skuId": "6346988"
        }
    }
    const toggleModal = () => {
        setModal(!modal);
    };

    const toggleActiveClass = (item) => {
        if (item === 'first') {
            setIsActiveFirstItem(true);
            setIsActiveSecondItem(false);
        } else {
            setIsActiveFirstItem(false);
            setIsActiveSecondItem(true);
        }

    }

    // ***************** Update Location ******************
    const [inputVisible, setInputVisible] = useState(false);
    const [inputPostal, setInputData] = useState('');
    const [error, setError] = useState('');
    const [isPanelVisible, setPanelVisible] = useState(true);
    const [isCancel, setCancel] = useState(false);
    const handleShowInput = () => {
        setInputVisible(true);
        setError('');
        setInputData('');
        setPanelVisible(false);
        setCancel(true);
    };

    const [storeData, setStoreData] = useState(null);

    const handleSave = async () => {

        if (inputPostal.trim() === '') {
            setError('Please enter a value');
            return;
        }

        // const baseUrl = 'https://bb-nb-bopis-middleware-5f718f91dc1a.herokuapp.com/getData'; // Heroku Url
        const baseUrl = 'http://127.0.0.1:5000/avail-Sku-Postal'; // Local Url
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                postalCode: inputPostal,
                productSku: productDetails.sku
            }),
        });

        if (response.ok) {
            const responseData = await response.json();
            setStoreData(responseData)
        }
    };

    const handleCancel = () => {
        setInputVisible(false);
        setError('');
        setInputData('');
        setPanelVisible(true);
        setCancel(false);
    };

    const inputDataHandler = (event) => {
        setInputData(event.target.value)
        setError(false)
        // Prevent taking charectors from the input field.
        const sanitizedValue = event.target.value.replace(/\D/g, '').slice(0, 5);
        setInputData(sanitizedValue);
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
                                    Pickup Availability near <span className="postel-code">78216 / 94901</span>
                                </div>
                                <div className="top-buttons">
                                    <a className='label-postalcode' onClick={handleShowInput}>Update Location</a>
                                    {isCancel && (<a className='cancel-postalcode-entry' onClick={handleCancel}>Cancel</a>)}
                                </div>
                            </div>

                            {/* Update Location Section Starts Here */}
                            <div className="search-postalcode">

                                {inputVisible && (
                                    <div className='postalcode-entry'>
                                        <div className="input-error">
                                            <input
                                                className='input-postalcode'
                                                type="text"
                                                placeholder="Enter Postal Code"
                                                maxLength={5}
                                                value={inputPostal}
                                                onChange={inputDataHandler}
                                            />
                                            {error && <p className='error-message' style={{ color: 'red' }}>{error}</p>}
                                        </div>
                                        <a className='save-postalcode' onClick={handleSave} >Save</a>
                                    </div>
                                )}
                            </div>

                            {isPanelVisible && (
                                <div className="panel-list-content">
                                    <div className={isActiveFirstItem ? 'main-item-active first-item' : 'first-item'} onClick={() => toggleActiveClass('first')}>
                                        <div className={isActiveFirstItem ? 'item-active first-item-content' : 'first-item-content'}>
                                            All Eligible Items
                                        </div>
                                    </div>
                                    <div className={isActiveSecondItem ? 'main-item-active second-item' : 'second-item'} onClick={() => toggleActiveClass('second')}>
                                        <div className={isActiveSecondItem ? 'item-active second-item-content' : 'second-item-content'}>
                                            <div className="item-img-box">
                                                <img className="item-img" src={productDetails.images[0].data.replace('{:size}', '300x300')} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="panel-bottom-text"><strong>Pickup Location for : </strong>
                                <span>
                                    {isActiveFirstItem ? 'All Eligible Items' : productDetails.title}
                                </span>
                            </div>
                        </div>

                        <div className="location-map-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d888813.1931412118!2d-99.55072402954099!3d29.518500480769003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c60080b3a8683%3A0xa1efdeee07c5cf83!2sNorth%20Star%20Mall!5e0!3m2!1sen!2sin!4v1691132606327!5m2!1sen!2sin" width="100%" height="500px" loading="lazy" />

                            <div className="location-panel-pop">
                                <ul>
                                    <li>
                                        <StoreList stores={storeData ? storeData.pickupAvailabilities : []} />
                                    </li>
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