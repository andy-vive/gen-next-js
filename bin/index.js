#!/usr/bin/env node

const Promise = require('bluebird');
const program = require('commander');
const VERSION = require('../package').version;
const generator = require('../lib/generator');

program
  .name('gen-next-js')
  .version(VERSION, '--version')
  .option('--i18n', 'Generate NextJS app with i18n multilanguage configuration')
  .usage('<dir> <option>')
  .parse(process.argv);

function main() {
  const destPath = program.args.shift() || '.';
  if(program.i18n) return generator.generateWithI18n(destPath);
  return generator.generateDefault(destPath);
}

main();
