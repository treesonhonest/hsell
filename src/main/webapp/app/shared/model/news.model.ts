import { Moment } from 'moment';

export interface INews {
  id?: number;
  title?: string;
  content?: string;
  top?: boolean;
  topTime?: string;
  createTime?: string;
  updateTime?: string;
  readCount?: number;
}

export const defaultValue: Readonly<INews> = {
  top: false,
};
