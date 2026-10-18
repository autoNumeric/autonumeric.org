:::: v-pre

# Initialization

An AutoNumeric object can be initialized in various ways.

### Initialize one AutoNumeric object

It always takes either a [DOM element](https://developer.mozilla.org/en-US/docs/Web/API/Element) reference as its first argument, or a [CSS string selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

<div class="admonition note">
<p class="admonition-title">Note</p>

Only one element can be selected this way, since under the hood `document.querySelector` is called, and this only return one element.

If you need to be able to select and initialize multiple elements in one call, then consider using the static [`AutoNumeric.multiple()`](#initialize-multiple-autonumeric-objects-at-once) function.

</div>


#### Using a DOM element

::: code-group
```js [Basic initialization with formatting options]
anElement = new AutoNumeric(domElement); // With the default options
anElement = new AutoNumeric(domElement, { options }); // With one option object
anElement = new AutoNumeric(domElement, 'euroPos'); // With a named pre-defined string
anElement = new AutoNumeric(domElement, [{ options1 }, 'euroPos', { options2 }]); // With multiple option objects (the latest option overwriting the previous ones)
anElement = new AutoNumeric(domElement).french(); // With one pre-defined language object
anElement = new AutoNumeric(domElement).french({ options });// With one pre-defined language object and additional options that will override those defaults
```
:::

::: code-group
```js [Initialization and setting the value in one call]
anElement = new AutoNumeric(domElement, 12345.789); // With the default options, and an initial value
anElement = new AutoNumeric(domElement, 12345.789, { options });
anElement = new AutoNumeric(domElement, '12345.789', { options });
anElement = new AutoNumeric(domElement, 12345.789, 'euroPos');
anElement = new AutoNumeric(domElement, 12345.789, [{ options1 }, 'euroPos', { options2 }]);
anElement = new AutoNumeric(domElement, null, { options }); // With a null initial value
anElement = new AutoNumeric(domElement, 12345.789).french({ options });
anElement = new AutoNumeric(domElement, 12345.789, { options }).french({ options }); // Not really helpful, but possible
```
:::
#### Using CSS selectors
The AutoNumeric constructor class can also accept a string as a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).<br>Under the hood this use the [`QuerySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) Javascript function, and limit itself to only the first element it finds:
::: code-group
```js [Examples using a CSS selector]
anElement = new AutoNumeric('.myCssClass > input');
anElement = new AutoNumeric('.myCssClass > input', { options });
anElement = new AutoNumeric('.myCssClass > input', 'euroPos');
anElement = new AutoNumeric('.myCssClass > input', [{ options1 }, 'euroPos', { options2 }]);
anElement = new AutoNumeric('.myCssClass > input', 12345.789);
anElement = new AutoNumeric('.myCssClass > input', 12345.789, { options });
anElement = new AutoNumeric('.myCssClass > input', 12345.789, 'euroPos');
anElement = new AutoNumeric('.myCssClass > input', 12345.789, [{ options1 }, 'euroPos', { options2 }]);
anElement = new AutoNumeric('.myCssClass > input', null, { options }); // With a null initial value
anElement = new AutoNumeric('.myCssClass > input', 12345.789).french({ options });
```
:::
<div class="admonition note">
<p class="admonition-title">Note</p>

AutoNumeric also accepts a [limited tag list](/docs/on-which-elements-can-it-be-used#on-other-dom-elements) that it will format on page load, but without adding any event listeners if their `contenteditable` attribute is not set to `true`.

</div>


### Initialize multiple AutoNumeric objects at once

#### Using DOM elements
If you know you want to initialize multiple elements in one call, you must then use the static `AutoNumeric.multiple()` function:
::: code-group
```js [Initializing multiple DOM elements in one call (and possibly pass multiple values that will be mapped to each DOM element)]
[anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], { options });
[anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], 'euroPos');
[anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], [{ options }, 'euroPos']);
[anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], 12345.789, { options });
[anElement1, anElement2, anElement3] = AutoNumeric.multiple([domElement1, domElement2, domElement3], 12345.789, [{ options }, 'euroPos']);
[anElement1, anElement2, anElement3] = AutoNumeric.multiple.french([domElement1, domElement2, domElement3], [12345.789, 234.78, null], { options });
[anElement1, anElement2, anElement3] = AutoNumeric.multiple.french([domElement1, domElement2, domElement3], [12345.789, 234.78, null], [{ options }, 'euroPos']);
```
:::

<div class="admonition tip">
<p class="admonition-title">Tip</p>

You can pass multiple different values to the selected inputs, using an `Array`. Those values will be mapped one-to-one in the order the elements are found.

</div>


#### Using CSS selectors
If you want to select multiple elements via a [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors), then you must use the `multiple` function as well as above.<br>Under the hood the [`QuerySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) Javascript function is used.
::: code-group
```js [Initializing multiple elements with a single CSS selector]
[anElement1, anElement2] = AutoNumeric.multiple('.myCssClass > input', { options }); // This always return an Array, even if there is only one element selected
[anElement1, anElement2] = AutoNumeric.multiple('.myCssClass > input', [null, 12345.789], { options }); // Idem above, but with passing the initial values too
```
:::

<div class="admonition tip">
<p class="admonition-title">Tip</p>

The `AutoNumeric.multiple()` function will always return an `Array`, even if there is only one element selected.

</div>


<div class="admonition note">
<p class="admonition-title">Note</p>

Using an array of option objects and/or pre-defined names will always merge those settings together. The resulting `settings` objet will then be applied to all the selected elements; they will share the exact same settings.

</div>


#### Form elements selections

AutoNumeric treats `<form>` elements differently; If a `<form>` element is passed *(or any other 'parent' (or 'root') DOM element)*, then AutoNumeric will initialize each child `<input>` elements recursively, ignoring those referenced in the `exclude` attribute:
::: code-group
```js [AutoNumeric initialize the form's &lt;input&gt; elements recursively]
[anElement1, anElement2] = AutoNumeric.multiple({ rootElement: formElement }, { options });
[anElement1, anElement2] = AutoNumeric.multiple({ rootElement: formElement, exclude : [hiddenElement, tokenElement] }, { options });
[anElement1, anElement2] = AutoNumeric.multiple({ rootElement: formElement, exclude : [hiddenElement, tokenElement] }, [12345.789, null], { options });
```
:::

::::
