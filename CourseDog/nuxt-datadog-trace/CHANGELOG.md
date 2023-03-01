# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- ...

## [v0.1.2] - 1-11-2020

- Bump dd-trace to ^0.16.3

## [v0.1.1] - 1-11-2020

- Remove extraneous console.log

## [v0.1.0] - 1-11-2020

- Add support for module options in standard Nuxt style, e.g.
  - `['nuxt-datadog-trace', { hostname: 'localhost' }]`
- Default dd-trace to `localhost` hostname if `DATADOG_AGENT_HOST` ENV is falsey
- Fix service name defaulting to nuxt-datadog-trace. Now defaults to host app's [package.json].name property
- Add .prettierrc file

## [v0.0.4] - 5-26-2019

- Updated readme format + edited for clarity

## [v0.0.3] - 5-26-2019

- Add web URLs to `./package.json`

## [v0.0.2] - 5-26-2019

- Add readme and a changelog

## [v0.0.1] - 5-17-2019

- Initial bits! 🎉
