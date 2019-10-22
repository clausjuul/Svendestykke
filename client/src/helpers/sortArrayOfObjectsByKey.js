
// Sort array of objects by key in asc or desc //
// how to: array.sort(compareValues('band', 'desc'));    
export default (arr, val, by) => {
  // const compareValues = (key, order='asc') => {
  const compareValues = (key, order) => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || 
      !b.hasOwnProperty(key)) {
        return 0; 
      }
      
      const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];
      
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? 
        (comparison * -1) : comparison
      );
    };
  }
  // console.log('val: ', val)
  // console.log('by: ', by)
  // {console.log('arrTYPE: ', arr)}
  // {console.log('arr: ', typeof arr)}
  // if(arr == null || undefined) {
  //   return
  // }
    return arr.sort(compareValues(val, by));
}


//sort & put in array of arrays by key
// getGroupedBy(persons, key) {
//     var groups = {}, result = [];
//     persons.forEach(function (a) {
//         if (!(a[key] in groups)) {
//             groups[a[key]] = [];
//             result.push(groups[a[key]]);
//         }
//         groups[a[key]].push(a);
//     });
//     return result;
// }