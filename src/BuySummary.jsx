import React from 'react';
import BuySummaryStyle from './styled-components/BuySummary-style';

  class BuySummary extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              readMore: false,
          }
          this.readClicked = this.readClicked.bind(this);
          this.pointer = this.pointer.bind(this);
      }

      readClicked(e) {
        this.setState({readMore: !this.state.readMore})
        var collapse = document.getElementById("buy-collapse");

        if (collapse.style.maxHeight) {
            collapse.style.maxHeight = null;
            e.target.innerHTML = "Read More"    
        } else {
            collapse.style.maxHeight = collapse.scrollHeight + 'px';
            e.target.innerHTML = "Read Less"
        }  
        
      }

      pointer(e) {
        e.target.style.cursor = 'pointer';
    }

      read() {
        if(this.props.summary) {
            var info;
            var hiddenInfo = this.props.summary.split('.').splice(2,100).join('.');
            if (this.state.readMore === false) {
                info = this.props.summary.split('.').splice(0,2).join('.') + '."';
            } else {
                info = this.props.summary.split('.').splice(0,2).join('.') + '.';
            }
            return(
                <div>
                <BuySummaryStyle.RatingSummaryBody>
                    "{info}
                </BuySummaryStyle.RatingSummaryBody>
                <BuySummaryStyle.RatingSummaryHiddenBody id="buy-collapse">
                    <br /> {hiddenInfo}"
                </BuySummaryStyle.RatingSummaryHiddenBody>
                    <BuySummaryStyle.ReadMore onClick={this.readClicked} onMouseOver={this.pointer} style={{color: this.props.color}}>
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