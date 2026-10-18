:::: v-pre

# Formula mode

Ever wished while filling in a form that you could quickly calculate basic math operations?<br>Well, AutoNumeric provides a quick way to enter and evaluate simple math expressions directly into the element!

<div class="admonition example">
<p class="admonition-title">Use case</p>

Sometimes, you need to quickly calculate the product or the sum of two or more numbers, before entering the result in the AutoNumeric element.<br>
For instance, you might ask yourself *"How many months are there in 14 years and 5 months ?"*, then you'd need to either make a mental calculation, or resort to using a calculator.<br>
To speed things up and provide a lean user experience, AutoNumeric provides a *formula mode* which allows you to enter and evaluate simple math expressions very quickly.

Using our previous example, you would just need to activate the *formula mode* by entering the equal sign (`=`) key, then type `=14*12 + 5`, and finally validate that expression by using the `Enter` key, or by blurring the field.

</div>


<div class="admonition note">
<p class="admonition-title">Note</p>

If the math expression is invalid, the previous `rawValue` is set back

</div>


<div class="admonition warning">
<p class="admonition-title">Warning</p>

By default, this behavior is *disabled*.<br>Check here on how to [enable it](#enable-the-formula-mode).

</div>


## Enable the formula mode

If you want to enable the math expression parsing, you need to set the `formulaMode` option to `true`:
```js
new AutoNumeric(domElement, { formulaMode: true });
```

If you want to cancel the math expression edition and exit the formula mode, hit the `Escape` key at any time.
This will revert any changes made to the input content to the [previous formatted value](#formula-mode-events).

## How to enter a formula?

When the *formula mode* is enabled, you can enter the formula mode just by:

1. Focusing on the AutoNumeric-managed input
1. Type the `=` character
1. Then type a valid [math formula](#allowed-characters-in-formula-mode)
1. Once happy with your formula, submit it by typing the `Enter` key

If your math formula is valid, then its result will be `set()` and you'll automatically exit *formula mode*.

## Allowed characters in formula mode

Simple math expressions are allowed, which means you can use any numeric characters, the decimal point `.`, as well as the following operators `+`, `-`, `*`, `/`, `(` and `)`.

<div class="admonition info">
<p class="admonition-title">Math precedence</p>

Parentheses and operators precedence are respected as expected

</div>


This allows for evaluating the following math expressions examples without problems:

- `8 * -12.46`
- `22* (10 - 2)/1.5- -0.5`
- `(4+1) * 2 - (104587.23 * 8 - (-7))`

## Formula mode events

On user validation, if the math expression syntax is invalid, the previous valid `rawValue` is set back, and the `autoNumeric:invalidFormula` [event](/docs/event-lifecycle#autonumeric-custom-events) is sent.

When a valid math expression is accepted, then its result is `set()`, and the `autoNumeric:validFormula` event is sent.

::::
