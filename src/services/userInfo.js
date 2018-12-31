/* eslint-disable import/prefer-default-export */
import request from '../utils/request';

export async function queryUser(id) {
  return request(`/api/home/user?id=${id}`);
}
