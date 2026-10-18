:::: v-pre

# Instantiated methods

## Usual AutoNumeric functions like `set`, `get`, `format` and `unformat`

The main functions for using AutoNumeric are `set()` which allows you to set the numeric raw value of an input (AutoNumeric will then automatically format it as per the options you used), and `get*` which allows you to retrieve the value of an input, either formatted or by getting the raw value directly.

The following functions are available on all AutoNumeric-managed elements:

### Set
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `set` | Set the value (that will be formatted immediately) | `anElement.set(42.76);` |
| `set` | Set the value and update the setting in one go | `anElement.set(42.76, { options });` |
| `set` | Set the value, but do not save the new state in the history table (used for undo/redo actions) | `anElement.set(42.76, { options }, false);` |
| `setUnformatted` | Set the value (that will not be formatted immediately) | `anElement.setUnformatted(42.76);` |
| `setUnformatted` | Set the value and update the setting in one go (the value will not be formatted immediately) | `anElement.setUnformatted(42.76, { options });` |

### Get
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `getNumericString` | Return the unformatted number as a string | `anElement.getNumericString();` |
| `get` | Alias for the `.getNumericString()` method (:warning: this is *deprecated* and will be removed soon™) | `anElement.get();` |
| `getFormatted` | Return the formatted string | `anElement.getFormatted();` |
| `getNumber` | Return the unformatted number as a number (:warning: **Warning**: If you are manipulating a number bigger than [`Number.MAX_SAFE_INTEGER`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER), you **will** encounter problems if you try to retrieve it as a number and not as a string) | `anElement.getNumber();` |
| `getLocalized` | Return the localized unformatted number as a string | `anElement.getLocalized();` |
| `getLocalized` | Return the localized unformatted number as a string, using the `outputFormat` option override passed as a parameter | `anElement.getLocalized(forcedOutputFormat);` |
| `getLocalized` | Idem above, but with a callback function and a forced `outputFormat` | `anElement.getLocalized(forcedOutputFormat, callback);` |
| `getLocalized` | Idem above, but with a callback function | `anElement.getLocalized(callback);` |
| `get*` | Pass the result of the `get*` function to the given callback, see [here](#using-callback-functions-with-get-methods) | `anElement.get*(funcCallback);` |

### Formatting
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `reformat` | Force the element to reformat its value again (in case the formatting has been lost) | `anElement.reformat();` |
| `unformat` | Remove the formatting and keep only the raw unformatted value in the element (as a numeric string) | `anElement.unformat();` |
| `unformatLocalized` | Remove the formatting and keep only the localized unformatted value in the element | `anElement.unformatLocalized();` |
| `unformatLocalized` | Idem above, but using the `outputFormat` option override passed as a parameter | `anElement.unformatLocalized(forcedOutputFormat);` |

### Selection and miscellaneous
| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `select` | Select the formatted element content, based on the `selectNumberOnly` option | `anElement.select();` |
| `selectNumber` | Select only the numbers in the formatted element content, leaving out the currency symbol, whatever the value of the `selectNumberOnly` option | `anElement.selectNumber();` |
| `selectInteger` | Select only the integer part in the formatted element content, whatever the value of `selectNumberOnly` | `anElement.selectInteger(); ` |
| `selectDecimal` | Select only the decimal part in the formatted element content, whatever the value of `selectNumberOnly` | `anElement.selectDecimal();` |
| `clear` | Reset the element value to the empty string `''` (or the currency sign, depending on the `emptyInputBehavior` option value) | `anElement.clear();` |
| `clear` | Always reset the element value to the empty string `''` as above, no matter the `emptyInputBehavior` option value | `anElement.clear(true);` |
| `isPristine` | Return `true` if the current value is the same as when the element first got *initialized* (not `set()`) | `anElement.isPristine();` |

<div class="admonition tip">
<p class="admonition-title">Tip</p>

Most of those functions can be [chained](#function-chaining) together, if needed.

</div>


### Using callback functions with `get*` methods

All `get*` methods can accept a [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) as its argument (those methods being `get`, `getNumericString`, `getFormatted`, `getNumber` and `getLocalized`; see [here](#get)).

That callback is passed two parameters, the result of the `get*` method as its first argument, and the AutoNumeric object as its second.

This allows you to directly use the result of the `get*` functions without having to declare a temporary variable like so:
```js
function sendToServer(value) {
    ajax(value);
}

console.log(`The value ${anElement.getNumber(sendToServer)} has been sent to the server.`);
```

In other words,
```js
// Using:
anElement.getNumericString(funcCallback);

// Is equivalent to doing:
const result = anElement.getNumericString();
funcCallback(result, anElement);
```

<div class="admonition info">
<p class="admonition-title">Info</p>

The callback function behavior is slightly different when called on [multiple elements](#using-callback-functions-with-globalget-methods) via `global.get*` methods.

</div>


## Un-initialize the AutoNumeric element

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `remove` | Remove the AutoNumeric listeners from the element (previous name : `'destroy'`). Keep the element content intact. | `anElement.remove();` |
| `wipe` | Remove the AutoNumeric listeners from the element, and reset its value to `''` | `anElement.wipe();` |
| `nuke` | Remove the AutoNumeric listeners from the element, then delete the DOM element altogether | `anElement.nuke();` |


## Node manipulation

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `node` | Return the DOM element reference of the AutoNumeric-managed element | `anElement.node();` |
| `parent` | Return the DOM element reference of the parent node of the AutoNumeric-managed element | `anElement.parent();` |
| `detach` | Detach the current AutoNumeric element from the shared local [*'init' list*](#perform-actions-globally-on-a-shared-init-list-of-autonumeric-elements) (which means any changes made on that local shared list will not be transmitted to that element anymore) | `anElement.detach();` |
| `detach` | Idem above, but detach the given AutoNumeric element, not the current one | `anElement.detach(otherAnElement);` |
| `attach` | Attach the given AutoNumeric element to the shared local [*'init' list*](#perform-actions-globally-on-a-shared-init-list-of-autonumeric-elements). When doing that, by default the DOM content is left untouched. The user can force a reformat with the new shared list options by passing a second argument valued `true`. | `anElement.attach(otherAnElement, reFormat = true);` |


## Format and unformat other numbers or DOM elements with an existing AutoNumeric element

You can use any AutoNumeric element to format or unformat other numbers or DOM elements.

This allows to format or unformat numbers, strings or directly other DOM elements without having to specify the options each time, since the current AutoNumeric object already has those settings set.

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `formatOther` | This use the same function signature that when using the static AutoNumeric method directly (cf. [`AutoNumeric.format`](/docs/static-methods#formatting)), but without having to pass the options | `anElement.formatOther(12345, { options });` |
| `formatOther` | Idem above, but apply the formatting to the given DOM element by modifying its content directly | `anElement.formatOther(domElement, { options }); ` |
| `unformatOther` | This use the same function signature that when using the static AutoNumeric method directly (cf. [`AutoNumeric.unformat`](/docs/static-methods#formatting)), but without having to pass the options | `anElement.unformatOther('1.234,56 €', { options });` |
| `unformatOther` | Idem above, but apply the unformatting to the given DOM element by modifying its content directly | `anElement.unformatOther(domElement, { options });` |


## Initialize other DOM Elements

Once you have an AutoNumeric element already setup correctly with the right options, you can use it as many times you want to initialize as many other DOM elements as needed.
<div class="admonition tip">
<p class="admonition-title">Important</p>

This works only on elements that can be managed by AutoNumeric.<br>You can check the list of supported elements [here](/docs/on-which-elements-can-it-be-used#on-other-dom-elements).

</div>


Whenever `init` is used to initialize other DOM elements, a shared local [*'init' list*](#perform-actions-globally-on-a-shared-init-list-of-autonumeric-elements) of those elements is stored in the AutoNumeric objects.<br>This allows for neat things like modifying all those *linked* AutoNumeric elements globally, with only one call.

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `init` | Use an existing AutoNumeric element to initialize another single DOM element with the same options | `const anElement2 = anElement.init(domElement2);` |
| `init` | If `true` is set as the second argument, then the newly generated AutoNumeric element will not share the same local element list as `anElement` | `const anElement2 = anElement.init(domElement2, true);` |
| `init` | Use an existing AutoNumeric element to initialize multiple other DOM elements from an Array, with the same options | `const anElementsArray = anElement.init([domElement2, domElement3, domElement4]);` |
| `init` | Use an existing AutoNumeric element to initialize multiple other DOM elements from a CSS selector, with the same options | `const anElementsArray = anElement.init('.currency');` |


## Perform actions globally on a shared 'init' list of AutoNumeric elements

This local *'init' list* can be used to perform global operations on all those AutoNumeric elements, with **one function call**.<br>

<div class="admonition example">
<p class="admonition-title">Example</p>

The function names are the same as [the ones](#usual-autonumeric-functions-like-set-get-format-and-unformat) that are used on a single AutoNumeric element.

For instance instead of calling `anElement.set(42)` on a single element, you must call the function by prefixing `.global` before the method name like so: `anElement.global.set(42)`.

</div>


### Functions that affects the AuotNumeric elements
Below are listed all the supported methods than can be called globally:

```js
anElement.global.set(2000); // Set the value 2000 in all the AutoNumeric-managed elements that are shared on this element
anElement.global.setUnformatted(69);
[result1, result2, result3] = anElement.global.get(); // Return an array of results
[result1, result2, result3] = anElement.global.getNumericString(); // Return an array of results
[result1, result2, result3] = anElement.global.getFormatted(); // Return an array of results
[result1, result2, result3] = anElement.global.getNumber(); // Return an array of results
[result1, result2, result3] = anElement.global.getLocalized(); // Return an array of results
anElement.global.reformat();
anElement.global.unformat();
anElement.global.unformatLocalized();
anElement.global.unformatLocalized(forcedOutputFormat);
anElement.global.update({ options }); // Update the settings of each AutoNumeric-managed elements
anElement.global.update({ options1 }, { options2 }, { options3 }); // Idem above, but accepts as many option objects as needed
anElement.global.isPristine(); // Return `true` if *all* the AutoNumeric-managed elements are pristine, if their raw value hasn't changed
anElement.global.isPristine(false); // Idem as above, but also checks that the formatted value hasn't changed
anElement.global.clear(); // Clear the value in all the AutoNumeric-managed elements that are shared on this element
anElement.global.remove();
anElement.global.wipe();
anElement.global.nuke();
```

<div class="admonition note">

Do note that the `.global.get*()` functions return an array of results, with one value for each AutoNumeric element in the linked list

</div>



### Functions that affects the init-list
The shared local list also provide *list-specific* methods to manipulate it:
```js
anElement.global.has(domElementOrAutoNumericObject); // Return `true` if the given AutoNumeric object (or DOM element) is in the local AutoNumeric element list
anElement.global.addObject(domElementOrAutoNumericObject); // Add an existing AutoNumeric object (or DOM element) to the local AutoNumeric element list, using the DOM element as the key
anElement.global.removeObject(domElementOrAutoNumericObject); // Remove the given AutoNumeric object (or DOM element) from the local AutoNumeric element list, using the DOM element as the key
anElement.global.removeObject(domElementOrAutoNumericObject, true); // Idem above, but keep the current AutoNumeric object in the local list if it's removed by itself
anElement.global.empty(); // Remove all elements from the shared list, effectively emptying it
anElement.global.empty(true); // Idem above, but instead of completely emptying the local list of each AutoNumeric objects, each one of those keeps itself in its own local list
[anElement0, anElement1, anElement2, anElement3] = anElement.global.elements(); // Return an array containing all the AutoNumeric elements that have been initialized by each other
anElement.global.getList(); // Return the `Map` object directly
anElement.global.size(); // Return the number of elements in the local AutoNumeric element list
```

### Using callback functions with `global.get*` methods

Like for their `get*` methods [counterparts](#using-callback-functions-with-get-methods), `global.get*` methods accepts a callback function.
However, the callback is executed only **once** and is passed an array of the `get*` function results as its first argument, while the AutoNumeric object being passed as its second one.

```js
// Using:
anElement.global.getNumericString(funcCallback);

// Is equivalent to doing:
const [result1, result2, result3] = anElement.global.getNumericString();
funcCallback([result1, result2, result3], anElement);
```

## Form functions

AutoNumeric elements provide special functions to manipulate the [form](https://developer.mozilla.org/en-US/docs/Learn/Forms) they are a part of.
Those special functions really work on the parent `<form>` element, instead of the `<input>` element itself.

Form functions can be divided in two categories:

- Functions that manipulate the form values, and
- Functions that submit the form values to the server.

### Access and manipulate the form values

The functions below makes retrieving and preparing the form values easy. Those values can be formatted or not, and in any format you would want (`Array`, JSON, string, etc.).

You can then decide how and when to send those form values to the server.

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `form` | Return a reference to the parent `<form>` element, `null` if it does not exist | `anElement.form();` |
| `form(forcedSearch)` | Idem above, but will force a new search for the parent `<form>` element, discarding any previously found one | `anElement.form(true);` |
| `formNumericString` | Return a string in standard URL-encoded notation with the form input values being unformatted | `anElement.formNumericString();` |
| `formFormatted` | Return a string in standard URL-encoded notation with the form input values being formatted | `anElement.formFormatted();` |
| `formLocalized` | Return a string in standard URL-encoded notation with the form input values, with localized values | `anElement.formLocalized();` |
| `formLocalized(forcedOutputFormat)` | Idem above, but with the possibility of overriding the `outputFormat` option | `anElement.formLocalized(forcedOutputFormat);` |
| `formArrayNumericString` | Return an array containing an object for each form `<input>` element, with the values as numeric strings | `anElement.formArrayNumericString();` |
| `formArrayFormatted` | Return an array containing an object for each form `<input>` element, with the values as formatted strings | `anElement.formArrayFormatted();` |
| `formArrayLocalized` | Return an array containing an object for each form `<input>` element, with the values as localized numeric strings | `anElement.formArrayLocalized();` |
| `formArrayLocalized(forcedOutputFormat)` | Idem above, but with the possibility of overriding the `outputFormat` option | `anElement.formArrayLocalized(forcedOutputFormat);` |
| `formJsonNumericString` | Return a JSON string containing an object representing the form input values. This is based on the result of the `formArrayNumericString()` function. | `anElement.formJsonNumericString();` |
| `formJsonFormatted` | Return a JSON string containing an object representing the form input values. This is based on the result of the `formArrayFormatted()` function. | `anElement.formJsonFormatted();` |
| `formJsonLocalized` | Return a JSON string containing an object representing the form input values. This is based on the result of the `formArrayLocalized()` function. | `anElement.formJsonLocalized();` |
| `formJsonLocalized(forcedOutputFormat)` | Idem above, but with the possibility of overriding the `outputFormat` option | `anElement.formJsonLocalized(forcedOutputFormat);` |
| `formUnformat` | Unformat all the AutoNumeric-managed elements that are a child to the parent &lt;form> element of this `anElement` input, to numeric strings | `anElement.formUnformat();` |
| `formUnformatLocalized` | Unformat all the AutoNumeric-managed elements that are a child to the parent &lt;form> element of this `anElement` input, to localized strings | `anElement.formUnformatLocalized();` |
| `formReformat` | Reformat all the AutoNumeric-managed elements that are a child to the parent &lt;form> element of this `anElement` input | `anElement.formReformat();` |

### Submit the form values

Submitting the form values to the server can be done with a single AutoNumeric function call.
Moreover, the functions below may take a [callback](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function), giving you more control on what to do when submitting data to the server.

The following functions can either take a callback, or not. If they don't, the default `form.submit()` function will be called.

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `formSubmitNumericString(callback)` | Run the `callback(value)` with `value` being equal to the result of `formNumericString()` | `anElement.formSubmitNumericString(callback);` |
| `formSubmitFormatted(callback)` | Run the `callback(value)` with `value` being equal to the result of `formFormatted()` | `anElement.formSubmitFormatted(callback);` |
| `formSubmitLocalized(callback)` | Run the `callback(value)` with `value` being equal to the result of `formLocalized()` | `anElement.formSubmitLocalized(callback);` |
| `formSubmitLocalized(forcedOutputFormat, callback)` | Idem above, but with the possibility of overriding the `outputFormat` option | `anElement.formSubmitLocalized(forcedOutputFormat, callback);` |

For the following methods, the callback is mandatory:

| Method           | Description | Call example |
| :---------------- | :-----------  | :-----------  |
| `formSubmitArrayNumericString(callback)` | Run the `callback(value)` with `value` being equal to the result of `formArrayNumericString()` | `anElement.formSubmitArrayNumericString(callback);` |
| `formSubmitArrayFormatted(callback)` | Run the `callback(value)` with `value` being equal to the result of `formArrayFormatted()` | `anElement.formSubmitArrayFormatted(callback);` |
| `formSubmitArrayLocalized(callback, forcedOutputFormat)` | Idem above, but with the possibility of overriding the `outputFormat` option | `anElement.formSubmitArrayLocalized(callback, forcedOutputFormat);` |
| `formSubmitJsonNumericString(callback)` | Run the `callback(value)` with `value` being equal to the result of `formJsonNumericString()` | `anElement.formSubmitJsonNumericString(callback);` |
| `formSubmitJsonFormatted(callback)` | Run the `callback(value)` with `value` being equal to the result of `formJsonFormatted()` | `anElement.formSubmitJsonFormatted(callback);` |
| `formSubmitJsonLocalized(callback, forcedOutputFormat)` | Idem above, but with the possibility of overriding the `outputFormat` option | `anElement.formSubmitJsonLocalized(callback, forcedOutputFormat);` |


## Function chaining

Most of those instantiated functions can be chained which allow to be less verbose and more concise.

::: code-group
```js [Chaining on one element]
anElement.french()
         .set(42)
         .update({ options })
         .formSubmitJsonNumericString(callback)
         .clear();
```
:::

::: code-group
```js [Chaining on multiple elements]
anElement.global.set(72)
         .global.clear()
         .set(25)
         .global.getNumericString();
```
:::

## Static methods

AutoNumeric also provide static functions on the AutoNumeric class. You can check those out in the [next chapter](/docs/static-methods).

::::
