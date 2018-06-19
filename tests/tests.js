const puppeteer = require('puppeteer');
const React =require('react');
const enzyme = require('enzyme');

const ShopInfo = require('./shopInfo.jsx');

const pageUrl = 'http://127.0.0.1:5000/47/';

let page;
let browser;
const width = 1200;
const height = 720;

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
});
afterAll(() => {
  browser.close();
});

describe('render data', () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  })
  test('render shop information', async () => {
     var div = '.shopLocation';
     const shopLocation = await page.$eval(div, e => e.textContent);
     expect(shopLocation).toContain(',');
  });
});

describe('handle search function', async () => {
  beforeEach(async () => {
    await page.goto(pageUrl, {waitUntil: 'networkidle2'});
  })

  test('can search for painting', async () => {
    var selector = 'input.form-control[type=text]';
    await page.click(selector);
    await page.type(selector, 'painting');

    var div = '.text-truncate';
    const productName = await page.$eval(div, e => e.textContent);
    expect(productName).toContain('painting');
  });
});

// it('render', () => {
//   const shop = {
//     city: 'Portland, Oregon',
//     name: 'Fun Pet Art',
//     shop_image_url: null,
//   }
//   const wrapper = shallow(<ShopInfo info={shop} />);
//   expect(wrapper.find('.shopLocation').text()).toEqual(shop.city);
// });

