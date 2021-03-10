import { Moment } from 'moment';
import { IComments } from 'app/shared/model/comments.model';

export interface INews {
  id?: number;
  title?: string;
  content?: any;
  top?: boolean;
  topTime?: string;
  createTime?: string;
  updateTime?: string;
  readCount?: number;
  comments?: IComments[];
}

export const defaultValue: Readonly<INews> = {
  top: false,
};
