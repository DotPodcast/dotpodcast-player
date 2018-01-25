const makeTypes = (typeStrings) => {
  let types = {};
  typeStrings.forEach((type) => {
    types[type] = type;
  })
  return types;
}

export default makeTypes;
