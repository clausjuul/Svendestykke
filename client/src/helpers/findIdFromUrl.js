export default (path) => {
    const placeOfId = path.lastIndexOf("-")
    const lengthOfParam = path.length
    return path.slice(placeOfId + 1, lengthOfParam)
  }