import styled from 'styled-components'

const RatingsStyle = {};

RatingsStyle.Wrapper = styled.div`
padding: 4em;
padding-bottom: 6em;
background: #1B1B1D;
display: grid;
width: 100%;
height: auto
`;

RatingsStyle.RatingsTitle = styled.div`
float: left;
color: #ffffff;
font-family: 'DINPro-Medium';
font-size: 24px;
`;

RatingsStyle.LineBreak = styled.hr`
display: block;
height: 1px;
border: 0;
border-top: 1px solid black;
margin: 1em 0;
margin-bottom: 25px;
padding: 0;
`;

RatingsStyle.MainContainer = styled.div`
display: table;
background-color: #1B1B1D;
width: 100%;
height: auto;
`;

RatingsStyle.RatingCircle = styled.div`
  margin-left: 60px;
  margin-right: 20px;
  display: table;
  float: left;
  height: 130px;
  width: 130px;
  border-radius: 50%;  
`;

RatingsStyle.CircleContent = styled.div`
display: table-cell; 
vertical-align: middle; 
text-align: center; 
font-family: 'DINPro-Medium';
margin: 0;
`;

RatingsStyle.ProgressBarContainer = styled.div`
display: table;
float: right;
margin-right: 500px;
height: auto;
width: 430px;
background-color: #1B1B1D;
`;

RatingsStyle.ProgressTitle = styled.div`
position: absolute;
left: 365px;
font-family: 'DINPro-Medium';
font-size: 13px;
`;

RatingsStyle.Meter = styled.div` 
	height: 6px; 
	position: relative;
    border-radius: 25px;
    margin-bottom: 20px;
`;

RatingsStyle.MeterLabel = styled.div`
    position: absolute;
    text-align: end;
    bottom: -4px;
    right: 0;
    font-family: 'DINPro-Medium';
    font-size: 13px;
    vertical-align: 0;
    left: 0;
`;

RatingsStyle.MeterSpan = styled.span`
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

  RatingsStyle.ArticleContainer = styled.div`
  float: right;
  height: 300px;
  width: 100%;
  background: #1B1B1D;
  `;

  export default RatingsStyle;