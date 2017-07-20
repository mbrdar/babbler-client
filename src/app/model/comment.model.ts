export class Comment {
  id: string;
  nickname: string;
  content: string;
  datePosted: Date;

  constructor(comment: any) {
    this.id = comment.id;
    this.nickname = comment.nickname;
    this.content = comment.content;
    this.datePosted = comment.datePosted;
  }
}
