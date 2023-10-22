import { ConvertService } from './Convert.service';

describe('convertUrlToDeeplink', () => {



  test('converts product detail page URL with cityId and clusterId', () => {
    //given
    const url = 'https://www.washmen.com/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw';
    const convertUrlToDeeplink = new ConvertService().convertUrlToDeeplink;
    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw';
    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts product detail page URL without cityId and clusterId', () => {
    //given
    const url = 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501';
    const convertUrlToDeeplink = new ConvertService().convertUrlToDeeplink;
    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501';
    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts product detail page URL with only cityId', () => {
    //given
    const url = 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501?cityId=994892-asda0-123-asdqw';
    const convertUrlToDeeplink = new ConvertService().convertUrlToDeeplink;
    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw';
    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts product detail page URL with only clusterId', () => {
    //given
    const url = 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501?clusterId=439892';
    const convertUrlToDeeplink = new ConvertService().convertUrlToDeeplink;
    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501&ClusterId=439892';
    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts search page URL with special characters to deeplink', () => {
    //given
    const url = 'https://www.washmen.com/sr?q=%C3%BCt%C3%BC'
    const convertUrlToDeeplink = new ConvertService().convertUrlToDeeplink;
    //when
    const expected = 'washmen://?Page=Search&Query=%C3%BCt%C3%BC';
    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test.each([
    'https://www.washmen.com/account/favorites',
    'https://www.washmen.com/account/#/orders',
    'https://www.washmen.com/some-random-page'
  ])('converts %s to empty homepage deeplink', (url) => {
    //given

    const expected = 'washmen://?Page=Home';
    //when
    const convertService = new ConvertService();
    //then
    expect(convertService.convertUrlToDeeplink(url)).toBe(expected);
  });
});

