
// Sort array random //
export const sortRandom = (arr) => {
  return arr.sort(() => 0.5 - Math.random())
}


// let unshuffled = ["hello", "a", "t", "q", 1, 2, 3, { cats: true }];

// let shuffled = unshuffled
//   .map(a => ({ sort: Math.random(), value: a }))
//   .sort((a, b) => a.sort - b.sort)
//   .map(a => a.value);