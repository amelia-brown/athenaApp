import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import ArticlesDisplay from '../components/Articles/Articles.js'

describe('<ArticlesDisplay />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<ArticlesDisplay />);
    expect(ArticlesDisplay.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
