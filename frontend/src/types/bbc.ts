export interface BBCArticle {
  url: string;
  title: string;
  date: string;
  writer: string;
  writerRoleLocation: string;
  imageSource: string;
  content: string[][][]; // 段落 > 文 > 単語
}

export interface BBCNewsListItem {
  url: string;
  title: string;
  summary: string;
  lastupdate: string;
}

export type BBCNewsListResponse = BBCNewsListItem[];
