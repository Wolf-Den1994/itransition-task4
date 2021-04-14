const faker = require('faker');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
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
  for (let i = 0; i < number / 100; i++) {
    createArr();
  }
} else if (number >= 100000) {
  for (let k = 0; k < number / 10; k++) {
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
      name: faker.fake('{{name.findName}} {{name.middleName}};'),
      country: faker.fake('{{address.country}};'),
      street: faker.fake('{{address.streetAddress}};'),
      zipcode: faker.fake('{{address.zipCode}};'),
      phone: faker.fake('{{phone.phoneNumberFormat}}'),
    };
  } else {
    return {
      name: faker.fake('{{name.findName}} {{name.middleName}};'),
      country: faker.fake('{{address.countryCode}};'),
      street: faker.fake('{{address.streetAddress}};'),
      zipcode: faker.fake('{{address.zipCode}};'),
      phone: faker.fake('{{phone.phoneNumberFormat}};'),
    };
  }
});

const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'country', title: 'Country' },
    { id: 'street', title: 'Street' },
    { id: 'zipcode', title: 'Zipcode' },
    { id: 'phone', title: 'Phone' },
  ],
});
csvWriter.writeRecords(data);

if (number >= 1000000) {
  for (let k = 0; k < number / 10000; k++) {
    readFileCsv();
  }
} else if (number >= 100000) {
  for (let k = 0; k < number / 1000; k++) {
    readFileCsv();
  }
} else if (number >= 10000) {
  for (let k = 0; k < number / 100; k++) {
    readFileCsv();
  }
} else {
  readFileCsv();
}

function readFileCsv() {
  const results = [];
  fs.createReadStream('out.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      while (results.length) {
        const out = results.pop();
        console.log(
          `${out.Name} ${out.Country} ${out.Street} ${out.Zipcode} ${out.Phone}`
        );
      }
    });
}
