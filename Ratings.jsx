import React from 'react';
import axios from 'axios';
import styled from 'styled-components'

const changeColor = () => {
    var colors = [`#21CE99`, `#F45531`];
    return colors[Math.round(Math.random() * (1 - 0) + 0)]
}

const color = changeColor();

const changeCircleColor = () => {
    if (color === `#21CE99`) {
        return `rgb(33, 206, 153, .3)`
    } else {
        return `rgb(244, 85, 49, .3)`
    }
}

const circleColor = changeCircleColor();

const Wrapper = styled.div`
padding: 4em;
background: #1B1B1D;
display: grid;
`;

const RatingsTitle = styled.div`
float: left;
color: #ffffff;
font-family: 'DINPro-Medium';
font-size: 24px;
`;

const LineBreak = styled.hr`
display: block;
height: 1px;
border: 0;
border-top: 1px solid black;
margin: 1em 0;
margin-bottom: 25px;
padding: 0;
`;

const MainContainer = styled.div`
display: table;
background-color: #1B1B1D;
width: 100%;
height: 200px;
`;

const RatingCircle = styled.div`
  margin-left: 60px;
  display: table;
  float: left;
  height: 130px;
  width: 130px;
  background-color: ${circleColor};
  border-radius: 50%;  
`;

const CircleContent = styled.div`
display: table-cell; 
vertical-align: middle; 
text-align: center; 
font-family: 'DINPro-Medium';
color: ${color};
margin: 0;
`;

const ProgressBarContainer = styled.div`
display: table;
float: right;
margin-right: 250px;
height: 200px;
width: 400px;
background-color: #1B1B1D;
`;

const ProgressTitle = styled.div`
text-align: start;
color: ${color};
font-family: 'DINPro-Medium';
font-size: 13px;
`;

const Meter = styled.div` 
	height: 6px; 
	position: relative;
	background: ${circleColor};
    border-radius: 25px;
    margin-bottom: 20px;
`;

const MeterLabel = styled.div`
    position: absolute;
    text-align: end;
    top: 10px;
    left: 0;
    right: 0;
    font-family: 'DINPro-Medium';
    font-size: 13px;
    color: ${color}

`;

const MeterSpan = styled.span`
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background: ${color};
    position: relative;
    overflow: hidden;
    text-align: end;
    font-size: 13px;
  `;


class Ratings extends React.Component {
    constructor() {
        super();
        this.state = {
            currentData: {}
        }
    }

    componentDidMount() {
        axios.get('/ratings/5de381dbbdbfd8140c1dc3f6').then((response) => {
            this.setState({currentData: response.data});
            console.log(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <Wrapper>
                <RatingsTitle>Analyst Ratings</RatingsTitle>
                <LineBreak />
                <MainContainer>
                <RatingCircle>
                    <CircleContent style={{fontSize:'26px'}}>{this.state.currentData.buyRating}
                    <div style={{fontSize:'13px'}}> of 43 ratings</div></CircleContent>
                </RatingCircle>
                
               <ProgressBarContainer>
               <span><ProgressTitle>Buy</ProgressTitle>
               <Meter><MeterLabel>50%</MeterLabel>
               <MeterSpan style={{width: this.state.currentData.buyRating}}></MeterSpan>
               </Meter></span>
               
               <ProgressTitle style={{color: 'white'}}>Hold</ProgressTitle>
               <Meter style={{background: 'black'}}>
               <MeterSpan style={{width: this.state.currentData.HoldRating, background: 'white'}}></MeterSpan>
               </Meter>
             
               <ProgressTitle style={{color: 'white'}}>Sell</ProgressTitle>
               <Meter style={{background: 'black'}}>
               <MeterSpan style={{width: this.state.currentData.sellRating, background: 'white'}}>{this.state.currentData.sellRating}</MeterSpan>
               </Meter>
               </ProgressBarContainer>


                </MainContainer>
                
            </Wrapper>
        )
    }
}

export default Ratings;

{/* <div>
              <div>Buy</div><div>{this.state.currentData.buyRating}</div>
              <div>Hold</div><div>{this.state.currentData.holdRating}</div>
              <div>Sell</div><div>{this.state.currentData.sellRating}</div>
              <div>Buy Summary</div><div>{this.state.currentData.buySummary}</div>
              <div>Sell Summary</div><div>{this.state.currentData.sellSummary}</div>
              <button onClick={this.getAnalystRatings}>Get Analyst Ratings</button>
            </div> */}