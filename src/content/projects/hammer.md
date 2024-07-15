---
title: "hammer"
summary: "deployment helper tool"
date: 2024-07-14
githubUrl: https://github.com/matfire/hammer
stack:
- go
---

I recently started tinkering around with [Laravel](https://laravel.com) and, when came the time to actually deploy it I kind of was too lazy to bother running all the optimization commands and all that stuff; also, turns out that day I didn't want to write a Dockerfile. So, I decided to build a tool to run these commands for me (spoiler: this took longer than writing a Dockerfile would have taken)

Hammer is a small go program that runs an http server and parses a toml configuration file. When a Github webhook is sent to the program, it will:
- try to match it to a configured project
- verify the secret in the request headers's validity
- pull the latest changes from the project's repository
- checkout the released tag
- run all the configured commands

It does all of this in under 10 Megabytes (and it could probably be a lot less) and without requiring any extra tooling on the machine it runs on.

Hammer is released using [goreleaser](https://goreleaser.com) and is available as archives on [Github](https://github.com/matfire/hammer) and on Homebrew
