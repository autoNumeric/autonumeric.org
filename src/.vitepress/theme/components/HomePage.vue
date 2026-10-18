<script setup>
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import AnLogo from './AnLogo.vue';
import AnButton from './AnButton.vue';
import AnInput from './AnInput.vue';
import CodeBlock from './CodeBlock.vue';
import { loadAutoNumeric } from '../lib/autonumeric';
import { options } from '../data/options';

// Computes the "more than 50 options" string : the documented option count, rounded down to the ten
const optionCount = Math.floor(options.length / 10) * 10;

// Formats cycled through in the "try it now" demo
const demos = [
    {
        options: 'French',
        code   : `new AutoNumeric('#input').french();`,
    },
    {
        options: 'NorthAmerican',
        code   : `new AutoNumeric('#input').northAmerican();`,
    },
    {
        options: { currencySymbol: 'Ω', decimalCharacter: ',', digitGroupSeparator: '.' },
        code   : `new AutoNumeric('#input', {
    currencySymbol : 'Ω',
    decimalCharacter : ',',
    digitGroupSeparator : '.',
});`,
    },
    {
        options: 'percentageEU2dec',
        code   : `new AutoNumeric('#input',
    AutoNumeric.getPredefinedOptions().percentageEU2dec);`,
    },
    {
        options: { styleRules: { positive: 'autoNumeric-positive', negative: 'autoNumeric-negative' } },
        code   : `new AutoNumeric('#input', {
    styleRules:
        AutoNumeric.options.styleRules.positiveNegative,
});`,
    },
    {
        options: { currencySymbol: ' XPF', digitGroupSeparator: '\'', decimalPlaces: 3, currencySymbolPlacement: 's' },
        code   : `new AutoNumeric('#input', {
    currencySymbol         : ' XPF',
    digitGroupSeparator    : '\\'',
    decimalPlaces          : 3,
    currencySymbolPlacement:
        AutoNumeric.options.currencySymbolPlacement.suffix,
});`,
    },
    {
        options: {
            decimalPlacesRawValue     : 6,
            decimalPlacesShownOnBlur  : 3,
            decimalPlacesShownOnFocus : 4,
            emptyInputBehavior        : 'zero',
            minimumValue              : '-273.15',
            negativeBracketsTypeOnBlur: '(,)',
            showPositiveSign          : true,
            symbolWhenUnfocused       : ' ℃',
            valuesToStrings           : {
                '-273.15': 'Absolute zero',
                0        : 'Freezing',
                22.5     : 'Warm',
                30       : 'Hot',
                100      : 'Boiling',
                666      : 'Hellish',
            },
            wheelStep                 : 2.5,
        },
        code   : `new AutoNumeric('#input', {
    decimalPlacesRawValue     : 6,
    decimalPlacesShownOnBlur  : 3,
    decimalPlacesShownOnFocus : 4,
    emptyInputBehavior        : 'zero',
    minimumValue              : '-273.15',
    negativeBracketsTypeOnBlur: '(,)',
    showPositiveSign          : true,
    symbolWhenUnfocused       : ' ℃',
    valuesToStrings           : {
        '-273.15': 'Absolute zero',
        0        : 'Freezing',
        22.5     : 'Warm',
        30       : 'Hot',
        100      : 'Boiling',
        666      : 'Hellish',
    },
    wheelStep                 : 2.5,
});`,
    },
];

const { theme } = useData();

const current = ref(0);
const demo = computed(() => demos[current.value]);
const rawValue = ref('1234567.89');

function show(index) {
    current.value = (index + demos.length) % demos.length;
}

// Latest published version (jsDelivr's API allows cross-origin requests), falling back to the version bundled with this website.
const version = ref(null);

onMounted(async () => {
    try {
        // Given up after 3 seconds : the version installed is then shown instead of waiting for jsDelivr
        const response = await fetch('https://data.jsdelivr.com/v1/packages/npm/autonumeric/resolved?specifier=latest',
            { signal: AbortSignal.timeout(3000) });
        version.value = (await response.json()).version ?? null;
    } catch {
        // Offline, API unavailable or too slow
    }

    if (!version.value) {
        const AutoNumeric = await loadAutoNumeric().catch(() => null);
        version.value = AutoNumeric?.version() ?? null;
    }
});

const features = [
    {
        title  : 'Speed & efficiency',
        details: 'AutoNumeric focuses on efficiency and speed, making all your input interactions blazing fast.',
    },
    {
        title  : 'Web Workers-enabled',
        details: 'Got lots of formatting to do? Need even more speed? AutoNumeric supports being used in <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Workers</a>.',
    },
    {
        title  : 'Independent',
        details: 'No <a href="https://github.com/autoNumeric/autoNumeric/#dependencies">dependencies</a> are needed to use AutoNumeric.<br>No jQuery, no Lodash, no nothing!',
    },
    {
        title  : 'Future proof',
        details: 'Written in modern JavaScript, AutoNumeric uses the latest technologies and is prepared for the future.',
    },
    {
        title  : 'Android support',
        details: 'While the Android platform makes input management <a href="https://medium.com/outsystems-experts/javascript-events-unmasked-how-to-create-an-input-mask-for-mobile-fc0df165e8b2">hard to play with</a>, AutoNumeric supports it.',
    },
    {
        title  : 'Framework-ready',
        details: 'AutoNumeric is framework-agnostic, so you can easily integrate it with <a href="https://github.com/autoNumeric/autoNumeric/#related-projects">third-party frameworks</a>.',
    },
];
</script>

<template>
    <div class="home">
        <!-- Hero: the navigation bar sits on top of it, in the same blue -->
        <section class="hero">
            <div class="hero__main">
                <AnLogo class="hero__logo" />
                <h1 class="hero__title">AutoNumeric.js</h1>
                <p class="hero__tagline">Automatically format your numbers and currencies</p>
            </div>

            <div class="hero__actions">
                <AnButton href="/docs/" variant="light" icon="help">Get started</AnButton>
                <AnButton
                    href="/configurator"
                    variant="ghost"
                    icon="list"
                    title="Use the configuration generator to ease the creation of your custom format"
                >
                    Generate your formatting options
                </AnButton>
            </div>

            <p v-if="version" class="hero__version">
                Latest version:
                <a :href="`https://github.com/autoNumeric/autoNumeric/releases/tag/v${version}`"><code>{{ version }}</code></a>
            </p>
            <p class="hero__support">Help AutoNumeric by <a href="/support">supporting</a> it</p>
        </section>

        <section class="key-features" aria-label="Key features">
            <div class="key-features__item">
                <h2>Easy to use</h2>
                <p>Natural syntax allows to easily setup and configure any element to be formatted.</p>
            </div>
            <div class="key-features__item">
                <h2>Versatile</h2>
                <p>Very high configurability with more than {{ optionCount }} options available. Define your format as you wish.</p>
            </div>
            <div class="key-features__item">
                <h2>Powerful</h2>
                <p>ES6-ready, function chaining, shared options, Web Workers compatible. Actively maintained open-source code.</p>
            </div>
        </section>

        <section id="whatisit" class="what">
            <div class="what__intro">
                <h2>What is AutoNumeric?</h2>
                <p>AutoNumeric is a JavaScript library that provides live <em>as-you-type</em> formatting for international numbers and currencies.</p>
            </div>

            <div class="what__demo">
                <div class="try">
                    <h3>Enough of that, I want to try it now!</h3>
                    <p>The <code>&lt;input&gt;</code> element below is managed by AutoNumeric. Change its value and see how the underlying <code>rawValue</code> is modified:</p>
                    <AnInput
                        v-model="rawValue"
                        :options="demo.options"
                        :lazy="false"
                        class="try__input"
                        aria-label="AutoNumeric demo input"
                    />
                    <p class="try__raw" title="You can always access the unformatted raw value using aNElement.getNumericString()">
                        The <code>rawValue</code> is equal to <code>{{ rawValue }}</code>
                    </p>
                    <div class="try__controls">
                        <AnButton variant="flat" icon="chevron-left" @click="show(current - 1)">Previous options</AnButton>
                        <AnButton variant="flat" icon-right="chevron-right" @click="show(current + 1)">Next options</AnButton>
                    </div>
                </div>

                <div class="source">
                    <h3>Source code for that input</h3>
                    <CodeBlock :code="demo.code" class="source__code" />
                    <div class="source__dots" role="tablist" aria-label="Choose a format">
                        <button
                            v-for="(item, index) in demos"
                            :key="index"
                            type="button"
                            role="tab"
                            :aria-selected="index === current"
                            :aria-label="`Format ${index + 1}`"
                            :class="{ selected: index === current }"
                            @click="show(index)"
                        />
                    </div>
                    <p class="source__note">While the input value is formatted, you can always access the unformatted raw value using <code>aNElement.getNumericString()</code>.</p>
                    <p>Play with the <a href="https://codepen.io/AnotherLinuxUser/pen/JyBGpz?editors=1010">live demo</a> and the <a href="https://codepen.io/AnotherLinuxUser/pen/pWgOrZ">vue-autonumeric demo</a>.</p>
                </div>
            </div>

            <p class="what__more">Use the <a href="/configurator">configuration generator</a> to easily set up the format <strong>you</strong> want.</p>
            <p class="what__more what__more--last">Want to know more? Check out the <a href="/examples">examples</a>.</p>
        </section>

        <section class="features" aria-label="Features">
            <div v-for="feature in features" :key="feature.title" class="features__item">
                <h2>{{ feature.title }}</h2>
                <p v-html="feature.details" />
            </div>
        </section>

        <section class="involve" aria-label="Get involved">
            <div class="involve__item">
                <h2>Contribute</h2>
                <p class="involve__sub">Help build AutoNumeric</p>
                <p>AutoNumeric is and always will be 100% free and open-source under the MIT license. Fork it on GitHub and help make it better.</p>
                <AnButton href="https://github.com/autoNumeric/autoNumeric/#how-to-contribute" variant="navy">Fork on Github</AnButton>
            </div>
            <div class="involve__item">
                <h2>Donate</h2>
                <p class="involve__sub">Support AutoNumeric development</p>
                <p>Help pay for dedicated dev time so that AutoNumeric can move forward and evolve. If you are a company that uses AutoNumeric daily, your support means a lot!</p>
                <AnButton href="https://www.patreon.com/user?u=4810062" variant="donate">Donate</AnButton>
            </div>
            <div class="involve__item">
                <h2>Feedback</h2>
                <p class="involve__sub">Your ideas are precious</p>
                <p>Your ideas and comments are very important to us.<br>Open an issue on GitHub for any feature request or problem, and we'll get on it. If you have a question, ping us on our <a href="https://gitter.im/autoNumeric/autoNumeric">Gitter channel</a>.</p>
                <AnButton href="https://github.com/autoNumeric/autoNumeric/issues/new" variant="navy">Open an issue</AnButton>
            </div>
        </section>
    </div>
</template>

<style scoped>
.home {
    text-align : center;
    color      : var(--an-ink);
}

.home h2,
.home h3 {
    margin         : 0;
    border         : 0;
    padding        : 0;
    font-family    : var(--an-font-ui);
    letter-spacing : normal;
}

.home p {
    margin      : 0;
    font-family : var(--an-font-text);
    font-weight : 300;
    font-size   : 0.95rem;
    line-height : 1.6;
}

/* Hero ------------------------------------------------------------------- */

.hero {
    display          : flex;
    flex-direction   : column;
    align-items      : center;
    justify-content  : center;
    gap              : 1.5rem;
    min-height       : calc(62vh - var(--vp-nav-height));
    padding          : 2.5rem 1.5rem 1.5rem;
    color            : #FFF;
    background-image : linear-gradient(var(--an-blue), var(--an-blue-deep));
}

.hero__main {
    display        : flex;
    flex-direction : column;
    align-items    : center;
}

.hero__logo {
    color : #FFF;
}

.hero__title {
    margin      : 0.5rem 0 1.5rem;
    font-family : var(--an-font-ui);
    font-size   : clamp(2rem, 6vw, 3.2rem);
    font-weight : 300;
    line-height : 1.1;
}

.home .hero__tagline {
    font-size   : clamp(1.35rem, 3.5vw, 2rem);
    line-height : 1.25;
}

.hero__actions {
    display         : flex;
    flex-wrap       : wrap;
    justify-content : center;
    gap             : 1rem;
    margin-top      : 1rem;
}

.hero__version a {
    color           : #FFF;
    text-decoration : none;
}

.hero__version a:hover {
    color : var(--an-hero-link-hover);
}

.hero__version code {
    color      : inherit;
    background : rgba(255, 255, 255, 0.12);
}

.home .hero__support {
    font-size  : 1rem;
    font-style : italic;
}

.hero__support a {
    color : var(--an-hero-donate);
}

.hero__support a:hover {
    color : var(--an-hero-donate-hover);
}

/* Key features ----------------------------------------------------------- */

.key-features {
    display               : grid;
    grid-template-columns : repeat(3, minmax(0, 260px));
    justify-content       : center;
    gap                   : 3rem;
    padding               : 3.5rem 1.5rem;
}

.key-features h2 {
    margin-bottom : 1rem;
    font-size     : 1.5rem;
    font-weight   : 500;
    color         : var(--an-blue);
}

/* What is it ------------------------------------------------------------- */

.what {
    padding          : 3rem 1.5rem;
    background-color : var(--an-mist);
}

.what__intro {
    max-width : 700px;
    margin    : 0 auto 3.5rem;
}

.what__intro h2 {
    font-size   : clamp(1.5rem, 4vw, 2rem);
    font-weight : 300;
}

.home .what__intro p {
    margin-top : 0.5rem;
    font-size  : clamp(1.05rem, 2.5vw, 1.4rem);
}

.what__demo {
    display               : grid;
    grid-template-columns : repeat(2, minmax(0, 440px));
    justify-content       : space-around;
    gap                   : 2rem;
    max-width             : 1100px;
    margin                : 0 auto;
}

.try {
    display        : flex;
    flex-direction : column;
    align-items    : center;
    gap            : 0.75rem;
}

.try h3,
.source h3 {
    font-size   : 1.1rem;
    font-weight : 500;
}

.try > p {
    max-width : 300px;
}

.try__input {
    width     : 100%;
    max-width : 320px;
}

.try__raw {
    cursor : help;
}

.try__controls {
    display         : flex;
    justify-content : space-between;
    width           : 100%;
    max-width       : 320px;
}

/* Links and inline code in the light sections. :deep() also reaches the feature texts, which are inserted as HTML (v-html) */
.what :deep(a),
.features :deep(a) {
    color           : var(--an-link);
    text-decoration : none;
}

.what :deep(a:hover),
.what :deep(a:focus-visible),
.features :deep(a:hover),
.features :deep(a:focus-visible) {
    text-decoration : underline;
}

.what :not(pre) > code,
.features :not(pre) > code {
    margin           : 0;
    padding          : 0.2rem 0;
    border-radius    : 3px;
    font-family      : 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size        : 85%;
    color            : inherit;
    background-color : rgba(27, 31, 35, 0.05);
}

.what :not(pre) > code::before,
.what :not(pre) > code::after,
.features :not(pre) > code::before,
.features :not(pre) > code::after {
    content        : '\00a0';
    letter-spacing : -0.2em;
}

:global(.dark) .what :not(pre) > code,
:global(.dark) .features :not(pre) > code {
    background-color : rgba(255, 255, 255, 0.08);
}

.source {
    display        : flex;
    flex-direction : column;
    gap            : 0.75rem;
    text-align     : left;
}

.source h3 {
    text-align : center;
}

.source__code {
    min-height : 150px;
    margin     : 0;
}

.source__dots {
    display         : flex;
    justify-content : center;
    gap             : 0.5rem;
}

.source__dots button {
    width            : 10px;
    height           : 10px;
    padding          : 0;
    border           : 0;
    border-radius    : 50%;
    background-color : #B2C4D1;
    cursor           : pointer;
    transition       : background-color 0.3s ease;
}

.source__dots button.selected {
    background-color : var(--an-blue);
}

.source__dots button:focus-visible {
    outline        : 2px solid var(--an-focus);
    outline-offset : 2px;
}

.home .source__note {
    font-size : 0.8rem;
    color     : var(--vp-c-text-2);
}

.home .what__more {
    margin-top : 3.5rem;
}

.home .what__more--last {
    margin-top : 1rem;
}

.what__more strong {
    font-weight : 500;
}

/* Features --------------------------------------------------------------- */

.features {
    display               : grid;
    grid-template-columns : repeat(3, minmax(0, 260px));
    justify-content       : center;
    gap                   : 4rem 3rem;
    padding               : 4rem 1.5rem;
}

.features h2 {
    margin-bottom : 0.8rem;
    font-size     : 1.4rem;
    font-weight   : 500;
    color         : var(--an-blue);
}

/* Get involved (flows into the site footer) ------------------------------ */

.involve {
    display               : grid;
    grid-template-columns : repeat(3, minmax(0, 320px));
    justify-content       : center;
    gap                   : 2rem;
    padding               : 4rem 1.5rem 3rem;
    color                 : #FFF;
    background-color      : var(--an-navy);
}

.involve__item {
    display        : flex;
    flex-direction : column;
    align-items    : center;
    gap            : 1rem;
}

.involve h2 {
    font-size   : 1.4rem;
    font-weight : 500;
}

.involve__item > p:last-of-type {
    flex-grow : 1;
}

.involve a:not(.an-button) {
    color : #73B0E6;
}

.involve a:not(.an-button):hover {
    color : #66E6D3;
}

.involve .an-button {
    width     : 70%;
    max-width : 250px;
    font-size : 0.9rem;
}

/* Responsive ------------------------------------------------------------- */

@media (max-width : 950px) {
    .key-features,
    .features,
    .involve {
        grid-template-columns : minmax(0, 420px);
        gap                   : 2rem;
    }

    .what__demo {
        grid-template-columns : minmax(0, 440px);
        justify-content       : center;
    }
}
</style>
