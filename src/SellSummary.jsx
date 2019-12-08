import React from 'react';
import SellSummaryStyle from './styled-components/SellSummary-style'

  class SellSummary extends React.Component {
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
                    <SellSummaryStyle.RatingSummaryBody>
                        "{this.props.summary.split(' ').splice(0,8).join(' ')}"
                    </SellSummaryStyle.RatingSummaryBody>
                        <SellSummaryStyle.ReadMore onClick={this.readClicked} style={{color: this.props.color}}>
                           Read More
                    </SellSummaryStyle.ReadMore>
                    <SellSummaryStyle.Source>Morningstar</SellSummaryStyle.Source>
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
                <SellSummaryStyle.RatingSummaryBody>
                    "{this.props.summary}"
                </SellSummaryStyle.RatingSummaryBody>
                <SellSummaryStyle.ReadMore onClick={this.readClicked} style={{color: this.props.color}}>
                     Read Less
                </SellSummaryStyle.ReadMore>
                <SellSummaryStyle.Source>Morningstar</SellSummaryStyle.Source>
                </div>
            )
        }
    }

     

    render() {
        return(
          <SellSummaryStyle.SellSpeechBubble>
          <SellSummaryStyle.RatingSummaryTitle>
              Sell Summary
          </SellSummaryStyle.RatingSummaryTitle>
          {this.read()}
          <SellSummaryStyle.SpeechBubbleArrow />
      </SellSummaryStyle.SellSpeechBubble>   
        )
    }
}

export default SellSummary;