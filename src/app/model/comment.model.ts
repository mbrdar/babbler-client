export class Comment {
  id: string;
  newsId: string;
  newsTitle: string;
  nickname: string;
  content: string;
  datePosted: Date;

  constructor(comment?: any) {
    this.id = comment && comment.id || null;
    this.newsId = comment && comment.newsId || null;
    this.newsTitle = comment && comment.newsTitle || null;
    this.nickname = comment && comment.nickname || null;
    this.content = comment && comment.content || null;
    this.datePosted = comment && comment.datePosted || null;
  }
}
