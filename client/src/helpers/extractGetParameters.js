function extractGetParameters(url) {
  const returnObj = {};
  const query = url.split("?")[1];
  const splittedQuery = query.split("&");
  splittedQuery.forEach(query => {
    const keyVal = query.split("=");
    returnObj[keyVal[0]] = keyVal[1];
  });
  return returnObj;
}
export default extractGetParameters;