:::: v-pre

# Updating existing options

Options can be added and/or modified after the initialization has been done.

## Adding or modifying options

Either by passing an option object that contains multiple options,
```js
anElement.update({ moreOptions });
anElement.update(AutoNumeric.getPredefinedOptions().NorthAmerican); // Update the settings (and immediately reformat the element accordingly)
```

...by passing multiple option objects, the latter overwriting the settings from the former ones,
```js
anElement.update({ moreOptions1 }, { moreOptions2 }, 'euro');
// or in a single array
anElement.update([{ moreOptions1 }, { moreOptions2 }, 'euro']);
```

...or by changing the options one by one (or by calling a pre-defined option object).
```js
anElement.options.minimumValue('12343567.89');
anElement.options.allowDecimalPadding(false);
```
<div class="admonition info">
<p class="admonition-title">Info</p>

Each option can be accessed as a *function* to update its value, ie. `anElement.options.<optionName>()`, where `<optionName>` can be any option name from the [options list](/docs/configuration-options#options).

</div>



<div class="admonition success">
<p class="admonition-title">Hint</p>

As soon as the options are modified, the AutoNumeric-managed input content is re-formatted accordingly.

</div>


### Updating the options for multiple elements

If you've initialized your input with [`AutoNumeric.multiple()`](/docs/initialization#initialize-multiple-autonumeric-objects-at-once), you can use the returned Array[^1] to update all the AutoNumeric objects at once:
```js
// AutoNumeric initialisation for multiple elements
const anElements = new AutoNumeric.multiple('.numeric', 42, ['French']);

// Update the options globally for all the inputs with one function call:
// Modify only a specific element in the array
anElements[2].update({ decimalPlaces: 3 });
// or modify all the elements at once
anElements.forEach(a => a.update({ currencySymbol: '#' })); // or .set(), etc.
```

## Resetting options

At any point, you can reset the options by calling the `options.reset()` method.
This effectively drop any previous options you could have set, then load back the [default settings](https://github.com/autoNumeric/autoNumeric/blob/next/src/AutoNumericDefaultSettings.js).
::: code-group
```js [Reset the options to their default settings]
anElement.options.reset();
```
:::

Lastly, the option object can be accessed directly, thus allowing to query each options globally too.<br>This allows to inspect the current options used.
::: code-group
```js [Access the current options as an object]
anElement.getSettings(); // Return the options object containing all the current AutoNumeric settings in effect
```
:::

[^1]: The `AutoNumeric.multiple()` function will always return an `Array`, even if there is only one element selected.

::::
