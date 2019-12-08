import 'jsdom-global/register';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import SellSummary from '../src/SellSummary'
import SellSummaryStyle from '../src/styled-components/SellSummary-style'

Enzyme.configure({ adapter: new Adapter() });

describe('Sell Summary', () => {

    const summaryProp = "Odit qui enim enim accusamus numquam suscipit deleniti officiis autem. Fugit labore aut id aut qui quae sunt reiciendis. Fugit consequatur eos tempora nulla suscipit facere consequatur culpa. Earum laudantium nisi. Explicabo magnam odio esse quia. Id dolore odio adipisci quia sit minima est in.";
    const colorProp = 'white'

    it('should have readMore state set to false when component first renders', () => {
        const wrapper = mount(<SellSummary />);
        expect(wrapper.state().readMore).toBe(false);
    })

    it('should have a color prop passed down from parent', () => {
      const wrapper = mount(<SellSummary summary={summaryProp} color={colorProp}/>)
      expect(wrapper.prop('color')).toBe("white");
    })

    it('should have a summary prop passed down from parent', () => {
        const wrapper = mount(<SellSummary summary={summaryProp} color={colorProp}/>)
        expect(wrapper.prop('summary')).toBe(summaryProp);
    })

    it('should have readMore state set to true when Read More is clicked', () => {
        const wrapper = mount(<SellSummary summary={summaryProp} color={colorProp}/>);
        wrapper.setState({
          readMore: false
        })
        wrapper.find(SellSummaryStyle.ReadMore).simulate('click');
        expect(wrapper.state().readMore).toBe(true);
    })

    it('should render the rest of the summary when Read More is clicked', () => {
        const wrapper = mount(<SellSummary summary={summaryProp} />);
        wrapper.setState({
            readMore: false
          })
          var before = wrapper.find(SellSummaryStyle.RatingSummaryBody).html();
          wrapper.find(SellSummaryStyle.ReadMore).simulate('click');
          var after = wrapper.find(SellSummaryStyle.RatingSummaryBody).html();
          expect(before === after).toBe(false);
    })
})