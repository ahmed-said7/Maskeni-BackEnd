import { FindQuery } from 'src/common/types';

export class LikesQueryDto extends FindQuery {
  post: string;
}
