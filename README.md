# Macropod Tools

Development server and build tools for [webpack](http://webpack.github.io) and
[React](http://facebook.github.io/react/), used by
[Macropod](https://macropod.com/)'s products.

## What's the problem?

Keeping the webpack configuration and build processes in line between our
products has been tricky.

We've run into confusing issues which ultimately stemmed from the slightly
different configurations being used in [Stack](https://macropod.com/stack/),
[Macropod Components](https://github.com/macropodhq/macropod-components) and
[Brief](https://macropod.com/brief/).

We anticipate this getting more complex as we introduce more tooling, for things
like tests.

## What does it do?

This collection of configuration files and utility programs provide two things:

1. One baseline configuration for webpack across all our products.
2. Identical processes for making production builds, running tests, and running
   development servers.

## How do I use it in my project?

If you're starting a new project, things are a bit involved. See [this
issue](https://github.com/macropodhq/macropod-tools/issues/1) for progress on
this part of the documentation.

We currently have this built into Stack, Brief and Macropod Components.

If there's some specific tooling which is confined to a single project, or
worse, duplicated across several, feel free to log an issue on this project so
it can be moved here and maintained in one place.
