# nuxt-datadog-trace

A module to add `dd-trace` / Datadog APM tracing to your Nuxt application. Captures requests passing
through the Nuxt instance / `http` module in Node.js.

**Note:** This module is in alpha stages at the moment, and doesn't yet provide an interface to the `dd-trace` scope manager.

# Installation

1. Install npm package

```sh
$ yarn add nuxt-datadog-trace # or npm i nuxt-datadog-trace
```

2. Edit your `nuxt.config.js` file to add module

```js
export default {
  modules: ['nuxt-datadog-trace']
}
```

3. Change options as needed. See Usage section for details.

# Usage

1. Configure `dd-trace` instance by adding `datadogTrace` to `nuxt.config.js`.
   - Learn [more about `dd-trace` options](https://datadog.github.io/dd-trace-js/interfaces/traceroptions.html)

```js
export default {
  datadogTrace: {
    hostname: 'cool.net',
    logInjection: false
    // ...
  }
}
```

2. By default, `nuxt-datadog-trace` is configured like so:

```js
export default {
  datadogTrace: {
    hostname: process.env.DD_AGENT_HOST || 'localhost',
    env: process.env.DD_ENV,
    service: process.env.DD_SERVICE || `host app's [package.json].name property`,
    logInjection: true,
    ...yourOverrides
  }
}
```

# [Changelog](./CHANGELOG.md)
