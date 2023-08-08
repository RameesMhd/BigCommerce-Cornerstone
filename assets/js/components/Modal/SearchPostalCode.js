import React, { useState } from 'react';

function SearchPostalCode() {
    const [inputVisible, setInputVisible] = useState(false);
    const [inputData, setInputData] = useState('');
    const [error, setError] = useState('');

    const handleShowInput = () => {
        setInputVisible(true);
        setError('');
        setInputData('');
    };

    const handleSave = () => {
        if (inputData.trim() === '') {
            setError('Please enter a value');
            return;
        }

        // You can perform further actions with the entered data here

        setInputVisible(false);
    };

    const handleCancel = () => {
        setInputVisible(false);
        setError('');
        setInputData('');
    };

    return (
        <div className="search-postalcode">
            <a className='label-postalcode' onClick={handleShowInput}>Update Location</a>
            {inputVisible && (
                <div className='postalcode-entry'>
                    <input
                        className='input-postalcode'
                        type="text"
                        placeholder="Enter Postal Code"
                        value={inputData}
                        onChange={(e) => setInputData(e.target.value)}
                    />
                    {error && <p className='error-message' style={{ color: 'red' }}>{error}</p>}
                    <a className='save-postalcode' onClick={handleSave}>Save</a>
                    <a className='cancel-postalcode-entry' onClick={handleCancel}>Cancel</a>
                </div>
            )}
        </div>
    );
}

export default SearchPostalCode;
