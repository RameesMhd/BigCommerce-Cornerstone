import React, { useState } from "react";
import './BestbuyModal.css'

const BestbuyModal = () => {
    const [modal, setModal] = useState(false);
    const [isActiveFirstItem, setIsActiveFirstItem] = useState(true);
    const [isActiveSecondItem, setIsActiveSecondItem] = useState(false);

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
    return (
        <>
            <div className="bby-wrapper-section">
                <div className="bby-content-text">
                    <img src="https://sadectip.sirv.com/Assets/store.svg" alt="" />
                    <p className="pick-up">
                        Store Pickup
                    </p>
                </div>
                <span> Ready Today at <strong >BEST BUY</strong> North Avenue</span>
                <a onClick={toggleModal} className="bby-btn-modal">
                    See all pickup locations
                </a>
            </div>


            {modal && (
                <div className="bby-location-popup">
                    <div onClick={toggleModal} className="bby-overlay"></div>
                    <div className="bby-popup-content">
                        <div className="panel-top-container">

                            <div className="pn-top-text">
                                Pickup Availability near <span className="postel-code">60654</span>
                            </div>

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
                                        <img className="item-img" src="https://sadectip.sirv.com/Assets/lenovo.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="panel-bottom-text"><strong>Pickup Location for : </strong>
                            <span>
                                All Eligible Items
                            </span>
                        </div>
                        <div className="location-map-container">
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate expedita
                                cumque praesentium voluptas hic nemo rerum veritatis, veniam obcaecati velit!
                                Possimus facilis reprehenderit iste odit!
                            </p>
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