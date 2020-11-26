import React from 'react';
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import Dashboard from '../views/Dashboard.jsx';
import fetchMock from "jest-fetch-mock";

var itemMetaUrl = 'https://bovisync.bitbucket.io/sample_data/item_meta.json'
    var pageMetaUrl = 'https://bovisync.bitbucket.io/sample_data/page_meta.json'
    var animalDataUrl = 'https://bovisync.bitbucket.io/sample_data/animal_data.json'

fetchMock.enableMocks();
beforeEach(() => {
    fetch.resetMocks();
  });



test('should test Dashboard a count', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("a").length).toEqual(1);
});

test('should test Dashboard img count', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("img").length).toEqual(2);
});

test('should test Dashboard p count', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("p").length).toEqual(3);
});

test('should test Dashboard label count', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("Label").length).toEqual(6);
});

test('should test Dashboard input count', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("Input").length).toEqual(6);
});

test('should test Dashboard card count', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    expect(wrapper.find("Card").length).toEqual(1);
});

test('should test Dashboard paragraph 1', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    render(<Dashboard />);
    const pElement = screen.getByText(/Welcome! Please specify your preferences below/i);
    expect(pElement).toBeInTheDocument();
});

test('should test Dashboard paragraph 2', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    render(<Dashboard />);
    const pElement = screen.getByText(/Hover over any table header to view the data item name. Hover over any table data item to view its description./i);
    expect(pElement).toBeInTheDocument();
});

test('should test Dashboard component snapshot', () => {
    
    fetch.mockReject(() => Promise.reject("API is down"));
 const wrapper = shallow(<Dashboard itemMetaUrl={itemMetaUrl} pageMetaUrl={pageMetaUrl} animalDataUrl={animalDataUrl} />);
 expect(wrapper).toMatchSnapshot();
 
});


test('should test Dashboard called fetch 3 times', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    render(<Dashboard />);
    expect(fetch).toHaveBeenCalledTimes(3);
});

test('should test Dashboard called fetch with item meta', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    render(<Dashboard itemMetaUrl={itemMetaUrl}/>);
    expect(fetch).toHaveBeenCalledWith(itemMetaUrl);
});

test('should test Dashboard called fetch with page meta', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    render(<Dashboard pageMetaUrl={pageMetaUrl} />);
    expect(fetch).toHaveBeenCalledWith(pageMetaUrl);
});

test('should test Dashboard called fetch with animal data', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    render(<Dashboard animalDataUrl={animalDataUrl} />);
    expect(fetch).toHaveBeenCalledWith(animalDataUrl);
});

test('should test Dashboard item meta length', () => {
    let itemMeta = [
        {
            "dataType": "Integer",
            "name": "Eartag",
            "tags": [],
            "aggregationFunction": "count",
            "shortName": "EART",
            "link": "/cowpage/id/ANIMALID/",
            "units": null,
            "description": "The animal's eartag number. Double clicking this cell will open the animal page."
          },
          {
            "dataType": "Integer",
            "name": "Pen",
            "tags": [],
            "aggregationFunction": null,
            "shortName": "Pen",
            "link": "",
            "units": null,
            "description": "The pen which the animal is in"
          },
    ]
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'itemMetaReconstruct')
    instance.itemMetaReconstruct(itemMeta);
    expect(Object.keys(instance.state.itemMeta).length).toEqual(2);
});


test('should test Dashboard input decimals onChange', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnChange')
    wrapper.find('#decimals').simulate('change', { target: { id: 'decimals', value: 5 } });
    expect(instance.state.decimals).toEqual(5);
});

test('should test Dashboard input decimals onChange', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnChange')
    wrapper.find('#decimals').simulate('change', { target: { id: 'decimals', value: 5 } });
    expect(instance.state.decimals).toEqual(5);
});

test('should test Dashboard input thresholdHigh onChange', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnChange')
    wrapper.find('#thresholdHigh').simulate('change', { target: { id: 'thresholdHigh', value: 5 } });
    expect(instance.state.thresholdHigh).toEqual(5);
});

test('should test Dashboard input thresholdLow onChange', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnChange')
    wrapper.find('#thresholdLow').simulate('change', { target: { id: 'thresholdLow', value: 5 } });
    expect(instance.state.thresholdLow).toEqual(5);
});

test('should test Dashboard input thresholdHigh onBlur after breaching the bounds', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnBlur')
    wrapper.find('#thresholdLow').simulate('change', { target: { id: 'thresholdLow', value: 10 } });
    wrapper.find('#thresholdHigh').simulate('blur', { target: { id: 'thresholdHigh', value: 5 } });
    expect(instance.state.thresholdLow).toEqual(5);
});

test('should test Dashboard input thresholdLow onBlur after breaching the bounds', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnBlur')
    wrapper.find('#thresholdHigh').simulate('change', { target: { id: 'thresholdHigh', value: 5 } });
    wrapper.find('#thresholdLow').simulate('blur', { target: { id: 'thresholdLow', value: 10 } });
    expect(instance.state.thresholdHigh).toEqual(10);
});

test('should test Dashboard input colorHigh onChange', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnChange')
    wrapper.find('#colorHigh').simulate('change', { target: { id: 'colorHigh', value: "Red" } });
    expect(instance.state.colorHigh).toEqual("Red");
});

test('should test Dashboard input colorLow onChange', () => {
    fetch.mockReject(() => Promise.reject("API is down"));
    const wrapper = shallow(<Dashboard />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'inputOnChange')
    wrapper.find('#colorLow').simulate('change', { target: { id: 'colorLow', value: "Green" } });
    expect(instance.state.colorLow).toEqual("Green");
});




