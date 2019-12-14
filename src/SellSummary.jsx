import React from 'react';
import SellSummaryStyle from './styled-components/SellSummary-style';


class SellSummary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false,
        }

        this.readClicked = this.readClicked.bind(this);
        this.pointer = this.pointer.bind(this);
    }

    readClicked(e) {
        e.preventDefault();
        this.setState({ readMore: !this.state.readMore })
        var collapse = document.getElementById("sell-collapse");

        if (collapse.style.maxHeight !== '0px') {
            collapse.style.maxHeight = '0px';
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
        if (this.props.summary) {
            var info = this.props.summary.split('.').splice(0, 2).join('.') + '.';
            var hiddenInfo = this.props.summary.split('.').splice(2, 100).join('.');

            return (
                <div>
                    <SellSummaryStyle.RatingSummaryBody style={{color: this.props.theme.fontColor}}>
                        "{info}
                    </SellSummaryStyle.RatingSummaryBody>
                    <SellSummaryStyle.RatingSummaryHiddenBody id="sell-collapse" style={{color: this.props.theme.fontColor}}>
                        <br /> {hiddenInfo}"
                    </SellSummaryStyle.RatingSummaryHiddenBody>
                    <SellSummaryStyle.ReadMore onClick={this.readClicked} onMouseOver={this.pointer} style={{ color: this.props.color }}>
                        Read More
                    </SellSummaryStyle.ReadMore>
                    <SellSummaryStyle.Source style={{color: this.props.theme.source}}>Morningstar</SellSummaryStyle.Source>
                </div>

            )
        } else {
            return (
                null
            )
        }
    }



    render() {
        return (
            <div>
                <SellSummaryStyle.SellSpeechBubble style={{backgroundColor: this.props.theme.speechBubble}}>
                    <SellSummaryStyle.RatingSummaryTitle style={{color: this.props.theme.fontColor}}>
                        Sell Summary
          </SellSummaryStyle.RatingSummaryTitle>
                    {this.read()}
                    <SellSummaryStyle.SpeechBubbleArrow style={{borderColor: `${this.props.theme.speechBubble} transparent transparent ${this.props.theme.speechBubble}`}}/>
                </SellSummaryStyle.SellSpeechBubble>
            </div>
        )
    }
}

export default SellSummary;