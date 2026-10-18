:::: v-pre

# Static methods

Without having to initialize any AutoNumeric object, you can directly use the static `AutoNumeric` class functions.

<div class="admonition info">
<p class="admonition-title">Info</p>

Some of those functions can be used in [Web Workers](/docs/how-to-use#in-web-workers).

</div>


### Get
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `getAutoNumericElement` | Return the AutoNumeric object that manages the given DOM element | `AutoNumeric.getAutoNumericElement(domElement)`<br>`AutoNumeric.getAutoNumericElement('#theInput')` |
| `getDefaultConfig` | Return the default autoNumeric settings | `AutoNumeric.getDefaultConfig()` |
| `getFormatted` | Return the formatted string from the given DOM element or query selector.<br>This can accept a *callback* that is passed the result of `getFormatted` and a reference to the AutoNumeric object. | `AutoNumeric.getFormatted(domElement, callback);`<br>`AutoNumeric.getFormatted('#theInput')` |
| `getLocalized` | Return the localized unformatted number as a string from the given DOM element or query selector.<br>This can accept a *callback* that is passed the result of `getLocalized` and a reference to the AutoNumeric object. | `AutoNumeric.getLocalized(domElement, forcedOutputFormat, callback);`<br>`AutoNumeric.getLocalized('#theInput')` |
| `getNumber` | Return the unformatted number as a number from the given DOM element or query selector (The same warnings got the non-static `getNumber` method applies here too).<br>This can accept a *callback* that is passed the result of `getNumber` and a reference to the AutoNumeric object. | `AutoNumeric.getNumber(domElement, callback);`<br>`AutoNumeric.getNumber('#theInput')` |
| `getNumericString` | Return the unformatted number as a string from the given DOM element or query selector.<br>This can accept a *callback* that is passed the result of `getNumericString` and a reference to the AutoNumeric object. | `AutoNumeric.getNumericString(domElement, callback)`<br>`AutoNumeric.getNumericString('#theInput')` |
| `getPredefinedOptions` | Return all the predefined options in one object | `AutoNumeric.getPredefinedOptions()` |
| `getPredefinedOptions` | Return a specific pre-defined language option object | `AutoNumeric.getPredefinedOptions().French` |

### Set
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `localizeAndSet` | Unformat and localize the `domElement` value with the given options and returns the localized value as a string. This function does update that element value with the newly localized value in the process. | `AutoNumeric.localizeAndSet(domElement, { options });` |
| `formatAndSet` | Format the `domElement` value with the given options and returns the formatted value as a string. This function does update that element value with the newly formatted value in the process. | `AutoNumeric.formatAndSet(domElement, { options });` |
| `reformatAndSet` | Recursively format all the autoNumeric-managed elements that are a child to the `referenceToTheDomElement` element given as a parameter (this is usually the parent `<form>` element), with the settings of each AutoNumeric elements. | `AutoNumeric.reformatAndSet(referenceToTheDomElement);` |
| `set` | Set the given value on the AutoNumeric object that manages the given DOM element, if any. Returns `null` if no AutoNumeric object is found, otherwise returns the AutoNumeric object. | `AutoNumeric.set(domElement, 42)`<br>`AutoNumeric.set('#theInput', 42)` |
| `unformatAndSet` | Unformat the `domElement` value with the given options and returns the unformatted value as a numeric string. This function does update that element value with the newly unformatted value in the process. | `AutoNumeric.unformatAndSet(domElement, { options });` |
| `unformatAndSet` | Recursively unformat all the autoNumeric-managed elements that are a child to the `referenceToTheDomElement` element given as a parameter (this is usually the parent `<form>` element) | `AutoNumeric.unformatAndSet(referenceToTheDomElement);` |

### Formatting
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `format` | Format the given number with the given options. This returns the formatted value as a string. | `AutoNumeric.format(12345.21, { options });` |
| `format` | Idem above, but using a numeric string as the first parameter | `AutoNumeric.format('12345.21', { options });` |
| `format` | Idem above, but you can pass as many option objects you want to this function, the latter overwriting the previous ones. This allows to correctly format currencies that have a predefined option as its base, but has been slightly modified.  | `AutoNumeric.format('12345.21', { options1 }, { options2 });` |
| `format` | Idem above, using multiple option objects in one array. This way allows for using a pre-defined option name.  | `AutoNumeric.format('12345.21', [{ options1 }, 'euroPos', { options2 }]);` |
| `format` | Format the `domElement` *`value`* (or *`textContent`*) with the given options and returns the formatted value as a string. This does *not* update that element value. | `AutoNumeric.format(domElement, { options });` |
| `localize` | Unformat and localize the given formatted string with the given options. This returns a string. | `AutoNumeric.localize('1.234,56 €', { options });` |
| `localize` | Idem as above, but return the localized DOM element value. This does *not* update that element value. | `AutoNumeric.localize(domElement, { options });` |
| `unformat` | Unformat the given formatted string with the given options. This returns a numeric string. | `AutoNumeric.unformat('1.234,56 €', { options });` |
| `unformat` | Idem above, but you can pass as many option objects you want to this function, the latter overwriting the previous ones. This allows to correctly unformat currencies that have a predefined option as its base, but has been slightly modified. | `AutoNumeric.unformat('241800,02 €', AutoNumeric.getPredefinedOptions().French, { digitGroupSeparator: AutoNumeric.options.digitGroupSeparator.noSeparator });` |
| `unformat` | Idem above, using multiple option objects in one array. This way allows for using a pre-defined option name. | `AutoNumeric.unformat('1.234,56 €', [{ options1 }, 'euroPos', { options2 }]);` |
| `unformat` | Unformat the `domElement` value with the given options and returns the unformatted numeric string. This does *not* update that element value. | `AutoNumeric.unformat(domElement, { options });` |

### Tests and miscellaneous
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `areSettingsValid` | Return `true` in the settings are valid | `AutoNumeric.areSettingsValid({ options })` |
| `isManagedByAutoNumeric` | Return `true` if the given DOM element (or selector string) has an AutoNumeric object that manages it. | `AutoNumeric.isManagedByAutoNumeric(domElement);`<br>`AutoNumeric.isManagedByAutoNumeric('#theInput');` |
| `mergeOptions` | Accepts an array of option objects and / or pre-defined option names, and return a single option object where the latter element overwrite the settings from the previous ones | `AutoNumeric.mergeOptions(['euro', { currencySymbol: '#' }]);` |
| `test` | Test if the given DOM element (or selector string) is already managed by AutoNumeric (if it is initialized) | `AutoNumeric.test(domElement);`<br>`AutoNumeric.test('#theInput');` |
| `validate` | Check if the given option object is valid, and that each option is valid as well. This *throws an error* if it's not. | `AutoNumeric.validate({ options })` |
| `version` | Return the current AutoNumeric version number *(for debugging purpose)* | `AutoNumeric.version();` |

::::
