:::: v-pre

# Event lifecycle

AutoNumeric elements are transparent to the native `input` and `change` events, which means those are correctly sent when using an `<input>` element managed by AutoNumeric.

## AutoNumeric custom events

In addition to the native events, custom events sent by AutoNumeric elements allows you to hook into the formatting lifecycle, as you see fit:

- `'autoNumeric:correctedValue'` when an invalid value is corrected
- `'autoNumeric:initialized'` when the AutoNumeric element is initialized
- `'autoNumeric:invalidFormula'` when the user tries to validate an invalid math expression
- `'autoNumeric:invalidValue'` when an invalid value is entered (ie. when the raw value is out of the min/max range)
- `'autoNumeric:rawValueModified'` when the `rawValue` is modified
- `'autoNumeric:formatted'` when all the formatting is done and the formatted string is modified
- `'autoNumeric:minExceeded'` if the `minimumValue` is not respected
- `'autoNumeric:maxExceeded'` if the `maximumValue` is not respected
- `'autoNumeric:validFormula'` when the user validate a valid math expression

<div class="admonition tip">
<p class="admonition-title">Tip</p>

You can also set if the events triggered by the AutoNumeric elements, custom or native, should:

- Bubble up (option `eventBubbles`) or
- Be cancelable (option `eventIsCancelable`).

</div>


### Event lifecycle
Whenever an AutoNumeric element is initialized, the custom `'autoNumeric:initialized'` event is sent.<br>When using `AutoNumeric.multiple()` to initialize numerous elements at once, as many `'autoNumeric:initialized'` events are sent as there are initialized elements.

Finally, the `'change'` event is sent on `blur` if the value has been changed since the `focus` one.

<div class="admonition note">
<p class="admonition-title">Note</p>

The `AutoNumeric.format()` static function does trigger an `'autoNumeric:formatted'` event if the value that the user is trying to format is outside the `minimumValue` and `maximumValue` range, with the `detail` attribute containing the range error message.

</div>


### Custom events details

#### `'autoNumeric:formatted'`
The `'autoNumeric:formatted'` event has a payload that contains the following `detail` attribute:
::: code-group
```js [Example of CustomEvent object sent by AutoNumeric when its value is formatted]
const theCustomEvent = {
    detail    : {
        oldValue   : "78,00 €",  // The previous formatted value
        newValue   : "788,00 €", // The new formatted value
        oldRawValue: 78,         // The previous raw value
        newRawValue: 788,        // The new raw value
        isPristine : false,      // Is the element value still pristine? In other words, has its value changed since its initialization?
        error      : null,       // The error message as a string, `null` if no errors.
        aNElement  : theAutoNumericObject, // The AutoNumeric object emitting this event
    },
    // ...and the usual `bubbles` and `cancelable` attributes
}
```
:::
::: code-group
```js [When caught, you can access the event attributes like so:]
function onFormattedEvent(event) {
    if (!event.detail.isPristine) {
        console.log(`The element value has been changed from ${event.detail.oldValue} to ${event.detail.newValue}.`);
    }
}
```
:::

#### `'autoNumeric:rawValueModified'`
The `'autoNumeric:rawValueModified'` event has a payload that contains the following `detail` attribute:
::: code-group
```js [Example of CustomEvent object sent by AutoNumeric when the rawValue is modified]
const theCustomEvent = {
    detail    : {
        oldRawValue: 78,    // The previous raw value
        newRawValue: 788,   // The new raw value
        isPristine : false, // Is the `rawValue` still pristine? In other words, did it changed since the object initialization?
        error      : null,  // The error message as a string, `null` if no errors.
        aNElement  : theAutoNumericObject, // The AutoNumeric object emitting this event
    },
    // ...
}
```
:::

#### `'autoNumeric:initialized'`
The `'autoNumeric:initialized'` event has a payload that contains the following `detail` attribute:
::: code-group
```js [Example of CustomEvent object sent by AutoNumeric when the object is first initialized]
const theCustomEvent = {
    detail    : {
        newValue   : "788,00 €", // The new formatted value
        newRawValue: 788,        // The new raw value
        error      : null,       // The error message as a string, `null` if no errors.
        aNElement  : theAutoNumericObject, // The AutoNumeric object emitting this event
    },
    // ...
}
```
:::

#### `'autoNumeric:invalidFormula'`
The `'autoNumeric:invalidFormula'` event has a payload that contains the following `detail` attribute:
::: code-group
```js [Example of CustomEvent object sent by AutoNumeric when the math expression is invalid]
const theCustomEvent = {
    detail    : {
        formula  : '22+35 - (44',        // The invalid formula
        aNElement: theAutoNumericObject, // The AutoNumeric object emitting this event
    },
    // ...
}
```
:::

#### `'autoNumeric:validFormula'`
The `'autoNumeric:validFormula'` event has a payload that contains the following `detail` attribute:
::: code-group
```js [Example of CustomEvent object sent by AutoNumeric when the math expression is valid]
const theCustomEvent = {
    detail    : {
        formula  : '22+35 - (44)',       // The valid formula
        result   : 13,                   // The math expression result
        aNElement: theAutoNumericObject, // The AutoNumeric object emitting this event
    },
    // ...
}
```
:::

This can then be used within another script.<br>For instance, you could listen to that event in a Vue.js [component template](https://vuejs.org/guide/essentials/template-syntax.html) like so:
```html
<vue-autonumeric
    v-on:autoNumeric:formatted.native="funcCall1"
    v-on:autoNumeric:rawValueModified.native="funcCall2"
    v-on:autoNumeric:initialized.native="funcCall3"
/>
```

<div class="admonition tip">

*Check out the official [vue-autonumeric](https://github.com/autoNumeric/vue-autoNumeric) component for more info*

</div>


## Key inputs & events sent

Below are listed how AutoNumeric react to different types of key inputs.

### Inputing numbers and decimal characters
By default a 'normal' printable character input (ie. `'2'` or `','`) will result in those events, in that specific order:

1. `'keydown'`
1. `'autoNumeric:minExceeded'` or `'autoNumeric:maxExceeded'` **only** if there was a range problem
1. `'keypress'` (this is deprecated and will be removed *soon*)
1. `'input'`
1. `'keyup'`
1. `'autoNumeric:formatted'` when all the formatting is done
1. `'autoNumeric:rawValueModified'` when the `rawValue` is modified

<div class="admonition note">
<p class="admonition-title">Note</p>

Please check how is [structured](#custom-events-details) the payload attached to the `event` variable. The event detail provides easy access to the old and new value.

</div>


### Modifier keys
When inputting a modifier key (ie. `Control`), we get:

1. `'keydown'`
1. `'keyup'`
1. `'autoNumeric:formatted'`
1. `'autoNumeric:rawValueModified'`

### Deleting numbers
If `Delete` or `Backspace` is entered, the following events are sent:

1. `'keydown'`
1. `'input'`
1. `'keyup'`
1. `'autoNumeric:formatted'`
1. `'autoNumeric:rawValueModified'`

### Validating the field
If `Enter` is entered and the value has *not* changed, the following events are sent:

1. `'keydown'`
1. `'keypress'`
1. `'keyup'`
1. `'autoNumeric:formatted'`
1. `'autoNumeric:rawValueModified'`

If `Enter` is entered and the value has been changed, the following events are sent:

1. `'keydown'`
1. `'keypress'`
1. `'change'`
1. `'keyup'`
1. `'autoNumeric:formatted'`
1. `'autoNumeric:rawValueModified'`

### Pasting data
When a `paste` is done with the mouse, the following events are sent:

1. `'input'`
1. `'keydown'`
1. `'input'`
1. `'keyup'`
1. `'keyup'`
1. `'autoNumeric:formatted'`
1. `'autoNumeric:rawValueModified'`

When a `paste` is done with the keyboard shortcut (ie. `ctrl+v`), the following events are sent:

1. `'keydown'`
1. `'keydown'`
1. `'input'`
1. `'keyup'`
1. `'keyup'`
1. `'autoNumeric:formatted'`
1. `'autoNumeric:rawValueModified'`

::::
