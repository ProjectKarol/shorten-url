import { ConvertService } from './Convert.service';
import { ConversionRepository } from '../../repository/Convert.repository';
import {
  Request
} from 'express';

describe('convertUrlToDeeplink', () => {
  let convertUrlToDeeplink: (url: string) => string;

  beforeEach(() => {
    convertUrlToDeeplink = new ConvertService().convertUrlToDeeplink;
  });
  test('converts product detail page URL with cityId and clusterId', () => {
    //given
    const url = 'https://www.washmen.com/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw';

    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw';
    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts product detail page URL without cityId and clusterId', () => {
    //given
    const url = 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501';

    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501';

    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts product detail page URL with only cityId', () => {
    //given
    const url = 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501?cityId=994892-asda0-123-asdqw';

    //when
    const expected = 'washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw';

    //then
    expect(convertUrlToDeeplink(url)).toBe(expected);
  });

  test('converts product detail page URL with only clusterId', () => {
    //given
    const url = 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501?clusterId=439892';

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


  it('should extract path and query from URL', () => {
    // given
    const url = { url: 'https://www.washmen.com/Clean-and-Press/Shirts-p-1894501?clusterId=439892' };
    const convertService = new ConvertService();

    // when
    const result = convertService.extractPathAndQuery(url);

    // then
    expect(result).toEqual('/Clean-and-Press/Shirts-p-1894501?clusterId=439892');
  });

});





describe('getDeepLink', () => {

  let convertService: ConvertService;

  beforeEach(() => {
    convertService = new ConvertService();
  });
  it('should return "Not Found" if entity is not found', async () => {
    // given
    const url = { query: { deeplink: 'washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw' } };
    jest.spyOn(convertService.conversionRepository, 'getByContractorData').mockResolvedValueOnce(null);

    // when
    const result = await convertService.getDeepLink(url as unknown as Request);

    // then
    expect(result).toBe(null);
  });

});



describe('createDeepLink', () => {

  let convertService: ConvertService;

  beforeEach(() => {
    convertService = new ConvertService();
    convertService.conversionRepository = {
      repository: null,
      getByContractorData: null,
      cleanupDatabase: null,
      save: jest.fn(),
    } as unknown as ConversionRepository;
  });

  it('should create a new Conversion entity and return the deep link', async () => {
    // given
    const url = {
      body: {
        url: "https://www.washmen.com/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw",
      }
    };
    const expectedDeepLink = 'washmen://?Page=Product&ContentId=1894501&CityId=994892-asda0-123-asdqw';
    jest.spyOn(convertService, 'extractPathAndQuery')
    jest.spyOn(convertService, 'convertUrlToDeeplink')

    // when
    const result = await convertService.createDeepLink(url as unknown as Request);

    // then
    expect(convertService.extractPathAndQuery).toHaveBeenCalledWith(url.body);
    expect(convertService.convertUrlToDeeplink).toHaveBeenCalledWith('/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw');
    expect(convertService.conversionRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        webUrl: '/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw',
        deepLink: expectedDeepLink,
      })
    );
    expect(result).toBe(expectedDeepLink);
  });

  it('should throw an error if the conversion entity cannot be saved', async () => {
    // given
    const url = {
      body: {
        url: "https://www.washmen.com/clean-and-press/shirts-p-1894501?cityId=994892-asda0-123-asdqw",
      }
    };

    jest.spyOn(convertService, 'extractPathAndQuery');
    jest.spyOn(convertService, 'convertUrlToDeeplink');
    (convertService.conversionRepository.save as jest.Mock).mockRejectedValueOnce(new Error('Failed to save entity'));
    // when
    const promise = convertService.createDeepLink(url as unknown as Request);


    // then
    await expect(promise).rejects.toThrow('Failed to save entity');
  });
});