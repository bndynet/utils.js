/* eslint-disable @typescript-eslint/no-explicit-any */
export function generateMockData(count: number, fields: string[] | { [key: string]: { type: string } }): any {
  if (!faker) {
    throw new Error('Require faker.js library.');
  }
  const result = [];
  const mapping: any = {
    // date: faker.date.past,
    name: faker.name.findName,
    gender: faker.name.gender,
    phone: faker.phone.phoneNumber,
    country: faker.address.country,
    city: faker.address.city,
    price: faker.commerce.price,
    number: faker.random.number,
    float: faker.random.float,
    boolean: faker.random.boolean,
    color: faker.internet.color,
    url: faker.internet.url,
    ip: faker.internet.ip,
    username: faker.internet.userName,
    password: faker.internet.password,
    avatar: faker.internet.avatar,
    email: faker.internet.exampleEmail,
  };
  for (let i = 0; i < count; i++) {
    const item: any = {};
    if (Array.isArray(fields)) {
      fields.forEach((f) => {
        item[f] = faker.random.words();
      });
    } else {
      Object.keys(fields).forEach((key: string) => {
        if (fields[key].type) {
          const fn = mapping[fields[key].type];
          if (typeof fn === 'function') {
            item[key] = fn();
          } else if (fields[key].type === 'date') {
            const stamp = parseInt(Date.now().toString());
            item[key] = new Date(stamp - (count - i) * 24 * 60 * 60 * 1000).toLocaleDateString();
          } else {
            item[key] = faker.random.words();
          }
        }
      });
    }
    result.push(item);
  }
  return result.length === 1 ? result[0] : result;
}
