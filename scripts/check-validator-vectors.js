'use strict';

// Exercise the same submit handler as the page using its published payload vectors.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const input = { value: '' };
const output = {
  children: [],
  set innerHTML(value) { this.children = []; },
  appendChild(child) { this.children.push(child); }
};
let submit;
const form = { addEventListener(event, handler) { if (event === 'submit') submit = handler; } };
const document = {
  getElementById(id) { return { 'validator-form': form, 'payload-input': input, 'validator-output': output }[id]; },
  querySelectorAll() { return []; },
  createElement() { return { appendChild() {} }; },
  createTextNode(text) { return { textContent: text }; }
};
vm.runInNewContext(fs.readFileSync('validator.js', 'utf8'), { document, TextEncoder });
assert.equal(typeof submit, 'function', 'validator submit handler was not registered');

const html = fs.readFileSync('vectors.html', 'utf8');
const payloadSection = html.split('<h2 id="ledger">')[0];
const vectorPattern = /<div class="vector">\s*<div class="vector-head"><strong>([VI]\d+)[\s\S]*?<span class="verdict (ok|bad)">[\s\S]*?<pre><code>([\s\S]*?)<\/code><\/pre>/g;
let count = 0;
let validCount = 0;
let invalidCount = 0;
for (const [, name, expected, payload] of payloadSection.matchAll(vectorPattern)) {
  input.value = payload.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
  submit({ preventDefault() {} });
  assert.equal(output.children[0]?.className, 'verdict-line ' + expected, name + ' verdict differs from vectors.html');
  count++;
  if (expected === 'ok') validCount++; else invalidCount++;
}
assert.ok(validCount && invalidCount, 'expected both valid and invalid payload vectors');
assert.equal(count, (payloadSection.match(/<div class="vector">/g) || []).length,
  'a published payload vector could not be parsed');
console.log(`Validated ${count} published payload vectors (${validCount} valid, ${invalidCount} invalid).`);
