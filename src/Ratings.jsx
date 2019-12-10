import React from 'react';
import axios from 'axios';
import RatingsStyle from './styled-components/Ratings-style'
import BuySummary from './BuySummary.jsx';
import SellSummary from './SellSummary.jsx';

class Ratings extends React.Component {
    constructor() {
        super();
        this.state = {
            currentData: {},
            color: 'white',
            circleColor: 'white',
            priceTag: ''
        }
    }

    componentDidMount() {
        this.changeColor();
        axios.get('/ratings/getData/1').then((response) => {
            this.setState({ currentData: response.data });
            var collapseBuy = document.getElementById("buy-collapse");
            collapseBuy.style.maxHeight = '0px';
            var collapseSell = document.getElementById("sell-collapse");
            collapseSell.style.maxHeight = '0px';
        }).catch((err) => {
        })
    }
    changeColor() {
        var colors = [`#21CE99`, `#F45531`];
        var color = colors[Math.round(Math.random() * (1 - 0) + 0)];
        this.setState({ color: color })

        if (color === `#21CE99`) {
            this.setState({ circleColor: `rgb(33, 206, 153, .1)`, priceTag: 'green' })
        } else {
            this.setState({ circleColor: `rgb(244, 85, 49, .1)`, priceTag: 'red' })
        }
    }


    render() {
        return (
            <RatingsStyle.Wrapper>
                <RatingsStyle.RatingsTitle>Analyst Ratings</RatingsStyle.RatingsTitle>
                <RatingsStyle.LineBreak />
                <RatingsStyle.MainContainer>
                    <RatingsStyle.RatingCircle style={{ background: this.state.circleColor }}>
                        <RatingsStyle.CircleContent style={{ fontSize: '26px', color: this.state.color }}>
                            <img src={`Ratings/${this.state.priceTag}-price.png`} style={{ background: this.state.color }}></img> {this.state.currentData.buyRating}
                            <div style={{ fontSize: '13px' }}> of 43 ratings</div></RatingsStyle.CircleContent>
                    </RatingsStyle.RatingCircle>

                    <RatingsStyle.ProgressBarContainer>

                        <RatingsStyle.ProgressTitle style={{ color: this.state.color }}>Buy</RatingsStyle.ProgressTitle>
                        <RatingsStyle.Meter id="buy-rating" style={{ background: this.state.circleColor }}>
                            <RatingsStyle.MeterSpan style={{ width: this.state.currentData.buyRating, background: this.state.color }}></RatingsStyle.MeterSpan>
                            <RatingsStyle.MeterLabel style={{ color: this.state.color }}>{this.state.currentData.buyRating}</RatingsStyle.MeterLabel>
                        </RatingsStyle.Meter>


                        <RatingsStyle.ProgressTitle style={{ color: 'white' }}>Hold</RatingsStyle.ProgressTitle>
                        <RatingsStyle.Meter id="hold-rating" style={{ background: 'black' }}>
                            <RatingsStyle.MeterSpan style={{ width: this.state.currentData.holdRating, background: 'white' }}></RatingsStyle.MeterSpan>
                            <RatingsStyle.MeterLabel style={{ color: 'white' }}>{this.state.currentData.holdRating}</RatingsStyle.MeterLabel>
                        </RatingsStyle.Meter>

                        <RatingsStyle.ProgressTitle style={{ color: 'white' }}>Sell</RatingsStyle.ProgressTitle>
                        <RatingsStyle.Meter id="sell-rating" style={{ background: 'black' }}>
                            <RatingsStyle.MeterSpan style={{ width: this.state.currentData.sellRating, background: 'white' }}></RatingsStyle.MeterSpan>
                            <RatingsStyle.MeterLabel style={{ color: 'white' }}>{this.state.currentData.sellRating}</RatingsStyle.MeterLabel>
                        </RatingsStyle.Meter>

                        <RatingsStyle.ArticleContainer>
                            <BuySummary summary={this.state.currentData.buySummary} color={this.state.color} />
                            <SellSummary summary={this.state.currentData.sellSummary} color={this.state.color} />
                        </RatingsStyle.ArticleContainer>

                    </RatingsStyle.ProgressBarContainer>


                </RatingsStyle.MainContainer>


            </RatingsStyle.Wrapper>
        )
    }
}

export default Ratings;
