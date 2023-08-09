import React from 'react';
import ReactDOM from 'react-dom';
import PageManager from '../../theme/page-manager';
import BestbuyIntegration from '../BestbuyIntegration';

class BopisMain extends PageManager {
    onReady() {
        ReactDOM.render(<BestbuyIntegration getContext={this.context} />, document.querySelector('#bestbuy_integration'));
    }
}

export default BopisMain;