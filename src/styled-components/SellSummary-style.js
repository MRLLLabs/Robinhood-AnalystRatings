import styled from 'styled-components'

const SellSummaryStyle = {};

SellSummaryStyle.SellSpeechBubble = styled.div`
    background-color: rgb(0,0,0, .3);
    width: 170px;
    height: auto;
    text-align: left;
    padding: 20px;
    float: right;
    position: absolute;
    margin-left: 225px;

  `;

SellSummaryStyle.SpeechBubbleArrow = styled.div`
  border-style: solid;
  position: absolute; 
  border-color: rgb(0,0,0, .3) transparent transparent rgb(0,0,0, .3);
  border-width: 20px 20px 0px 2px;
  bottom: -20px;
  left: 0px;
  `;

SellSummaryStyle.RatingSummaryTitle = styled.div`
  font-family: 'DINPro-Medium';
  font-size: 13px;
  margin-bottom: 5px;
  color: white;
  `;

SellSummaryStyle.RatingSummaryBody = styled.div`
  display: inline;
  font-family: 'DINPro-Regular';
  font-size: 13px;
  color: white;
  margin-bottom: 4px
  `;

SellSummaryStyle.RatingSummaryHiddenBody = styled.div`
  font-family: 'DINPro-Regular';
  font-size: 13px;
  color: white;
  overflow: hidden;
  max-height: 0px;
  transition: max-height 0.2s ease-out;
  margin-bottom: 4px;
  `;

SellSummaryStyle.ReadMore = styled.div`
  font-family: 'DINPro-Medium';
  font-size: 13px;
  margin-bottom: 20px;
  `;

SellSummaryStyle.Source = styled.div`
  font-family: 'DINPro-Medium';
  font-size: 13px;
  color: #8c8c8e;
  margin-bottom: 20px;
  `;

export default SellSummaryStyle;