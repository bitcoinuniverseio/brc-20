/* BRC-20 inscription payload validator.
   Runs entirely in this page. Pasted text is never sent anywhere, stored,
   or logged. Rule references (R1, R3, ...) point at spec.html on this site.
   Rules revision: site spec 1.0.0, classic BRC-20 plus the 5-byte self_mint
   extension, Bitcoin mainnet. */
(function () {
  'use strict';

  var form = document.getElementById('validator-form');
  if (!form) return;

  var input = document.getElementById('payload-input');
  var out = document.getElementById('validator-output');
  var UINT64_MAX = 18446744073709551615n;
  var AMOUNT_RE = /^(0|[1-9]\d*)(?:\.(\d+))?$/;
  var KNOWN = ['p', 'op', 'tick', 'max', 'lim', 'amt', 'dec', 'self_mint'];

  function check(status, rule, message) {
    return { status: status, rule: rule, message: message };
  }

  function byteLength(s) {
    return new TextEncoder().encode(s).length;
  }

  function describeType(v) {
    if (v === null) return 'null';
    if (Array.isArray(v)) return 'an array';
    return 'a JSON ' + typeof v;
  }

  /* Returns {ok, value, checks} for a field that must be a JSON string. */
  function stringField(obj, key, required, checks, ruleId) {
    if (!(key in obj)) {
      if (required) {
        checks.push(check('fail', ruleId, '"' + key + '" is missing. This operation requires it.'));
      }
      return null;
    }
    var v = obj[key];
    if (typeof v === 'number') {
      checks.push(check('fail', 'R3', '"' + key + '": ' + JSON.stringify(v) +
        ' is a JSON number. Every BRC-20 field value must be a JSON string. Write "' + key +
        '": "' + String(v) + '" instead. Unquoted numbers are the single most common invalid-payload mistake.'));
      return null;
    }
    if (typeof v !== 'string') {
      checks.push(check('fail', 'R3', '"' + key + '" is ' + describeType(v) +
        '. Every BRC-20 field value must be a JSON string.'));
      return null;
    }
    return v;
  }

  /* Validates the shared amount grammar. Returns trimmed-fraction parts or null. */
  function amountValue(key, raw, checks) {
    var m = AMOUNT_RE.exec(raw);
    if (!m) {
      var hint = '';
      if (/^\./.test(raw)) hint = ' A leading digit is required: write "0' + raw + '".';
      else if (/\.$/.test(raw)) hint = ' A trailing decimal point is not allowed.';
      else if (/^0\d/.test(raw)) hint = ' Leading zeros are not allowed.';
      else if (/[+-]/.test(raw)) hint = ' Signs are not allowed.';
      else if (/[eE]/.test(raw)) hint = ' Exponent notation is not allowed.';
      else if (/,/.test(raw)) hint = ' Thousands separators are not allowed.';
      else if (/\s/.test(raw)) hint = ' Whitespace inside the value is not allowed.';
      checks.push(check('fail', 'R11', '"' + key + '": "' + raw +
        '" does not match the amount grammar (0|[1-9][0-9]*)(.[0-9]+)? .' + hint));
      return null;
    }
    var intPart = m[1];
    var fraction = (m[2] || '').replace(/0+$/, '');
    if (intPart === '0' && fraction === '') {
      checks.push(check('fail', 'R9', '"' + key + '" must be positive. Zero is not a valid value.'));
      return null;
    }
    if (BigInt(intPart) > UINT64_MAX) {
      checks.push(check('fail', 'R9', '"' + key + '" exceeds the uint64 maximum ' +
        '(18446744073709551615). Indexers apply uint-safe arithmetic and treat larger values as invalid.'));
      return null;
    }
    return { intPart: intPart, fraction: fraction };
  }

  function validate(text) {
    var checks = [];
    var trimmed = text.trim();

    if (trimmed === '') {
      checks.push(check('fail', 'R1', 'The input is empty. Paste one BRC-20 inscription JSON object.'));
      return { checks: checks, valid: false };
    }

    var parsed;
    try {
      parsed = JSON.parse(trimmed);
    } catch (err) {
      var msg = 'The input is not valid JSON (' + err.message + ').';
      if (/'/.test(trimmed) && !/"/.test(trimmed)) {
        msg += ' JSON requires double quotes; single quotes are not valid.';
      } else if (/,\s*[}\]]/.test(trimmed)) {
        msg += ' Remove the trailing comma before the closing brace.';
      } else if (/[{,]\s*[A-Za-z_]+\s*:/.test(trimmed)) {
        msg += ' JSON keys must be quoted.';
      }
      checks.push(check('fail', 'R1', msg));
      return { checks: checks, valid: false };
    }

    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      checks.push(check('fail', 'R1', 'The payload parses as ' + describeType(parsed) +
        '. A BRC-20 operation must be one JSON object.'));
      return { checks: checks, valid: false };
    }
    checks.push(check('pass', 'R1', 'The payload is one well-formed JSON object.'));

    /* Duplicate top-level keys survive JSON.parse (last wins), so scan the text. */
    KNOWN.forEach(function (key) {
      var re = new RegExp('"' + key + '"\\s*:', 'g');
      var count = (trimmed.match(re) || []).length;
      if (count > 1) {
        checks.push(check('warn', 'R1', '"' + key + '" appears ' + count +
          ' times. JSON parsers keep the last occurrence; remove the duplicate to avoid ambiguity.'));
      }
    });

    var failed = function () {
      return checks.some(function (c) { return c.status === 'fail'; });
    };

    /* p */
    var p = stringField(parsed, 'p', true, checks, 'R4');
    if (p !== null) {
      if (p === 'brc-20') {
        checks.push(check('pass', 'R4', '"p" is exactly "brc-20".'));
      } else if (p.toLowerCase() === 'brc-20' || p.toLowerCase() === 'brc20') {
        checks.push(check('fail', 'R4', '"p": "' + p +
          '" is not recognized. The protocol tag must be exactly "brc-20", lowercase, with the hyphen.'));
      } else {
        checks.push(check('fail', 'R4', '"p": "' + p +
          '" is not "brc-20", so no BRC-20 indexer will read this inscription.'));
      }
    }

    /* op */
    var op = stringField(parsed, 'op', true, checks, 'R5');
    if (op !== null) {
      if (op === 'deploy' || op === 'mint' || op === 'transfer') {
        checks.push(check('pass', 'R5', '"op" is "' + op + '", a recognized operation.'));
      } else if (['deploy', 'mint', 'transfer'].indexOf(op.toLowerCase()) !== -1) {
        checks.push(check('fail', 'R5', '"op": "' + op + '" must be lowercase: "' + op.toLowerCase() + '".'));
        op = null;
      } else {
        checks.push(check('fail', 'R5', '"op": "' + op +
          '" is not a BRC-20 operation. Valid operations are "deploy", "mint", and "transfer".'));
        op = null;
      }
    }

    /* tick */
    var tick = stringField(parsed, 'tick', true, checks, 'R7');
    var selfMint = stringField(parsed, 'self_mint', false, checks, 'R7');
    if (tick !== null) {
      var bytes = byteLength(tick);
      var chars = Array.from(tick).length;
      var detail = bytes + ' UTF-8 byte' + (bytes === 1 ? '' : 's') +
        (chars !== bytes ? ' (' + chars + ' character' + (chars === 1 ? '' : 's') + ')' : '');
      if (bytes === 4) {
        checks.push(check('pass', 'R7', '"tick": "' + tick + '" is ' + detail + '. Classic 4-byte ticker.'));
      } else if (bytes === 5) {
        if (op === 'deploy' && selfMint !== 'true') {
          checks.push(check('fail', 'R7', '"tick": "' + tick + '" is ' + detail +
            '. A 5-byte ticker can only be deployed under the self-issuance extension, which requires "self_mint": "true".'));
        } else {
          checks.push(check('pass', 'R7', '"tick": "' + tick + '" is ' + detail +
            '. 5-byte tickers exist only under the self-issuance extension; the deploy must have set "self_mint": "true".'));
        }
      } else {
        checks.push(check('fail', 'R7', '"tick": "' + tick + '" is ' + detail +
          '. A ticker must be exactly 4 UTF-8 bytes (or 5 bytes for self-mint deploys). ' +
          'Note the limit counts bytes, not characters: one emoji is usually 4 bytes.'));
      }
      if (/\s/.test(tick)) {
        checks.push(check('warn', 'R7', 'The ticker contains whitespace. It is legal at the byte level but easy to spoof; expect confusion.'));
      }
    }
    if (selfMint !== null && selfMint !== undefined) {
      if (op !== 'deploy') {
        checks.push(check('warn', 'R6', '"self_mint" only has meaning on a deploy. Indexers ignore it here.'));
      } else if (selfMint !== 'true') {
        checks.push(check('fail', 'R7', '"self_mint": "' + selfMint + '" is not valid. The only accepted value is the string "true".'));
      }
    }

    /* dec, needed before max/lim/amt fraction checks */
    var dec = 18;
    var decRaw = stringField(parsed, 'dec', false, checks, 'R9');
    if (decRaw !== null && decRaw !== undefined) {
      if (!/^\d+$/.test(decRaw)) {
        checks.push(check('fail', 'R9', '"dec": "' + decRaw + '" must be a string of digits representing an integer from 0 to 18.'));
      } else if (parseInt(decRaw, 10) > 18) {
        checks.push(check('fail', 'R9', '"dec": "' + decRaw + '" is too large. The maximum divisibility is 18 decimal places.'));
      } else {
        dec = parseInt(decRaw, 10);
        checks.push(check('pass', 'R9', '"dec" is ' + dec + ' (default is 18 when omitted).'));
      }
      if (op === 'mint' || op === 'transfer') {
        checks.push(check('warn', 'R6', '"dec" only has meaning on a deploy. Indexers ignore it on ' + op + '.'));
      }
    }

    function fractionCheck(key, parts, decimals, source) {
      if (!parts) return;
      if (parts.fraction.length > decimals) {
        checks.push(check('fail', 'R11', '"' + key + '" has ' + parts.fraction.length +
          ' significant decimal place' + (parts.fraction.length === 1 ? '' : 's') +
          ' but ' + source + ' allows only ' + decimals + '.'));
      }
    }

    /* Operation-specific numeric fields */
    var maxRaw = stringField(parsed, 'max', op === 'deploy', checks, 'R9');
    var limRaw = stringField(parsed, 'lim', false, checks, 'R9');
    var amtRaw = stringField(parsed, 'amt', op === 'mint' || op === 'transfer', checks, 'R13');

    var maxParts = null;
    var limParts = null;

    if (op === 'deploy') {
      if (typeof maxRaw === 'string') {
        maxParts = amountValue('max', maxRaw, checks);
        fractionCheck('max', maxParts, dec, '"dec"');
        if (maxParts && !failed()) {
          checks.push(check('pass', 'R9', '"max" is a valid positive supply of ' + maxRaw + '.'));
        }
      }
      if (typeof limRaw === 'string') {
        limParts = amountValue('lim', limRaw, checks);
        fractionCheck('lim', limParts, dec, '"dec"');
        if (limParts && maxParts) {
          var limScaled = BigInt(limParts.intPart + limParts.fraction.padEnd(dec, '0'));
          var maxScaled = BigInt(maxParts.intPart + maxParts.fraction.padEnd(dec, '0'));
          if (limScaled > maxScaled) {
            checks.push(check('fail', 'R9', '"lim" (' + limRaw + ') is greater than "max" (' + maxRaw +
              '). The per-mint limit cannot exceed the maximum supply.'));
          } else {
            checks.push(check('pass', 'R9', '"lim" is a valid per-mint limit of ' + limRaw + '.'));
          }
        }
      } else if (limRaw === undefined || limRaw === null) {
        if (!('lim' in parsed)) {
          checks.push(check('info', 'R9', '"lim" is omitted, so the per-mint limit defaults to "max". Any single mint may then take the whole remaining supply.'));
        }
      }
      if ('amt' in parsed) {
        checks.push(check('warn', 'R6', '"amt" has no meaning on a deploy. Indexers ignore it.'));
      }
    }

    if (op === 'mint' || op === 'transfer') {
      if (typeof amtRaw === 'string') {
        var amtParts = amountValue('amt', amtRaw, checks);
        fractionCheck('amt', amtParts, 18, 'the protocol maximum; the deploy\'s "dec" may allow fewer');
        if (amtParts && !checks.some(function (c) { return c.status === 'fail' && c.message.indexOf('"amt"') === 0; })) {
          checks.push(check('pass', 'R13', '"amt" is a well-formed positive amount of ' + amtRaw + '.'));
          checks.push(check('info', op === 'mint' ? 'R13' : 'R16',
            op === 'mint'
              ? 'Whether this mint succeeds also depends on chain state: the ticker must be deployed, "amt" must not exceed the per-mint "lim", its decimals must fit the deployed "dec", and supply must remain under "max". A mint that crosses the remaining supply is credited only the remainder.'
              : 'Whether this transfer inscription is valid also depends on chain state: at confirmation, "amt" must not exceed the available balance of the address holding it, and its decimals must fit the deployed "dec". It settles only on its first spend.'));
        }
      }
      ['max', 'lim'].forEach(function (key) {
        if (key in parsed) {
          checks.push(check('warn', 'R6', '"' + key + '" only has meaning on a deploy. Indexers ignore it on ' + op + '.'));
        }
      });
    }

    /* Unknown keys */
    Object.keys(parsed).forEach(function (key) {
      if (KNOWN.indexOf(key) === -1) {
        var hint = KNOWN.indexOf(key.toLowerCase()) !== -1
          ? ' Keys are case-sensitive; did you mean "' + key.toLowerCase() + '"?'
          : '';
        checks.push(check(hint ? 'fail' : 'info', 'R6', '"' + key + '" is not a BRC-20 field. Indexers ignore unknown keys.' + hint));
      }
    });

    return { checks: checks, valid: !failed() };
  }

  function renderResult(result) {
    var order = { fail: 0, warn: 1, pass: 2, info: 3 };
    var items = result.checks.slice().sort(function (a, b) {
      return order[a.status] - order[b.status];
    });
    var verdict = document.createElement('p');
    verdict.className = 'verdict-line ' + (result.valid ? 'ok' : 'bad');
    verdict.textContent = result.valid
      ? 'Well-formed BRC-20 payload. Chain-state conditions still apply; see the notes below.'
      : 'Invalid BRC-20 payload. Indexers will ignore or reject this inscription.';
    var list = document.createElement('ul');
    list.className = 'check-list';
    items.forEach(function (c) {
      var li = document.createElement('li');
      var status = document.createElement('span');
      status.className = 'status ' + c.status;
      status.textContent = c.status.toUpperCase() + ' ' + c.rule;
      var text = document.createElement('span');
      var ruleLink = document.createElement('a');
      ruleLink.href = 'spec.html#' + c.rule.toLowerCase();
      ruleLink.textContent = c.rule;
      text.textContent = c.message + ' ';
      var refWrap = document.createElement('small');
      refWrap.appendChild(document.createTextNode('(rule '));
      refWrap.appendChild(ruleLink);
      refWrap.appendChild(document.createTextNode(')'));
      text.appendChild(refWrap);
      li.appendChild(status);
      li.appendChild(text);
      list.appendChild(li);
    });
    out.innerHTML = '';
    out.appendChild(verdict);
    out.appendChild(list);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    renderResult(validate(input.value));
  });

  document.querySelectorAll('[data-example]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      input.value = btn.getAttribute('data-example');
      renderResult(validate(input.value));
    });
  });
})();
