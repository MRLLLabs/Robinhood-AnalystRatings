import 'jsdom-global/register';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import BuySummary from '../src/BuySummary'
import BuySummaryStyle from '../src/styled-components/BuySummary-style'

Enzyme.configure({ adapter: new Adapter() });

describe('Buy Summary', () => {

    const summaryProp = "Odit qui enim enim accusamus numquam suscipit deleniti officiis autem. Fugit labore aut id aut qui quae sunt reiciendis. Fugit consequatur eos tempora nulla suscipit facere consequatur culpa. Earum laudantium nisi. Explicabo magnam odio esse quia. Id dolore odio adipisci quia sit minima est in.";
    const colorProp = 'white'

    it('should have readMore state set to false when component first renders', () => {
        const wrapper = mount(<BuySummary />);
        expect(wrapper.state().readMore).toBe(false);
    })

    it('should have a color prop passed down from parent', () => {
      const wrapper = mount(<BuySummary summary={summaryProp} color={colorProp}/>)
      expect(wrapper.props().color).toBe("white");
    })

    it('should have a summary prop passed down from parent', () => {
        const wrapper = mount(<BuySummary summary={summaryProp} color={colorProp}/>)
        expect(wrapper.props().summary).toBe(summaryProp);
      })

      it('should have readMore state set to true when Read More is clicked', () => {
        const wrapper = mount(<BuySummary summary={summaryProp} color={colorProp}/>);
        wrapper.setState({
          readMore: false
        })
        wrapper.find(BuySummaryStyle.ReadMore).simulate('click');
        expect(wrapper.state().readMore).toBe(true);
    })

      it('should render the rest of the summary when Read More is clicked', () => {
        const wrapper = mount(<BuySummary summary={summaryProp} />);
        wrapper.setState({
            readMore: false
          })
          var before = wrapper.find(BuySummaryStyle.RatingSummaryBody).html();
          wrapper.find(BuySummaryStyle.ReadMore).simulate('click');
          var after = wrapper.find(BuySummaryStyle.RatingSummaryBody).html();
          expect(before === after).toBe(false);
    })
})