import React from 'react';
import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme';
import Section from '../components/Section.jsx';

test('should test Section component empty', () => {
    render(<Section
        headerName={""}
        items={[]}
        itemMeta={{}}
        animalData={{}}
    />);
    const pElement = screen.getByText(/Unable to retrieve data/i);
    expect(pElement).toBeInTheDocument();
});

test('should test Section renders a table', () => {
    const wrapper = shallow(<Section
        headerName={""}
        items={[]}
        itemMeta={{}}
        animalData={{data1: "someData"}}
    />);
    expect(wrapper.find("Table").length).toEqual(1);
});

test('should test Section renders a table with 1 th and 1 td', () => {
    const wrapper = shallow(<Section
        headerName={""}
        items={["data1"]}
        itemMeta={{data1: {name: "data1", description: "some description"}}}
        animalData={{data1: "someData"}}
    />);
    expect(wrapper.find("th").length).toEqual(1);
    expect(wrapper.find("td").length).toEqual(1);
});

test('should test Section caculateNumericalThreshold() to be below threshold', () => {

    const wrapper = shallow(<Section
        headerName={""}
        items={["data1"]}
        itemMeta={{data1: {name: "data1", description: "some description"}}}
        animalData={{data1: "someData"}}
        colorLow={"Red"}
        colorHigh={"Green"}
        thresholdLow={10}
        thresholdHigh={20}
    />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'caculateNumericalThreshold')
    let color = instance.caculateNumericalThreshold(5);
    expect(color).toEqual("red");
});

test('should test Section caculateNumericalThreshold() to be above threshold', () => {

    const wrapper = shallow(<Section
        headerName={""}
        items={["data1"]}
        itemMeta={{data1: {name: "data1", description: "some description"}}}
        animalData={{data1: "someData"}}
        colorLow={"Red"}
        colorHigh={"Green"}
        thresholdLow={10}
        thresholdHigh={20}
    />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'caculateNumericalThreshold')
    let color = instance.caculateNumericalThreshold(25);
    expect(color).toEqual("green");
});

test('should test Section getDataElement() to equal a test element', () => {

    const wrapper = shallow(<Section
        headerName={""}
        items={["data1"]}
        itemMeta={{data1: {name: "data1", description: "some description"}}}
        animalData={{data1: 5}}
        colorLow={"Red"}
        colorHigh={"Green"}
        thresholdLow={10}
        thresholdHigh={20}
    />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'getDataElement')
    instance.getDataElement("data1");
    
    expect(wrapper.find('td span').prop('style')).toHaveProperty('color', 'red')
});
