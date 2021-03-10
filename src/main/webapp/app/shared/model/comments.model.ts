import { Moment } from 'moment';
import { INews } from 'app/shared/model/news.model';

export interface IComments {
  id?: number;
  content?: string;
  name?: string;
  createTime?: string;
  updateTime?: string;
  news?: INews;
}

export const defaultValue: Readonly<IComments> = {};
