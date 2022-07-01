# Icon Ipsum

Lorem Ipsum, for icons.

## Usage EsModules

```
import { IconIpsum } from 'icon-ipsum'

const iconIpsum = new IconIpsum({ strokeWidth : 2, width: 64, height: 64 })
const svg = iconIpsum.icon()
```

## Usage CommonJS

```
const modulePromise = require('icon-ipsum')

modulePromise.then(({ IconIpsum }) => {
  const iconIpsum = new IconIpsum({ strokeWidth : 2, width: 64, height: 64 })
  const svg = iconIpsum.icon()
})

```
