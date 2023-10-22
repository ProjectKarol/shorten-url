import {
  Request
} from 'express';
import { Conversion } from '../../entity/Conversion.entity';
import { ConversionRepository } from '../../repository/Convert.repository';

export class ConvertService {
  constructor() { }
  conversionRepository = new ConversionRepository();
  async create(url: Request): Promise<string> {
    const urlPath = this.extractPathAndQuery(url.body);
    const deepLink = this.convertUrlToDeeplink(urlPath);

    const entity = new Conversion({
      webUrl: urlPath,
      deepLink: deepLink,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.conversionRepository.save(entity);
    return deepLink;
  }

  get = async (): Promise<void> => {
  }


  extractPathAndQuery(urlString: { url: string }): string {
    console.log(urlString);
    const url = new URL(urlString.url);
    return url.pathname + url.search;
  }

  convertUrlToDeeplink(url: string): string {
    // eslint-disable-next-line no-useless-escape
    const productDetailRegex = /\/([^\/]+)\/([^\/]+)-p-(\d+)\??(.*)$/;
    const searchPageRegex = /\/sr\?q=([^&]+)/;
    const productMatch = url.match(productDetailRegex);
    const searchMatch = url.match(searchPageRegex);

    if (productMatch) {
      const [, , , productId, queryStr] = productMatch;
      const params = new URLSearchParams(queryStr);
      const cityId = params.get('cityId');
      const clusterId = params.get('clusterId');
      let deeplink = `washmen://?Page=Product&ContentId=${productId}`;
      if (cityId) deeplink += `&CityId=${cityId}`;
      if (clusterId) deeplink += `&ClusterId=${clusterId}`;
      return deeplink;
    } else if (searchMatch) {
      const [, query] = searchMatch;
      return `washmen://?Page=Search&Query=${query}`;
    } else {
      return 'washmen://?Page=Home';
    }
  }
}
