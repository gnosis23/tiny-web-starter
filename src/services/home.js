/* eslint-disable import/prefer-default-export */
import request from '../utils/request';

export async function queryUserList() {
  return request('/api/home/userList');
}
