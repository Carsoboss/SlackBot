# enumjs
enum for javascript, inspired from https://obaranovskyi.medium.com/using-enums-in-pure-javascript-9c03853c1ab7

## Installation

```bash
npm install --save @5x/enumjs
```

## Usage

Define enum constants:

```js
import Enum from '@5x/enumjs';

const roles = new Enum();
roles.defineEnumProperty('ADMIN', 'admin');
roles.defineEnumProperty('USER', 'user');
```

When you use `roles.ADMIN`, it will return `admin`.

You can futher define more proerties in every enum constant:

```js
roles.defineEnumProperty(
  'ADMIN',
  'admin',
  {
    permissons: ['manage_users', 'self_access']
  }
);
roles.defineEnumProperty(
  'USER',
  'user',
  {
    permissons: ['self_access']
  }
);
```

Then you can call `roles.getProp(roles.ADMIN)` to get properties in `roles.ADMIN`:

```js
roles.getProp(roles.ADMIN)
// return
// {
//   permissons: ['manage_users', 'self_access'],
//   value: 'admin',
// }
```

You can also use `roles.getProps()` to get array of all properties:

```js
roles.props()
// return
// [
//   {
//     permissons: ['manage_users', 'self_access'],
//     value: 'admin',
//   },
//   {
//     permissons: ['self_access'],
//     value: 'user',
//   },
// ];
```

Other useful method:

```js
roles.keys()
// reutrn ['ADMIN, 'USER']

roles.values()
// ['admin', 'user']
```
