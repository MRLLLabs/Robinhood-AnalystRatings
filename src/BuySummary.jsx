import React from 'react';
import BuySummaryStyle from './styled-components/BuySummary-style';

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
                    <BuySummaryStyle.RatingSummaryBody>
                        "{this.props.summary.split(' ').splice(0,8).join(' ')}"
                    </BuySummaryStyle.RatingSummaryBody>
                        <BuySummaryStyle.ReadMore onClick={this.readClicked} style={{color: this.props.color}}>
                           Read More
                    </BuySummaryStyle.ReadMore>
                    <BuySummaryStyle.Source>Morningstar</BuySummaryStyle.Source>
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
                <BuySummaryStyle.RatingSummaryBody>
                    "{this.props.summary}"
                </BuySummaryStyle.RatingSummaryBody>
                <BuySummaryStyle.ReadMore onClick={this.readClicked} style={{color: this.props.color}}>
                     Read Less
                </BuySummaryStyle.ReadMore>
                <BuySummaryStyle.Source>Morningstar</BuySummaryStyle.Source>
                </div>
            )
        }
    }



      render() {
          return(
            <BuySummaryStyle.BuySpeechBubble>
            <BuySummaryStyle.RatingSummaryTitle>
                Buy Summary
            </BuySummaryStyle.RatingSummaryTitle>
            {this.read()}
            <BuySummaryStyle.SpeechBubbleArrow />
        </BuySummaryStyle.BuySpeechBubble>   
          )
      }
  }

  export default BuySummary;