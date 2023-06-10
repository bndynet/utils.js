/* eslint-disable @typescript-eslint/no-explicit-any */
export enum MockDataType {
  Date = 'faker.date.past',
  Month = 'faker.date.month',
  Weekday = 'faker.date.weekday',

  UUID = 'faker.datatype.uuid',
  Boolean = 'faker.datatype.boolean',
  Json = 'faker.datatype.json',
  Array = 'faker.datatype.array',

  Gender = 'faker.name.gender',

  Phone = 'faker.phone.phoneNumber',

  Country = 'faker.address.country',
  CountryCode = 'faker.address.countryCode',
  City = 'faker.address.city',

  Product = 'faker.commerce.product',
  Price = 'faker.commerce.price',

  DateTime = 'faker.datatype.datetime',
  String = 'faker.datatype.string',
  Number = 'faker.datatype.number',
  Float = 'faker.datatype.float',

  Color = 'faker.internet.color',
  Url = 'faker.internet.url',
  Ip = 'faker.internet.ip',
  Username = 'faker.internet.userName',
  Password = 'faker.internet.password',
  Avatar = 'faker.internet.avatar',
  Email = 'faker.internet.email',
  DomainName = 'faker.internet.domainName',
}

export function generateData(count: number, fields: string[] | { [key: string]: { type: MockDataType } }): any {
  if (!faker) {
    throw new Error('Require faker.js library.');
  }
  const result = [];
  for (let i = 0; i < count; i++) {
    const item: any = {};
    if (Array.isArray(fields)) {
      fields.forEach((f) => {
        item[f] = faker.random.words();
      });
    } else {
      Object.keys(fields).forEach((key: string) => {
        if (fields[key].type) {
          console.log(MockDataType);
          const ftype = fields[key].type;
          console.log(ftype);
          const type = Object.values(MockDataType).includes(ftype) ? ftype : MockDataType[(Object.keys(MockDataType).find((key) => key.toLowerCase() === ftype.toLowerCase()) || '') as keyof typeof MockDataType];
          const fn = eval(type);
          if (typeof fn === 'function') {
            item[key] = fn();
          } else if (fn === 'date') {
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
