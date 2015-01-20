# Macropod Tools

dev server and build tools for macropod projects

## What's the problem?

Keeping the webpack configuration and build processes in line between our
products has been tricky. We've recently seen issues with source maps and 
performance that stemmed from different configurations being used in
react-playground, brief-client, and stack-client. This is only going to get
worse as we introduce more tooling around tests.

## How does this help?

This collection of configuration files and utility programs will provide two
things:

1. a similar configuration for webpack across all our projects
2. identical processes for making production builds, running tests, and running
   dev servers.

## What do I have to do?

If you're working on an existing project? Probably nothing. The processes are
already very similar between our projects, and this will just help to make sure
they're identical. The exception to this is if you see something that looks like
generic configuration or tooling and it's stuck in a single project, or worse,
duplicated across a multiplicity thereof. If this happens, feel free to log an
issue on this project so that it can be moved here and maintained in one place.

If you're starting a new project, things are a little bit more involved. See
[this issue](https://github.com/macropodhq/macropod-tools/issues/1) for progress
on this part of the documentation.
