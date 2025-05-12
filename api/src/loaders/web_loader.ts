import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { Document } from '@langchain/core/documents';

export async function loadWebPages(urls: string[]): Promise<Document[][]> {
  return Promise.all(urls.map(async url => {
    const cheerioLoader = new CheerioWebBaseLoader(url);
    const docs = await cheerioLoader.load();
    return docs;
  }));
}