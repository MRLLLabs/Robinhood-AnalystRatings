import React from 'react';
import styled from 'styled-components'

const BuySpeechBubble = styled.div `
    background-color: rgb(255,255,255, .3);
    width: 170px;
    height: auto;
    text-align: left;
    padding: 20px;
    float: left;
    margin-right: 10px;
    position: absolute;
    
  `;

  const SpeechBubbleArrow = styled.div`
  border-style: solid;
  position: absolute;
  border-color: rgb(255,255,255, .3) transparent transparent rgb(255,255,255, .3);
  border-width: 20px 20px 0px 2px;
  bottom: -20px;
  left: 0px;
  `;

  const RatingSummaryTitle = styled.div`
  font-family: 'DINPro-Medium';
  font-size: 13px;
  margin-bottom: 5px;
  `;

  const RatingSummaryBody = styled.div`
  font-family: 'DINPro-Regular';
  font-size: 13px;
  `;

  const ReadMore = styled.div`
  font-family: 'DINPro-Medium';
  font-size: 13px;
  margin-bottom: 20px;
  `;

  const Source = styled.div`
  font-family: 'DINPro-Medium';
  font-size: 13px;
  color: black;
  margin-bottom: 20px;
  `;

  class BuySummary extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              readMore: false,
          }
          this.readClicked = this.readClicked.bind(this);
      }

      readClicked() {
        this.setState({readMore: !this.state.readMore})
        
      }

      read() {
        if(!this.state.readMore) {
            if(this.props.summary) {
                return(
                    <div>
                    <RatingSummaryBody>
                        "{this.props.summary.split(' ').splice(0,8).join(' ')}"
                    </RatingSummaryBody>
                        <ReadMore onClick={this.readClicked} style={{color: this.props.color}}>
                           Read More
                    </ReadMore>
                    <Source>Morningstar</Source>
                    </div>
                    
                )
            } else {
                return(
                    null
                )
            }
        } else {
            return(
                <div>
                <RatingSummaryBody>
                    "{this.props.summary}"
                </RatingSummaryBody>
                <ReadMore onClick={this.readClicked} style={{color: this.props.color}}>
                     Read Less
                </ReadMore>
                <Source>Morningstar</Source>
                </div>
            )
        }
    }



      render() {
          return(
            <BuySpeechBubble>
            <RatingSummaryTitle>
                Buy Summary
            </RatingSummaryTitle>
            {this.read()}
            <SpeechBubbleArrow />
        </BuySpeechBubble>   
          )
      }
  }

  export default BuySummary;