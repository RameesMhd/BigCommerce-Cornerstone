import React, { useState } from "react";
import StoreList from './StoreList';
import './BestbuyModal.scss'

const BestbuyModal = (pageContext) => {
    const [modal, setModal] = useState(false);
    const [storeData, setStoreData] = useState(null);

    let myContext = pageContext.pageContext.getContext  // Get Context in myContext
    let productDetails = myContext.productData
    // AssigningS the card data based on the need
    let cartProductDetails = myContext.cartData
    var productSku;
    var productImageUrl;
    var productTitle;

    var bulkProductSkus = []; // Get all products SKUs in cart 
    if (cartProductDetails) {
        cartProductDetails.forEach(cartProduct => {
            productSku = cartProduct.sku
            productImageUrl = cartProduct.image.data.replace('{:size}', '300x300')
            productTitle = cartProduct.name
            bulkProductSkus.push(cartProduct.sku);
        });
    }

    const [panelItems, setPanelItems] = useState([]);
    const [cartProductName, setCartProductName] = useState();
    const [cartProductSku, setCartProductSku] = useState();
    const toggleModal = async () => {
        setModal(!modal);
        // Create Products for cart and pdp page panel
        const newPanelItems = [];
        if (myContext.productData) {
            var newPanelItem = (
                <div className={'panel-list-data'}>
                    <div className="item-img-box">
                        <img className="item-img" src={cartProductDetails ? productImageUrl : productDetails.images[0].data.replace('{:size}', '300x300')} alt="" />
                    </div>
                </div>
            );
            newPanelItems.push(newPanelItem);

        } else if (cartProductDetails) {
            cartProductDetails.forEach((cartProduct, index) => {
                var newCartPanelItem = (
                    <div key={`cart-item-${index}`} className={'panel-list-data'}>
                        <div className="item-img-box">
                            <img className="item-img" src={cartProduct.image.data.replace('{:size}', '300x300')} alt="" />
                        </div>
                    </div>
                );
                var prdNameInCart = cartProduct.name;
                var prdSkuInCart = cartProduct.sku;
                setCartProductName(prdNameInCart);
                setCartProductSku(prdSkuInCart);
                newPanelItems.push(newCartPanelItem);
            })
        }
        setPanelItems(newPanelItems);

        // ******************************************************************
        // ************ Fetch request from the cart page ********************
        // ******************************************************************

        if (cartProductDetails) {
            const baseUrl = 'http://127.0.0.1:5000/avail-bulk-sku'; // Local Url
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    postalCode: 78216,
                    productSkus: bulkProductSkus
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setStoreData(responseData)
                // console.log("Bulk Data", responseData);
            }
        } else if (myContext.productData) {

            // ************************************************************
            // ***** New fetch when click the pickup location option ******
            // ******************* from Pdp page **************************
            // ************************************************************

            const baseUrl = 'http://127.0.0.1:5000/avail-Sku-Postal'; // Local Url
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    postalCode: 78216,
                    productSku: productDetails.sku
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                setStoreData(responseData)
            }
        }
    };

    const [activeItem, setActiveItem] = useState(-1); // Initialize with the first item

    const handleItemClick = (itemIndex) => {
        if (activeItem !== itemIndex) {
            setActiveItem(itemIndex);
            if (cartProductDetails) {
                const cartProduct = cartProductDetails[itemIndex];
                setCartProductName(cartProduct?.name);
            }
        }
    };

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
                productSku: cartProductDetails ? cartProductDetails.productSku : productDetails.sku
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
                                    <div className={` first-item ${activeItem === -1 ? 'main-item-active ' : ''}`}
                                        onClick={() => handleItemClick(-1)}>
                                        <div className={'item-active first-item-content'}>
                                            All Eligible Items
                                        </div>
                                    </div>
                                    {/* Add the Panel Items here */}
                                    {
                                        panelItems.map((panelItem, index) => (
                                            <div
                                                key={index}
                                                className={`panel-list-item ${activeItem === index ? 'main-item-active' : ''}`} onClick={() => handleItemClick(index)}>
                                                {panelItem}
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                            <div className="panel-bottom-text"><strong>Pickup Location for : </strong>
                                <span>
                                    {activeItem === -1 ? 'All Eligible Items' : (myContext.productData ? myContext.productData.title : cartProductName)}
                                </span>
                            </div>
                        </div>

                        <div className="location-map-container">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d888813.1931412118!2d-99.55072402954099!3d29.518500480769003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865c60080b3a8683%3A0xa1efdeee07c5cf83!2sNorth%20Star%20Mall!5e0!3m2!1sen!2sin!4v1691132606327!5m2!1sen!2sin" width="100%" height="500px" loading="lazy" />

                            <div className="location-panel-pop">
                                <ul>
                                    <li>
                                        <StoreList stores={storeData ? storeData : []} />
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