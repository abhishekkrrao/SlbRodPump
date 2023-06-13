export const AppInfo = {
  baseUrlAPI: 'https://jsonplaceholder.typicode.com/posts'
};
function createUrl(actionName) {
  return `${AppInfo.baseUrlAPI}/${actionName}`;
}
export const apis = {
  getRequest: 'GET',
  postRequest: 'POST',
  deleteRequest: 'DELETE',
  putRequest: 'PUT',
  baseURL: AppInfo.baseUrlAPI,
  url: createUrl('')
};
