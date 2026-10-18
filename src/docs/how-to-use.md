:::: v-pre

# How to use?

## In the browser
Simply include **autoNumeric** in your html `<header>` tag.<br>No other files or libraries are required ; autoNumeric has **[no dependency](/docs/developer/dependencies)**.

```html
<script src="autoNumeric.min.js" type="text/javascript"></script>
<!-- ...or, you may also directly use a CDN :-->
<script src="https://cdn.jsdelivr.net/npm/autonumeric@4.10.10"></script>
<!-- ...or -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/autonumeric/4.8.1/autoNumeric.min.js"></script>
<!-- ...or -->
<script src="https://unpkg.com/autonumeric"></script>
<!-- ...or any other CDN. -->
```

## In another script
If you want to use AutoNumeric in your code, you can import the `src/AutoNumeric.js` file as an ES6 module using:
```js
import AutoNumeric from 'autonumeric';
```

Then you can initialize autoNumeric with or without options :
```js
// autoNumeric with the defaults options
anElement = new AutoNumeric(domElement);

// autoNumeric with specific options being passed
anElement = new AutoNumeric(domElement, { options });

// autoNumeric with a css selector and a pre-defined language options
anElement = new AutoNumeric('.myCssClass > input').french();
```

You're done!

<div class="admonition info">

See the available predefined language list [here](/docs/predefined-options#predefined-language-options).

</div>


<div class="admonition tip">
<p class="admonition-title">Tip</p>

An AutoNumeric object can be initialized in various ways, check those out [here](/docs/initialization).

</div>


## In Web Workers

Some static AutoNumeric functions that do not access nor modify the DOM can be used in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) (ie. `AutoNumeric.format()`, `AutoNumeric.unformat()`, etc.).

In order to be able to use AutoNumeric in those web workers, you need to import the **source** file `src/main.js`, not the generated one found in `dist/AutoNumeric.js`. For instance, by importing the library like that:
```js
import AutoNumeric from '../node_modules/autonumeric/src/main';
```

Doing this will allow your project [Webpack](https://webpack.github.io/) configuration to compile it correctly (and use tree shaking as needed).

::::
