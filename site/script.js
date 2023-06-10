axios.get('../README.md').then(function (response) {
  var converter = new showdown.Converter();
  document.getElementById('readme').innerHTML = converter.makeHtml(response.data);
});

axios.get('../CHANGELOG.md').then(function (response) {
  var converter = new showdown.Converter();
  document.getElementById('changelog-body').innerHTML = converter.makeHtml(response.data);
});

const seriesLabels= utils.test.generateData(4, {name: {type: 'faker.address.country'}}).map(item => item.name);
const data = utils.test.generateData(10, {
  dt: { type: 'faker.date.month' },
  d: { type: 'date' },
  array: { type: 'array'},
}).map(item => {
  const result = {
    ...item
  };
  const seriesValues = utils.test.generateData(seriesLabels.length, {v: {type: 'faker.random.number'}}).map(item => item.v);
  seriesLabels.forEach((label, index) => {
    result[label] = seriesValues[index];
  });
  return result;
});

console.log(data);