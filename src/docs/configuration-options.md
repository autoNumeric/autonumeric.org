:::: v-pre

# Configuration options

Multiple configuration options allows you to customize precisely how a form `<input>` element will format your keystrokes as you type.<br>
You can check what are the predefined choices for each option as well as a more detailed explanation of how they work on the [official documentation page](/options).

You can also generate your custom options object and try those live with the [AutoNumeric configurator](/configurator).

Want to know more? Check out the [examples](/examples).

## Options

Below are listed in alphabetical order the options that you can pass an AutoNumeric element, in order to make it change its behavior or formatting specifications.

| Option | Description | Default Value |
| :---------------- | :----------- |:--------------------|
| `allowDecimalPadding` | Allow padding the decimal places with zeros. If set to `'floats'`, padding is only done when there are some decimals (up to the number of decimal places from the `decimalPlaces` variable). If set to an integer, padding will use that number for adding the zeros. If set to `true` it will always pad the decimal places with zeroes, and never if set to `false`. | `true` |
| `alwaysAllowDecimalCharacter` | Defines if the decimal character or decimal character alternative should be accepted when there is already a decimal character shown in the element. | `false` |
| `caretPositionOnFocus` | Determine where should be positioned the caret on focus | `null` |
| `createLocalList` | Determine if a local list of AutoNumeric objects must be kept when initializing the elements and others | `true` |
| `currencySymbol` | Defines the currency symbol to display | `''` |
| `currencySymbolPlacement` | Placement of the currency sign, relative to the number shown (as a prefix or a suffix) | `'p'` |
| `decimalCharacter` | Decimal separator character | `'.'` |
| `decimalCharacterAlternative` | Allow to declare an alternative decimal separator which is automatically replaced by the *real* decimal character when entered (This is useful in countries where the keyboard numeric pad has a period as the decimal character) | `null` |
| `decimalPlaces` | Defines the default number of decimal places to show on the formatted value, and to keep as the precision for the `rawValue`. This can be overridden by the other `decimalPlaces*` options. | `2` |
| `decimalPlacesRawValue` | Defines how many decimal places should be kept for the raw value. This is the precision for float values. | `null` |
| `decimalPlacesShownOnBlur` | The number of decimal places to show when *unfocused* | `null` |
| `decimalPlacesShownOnFocus` | The number of decimal places to show when *focused* | `null` |
| `defaultValueOverride` | Helper option for the ASP.NET-specific postback issue | `null` |
| `digitalGroupSpacing` | Digital grouping for the thousand separator | `'3'` |
| `digitGroupSeparator` | Thousand separator character | `','` |
| `divisorWhenUnfocused` | Defines the number that will divide the current value shown when unfocused | `null` |
| `emptyInputBehavior` | Defines what to display when the input value is empty (possible options are `null`, `focus`, `press`, `always`, `min`, `max`, `zero`, number, or a string representing a number) | `'focus'` |
| `eventBubbles` | Defines if the custom and native events triggered by AutoNumeric should bubble up or not | `true` |
| `eventIsCancelable` | Defines if the custom and native events triggered by AutoNumeric should be cancelable | `true` |
| `failOnUnknownOption ` | This option is the 'strict mode' *(aka 'debug' mode)*, which allows autoNumeric to strictly analyse the options passed, and fails if an unknown options is used in the `options` object. | `false` |
| `formatOnPageLoad` | Determine if the default value will be formatted on initialization | `true` |
| `formulaMode` | Defines if the [*formula mode*](/docs/formula-mode) can be activated by the user | `false` |
| `historySize` | Determine how many undo states an AutoNumeric object should keep in memory | `20` |
| `isCancellable` | Determine if the user can *'cancel'* the last modifications done to the element value when using the `Escape` key | `true` |
| `leadingZero` | Controls the leading zero behavior (possible options are `allow`, `deny` and `keep`) | `'deny'` |
| `maximumValue` | The maximum value that can be entered (10 trillions by default) | `'10000000000000'` |
| `minimumValue` | The minimum value that can be entered (-10 trillions by default) | `'-10000000000000'` |
| `modifyValueOnUpDownArrow` | Determine if the element value can be incremented / decremented with the up and down arrow keys. The keys behavior is modified with the `upDownStep` option. | `true` |
| `modifyValueOnWheel` | Determine if the element value can be incremented / decremented with the mouse wheel. The wheel behavior is modified with the `wheelStep` option. | `true` |
| `negativeBracketsTypeOnBlur` | Adds brackets `[]`, parenthesis `()`, curly braces `{}`, chevrons `<>`, angle brackets `〈〉`, Japanese quotation marks `｢｣`, half brackets `⸤⸥`, white square brackets `⟦⟧`, quotation marks `‹›` or guillemets `«»` on negative values when unfocused. The value must be formatted like `'<leftBracket>,<rightBracket>'`. | `null` |
| `negativePositiveSignBehavior` | Defines if the negative sign should be toggled when hitting the negative or positive key multiple times | `false` |
| `negativePositiveSignPlacement` | Placement of negative/positive sign relative to the currency symbol (possible options are `l` (left), `r` (right), `p` (prefix) and `s` (suffix)) | `null` |
| `negativeSignCharacter` | Defines the negative sign character to use | `'-'` |
| `noEventListeners` | Defines if the element should have event listeners activated on it.<br>*Note: Setting this to `true` will prevent any format to be applied once the user starts modifying the element value. This is unlikely what you want.* | `false` |
| `onInvalidPaste` | Manage how autoNumeric react when the user tries to paste an invalid number (possible options are `error`, `ignore`, `clamp`, `truncate` or `replace`) | `'error'` |
| `outputFormat` | Defines the localized output format of the `getLocalized`, `form*`, `formArray*` and `formJson*` methods | `null` |
| `overrideMinMaxLimits` | Override minimum and maximum limits (possible options are `ceiling`, `floor`, `ignore` and `invalid`) | `null` |
| `positiveSignCharacter` | Defines the positive sign character to use (Note: It's only shown if `showPositiveSign` is set to `true`) | `'+'` |
| `rawValueDivisor` | Define the number that will divide the formatted value into the raw value (i.e. when displaying `'1.23%'`, the raw value kept is `0.0123` if `rawValueDivisor` is set to `100`) | `null` |
| `readOnly` | Defines if the element (`<input>` or another allowed html tag) should be set as read-only on initialization | `false` |
| `roundingMethod` | Method used for rounding. The possible options are:<br>`S` (Round-Half-Up Symmetric (default)),<br>`A` (Round-Half-Up Asymmetric),<br>`s` (Round-Half-Down Symmetric (lower case s)),<br>`a` (Round-Half-Down Asymmetric (lower case a)),<br>`B` (Round-Half-Even 'Bankers Rounding'),<br>`U` (Round Up 'Round-Away-From-Zero'),<br>`D` (Round Down 'Round-Toward-Zero' - same as truncate),<br>`C` (Round to Ceiling 'Toward Positive Infinity'),<br>`F` (Round to Floor 'Toward Negative Infinity'),<br>`N05` (Rounds to the nearest .05 (same as `'CHF'` used in v1.9.* and still valid)),<br>`U05` (Rounds up to next .05),<br>`D05` (Rounds down to next .05) | `'S'` |
| `saveValueToSessionStorage` | Allow the `decimalPlacesShownOnFocus` value to be saved into session storage | `false` |
| `selectNumberOnly` | Determine if the 'Select All' keyboard command will select the complete input text content (including the currency symbol and suffix text), or only the input numeric value | `false` |
| `selectOnFocus` | Defines if the element value should be selected on focus. That selection is dependent on the `selectNumberOnly` option value. | `true` |
| `serializeSpaces` | Defines how the serialize functions should treat spaces when serializing (convert them to `'%20'` or `'+'`) | `'+'` |
| `showOnlyNumbersOnFocus` | Remove the thousand separator, currency symbol and suffix on focus | `false` |
| `showPositiveSign` | Allow the positive sign symbol `+` to be displayed for positive numbers | `false` |
| `showWarnings` | Defines if warnings should be shown. This is safe to disable in production. | `true` |
| `styleRules` | Defines the rules that calculate the CSS class(es) to apply on the element, based on the raw unformatted value.<br>**This can also be used to call callbacks whenever the `rawValue` is updated**. | `null` |
| `suffixText` | Additional text suffix that is added after the number | `''` |
| `symbolWhenUnfocused` | Symbol placed as a suffix when unfocused. This is used in combination with the `divisorWhenUnfocused` option. | `null` |
| `unformatOnHover` | Defines if the element value should be unformatted when the user hover his mouse over it while holding the `Alt` key | `true` |
| `unformatOnSubmit` | Removes formatting on submit event | `false` |
| `upDownStep` | Used in conjonction with the `modifyValueOnUpDownArrow` option, this allows to either define a *fixed* step (i.e. `1000`), or a *progressive* one that is calculated based on the size of the current value | `'1'` |
| `valuesToStrings` | Provide a way for automatically and transparently replacing the formatted value with a pre-defined string, when the raw value is equal to a specific value.<br>For instance when using `{ 0: '-' }`, the hyphen `'-'` is displayed when the `rawValue` is equal to `0`. Multiple 'replacements' can be defined. | `null` |
| `watchExternalChanges` | Defines if the AutoNumeric element should watch (and format) external changes made without using `.set()`. This is set to `false` by default to prevent infinite loops when used with third party frameworks that relies on the `'autoNumeric:rawValueModified'` events being sent. | `false` |
| `wheelOn` | Used in conjonction with the `modifyValueOnWheel` option, defines when the wheel event will increment or decrement the element value, either when the element is focused, or hovered | `'focus'` |
| `wheelStep` | Used in conjonction with the `modifyValueOnWheel` option, this allows to either define a *fixed* step (i.e. `1000`), or a *progressive* one that is calculated based on the size of the current value | `'progressive'` |

::::
