import React from 'react';
import { shallow, mount, render } from 'enzyme';

import shopInfo from './shopInfo.jsx';

it('render', () => {
  const shop = {
    city: 'Portland, Oregon',
    name: 'Fun Pet Art',
    shop_image_url: null,
  }
  const wrapper = shallow(<shopInfo info={shop} />);
  expect(wrapper.find('.shopLocation').text()).toEqual(shop.city);
});
