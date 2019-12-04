import React from 'react';
import axios from 'axios';
import styled from 'styled-components'
import BuySummary from './BuySummary.jsx';
import SellSummary from './SellSummary.jsx';


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
  border-radius: 50%;  
`;

const CircleContent = styled.div`
display: table-cell; 
vertical-align: middle; 
text-align: center; 
font-family: 'DINPro-Medium';
margin: 0;
`;

const ProgressBarContainer = styled.div`
display: table;
float: right;
margin-right: 400px;
height: 200px;
width: 430px;
background-color: #1B1B1D;
`;

const ProgressTitle = styled.div`
text-align: start;
font-family: 'DINPro-Medium';
font-size: 13px;
`;

const Meter = styled.div` 
	height: 6px; 
	position: relative;
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
`;

const MeterSpan = styled.span`
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    position: relative;
    overflow: hidden;
    text-align: end;
    font-size: 13px;
  `;

  const ArticleContainer = styled.div`
  float: right;
  height: 300px;
  width: 100%;
  background: #1B1B1D;
  `;

class Ratings extends React.Component {
    constructor() {
        super();
        this.state = {
            currentData: {},
            color: 'white',
            circleColor: 'white',
        }
    }

    componentDidMount() {
        this.changeColor();
        axios.get('/ratings/5de381dbbdbfd8140c1dc3f6').then((response) => {
            this.setState({currentData: response.data});
        }).catch((err) => {
            console.log(err);
        })
    }
    changeColor() {
        var colors = [`#21CE99`, `#F45531`];
        var color = colors[Math.round(Math.random() * (1 - 0) + 0)];
        this.setState({color: color})

        if (color === `#21CE99`) {
            this.setState({circleColor: `rgb(33, 206, 153, .3)`}) 
        } else {
            this.setState({circleColor: `rgb(244, 85, 49, .3)`}) 
        }
    }
    

    render() {
        return (
            <Wrapper>
                <RatingsTitle>Analyst Ratings</RatingsTitle>
                <LineBreak />
                <MainContainer>
                <RatingCircle style={{background: this.state.circleColor}}>
                    <CircleContent style={{fontSize:'26px', color: this.state.color}}>{this.state.currentData.buyRating}
                    <div style={{fontSize:'13px'}}> of 43 ratings</div></CircleContent>
                </RatingCircle>
                
               <ProgressBarContainer>
               <span><ProgressTitle style={{color: this.state.color}}>Buy</ProgressTitle>
               <Meter style={{background: this.state.circleColor}}><MeterLabel style={{color: this.state.color}}>50%</MeterLabel>
               <MeterSpan style={{width: this.state.currentData.buyRating, background: this.state.color}}></MeterSpan>
               </Meter></span>
               
               <ProgressTitle style={{color: 'white'}}>Hold</ProgressTitle>
               <Meter style={{background: 'black'}}>
               <MeterSpan style={{width: this.state.currentData.HoldRating, background: 'white'}}></MeterSpan>
               </Meter>
             
               <ProgressTitle style={{color: 'white'}}>Sell</ProgressTitle>
               <Meter style={{background: 'black'}}>
               <MeterSpan style={{width: this.state.currentData.sellRating, background: 'white'}}></MeterSpan>
               </Meter>

               <ArticleContainer>
               <BuySummary summary={this.state.currentData.buySummary} color={this.state.color} />
               <SellSummary summary={this.state.currentData.sellSummary} color={this.state.color}/>
               </ArticleContainer>
        
               </ProgressBarContainer>


                </MainContainer>
               
                
            </Wrapper>
        )
    }
}

export default Ratings;
