import 'jsdom-global/register';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import Ratings from '../src/Ratings'
import RatingsStyle from '../src/styled-components/Ratings-style'


Enzyme.configure({ adapter: new Adapter() });

describe('Analyst Ratings', () => {

    const companyData = {
        "company" : "DuBuque, Fisher and Armstrong", 
        "buySummary" : "Odit qui enim enim accusamus numquam suscipit deleniti officiis autem. Fugit labore aut id aut qui quae sunt reiciendis. Fugit consequatur eos tempora nulla suscipit facere consequatur culpa. Earum laudantium nisi. Explicabo magnam odio esse quia. Id dolore odio adipisci quia sit minima est in.", 
        "sellSummary" : "Blanditiis sed consequatur qui quia cupiditate enim. Asperiores qui nostrum voluptas est nesciunt unde. Est explicabo quo sequi nesciunt. Dolore fugiat dolore reprehenderit. Rerum nostrum voluptatem distinctio laboriosam.", 
        "sellRating" : "48%", 
        "buyRating" : "4%", 
        "holdRating" : "19%"
    };

    it('should display the title of the section', () => {
        const wrapper = shallow(<Ratings />, { disableLifecycleMethods: true });
        expect(wrapper.containsMatchingElement('Analyst Ratings')).toBe(true);
    })

    it('should display the buy rating inside of the circle container', () => {
        const wrapper = mount(<Ratings />);
        wrapper.setState({
            currentData: companyData,
        })
        const ratingCircle = wrapper.find(RatingsStyle.RatingCircle);
        expect(ratingCircle.containsMatchingElement('4%')).toBe(true);
    })

    it('should display Buy Rating progress bar', () => {
        const wrapper = mount(<Ratings/>);
        wrapper.setState({
            currentData: companyData
        })
        expect(wrapper.find("#buy-rating").exists()).toBe(true);
    })

    it('should display Hold Rating progress bar', () => {
        const wrapper = mount(<Ratings/>);
        wrapper.setState({
            currentData: companyData
        })
        expect(wrapper.find("#hold-rating").exists()).toBe(true);
    })

    it('should display Sell Rating progress bar', () => {
        const wrapper = mount(<Ratings/>);
        wrapper.setState({
            currentData: companyData
        })
        expect(wrapper.find("#sell-rating").exists()).toBe(true);
    })

    it('should display Article Summary section', () => {
        const wrapper = mount(<Ratings/>);
        wrapper.setState({
            currentData: companyData
        })
        expect(wrapper.find(RatingsStyle.ArticleContainer).exists()).toBe(true);
    })

    it('should display an Article Summary', () => {
        const wrapper = mount(<Ratings/>);
        wrapper.setState({
            currentData: companyData
        })

        expect(wrapper.find(RatingsStyle.ArticleContainer).children().length).toBe(1);
    })
  

})
