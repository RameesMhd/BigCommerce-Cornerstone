import React from "react";
import BestbuyModal from "./Modal/BestbuyModal";

const BestbuyIntegration = (getContext) => {
    return (
        <>
            <BestbuyModal pageContext={getContext} />
        </>
    )
};

export default BestbuyIntegration;