const faker = require('faker');
const jsonexport = require('jsonexport');
const arg = process.argv.slice(2);
const number = +arg[0];
const loc = arg[1];
const arr = [];
switch (loc) {
  case 'ru_RU':
    faker.locale = 'ru';
    break;
  case 'uk_UA':
    faker.locale = 'uk';
    break;
  default:
    faker.locale = 'en_US';
    break;
}

if (number >= 1000000) {
  for (let i = 0; i < number / 10; i++) {
    createArr();
  }
} else {
  for (let k = 0; k < number; k++) {
    createArr();
  }
}

function createArr() {
  arr.push(null);
}

const data = arr.map(() => {
  let random = Math.floor(Math.random() * 2) + 1;
  if (random === 1) {
    return {
      name: faker.fake('{{name.findName}} {{name.middleName}}'),
      country: faker.fake('{{address.country}}'),
      street: faker.fake('{{address.streetAddress}}'),
      zipcode: faker.fake('{{address.zipCode}}'),
      phone: faker.fake('{{phone.phoneNumberFormat}}'),
    };
  } else {
    return {
      name: faker.fake('{{name.findName}} {{name.middleName}}'),
      country: faker.fake('{{address.countryCode}}'),
      street: faker.fake('{{address.streetAddress}}'),
      zipcode: faker.fake('{{address.zipCode}}'),
      phone: faker.fake('{{phone.phoneNumberFormat}}'),
    };
  }
});

jsonexport(data, {rowDelimiter: ';'}, function(err, csv){
  if (err) return console.error(err);
  console.log(csv);
});