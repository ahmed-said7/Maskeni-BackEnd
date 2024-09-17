import { FindQuery } from 'src/common/types';

export class CommentQueryDto extends FindQuery {
  post: string;
}
