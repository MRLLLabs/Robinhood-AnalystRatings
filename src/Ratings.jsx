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

        this.colors = {};
    }

    componentDidMount() {
        var colors = this.marketOpen();
        this.colors = colors; 
        this.changeColor();
        axios.get(`/ratings/getData${window.location.search}`).then((response) => {
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

        if (color === `#21CE99` && this.colors.fontColor === 'white') {
            this.setState({ circleColor: `rgb(33, 206, 153, .1)`, priceTag: 'black-green' })
        } else if (color === `#21CE99` && this.colors.fontColor !== 'white') {
                this.setState({ circleColor: `rgb(33, 206, 153, .1)`, priceTag:'white-green'  })
        } else if (color === `#F45531` && this.colors.fontColor === 'white') {
            this.setState({ circleColor: `rgb(244, 85, 49, .1)`, priceTag: 'black-red' })
        }
         else {
            this.setState({ circleColor: `rgb(244, 85, 49, .1)`, priceTag: 'white-red' })
        }
    }

    marketOpen() {
        const d = new Date();
        const totalMinutes = (d.getHours() * 60) + d.getMinutes();
        const colors = {};
        if (totalMinutes < 360 || totalMinutes >= 900) {
          colors.fontColor = 'white';
          colors.background = '#1B1A1D';
          colors.speechBubble = 'rgb(0,0,0, .3)';
          colors.meter = 'white';
          colors.lineBreak = 'black';
          colors.source = '#8c8c8e';
           
        } else {
          colors.fontColor = '#171718';
          colors.background = 'white';
          colors.speechBubble = 'rgb(237, 237, 237, .5)';
          colors.meter = 'black';
          colors.lineBreak =  'rgb(237, 237, 237, .5)';
          colors.source = '#c7c7c7';
          
        }
        return colors;
      }


    render() {
        return (
            <RatingsStyle.Wrapper style={{background: this.colors.background}}>
                <RatingsStyle.RatingsTitle style={{color: this.colors.fontColor}}>Analyst Ratings</RatingsStyle.RatingsTitle>
                <RatingsStyle.LineBreak style={{borderTop: `1px solid ${this.colors.lineBreak}`}} />
                <RatingsStyle.MainContainer style={{background: this.colors.background}}>
                    <RatingsStyle.RatingCircle style={{ background: this.state.circleColor }}>
                        <RatingsStyle.CircleContent style={{ fontSize: '26px', color: this.state.color }}>
                            <img src={`Ratings/${this.state.priceTag}-price.png`} style={{ background: this.state.color }}></img> {this.state.currentData.buyRating}
                            <div style={{ fontSize: '13px' }}> of 43 ratings</div></RatingsStyle.CircleContent>
                    </RatingsStyle.RatingCircle>

                    <RatingsStyle.ProgressBarContainer style={{background: this.colors.background}}>

                        <RatingsStyle.ProgressTitle style={{ color: this.state.color }}>Buy</RatingsStyle.ProgressTitle>
                        <RatingsStyle.Meter id="buy-rating" style={{ background: this.state.circleColor }}>
                            <RatingsStyle.MeterSpan style={{ width: this.state.currentData.buyRating, background: this.state.color }}></RatingsStyle.MeterSpan>
                            <RatingsStyle.MeterLabel style={{ color: this.state.color }}>{this.state.currentData.buyRating}</RatingsStyle.MeterLabel>
                        </RatingsStyle.Meter>


                        <RatingsStyle.ProgressTitle style={{ color: this.colors.fontColor }}>Hold</RatingsStyle.ProgressTitle>
                        <RatingsStyle.Meter id="hold-rating" style={{ background: this.colors.speechBubble }}>
                            <RatingsStyle.MeterSpan style={{ width: this.state.currentData.holdRating, background: this.colors.meter }}></RatingsStyle.MeterSpan>
                            <RatingsStyle.MeterLabel style={{ color: this.colors.fontColor }}>{this.state.currentData.holdRating}</RatingsStyle.MeterLabel>
                        </RatingsStyle.Meter>

                        <RatingsStyle.ProgressTitle style={{ color: this.colors.fontColor }}>Sell</RatingsStyle.ProgressTitle>
                        <RatingsStyle.Meter id="sell-rating" style={{ background: this.colors.speechBubble }}>
                            <RatingsStyle.MeterSpan style={{ width: this.state.currentData.sellRating, background: this.colors.meter }}></RatingsStyle.MeterSpan>
                            <RatingsStyle.MeterLabel style={{ color: this.colors.fontColor }}>{this.state.currentData.sellRating}</RatingsStyle.MeterLabel>
                        </RatingsStyle.Meter>

                        <RatingsStyle.ArticleContainer style={{background: this.colors.background}}>
                            <BuySummary summary={this.state.currentData.buySummary} color={this.state.color} theme={this.colors} />
                            <SellSummary summary={this.state.currentData.sellSummary} color={this.state.color} theme={this.colors} />
                        </RatingsStyle.ArticleContainer>

                    </RatingsStyle.ProgressBarContainer>


                </RatingsStyle.MainContainer>


            </RatingsStyle.Wrapper>
        )
    }
}

export default Ratings;
