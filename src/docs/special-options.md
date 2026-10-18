:::: v-pre

# Special options

## `noEventListeners`
Using the `noEventListeners` option allows AutoNumeric to apply formatting without adding any [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) to an input, or any other DOM elements (that the function would accept as a parameter).<br>This would be useful for read-only values for instance.
```js
// Initialize with setting up event listeners, but removing them in the same call
anElement = new AutoNumeric(domElement, 12345.789, { options }).remove(); // This is the default existing way of doing that...

// Initialize without setting up any event listeners by directly passing the special option `noEventListeners` to prevent the initial creation of those event listeners
anElement = new AutoNumeric(domElement, 12345.789, { noEventListeners: true });
```
In the latter case, it initializes the AutoNumeric element, except it does not add any event listeners beforehand. This means it formats the value only once and then lets the user modify it freely.

<div class="admonition note">
<p class="admonition-title">Note</p>

The value can then be formatted via a call to `set()`.

</div>


## `readOnly`
AutoNumeric can initialize an `<input>` element with the `readonly` property by setting the `readOnly` option to `true` in the settings:
```js
anElement = new AutoNumeric(domElement, 12345.789, { readOnly: true });
```

For more detail on how to use each options, please take a look at the detailed comments in the source code for the [`AutoNumeric.defaultSettings`](https://github.com/autoNumeric/autoNumeric/blob/next/src/AutoNumericDefaultSettings.js) object.

::::
