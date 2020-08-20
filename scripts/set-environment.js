#!/bin/node
const fs = require("fs")
const env = process.argv[2]
let envFile = require(`../envs/${env}.json`)
fs.writeFileSync("src/env.json", JSON.stringify(envFile.app, undefined, 2))