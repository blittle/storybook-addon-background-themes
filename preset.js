function config(entry = []) {
  return [
    ...entry,
    require.resolve('./dist/preset/addDecorator'),
    require.resolve('./dist/preset/addParameter'),
  ];
}

function managerEntries(entry = [], options) {
  return [...entry, require.resolve('./dist/register')];
}

module.exports = {
  managerEntries,
  config,
};
