:::: v-pre

# Predefined options

Sometimes you do not want to have to configure every single aspect of your format using the [configuration options](/docs/configuration-options), specially if it's a common one.<br>Hence, we provide multiple default options for the most common currencies and number formats.

## Predefined language options

AutoNumeric provides predefined language options to format currencies.<br>
You can set the pre-defined language option like so:
::: code-group
```js [Use the methods]
new AutoNumeric('.mySelector > input').french();
```
:::
::: code-group
```js [...or just create the AutoNumeric object with the predefined language option]
new AutoNumeric('.mySelector > input', AutoNumeric.getPredefinedOptions().French);
```
:::

Currently, the predefined language options are:

| | Option name |
| :---------------- | :---------------- |
| :fr: | `French` |
| :es: | `Spanish` |
| :us: | `NorthAmerican` |
| :gb: | `British` |
| <span>&#x1f1e8;&#x1f1ed;</span> | `Swiss` |
| :jp: | `Japanese` |
| :cn: | `Chinese` |
| <span>&#x1f1e7;&#x1f1f7;</span> | `Brazilian` |
| :tr: | `Turkish` |

If you feel a common currency option is missing, please [create a pull request](https://github.com/autoNumeric/autoNumeric/compare) and we'll add it!

## Predefined common options

Moreover, AutoNumeric provides the following common options:

| Option name | Description | Examples |
| :---------------- | :---------------- | ----------------: |
| `dotDecimalCharCommaSeparator` | Set the decimal character as a dot `.` and the group separator as a comma `,` | `1,234.56` |
| `commaDecimalCharDotSeparator` | Set the decimal character as a comma `,` and the group separator as a dot `.` | `1.234,56` |
| `integer` | Set the minimum and maximum value so that only an integer can be entered, without any decimal places available | `42`, `-42` |
| `integerPos` | Set the minimum and maximum value so that only a positive integer can be entered | `42` |
| `integerNeg` | Set the minimum and maximum value so that only a negative integer can be entered | `-42` |
| `float` | Set the minimum and maximum value so that a float can be entered, without the default `2` decimal places | `1.234`, `-1.234` |
| `floatPos` | Set the minimum and maximum value so that only a positive float can be entered | `1.234` |
| `floatNeg` | Set the minimum and maximum value so that only a negative float can be entered | `-1.234` |
| `numeric` | Format the value as a numeric string (with no digit group separator, and a dot for the decimal point) | `1234.56` |
| `numericPos` | Idem above, but only allow positive values | `1234.56` |
| `numericNeg` | Idem above, but only allow negative values | `-1234.56` |
| `euro` | Same configuration than `French` | `1.234,56 €` |
| `euroF` | Same configuration than `euro`, with the formula mode activated | `1.234,56 €` |
| `euroPos` | Idem above, but only allow positive values | `1.234,56 €` |
| `euroNeg` | Idem above, but only allow negative values | `-1.234,56 €` |
| `euroSpace` | Same configuration than `French` except a space is used for the group separator instead of the dot | `1 234,56 €` |
| `euroSpacePos` | Idem above, but only allow positive values | `1 234,56 €` |
| `euroSpaceNeg` | Idem above, but only allow negative values | `-1 234,56 €` |
| `dollar` | Same configuration than `NorthAmerican`  | `$1,234.56` |
| `dollarF` | Same configuration than `dollar`, with the formula mode activated  | `$1,234.56` |
| `dollarPos` | Idem above, but only allow positive values | `$1,234.56` |
| `dollarNeg` | Idem above, but only allow negative values | `-$1,234.56` |
| `percentageEU2dec` | Same configuration than `French`, but display a percent `%` sign instead of the currency sign, with `2` decimal places | `12,34 %` |
| `percentageEU2decPos` | Idem above, but only allow positive values | `12,34 %` |
| `percentageEU2decNeg` | Idem above, but only allow negative values | `-12,34 %` |
| `percentageEU3dec` | Same configuration than `French`, but display a percent `%` sign instead of the currency sign, with `3` decimal places | `12,345 %` |
| `percentageEU3decPos` | Idem above, but only allow positive values | `12,345 %` |
| `percentageEU3decNeg` | Idem above, but only allow negative values | `-12,345 %` |
| `percentageUS2dec` | Same configuration than `NorthAmerican`, but display a percent `%` sign instead of the currency sign, with `2` decimal places | `12.34%` |
| `percentageUS2decPos` | Idem above, but only allow positive values | `12.34%` |
| `percentageUS2decNeg` | Idem above, but only allow negative values | `-12.34%` |
| `percentageUS3dec` | Same configuration than `NorthAmerican`, but display a percent `%` sign instead of the currency sign, with `3` decimal places | `12.345%` |
| `percentageUS3decPos` | Idem above, but only allow positive values | `12.345%` |
| `percentageUS3decNeg` | Idem above, but only allow negative values | `-12.345%` |

You can set those pre-defined options like so:
```js
new AutoNumeric('.mySelector > input', AutoNumeric.getPredefinedOptions().integerPos);
```

## Predefined style rules

With the `styleRules` option, you can define the rules that add or remove the CSS class(es) from the element, based on the raw unformatted value.<br>This option can also be used to define custom callbacks in the `userDefined` attribute, that will be called whenever the `rawValue` is updated.

Predefined styles rules are available so you do not have to create them:

### Positive and negative
Sets the `'autoNumeric-positive'` css class whenever the raw value is positive.<br>
Sets the `'autoNumeric-negative'` css class whenever the raw value is negative.
::: code-group
```js [Positive and negative style rule]
new AutoNumeric(domElement, { styleRules: AutoNumeric.options.styleRules.positiveNegative });
```
:::

### Range from 0 to 100, in 4 steps
Sets the `'autoNumeric-red'` css class whenever the raw value is between `0` and `25` excluded.<br>
Sets the `'autoNumeric-orange'` css class whenever the raw value is between `25` and `50` excluded.<br>
Sets the `'autoNumeric-yellow'` css class whenever the raw value is between `50` and `75` excluded.<br>
Sets the `'autoNumeric-green'` css class whenever the raw value is between `75` and `100` excluded.
::: code-group
```js [Range 0 to 100 style rule]
new AutoNumeric(domElement, { styleRules: AutoNumeric.options.styleRules.range0To100With4Steps });
```
:::

### Odd and even
Sets the `'autoNumeric-even'` css class whenever the raw value is even.<br>
Sets the `'autoNumeric-odd'` css class whenever the raw value is odd.
::: code-group
```js [Odd and even style rule]
new AutoNumeric(domElement, { styleRules: AutoNumeric.options.styleRules.evenOdd });
```
:::

### Small range around zero, from -1 to 1
Sets the `'autoNumeric-small-negative'` css class whenever the raw value is between `-1` and `0` excluded.<br>
Sets the `'autoNumeric-zero'` css class whenever the raw value is equal to `0`.<br>
Sets the `'autoNumeric-small-positive'` css class whenever the raw value is between `0` excluded and `1`.
::: code-group
```js [Small range style rule]
new AutoNumeric(domElement, { styleRules: AutoNumeric.options.styleRules.rangeSmallAndZero });
```
:::

### Custom callbacks
Custom callbacks can be defined and will be called every time the *raw value* is updated.<br>
You can add as many callbacks you want in the `userDefined` attribute of the `styleRules` object in the options.<br>
<div class="admonition tip">
<p class="admonition-title">Important</p>

Each `userDefined` array entry should at least provide a function as the `callback` attribute.

</div>



This `callback` function is passed the `rawValue` as the single parameter (except if `classes` is `null` or `undefined`, see below).

Depending of what type of data the `callback` function returns, and what the content of the `classes` attribute is, it will either uses CSS class names defined in the `classes` attribute, or just call the `callback` with the current AutoNumeric object passed as a parameter if `classes` is `null` or `undefined`.

| Callback variations | Callback return type | `classes` content | Result |
| :----------------: | :----------------: | :-----------: | :-----------  |
| 1 | a `boolean` | a single `String` | If `true`, add the single class defined in `classes`. If `false` removes it. |
| 2 | a `boolean` | an `Array` with 2 values (array indexes) | If `true`, add the first element of the array, otherwise the second |
| 3 | an `integer` | an `Array` with multiple values (array indexes) | Will add the selected CSS class `classes[index]`, and remove the others |
| 4 | an `Array` of `integer` | an `Array` with multiple values (array indexes) | Will add *all* the given selected CSS classes, and remove the others |
| 5 | ∅ | `null` or `undefined` | There, the callback have access to the current AutoNumeric object passed as its argument, which means you are free to do *whatever you want* from here! |

See the following examples for how to use those callback variations:
::: code-group
```js [Calling callbacks when the raw value changes, using style rules]
const options = {
    styleRules : {
        userDefined: [
            // 1) If 'classes' is a string, set it if `true`, remove it if `false`
            { callback: rawValue => { return true; }, classes: 'thisIsTrue' },
            // 2) If 'classes' is an array with only 2 elements, set the first class if `true`, the second if `false`
            { callback: rawValue => rawValue % 2 === 0, classes: ['autoNumeric-even', 'autoNumeric-odd'] },
            // 3) Return only one index to use on the `classes` array (here, 'class3')
            { callback: rawValue => { return 2; }, classes: ['class1', 'class2', 'class3'] },
            // 4) Return an array of indexes to use on the `classes` array (here, 'class1' and 'class3')
            { callback: rawValue => { return [0, 2]; }, classes: ['class1', 'class2', 'class3'] },
            // 5) If 'classes' is `undefined` or `null`, then the callback is called with the AutoNumeric object passed as a parameter
            { callback: anElement => { return anElement.getFormatted(); } },
        ],
    },
}
```
:::

::::
