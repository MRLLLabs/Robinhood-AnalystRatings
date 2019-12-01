import React from 'react';
import axios from 'axios';

class Ratings extends React.Component {
    constructor() {
        super();
        this.state = {
            currentData: {}
        }
        this.getAnalystRatings = this.getAnalystRatings.bind(this);
    }

    getAnalystRatings() {
        //id will be dynamic
        axios.get('/ratings/5de381dbbdbfd8140c1dc3f6').then((response) => {
            this.setState({currentData: response.data});
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
              <div>Buy</div><div>{this.state.currentData.buyRating}</div>
              <div>Hold</div><div>{this.state.currentData.holdRating}</div>
              <div>Sell</div><div>{this.state.currentData.sellRating}</div>
              <div>Buy Summary</div><div>{this.state.currentData.buySummary}</div>
              <div>Sell Summary</div><div>{this.state.currentData.sellSummary}</div>
              <button onClick={this.getAnalystRatings}>Get Analyst Ratings</button>
            </div>
        )
    }
}

export default Ratings;