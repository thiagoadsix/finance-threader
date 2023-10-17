interface StockNewsArticle {
  article_title: string;
  article_url: string;
  article_photo_url: string;
  source: string;
  post_time_utc: string;
}

export interface StockNewsResponse {
  symbol: string;
  type: string;
  news: StockNewsArticle[];
}
