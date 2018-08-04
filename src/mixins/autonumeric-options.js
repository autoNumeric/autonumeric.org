export default {
    data() {
        return {
            options: [
                // One v-model is used for each option. That way the user can see the differences between the difference optionChoice with the same value
                {
                    name             : 'allowDecimalPadding',
                    descriptionShort : 'Defines if the decimal places should be padded with zeroes',
                    description      : 'Allow padding the decimal places with zeros. If set to <code>\'floats\'</code>, padding is only done when there are some decimals.',
                    initialValue     : 1234.5, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'always',
                            value       : true,
                            description : `Always pad decimals with zeros (ie. <code>'12.3400'</code>)`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'never',
                            value       : false,
                            description : `Never pad with zeros (ie. <code>'12.34'</code>)`,
                        },
                        {
                            optionChoice: 'floats',
                            value       : 'floats',
                            description : `Pad with zeroes only when there are decimals (ie. <code>'12'</code> and <code>'12.3400'</code>)`,
                        },
                    ],
                    additionalInfo   : `Note: setting <code>allowDecimalPadding</code> to <code>false</code> will override the <code>decimalPlaces</code> option`,
                    additionalOptions: {
                        showWarnings: false,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'alwaysAllowDecimalCharacter',
                    descriptionShort : 'Defines if the decimal character or decimal character alternative should be accepted when there is already a decimal character shown in the element.',
                    description      : 'If set to <code>true</code>, any decimal character input will be accepted and will subsequently modify the decimal character position, as well as the <code>rawValue</code>.<br>If set to <code>false</code>, the decimal character and its alternative key will be dropped. This is the default setting.',
                    initialValue     : 2202.674, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'alwaysAllow',
                            value       : true,
                            description : `Allow entering a decimal character even if one is already present in the number`,
                        },
                        {
                            optionChoice: 'doNotAllow',
                            value       : false,
                            description : `Prevent the insertion of the decimal character if one is already used in the number`,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'caretPositionOnFocus',
                    descriptionShort : 'Defines where should be positioned the caret on focus',
                    description      : 'Defines where should be positioned the caret on focus',
                    initialValue     : 2202.674, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'start',
                            value       : 'start',
                            description : `Put the caret of the far left side of the value (excluding the positive/negative sign and currency symbol, if any)`,
                        },
                        {
                            optionChoice: 'end',
                            value       : 'end',
                            description : `Put the caret of the far right side of the value (excluding the positive/negative sign and currency symbol, if any)`,
                        },
                        {
                            optionChoice: 'decimalLeft',
                            value       : 'decimalLeft',
                            description : `Put the caret of the left of the decimal character if any`,
                        },
                        {
                            optionChoice: 'decimalRight',
                            value       : 'decimalRight',
                            description : `Put the caret of the right of the decimal character if any`,
                        },
                        {
                            optionChoice: 'doNoForceCaretPosition',
                            value       : null,
                            description : `Do not enforce any caret positioning on focus (this is needed when using \`selectOnFocus\`)`,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: { // Other options that needs to be set in conjunction
                        selectOnFocus: false,
                    },
                    isOptionChoiceOpen : false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'createLocalList',
                    descriptionShort : 'Defines if a local list of AutoNumeric objects should be kept when initializing this object.',
                    description      : 'Defines if a local list of AutoNumeric objects should be kept when initializing this object.',
                    initialValue     : 2202.674, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'createList',
                            value       : true,
                            description : `Allow the creation of the local list`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'doNotCreateList',
                            value       : false,
                            description : `Prevent the creation of the local list`,
                        },
                    ],
                    additionalInfo   : 'This list is used by the <code>global.*</code> functions',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'currencySymbol',
                    descriptionShort : 'Defines the currency symbol string.',
                    description      : 'It can be a string of more than one character (allowing for instance to use a space on either side of it, example: <code>\'$ \'</code> or <code>\' $\'</code>)',
                    initialValue     : 2682202.674, // The initial value shared with the same v-model
                    optionList       : [
                        { optionChoice : 'none',           value : '',    description: ``, defaultValue: true },
                        { optionChoice : 'currencySign',   value : '¤',   description: `` },
                        { optionChoice : 'austral',        value : '₳',   description: `ARA` },
                        { optionChoice : 'australCentavo', value : '¢',   description: `` },
                        { optionChoice : 'baht',           value : '฿',   description: `THB` },
                        { optionChoice : 'cedi',           value : '₵',   description: `GHS` },
                        { optionChoice : 'cent',           value : '¢',   description: `` },
                        { optionChoice : 'colon   ',       value : '₡',   description: `CRC` },
                        { optionChoice : 'cruzeiro',       value : '₢',   description: `BRB - Not used anymore since 1993` },
                        { optionChoice : 'dollar ',        value : '$',   description: `` },
                        { optionChoice : 'dong',           value : '₫',   description: `VND` },
                        { optionChoice : 'drachma',        value : '₯',   description: `GRD (or <code>'Δρχ.'</code> or <code>'Δρ.'</code>)` },
                        { optionChoice : 'dram',           value : '​֏​',   description: `AMD` },
                        { optionChoice : 'european',       value : '₠',   description: `XEU (old currency before the Euro)` },
                        { optionChoice : 'euro',           value : '€',   description: `EUR` },
                        { optionChoice : 'florin',         value : 'ƒ',   description: `` },
                        { optionChoice : 'franc',          value : '₣',   description: `FRF` },
                        { optionChoice : 'guarani',        value : '₲',   description: `PYG` },
                        { optionChoice : 'hryvnia',        value : '₴',   description: `грн` },
                        { optionChoice : 'kip',            value : '₭',   description: `LAK` },
                        { optionChoice : 'att',            value : 'ອັດ', description: `cents of the Kip` },
                        { optionChoice : 'lepton ',        value : 'Λ',   description: `cents of the Drachma` },
                        { optionChoice : 'lira   ',        value : '₺',   description: `TRY` },
                        { optionChoice : 'liraOld',        value : '₤',   description: `` },
                        { optionChoice : 'lari',           value : '₾',   description: `GEL` },
                        { optionChoice : 'mark',           value : 'ℳ',  description: `` },
                        { optionChoice : 'mill',           value : '₥',   description: `` },
                        { optionChoice : 'naira',          value : '₦',   description: `NGN` },
                        { optionChoice : 'peseta',         value : '₧',   description: `` },
                        { optionChoice : 'peso',           value : '₱',   description: `PHP` },
                        { optionChoice : 'pfennig',        value : '₰',   description: `cents of the Mark` },
                        { optionChoice : 'pound',          value : '£',   description: `` },
                        { optionChoice : 'real',           value : 'R$',  description: `Brazilian real` },
                        { optionChoice : 'riel',           value : '៛',    description: `KHR` },
                        { optionChoice : 'ruble',          value : '₽',   description: `RUB` },
                        { optionChoice : 'rupee',          value : '₹',   description: `INR` },
                        { optionChoice : 'rupeeOld',       value : '₨',   description: `` },
                        { optionChoice : 'shekel',         value : '₪',   description: `` },
                        { optionChoice : 'shekelAlt',      value : 'ש״ח', description: `` },
                        { optionChoice : 'taka',           value : '৳',   description: `BDT` },
                        { optionChoice : 'tenge',          value : '₸',   description: `KZT` },
                        { optionChoice : 'togrog',         value : '₮',   description: `MNT` },
                        { optionChoice : 'won',            value : '₩',   description: `` },
                        { optionChoice : 'yen',            value : '¥',   description: `` },
                    ],
                    //TODO Add an `isCollapsed` attribute, and hide the option list except the N first elements (with a gradient effect to-white). A click on the 'show more' would open the accordion and show the rest of the options
                    additionalInfo   : 'See <a href="https://en.wikipedia.org/wiki/Currency_symbol">https://en.wikipedia.org/wiki/Currency_symbol</a>',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : true, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'currencySymbolPlacement',
                    descriptionShort : 'Defines where the currency symbol should be placed (before of after the numbers)',
                    description      : 'Defines where the currency symbol should be placed (before of after the numbers)',
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'prefix',
                            value       : 'p',
                            description : `Placed before the numbers`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'suffix',
                            value       : 's',
                            description : `Placed after the numbers`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        currencySymbol : '€',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'decimalCharacter',
                    descriptionShort : 'Defines what decimal separator character is used',
                    description      : 'Defines what decimal separator character is used',
                    initialValue     : 123.456, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'comma',
                            value       : ',',
                            description : ``,
                        },
                        {
                            optionChoice: 'dot',
                            value       : '.',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'middleDot',
                            value       : '·',
                            description : ``,
                        },
                        {
                            optionChoice: 'arabicDecimalSeparator',
                            value       : '٫',
                            description : ``,
                        },
                        {
                            optionChoice: 'decimalSeparatorKeySymbol',
                            value       : '⎖',
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'You can enter the custom decimal character by entering the <code>.</code> character as usual',
                    additionalOptions: {
                        digitGroupSeparator : ' ',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'decimalCharacterAlternative',
                    descriptionShort : 'Allow to declare an alternative decimal separator which is automatically replaced by `decimalCharacter` when typed',
                    description      : `This is useful for countries that use a comma <code>','</code> as the decimal character and have keyboards with numeric pads providing a period <code>'.'</code> as the decimal character (in France or Spain for instance)`,
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : `No alternative character is defined for entering the <code>decimalCharacter</code>`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'comma',
                            value       : ',',
                            description : `Entering a comma <code>','</code> will enter the defined <code>decimalCharacter</code>`,
                        },
                        {
                            optionChoice: 'dot',
                            value       : '.',
                            description : `Entering a dot <code>'.'</code> will enter the defined <code>decimalCharacter</code>`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : true, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'decimalPlaces',
                    descriptionShort : 'Defines the default number of decimal places to show on the formatted value, and keep for the precision',
                    description      : 'Incidentally, since we need to be able to show that many decimal places, this also defines the raw value precision by default',
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : 0,
                            description : `No decimal places are shown nor kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'one',
                            value       : 1,
                            description : `One decimal place is shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'two',
                            value       : 2,
                            description : `Two decimal places are shown and kept in the <code>rawValue</code>`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'three',
                            value       : 3,
                            description : `Three decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'four',
                            value       : 4,
                            description : `Four decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Five',
                            value       : 5,
                            description : `Five decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Six',
                            value       : 6,
                            description : `Six decimal places are shown and kept in the <code>rawValue</code>`,
                            //FIXME Only 3 decimal places are shown in the rawValue when using that one
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 2, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'decimalPlacesRawValue',
                    descriptionShort : 'Defines how many decimal places should be kept for the raw value <code>rawValue</code>',
                    description      : 'In other words, this is the precision for float values.<br>If this option is set to <code>null</code> (which is the default), then the value of <code>decimalPlaces</code> is used for <code>decimalPlacesRawValue</code> as well.<br><i>Note: Setting this to a lower number of decimal places than the one to be shown will lead to confusion for the users.</i>',
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    //FIXME 3 decimal places are shown in the rawValue while only two should be kept
                    optionList       : [
                        {
                            optionChoice: 'useDefault',
                            value       : null,
                            description : `This option is ignored and the <code>decimalPlaces</code> option value is used instead`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'none',
                            value       : 0,
                            description : `No decimal places are shown nor kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'one',
                            value       : 1,
                            description : `One decimal place is shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'two',
                            value       : 2,
                            description : `Two decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'three',
                            value       : 3,
                            description : `Three decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'four',
                            value       : 4,
                            description : `Four decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Five',
                            value       : 5,
                            description : `Five decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Six',
                            value       : 6,
                            description : `Six decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        showWarnings: false,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen : true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: null, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'decimalPlacesShownOnBlur',
                    descriptionShort : 'Defines how many decimal places should be visible when the element is unfocused',
                    description      : 'If this is set to <code>null</code>, then this option is ignored, and the <code>decimalPlaces</code> option value will be used instead.<br>This means this is optional ; if omitted the decimal places will be the same when the input has the focus.<br><br>This option can be used in conjonction with the two other <code>scale*</code> options, which allows to display a different formatted value when the element is unfocused, while another formatted value is shown when focused.<br>For those <code>scale*</code> options to have any effect, <code>divisorWhenUnfocused</code> must not be <code>null</code>.',
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    //FIXME 3 decimal places are shown in the rawValue while only two should be kept
                    optionList       : [
                        {
                            optionChoice: 'useDefault',
                            value       : null,
                            description : `This option is ignored and the <code>decimalPlaces</code> option value is used instead`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'none',
                            value       : 0,
                            description : `No decimal places are shown nor kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'one',
                            value       : 1,
                            description : `One decimal place is shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'two',
                            value       : 2,
                            description : `Two decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'three',
                            value       : 3,
                            description : `Three decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'four',
                            value       : 4,
                            description : `Four decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Five',
                            value       : 5,
                            description : `Five decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Six',
                            value       : 6,
                            description : `Six decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: null, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'decimalPlacesShownOnFocus',
                    descriptionShort : 'Defines how many decimal places should be visible when the element has the focus',
                    description      : 'If this is set to <code>null</code>, then this option is ignored, and the <code>decimalPlaces</code> option value will be used instead.<br><br>Example:<br>For instance if <code>decimalPlacesShownOnFocus</code> is set to <code>5</code> and the default number of decimal places is <code>2</code>, then on focus <code>1,000.12345</code> will be shown, while without focus <code>1,000.12</code> will be set back.<br><i>Note 1: the results depends on the rounding method used.<br>Note 2: the <code>getNumericString()</code> method returns the extended decimal places</i>',
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'useDefault',
                            value       : null,
                            description : `This option is ignored and the <code>decimalPlaces</code> option value is used instead`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'none',
                            value       : 0,
                            description : `No decimal places are shown nor kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'one',
                            value       : 1,
                            description : `One decimal place is shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'two',
                            value       : 2,
                            description : `Two decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'three',
                            value       : 3,
                            description : `Three decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'four',
                            value       : 4,
                            description : `Four decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Five',
                            value       : 5,
                            description : `Five decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                        {
                            optionChoice: 'Six',
                            value       : 6,
                            description : `Six decimal places are shown and kept in the <code>rawValue</code>`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        showWarnings : false,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: null, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'defaultValueOverride',
                    descriptionShort : 'Helper option for Asp.net postback',
                    description      : 'This should be set as the value of the unformatted default value<br>Examples:<br>no default <code>value=""</code> <code>{defaultValueOverride: ""}</code><br><code>value=1234.56</code> <code>{defaultValueOverride: \'1234.56\'}</code>',
                    initialValue     : 1234567.8912, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'doNotOverride',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : 'If you do not use Asp.net, you can ignore that option',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: '', // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'digitalGroupSpacing',
                    descriptionShort : 'Defines how many numbers should be grouped together',
                    description      : 'This is used for defining the thousand separators number grouping',
                    initialValue     : 123456789.1234, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'two',
                            value       : '2',
                            description : `India's lakhs`,
                        },
                        {
                            optionChoice: 'twoScaled',
                            value       : '2s',
                            description : `India's lakhs scaled`,
                        },
                        {
                            optionChoice: 'three',
                            value       : '3',
                            description : `The default grouping`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'four',
                            value       : '4',
                            description : `Used in some Asian countries`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'digitGroupSeparator',
                    descriptionShort : 'Defines the thousand grouping separator character',
                    description      : 'Example:<br>If <code>\'.\'</code> is set, then you\'ll get <code>\'1.234.567\'</code>',
                    initialValue     : 123456789.1234, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'comma',
                            value       : ',',
                            description : `US-style`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'dot',
                            value       : '.',
                            description : `Europe-style`,
                        },
                        {
                            optionChoice: 'normalSpace',
                            value       : ' ',
                            description : ``,
                        },
                        {
                            optionChoice: 'thinSpace',
                            value       : '\u2009',
                            description : `The unicode character is <code>\\u2009</code>`,
                        },
                        {
                            optionChoice: 'narrowNoBreakSpace',
                            value       : '\u202f',
                            description : `The unicode character is <code>\\u202f</code>`,
                        },
                        {
                            optionChoice: 'noBreakSpace',
                            value       : '\u00a0',
                            description : `The unicode character is <code>\\u00a0</code>`,
                        },
                        {
                            optionChoice: 'noSeparator',
                            value       : '',
                            description : ``,
                        },
                        {
                            optionChoice: 'apostrophe',
                            value       : `'`,
                            description : ``,
                        },
                        {
                            optionChoice: 'arabicThousandsSeparator',
                            value       : '٬',
                            description : ``,
                        },
                        {
                            optionChoice: 'dotAbove',
                            value       : '˙',
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'Note: the <code>decimalCharacter</code> and <code>digitGroupSeparator</code> cannot be the same character',
                    additionalOptions: {
                        decimalCharacter : '⎖',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'divisorWhenUnfocused',
                    descriptionShort : 'The number that divides the element value on focus',
                    description      : 'On blur, the element value is multiplied back.<br><br>Example:<br>Display percentages using <code>{ divisorWhenUnfocused: 100 }</code> (or directly in the Html with <code>&lt;input data-divisor-when-unfocused="100"&gt;</code>)<br>The divisor value can be an integer or a float (but in the latter case with some limitations).<br>Note: The <code>getNumericString()</code> method returns the full value, including the <i>hidden</i> decimals when unfocused.',
                    initialValue     : 1234567.8901234, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'percentage',
                            value       : 100,
                            description : ``,
                        },
                        {
                            optionChoice: 'permille',
                            value       : 1000,
                            description : ``,
                        },
                        {
                            optionChoice: 'basisPoint',
                            value       : 10000,
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'Warning: Using a non-integer divisor can lead to precision problems due to Javascript limitations when handling float numbers',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 200, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'emptyInputBehavior',
                    descriptionShort : 'Defines what should be displayed in the element if the raw value is an empty string <code>\'\'</code>',
                    description      : 'Depending of this option value, you can decide to either display nothing, only the currency symbol (on focus or only when a key is being pressed), the minimum value, or the maximum value.',
                    initialValue     : 1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'null',
                            value       : 'null',
                            description : `When the element is empty, the <code>rawValue</code> and the element value/text is set to <code>null</code> . This also allows to set the value to <code>null</code> using <code>anElement.set(null)</code>`,
                        },
                        {
                            optionChoice: 'focus',
                            value       : 'focus',
                            description : `The currency sign is displayed when the input receives focus`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'press',
                            value       : 'press',
                            description : `The currency sign is displayed whenever a key is being pressed`,
                        },
                        {
                            optionChoice: 'always',
                            value       : 'always',
                            description : `The currency sign is always displayed`,
                        },
                        {
                            optionChoice: 'min',
                            value       : 'min',
                            description : `The <code>minimumValue</code> is displayed on blur`,
                        },
                        {
                            optionChoice: 'max',
                            value       : 'max',
                            description : `The <code>maximumValue</code> is displayed on blur`,
                        },
                        {
                            optionChoice: 'zero',
                            value       : 'zero',
                            description : `A zero is displayed ('rounded' with or without a currency sign) if the input has no value on focus out`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        currencySymbol : '€',
                        currencySymbolPlacement : 's',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 42, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'eventBubbles',
                    descriptionShort : 'Defines if the custom and native events triggered by AutoNumeric should bubble up or not',
                    description      : '',
                    initialValue     : 1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'bubbles',
                            value       : true,
                            description : `All native and custom events will bubble up`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'doesNotBubble',
                            value       : false,
                            description : `No events dispatched by AutoNumeric will bubble up`,
                        },
                    ],
                    additionalInfo   : 'Note: this <strong>also</strong> affects the native <code>input</code> and <code>change</code> events',
                    additionalOptions: {
                        //
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'eventIsCancelable',
                    descriptionShort : 'Defines if the custom and native events triggered by AutoNumeric should be cancelable',
                    description      : '',
                    initialValue     : 1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'isCancelable',
                            value       : true,
                            description : `All native and custom events will be cancelable`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'isNotCancelable',
                            value       : false,
                            description : `No events dispatched by AutoNumeric will be cancelable`,
                        },
                    ],
                    additionalInfo   : 'Note: this <strong>also</strong> affects the native <code>input</code> and <code>change</code> events',
                    additionalOptions: {
                        //
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'failOnUnknownOption',
                    descriptionShort : 'This option is AutoNumeric\'s "strict mode" <i>(aka \'debug\' mode)</i>, which allows autoNumeric to strictly analyse the options given by the user, and fails if an <i>unknown</i> options is used in the settings object',
                    description      : 'You should set that to <code>true</code> if you want to make sure you are only using <strong>pure</strong> autoNumeric settings objects in your code.<br>If you see uncaught errors in the console and your code starts to fail, this means somehow those options gets polluted by another script (which usually happens when using frameworks).',
                    initialValue     : 666, // The initial value shared with the same v-model
                    optionList       : [
                        { //XXX Do note that using this options WILL make the AutoNumeric element initialization fail, as intended, since the option object is 'decorated' by Vue, which adds other properties to the option object
                            optionChoice: 'fail',
                            value       : true,
                            description : ``,
                        },
                        {
                            optionChoice: 'ignore',
                            value       : false,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : 'Do note that using the <code>\'fail\'</code> value <strong>WILL</strong> make the AutoNumeric element initialization fail, as intended, since the option object is \'decorated\' by Vue, which adds other properties to the option object. Check the console to see the failures.',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'formatOnPageLoad',
                    descriptionShort : 'Determine if the default value will be formatted on initialization',
                    description      : '',
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'format',
                            value       : true,
                            description : `Automatically formats the default value on initialization`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'doNotFormat',
                            value       : false, //FIXME The value is still formatted ?! (I guess that's because vue-autonumeric forces an update?)
                            description : `Will not format the default value on initialization`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'historySize',
                    descriptionShort : 'Set the undo/redo history table size',
                    description      : 'Each record keeps the raw value <code>rawValue</code> as well and the last known caret position / selection',
                    initialValue     : 12345.678901, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'verySmall',
                            value       : 5,
                            description : ``,
                        },
                        {
                            optionChoice: 'small',
                            value       : 10,
                            description : ``,
                        },
                        {
                            optionChoice: 'medium',
                            value       : 20,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'large',
                            value       : 50,
                            description : ``,
                        },
                        {
                            optionChoice: 'veryLarge',
                            value       : 100,
                            description : ``,
                        },
                        {
                            optionChoice: 'insane',
                            value       : Number.MAX_SAFE_INTEGER,
                            description : `This is equal to <code>Number.MAX_SAFE_INTEGER</code>`,
                        },
                    ],
                    additionalInfo   : 'Warning: Using a large number here is not advised. The larger the number, the larger the memory used.',
                    //TODO Differentiate the type of additional info (info, warning)
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 12, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'isCancellable',
                    descriptionShort : 'Allow the user to <i>cancel</i> and undo the changes he made to the given autonumeric-managed element, by pressing the <code>Escape</code> key',
                    description      : `Note: If the value has not been changed since last <i>save</i>, hitting <code>Escape</code> will select the input content (respecting the <code>selectNumberOnly</code> option).<br><br>Whenever the user <code>validate</code> the input (either by hitting <code>Enter</code>, or by blurring the element), the new value is saved for subsequent <i>cancellation</i>.<br><br>The process:<br>
<ul>
<li>Save the input value on focus</li>
<li>If the user change the input value, and hit <code>Escape</code>, then the initial value saved on focus is set back</li>
<li>On the other hand if the user either have used <code>Enter</code> to validate his entries (<code>Enter</code> throws a <code>change</code> event), or if the input value has been changed by another script in the mean time, then we save the new input value</li>
<li>On a successful <code>cancel</code>, the whole value is selected (respecting the <code>selectNumberOnly</code> option)</li>
</ul>`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'cancellable',
                            value       : true,
                            description : `Allows using the <code>Escape</code> key to cancel the last edited changes`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'notCancellable',
                            value       : false,
                            description : `The <code>Escape</code> key only select the element value, without undoing any changes`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'leadingZero',
                    descriptionShort : 'Controls the leading zero behavior',
                    description      : 'This options describes if entering <code>0</code> on the far left of the numbers is allowed, and if the superfluous zeroes should be kept when the input is blurred',
                    initialValue     : 2202.46, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'allow',
                            value       : 'allow',
                            description : `Allows leading zeros to be entered. Zeros will be truncated when entering additional digits. On <code>focusout</code>, zeros will be deleted`,
                        },
                        {
                            optionChoice: 'deny',
                            value       : 'deny',
                            description : `Allows only one leading zero on values that are between <code>1</code> and <code>-1</code>`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'keep',
                            value       : 'keep',
                            description : `Allows leading zeros to be entered. On <code>focusout</code>, zeros will be kept`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'maximumValue',
                    descriptionShort : 'Defines the maximum possible value a user can enter',
                    description      : `Notes:
<ul>
<li>This value must be a string and use the period for the decimal point</li>
<li>This value needs to be larger than <code>minimumValue</code></li>
</ul>`,
                    initialValue     : -12345678.901234567890, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'tenTrillions',
                            value       : '10000000000000',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'oneBillion',
                            value       : '1000000000',
                            description : ``,
                        },
                        {
                            optionChoice: 'zero',
                            value       : '0',
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'Note: You can define a limit higher than <code>Number.MAX_SAFE_INTEGER</code> as text, and AutoNumeric will manage that correctly',
                    //TODO Differentiate the type of additional info (info, warning)
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 42, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'minimumValue',
                    descriptionShort : 'Defines the minimum possible value a user can enter',
                    description      : `Notes:
<ul>
<li>This value must be a string and use the period for the decimal point</li>
<li>This value needs to be smaller than <code>maximumValue</code></li>
</ul>`,
                    initialValue     : 12345678.901234567890, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'tenTrillions',
                            value       : '-10000000000000',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'oneBillion',
                            value       : '-1000000000',
                            description : ``,
                        },
                        {
                            optionChoice: 'zero',
                            value       : '0',
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'Warning: If <code>minimumValue</code> is superior to <code>0</code>, then you\'ll effectively <strong>prevent</strong> your users to entirely delete the content of their AutoNumeric-managed element',
                    //TODO Differentiate the type of additional info (info, warning)
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 42, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'modifyValueOnWheel',
                    descriptionShort : 'Allows the user to increment or decrement the element value with the mouse wheel',
                    description      : `The <code>wheel</code> behavior can be modified by the <code>wheelStep</code> option.
This <code>wheelStep</code> option can be used in two ways, either by setting:<br>
<ul>
<li>a <i>fixed</i> step value (<code>wheelStep : 1000</code>), or</li>
<li>the <code>'progressive'</code> string (<code>wheelStep : 'progressive'</code>), which will then activate a special mode where the step is automatically calculated based on the element value size.</li>
</ul>
Note:
<ul>
<li>A special behavior is applied in order to avoid preventing the user scrolling the page if the inputs are covering the whole available space.</li>
<li>You can use the <code>Shift</code> modifier key while using the mouse wheel in order to temporarily disable the increment/decrement feature (useful on small screen where some badly configured inputs could use all the available space).</li>
</ul>`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'modifyValue',
                            value       : true,
                            description : `Allows using the <code>wheel</code> event to either increment of decrement the element value`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'doNothing',
                            value       : false,
                            description : `The <code>wheel</code> event is ignored`,
                        },
                    ],
                    additionalInfo   : 'You can use the <code>Shift</code> modifier key while using the mouse wheel in order to temporarily disable the increment/decrement feature',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'negativeBracketsTypeOnBlur',
                    descriptionShort : 'Adds brackets-like characters on negative values when unfocused',
                    description      : `Those brackets are visible only when the field does <strong>not</strong> have the focus.<br>The left and right symbols should be enclosed in quotes and separated by a comma <code>,</code>.<br>For instance, this transforms <code>-$ 999.99</code> to <code>($999.99)</code> when unfocused.`,
                    initialValue     : -12.345, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'parentheses',
                            value       : '(,)',
                            description : `This notation is used in accounting in North America`,
                        },
                        {
                            optionChoice: 'brackets',
                            value       : '[,]',
                            description : ``,
                        },
                        {
                            optionChoice: 'chevrons',
                            value       : '<,>',
                            description : ``,
                        },
                        {
                            optionChoice: 'curlyBraces',
                            value       : '{,}',
                            description : ``,
                        },
                        {
                            optionChoice: 'angleBrackets',
                            value       : '〈,〉',
                            description : ``,
                        },
                        {
                            optionChoice: 'japaneseQuotationMarks',
                            value       : '｢,｣',
                            description : ``,
                        },
                        {
                            optionChoice: 'halfBrackets',
                            value       : '⸤,⸥',
                            description : ``,
                        },
                        {
                            optionChoice: 'whiteSquareBrackets',
                            value       : '⟦,⟧',
                            description : ``,
                        },
                        {
                            optionChoice: 'quotationMarks',
                            value       : '‹,›',
                            description : ``,
                        },
                        {
                            optionChoice: 'guillemets',
                            value       : '«,»',
                            description : ``,
                        },
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        currencySymbol : '$',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'negativePositiveSignPlacement',
                    descriptionShort : 'Placement of the negative/positive sign relative to the <code>currencySymbol</code> option',
                    //TODO Simplify this sh*t -->
                    description      : `The sign is placed on either side of the <code>currencySymbol</code>, which can be placed on either side of the numbers.<br><br>This is all the possible combinations:
<ul>
<li><code>-1,234.56</code> : The default (no particular options required)</li>
<li><code>-$1,234.56</code> : <code>{currencySymbol: "$"}</code> or <code>{currencySymbol: "$", negativePositiveSignPlacement: "l"}</code></li>
<li><code>$-1,234.56</code> : <code>{currencySymbol: "$", negativePositiveSignPlacement: "r"}</code>. Default if <code>negativePositiveSignPlacement</code> is <code>null</code> and <code>currencySymbol</code> is not empty</li>
<li><code>-1,234.56$</code> : <code>{currencySymbol: "$", currencySymbolPlacement: "s", negativePositiveSignPlacement: "p"}</code>. Default if <code>negativePositiveSignPlacement</code> is <code>null</code> and <code>currencySymbol</code> is not empty</li>
<li><code>1,234.56-</code> : <code>{negativePositiveSignPlacement: "s"}</code></li>
<li><code>$1,234.56-</code> : <code>{currencySymbol: "$", negativePositiveSignPlacement: "s"}</code></li>
<li><code>1,234.56-$</code> : <code>{currencySymbol: "$", currencySymbolPlacement: "s"}</code></li>
<li><code>1,234.56$-</code> : <code>{currencySymbol: "$", currencySymbolPlacement: "s", negativePositiveSignPlacement: "r"}</code></li>
</ul>`,
                    initialValue     : -1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'prefix',
                            value       : 'p',
                            description : `This notation is used in accounting in North America`,
                        },
                        {
                            optionChoice: 'suffix',
                            value       : 's',
                            description : ``,
                        },
                        {
                            optionChoice: 'left',
                            value       : 'l',
                            description : ``,
                        },
                        {
                            optionChoice: 'right',
                            value       : 'r',
                            description : ``,
                        },
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        currencySymbol : '€',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'negativeSignCharacter',
                    descriptionShort : 'Defines the negative sign symbol to use',
                    description      : `It can be a <code>string</code> of only <strong>one</strong> character`,
                    initialValue     : -1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'hyphen',
                            value       : '-',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'minus',
                            value       : '−',
                            description : ``,
                        },
                        {
                            optionChoice: 'heavyMinus',
                            value       : '➖',
                            description : ``,
                        },
                        {
                            optionChoice: 'fullWidthHyphen',
                            value       : '－',
                            description : ``,
                        },
                        {
                            optionChoice: 'circledMinus',
                            value       : '⊖',
                            description : ``,
                        },
                        {
                            optionChoice: 'squaredMinus',
                            value       : '⊟',
                            description : ``,
                        },
                        {
                            optionChoice: 'triangleMinus',
                            value       : '⨺',
                            description : ``,
                        },
                        {
                            optionChoice: 'plusMinus',
                            value       : '±',
                            description : ``,
                        },
                        {
                            optionChoice: 'minusPlus',
                            value       : '∓',
                            description : ``,
                        },
                        {
                            optionChoice: 'dotMinus',
                            value       : '∸',
                            description : ``,
                        },
                        {
                            optionChoice: 'minusTilde',
                            value       : '≂',
                            description : ``,
                        },
                        {
                            optionChoice: 'not',
                            value       : '¬',
                            description : ``,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: '#', // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'noEventListeners',
                    descriptionShort : 'Defines if the element should have event listeners activated on it',
                    description      : `By default, those event listeners are only added to <code>&lt;input&gt;</code> elements and html element with the <code>contenteditable</code> attribute set to <code>true</code>, but not on the other html tags.<br>Setting this to <code>true</code> allows to initialize elements without any event listeners.`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'noEvents',
                            value       : true,
                            description : `Since AutoNumeric will not monitor the user input, it's probably best to use this option in conjonction with the <code>readOnly</code> one`,
                        },
                        {
                            optionChoice: 'addEvents',
                            value       : false,
                            description : `The AutoNumeric-managed element will be reactive`,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : 'Warning: Since AutoNumeric will not check the input content after its initialization, using some autoNumeric methods afterwards <strong>will</strong> probably leads to formatting problems',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'onInvalidPaste',
                    descriptionShort : 'Manage how autoNumeric react when the user tries to paste an invalid number',
                    description      : `Note 1: A <code>paste</code> content starting with a negative sign <code>'-'</code> will be accepted anywhere in the input, and will set the resulting value as a negative number<br>
Note 2: A paste content starting with a number will be accepted, even if the rest is gibberish (ie. <code>'123foobar456'</code>). In that case, only the first number will be used (<code>'123'</code> here).<br>
Note 3: The <code>paste</code> event works with the <code>decimalPlacesShownOnFocus</code> option too.`,
                    initialValue     : 2468.02, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'error',
                            value       : 'error',
                            description : `The input value is not changed and an error is output in the console`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'ignore',
                            value       : 'ignore',
                            description : `Idem than <code>'error'</code>, but fails silently without outputting any error/warning in the console`,
                        },
                        {
                            optionChoice: 'clamp',
                            value       : 'clamp',
                            description : `If the pasted value is either too small or too big regarding the <code>minimumValue</code> and <code>maximumValue</code> range, then the result is clamped to those limits`,
                        },
                        {
                            optionChoice: 'truncate',
                            value       : 'truncate',
                            description : `autoNumeric will insert as many pasted numbers it can at the initial caret/selection, until everything is pasted, or the range limit is hit.<br>The non-pasted numbers are dropped and therefore not used at all.`,
                        },
                        {
                            optionChoice: 'replace',
                            value       : 'replace',
                            description : `autoNumeric will first insert as many pasted numbers it can at the initial caret/selection, then if the range limit is hit, it will try to replace one by one the remaining initial numbers (on the right side of the caret) with the rest of the pasted numbers.`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'outputFormat',
                    descriptionShort : 'Defines how the value should be formatted when wanting a <i>localized</i> version of it',
                    description      : `Note: The hyphen <code>'-'</code> is translated to the custom negative sign defined in <code>negativeSignCharacter</code>`,
                    initialValue     : -2468.02, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'string',
                            value       : 'string',
                            description : `<code>nnnn.nn</code> or <code>-nnnn.nn</code> as text type`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'number',
                            value       : 'number',
                            description : `<code>nnnn.nn</code> or <code>-nnnn.nn</code> as a <code>Number</code>. Warning: this works only for integers inferior to <code>Number.MAX_SAFE_INTEGER</code>`,
                        },
                        {
                            optionChoice: 'dot',
                            value       : '.',
                            description : `<code>nnnn.nn</code> or <code>-nnnn.nn</code>`,
                        },
                        {
                            optionChoice: 'negativeDot',
                            value       : '-.',
                            description : `<code>nnnn.nn</code> or <code>-nnnn.nn</code>`,
                        },
                        {
                            optionChoice: 'comma',
                            value       : ',',
                            description : `<code>nnnn,nn</code> or <code>-nnnn,nn</code>`,
                        },
                        {
                            optionChoice: 'negativeComma',
                            value       : '-,',
                            description : `<code>nnnn,nn</code> or <code>-nnnn,nn</code>`,
                        },
                        {
                            optionChoice: 'dotNegative',
                            value       : '.-',
                            description : `<code>nnnn.nn</code> or <code>nnnn.nn-</code>`,
                        },
                        {
                            optionChoice: 'commaNegative',
                            value       : ',-',
                            description : `<code>nnnn,nn</code> or <code>nnnn,nn-</code>`,
                        },
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : `<code>nnnn.nn</code> or <code>-nnnn.nn</code> as text type`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'overrideMinMaxLimits',
                    descriptionShort : 'Override the minimum and maximum limits',
                    description      : `Note: The hyphen <code>'-'</code> is translated to the custom negative sign defined in <code>negativeSignCharacter</code>`,
                    initialValue     : 162468.02, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'ceiling',
                            value       : 'ceiling',
                            description : `Adheres to <code>maximumValue</code> and ignores <code>minimumValue</code> settings`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'floor',
                            value       : 'floor',
                            description : `Adheres to <code>minimumValue</code> and ignores <code>maximumValue</code> settings`,
                        },
                        {
                            optionChoice: 'ignore',
                            value       : 'ignore',
                            description : `Ignores both <code>minimumValue</code> & <code>maximumValue</code>`,
                        },
                        {
                            optionChoice: 'doNotOverride',
                            value       : null,
                            description : `The <code>minimumValue</code> and <code>maximumValue</code> limits are respected`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'positiveSignCharacter',
                    descriptionShort : 'Defines the positive sign symbol to use',
                    description      : `It can be a <code>string</code> of only <strong>one</strong> character.<br>This is shown only if <code>showPositiveSign</code> is set to <code>true</code>.`,
                    initialValue     : 1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'plus',
                            value       : '+',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'fullWidthPlus',
                            value       : '＋',
                            description : ``,
                        },
                        {
                            optionChoice: 'heavyPlus',
                            value       : '➕',
                            description : ``,
                        },
                        {
                            optionChoice: 'doublePlus',
                            value       : '⧺',
                            description : ``,
                        },
                        {
                            optionChoice: 'triplePlus',
                            value       : '⧻',
                            description : ``,
                        },
                        {
                            optionChoice: 'circledPlus',
                            value       : '⊕',
                            description : ``,
                        },
                        {
                            optionChoice: 'squaredPlus',
                            value       : '⊞',
                            description : ``,
                        },
                        {
                            optionChoice: 'trianglePlus',
                            value       : '⨹',
                            description : ``,
                        },
                        {
                            optionChoice: 'plusMinus',
                            value       : '±',
                            description : ``,
                        },
                        {
                            optionChoice: 'minusPlus',
                            value       : '∓',
                            description : ``,
                        },
                        {
                            optionChoice: 'dotPlus',
                            value       : '∔',
                            description : ``,
                        },
                        {
                            optionChoice: 'altHebrewPlus',
                            value       : '﬩',
                            description : ``,
                        },
                        {
                            optionChoice: 'normalSpace',
                            value       : ' ',
                            description : ``,
                        },
                        {
                            optionChoice: 'thinSpace',
                            value       : '\u2009',
                            description : `The unicode character is <code>\\u2009</code>`,
                        },
                        {
                            optionChoice: 'narrowNoBreakSpace',
                            value       : '\u202f',
                            description : `The unicode character is <code>\\u202f</code>`,
                        },
                        {
                            optionChoice: 'noBreakSpace',
                            value       : '\u00a0',
                            description : `The unicode character is <code>\\u00a0</code>`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        showPositiveSign : true,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: '#', // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'rawValueDivisor',
                    descriptionShort : 'Divides the formatted value shown in the AutoNumeric element and store the divided result in <code>rawValue</code>',
                    description      : `Examples:<br>
<code>{ rawValueDivisor: '100' }</code> or <code>&lt;input data-raw-value-divisor="100"&gt;</code><br>
Given the <code>0.01234</code> raw value, the formatted value will be displayed as <code>'1.234'</code>.<br>
This is useful when displaying percentage for instance, and avoid the need to divide/multiply by <code>100</code> between the number shown and the raw value.<br><br>
Note: You can see the <code>rawValue</code> by pressing the <code>Alt</code> key and hovering your mouse over the input.`,
                    initialValue     : 1234567.8901234, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'percentage',
                            value       : 100,
                            description : ``,
                        },
                        {
                            optionChoice: 'permille',
                            value       : 1000,
                            description : ``,
                        },
                        {
                            optionChoice: 'basisPoint',
                            value       : 10000,
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'Warning: Using a non-integer divisor can lead to precision problems due to Javascript limitations when handling float numbers',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 200, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'readOnly',
                    descriptionShort : 'Defines if the element (<code>&lt;input&gt;</code> or another allowed html tag) should be set as <i>read only</i> on initialization',
                    description      : `When set to <code>true</code>, then:<br>
<ul>
<li>the <code>readonly</code> html property is added to the <code>&lt;input&gt;</code> element on initialization, or</li>
<li>the <code>contenteditable</code> attribute is set to <code>false</code> on non-input elements.</li>
</ul>`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'readOnly',
                            value       : true,
                            description : ``,
                        },
                        {
                            optionChoice: 'readWrite',
                            value       : false,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'roundingMethod',
                    descriptionShort : 'Defines the rounding method to use',
                    description      : `When set to <code>true</code>, then the <code>readonly</code> html property is added to the <code>&lt;input&gt;</code> element on initialization.`,
                    initialValue     : 123.415, // The initial value shared with the same v-model
                    optionList       : [
                        //FIXME The rounding is not shown!
                        {
                            optionChoice: 'halfUpSymmetric',
                            value       : 'S',
                            description : `Round-Half-Up Symmetric`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'halfUpAsymmetric',
                            value       : 'A',
                            description : `Round-Half-Up Asymmetric`,
                        },
                        {
                            optionChoice: 'halfDownSymmetric',
                            value       : 's',
                            description : `Round-Half-Down Symmetric`,
                        },
                        {
                            optionChoice: 'halfDownAsymmetric',
                            value       : 'a',
                            description : `Round-Half-Down Asymmetric`,
                        },
                        {
                            optionChoice: 'halfEvenBankersRounding',
                            value       : 'B',
                            description : `Round-Half-Even <i>"Bankers Rounding"</i>`,
                        },
                        {
                            optionChoice: 'upRoundAwayFromZero',
                            value       : 'U',
                            description : `Round Up <i>"Round-Away-From-Zero"</i>`,
                        },
                        {
                            optionChoice: 'downRoundTowardZero',
                            value       : 'D',
                            description : `Round Down <i>"Round-Toward-Zero"</i>.<br>This is the same as <code>truncate</code>.`,
                        },
                        {
                            optionChoice: 'toCeilingTowardPositiveInfinity',
                            value       : 'C',
                            description : `Round to Ceiling <i>"Toward Positive Infinity"</i>`,
                        },
                        {
                            optionChoice: 'toFloorTowardNegativeInfinity',
                            value       : 'F',
                            description : `Round to Floor <i>"Toward Negative Infinity"</i>`,
                        },
                        {
                            optionChoice: 'toNearest05',
                            value       : 'N05',
                            description : `Rounds to the nearest <code>.05</code>.<br>This is the same as the <code>'CHF'</code> choice used in the old <code>v1.9.x</code>, which is still valid.`,
                        },
                        {
                            optionChoice: 'toNearest05Alt',
                            value       : 'CHF',
                            description : `Rounds to the nearest <code>.05</code>.<br>This is the same as <code>'N05'</code>.<br>This is <strong>deprecated</strong> and will be removed in the future.`,
                        },
                        {
                            optionChoice: 'upToNext05',
                            value       : 'U05',
                            description : `Rounds up to next <code>.05</code>`,
                        },
                        {
                            optionChoice: 'downToNext05',
                            value       : 'D05',
                            description : `Rounds down to next <code>.05</code>`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'saveValueToSessionStorage',
                    descriptionShort : 'Set to <code>true</code> to allow the <code>decimalPlacesShownOnFocus</code> value to be saved with <code>sessionStorage</code>',
                    description      : ``,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'save',
                            value       : true,
                            description : `If IE 6 or 7 are detected, the value will be saved as a session cookie`,
                        },
                        {
                            optionChoice: 'doNotSave',
                            value       : false,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'selectNumberOnly',
                    descriptionShort : 'Determine if the <i>select all</i> keyboard command will select the complete input text, or only the input numeric value',
                    description      : `Note: If the currency symbol is between the numeric value and the negative sign, only the numeric value will be selected when doing <code>Ctrl + a</code> or <code>⌘ + a</code>.`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'selectNumbersOnly',
                            value       : true,
                            description : `Only the numbers and the negative/positive sign are selected`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'selectAll',
                            value       : false,
                            description : `Everything is selected, including the currency symbol and the suffix text`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions : {
                        showPositiveSign       : true,
                        currencySymbol         : ' €',
                        currencySymbolPlacement: 's',
                        suffixText             : ' cost',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'selectOnFocus',
                    descriptionShort : 'Defines if the element value should be selected on focus',
                    description      : `Note: The selection is done using the <code>selectNumberOnly</code> option.`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'select',
                            value       : true,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            //FIXME Error when focused
                            optionChoice: 'doNotSelect',
                            value       : false,
                            description : `On focus, the input content is not selected if the browser does not enforce that behavior (which most of those do)`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions : {
                        caretPositionOnFocus : null,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'serializeSpaces',
                    descriptionShort : 'Defines how the serialize functions should treat the spaces',
                    description      : `Those spaces <code>' '</code> can either be converted to the plus sign <code>'+'</code>, which is the default, or to <code>'%20'</code>.<br><br>
Both values are valid according to the <a href="http://www.w3.org/Addressing/URL/uri-spec.html">official specification</a>.<br>
<br>
However this <a href="http://stackoverflow.com/a/33939287">stackoverflow answer</a> sums up the situation pretty well: In an URL, spaces should be converted to <code>'%20'</code> before the <code>'?'</code> sign, then converted to <code>'+'</code> after.<br>
In our case since we serialize the query, we use <code>'+'</code> as the default (but allow the user to get back the old <i>wrong</i> behavior).`,
                    initialValue     : 12345.67, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'plus',
                            value       : '+',
                            description : `Current behavior`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'percent',
                            value       : '%20',
                            description : `Old behavior`,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions : {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'showOnlyNumbersOnFocus',
                    descriptionShort : 'Defines if the element value should be converted to the raw value on <code>focus</code> or <code>mouseenter</code>, (and back to the formatted on <code>blur</code> or <code>mouseleave</code>)',
                    description      : `If set to <code>true</code>, then autoNumeric removes the thousand separator, currency symbol and suffix on <code>focus</code> and <code>mouseenter</code>.<br><br>
Example:<br>
If the input value is <code>'+$ 1,999.88 suffix'</code>, on <code>focus</code> it becomes <code>'1999.88'</code> and back to <code>'+$ 1,999.88 suffix'</code> on <code>blur</code>.`,
                    initialValue     : 1999.88, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'onlyNumbers',
                            value       : true,
                            description : ``,
                        },
                        {
                            optionChoice: 'showAll',
                            value       : false,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        showPositiveSign: true,
                        currencySymbol  : '$',
                        suffixText      : ' suffix',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'showPositiveSign',
                    descriptionShort : `Allow the positive sign symbol <code>positiveSignCharacter</code> to be displayed for positive numbers`,
                    description      : `The sign placement is controlled by the <code>negativePositiveSignPlacement</code> option, mimicking the negative sign placement rules.`,
                    initialValue     : 11111.24, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'show',
                            value       : true,
                            description : ``,
                        },
                        {
                            optionChoice: 'hide',
                            value       : false,
                            description : ``,
                            defaultValue: true,
                            //TODO Automatically define which option is the `defaultValue`, by analyzing the AutoNumeric `defaultSettings` property
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'showWarnings',
                    descriptionShort : `Defines if warnings should be shown in the console`,
                    description      : `Those warnings can be ignored, but are usually printed when something could be improved by the user (ie. option conflicts).`,
                    initialValue     : 42, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'show',
                            value       : true,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'hide',
                            value       : false,
                            description : ``,
                        },
                    ],
                    additionalInfo   : 'Not much to see here, you would have to check the console for warning messages in your code',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'styleRules',
                    descriptionShort : `Defines the rules that calculate the CSS class(es) to apply on the element, based on the raw unformatted value`,
                    description      : `This can also be used to call callbacks whenever the \`rawValue\` is updated.<br>
<strong>Important</strong>: all callbacks <strong>must</strong> return <code>null</code> if no ranges/userDefined classes are selected.`,
                    initialValue     : 42, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'positiveNegative',
                            value       : {
                                positive: 'autoNumeric-positive',
                                negative: 'autoNumeric-negative',
                            },
                            description : ``,
                        },
                        {
                            optionChoice: 'range0To100With4Steps',
                            value       : {
                                ranges: [
                                    { min: 0,  max: 25,  class: 'autoNumeric-red' },
                                    { min: 25, max: 50,  class: 'autoNumeric-orange' },
                                    { min: 50, max: 75,  class: 'autoNumeric-yellow' },
                                    { min: 75, max: 100, class: 'autoNumeric-green' },
                                ],
                            },
                            description : ``,
                        },
                        {
                            optionChoice: 'evenOdd',
                            value       : {
                                userDefined: [
                                    {
                                        callback: rawValue => rawValue % 2 === 0,
                                        classes: ['autoNumeric-even', 'autoNumeric-odd'],
                                    },
                                ],
                            },
                            //FIXME Display the `callback` in the `value`
                            description : `The <code>value</code> here is not correctly displayed since <code>callback</code> is not displayed`,
                        },
                        {
                            optionChoice: 'rangeSmallAndZero',
                            value       : {
                                userDefined: [
                                    {
                                        callback  : rawValue => {
                                            if (rawValue >= -1 && rawValue < 0) {
                                                return 0;
                                            }
                                            if (Number(rawValue) === 0) {
                                                return 1;
                                            }
                                            if (rawValue > 0 && rawValue <= 1) {
                                                return 2;
                                            }

                                            return null;  // In case the rawValue is outside those ranges
                                        },
                                        classes: [
                                            'autoNumeric-small-negative',
                                            'autoNumeric-zero',
                                            'autoNumeric-small-positive',
                                        ],
                                    },
                                ],
                            },
                            //FIXME Display the `callback` in the `value`
                            description : `The <code>value</code> here is not correctly displayed since <code>callback</code> is not displayed`,
                        },
                    ],
                    additionalInfo   : `If you do not want / can't listen to the <code>'autoNumeric:rawValueModified'</code> event when the <code>rawValue</code> is modified, you can use the <code>styleRules</code> option to define as many callbacks you need.<br>Those callbacks will be called whenever the <code>rawValue</code> is modified.`,
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: '', // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'suffixText',
                    descriptionShort : 'Add a text on the right hand side of the element value',
                    description      : `This suffix text can have any characters in its string, except numeric characters and the negative or positive sign.`,
                    initialValue     : 1.2345, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : '',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'percentage',
                            value       : '%',
                            description : ``,
                        },
                        {
                            optionChoice: 'permille',
                            value       : '‰',
                            description : ``,
                        },
                        {
                            optionChoice: 'basisPoint',
                            value       : '‱',
                            description : ``,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        decimalPlaces : 3, //FIXME This is not respected here on load, but only once the user modify the value
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: ' Euros', // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'symbolWhenUnfocused',
                    descriptionShort : 'Defines the symbol placed as a suffix when not in focus or hovered',
                    description      : `This suffix text can have any characters in its string, except numeric characters and the negative or positive sign.`,
                    initialValue     : 200, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : '',
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'percentage',
                            value       : '%',
                            description : ``,
                        },
                        {
                            optionChoice: 'permille',
                            value       : '‰',
                            description : ``,
                        },
                        {
                            optionChoice: 'basisPoint',
                            value       : '‱',
                            description : ``,
                        },
                    ],
                    //TODO Reformulate the following description
                    additionalInfo   : `The three options (<code>divisorWhenUnfocused</code>, <code>decimalPlacesShownOnBlur</code> & <code>symbolWhenUnfocused</code>) handle scaling of the input when the input is unfocused.<br>
Note: the non-scaled value is stored and it is advised that you use the <code>saveValueToSessionStorage</code> option to ensure retaining the value <code>["divisor", "decimal places", "symbol"]</code><br>
Example: With the following options set <code>{divisorWhenUnfocused: '1000', decimalPlacesShownOnBlur: '1', symbolWhenUnfocused: ' K'}</code>, the focused value will be <code>'1,111.11'</code> while on <code>blur</code> it will be <code>'1.1 K'</code>.`,
                    additionalOptions: {
                        decimalPlaces : 2, //FIXME If the `initialValue` is set to `200`, and `decimalPlaces` to `0`, the symbol is hidden on mouseenter, but never shown again
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: ' Euros', // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'unformatOnHover',
                    descriptionShort : `Defines if the element value should be unformatted when the user hover his mouse over it while holding the <code>Alt</code> key`,
                    description      : `Unformatting there means that this removes any non-number characters and displays the <code>rawValue</code> instead.<br>
<br>
The element is reformatted back before anything else if:
<ul>
<li>the user focus on the element by tabbing or clicking into it,</li>
<li>the user releases the <code>Alt</code> key, and</li>
<li>if we detect a <code>mouseleave</code> event.</li>
</ul>
<br>
We unformat again if while the mouse is over the element, the user hit <code>Alt</code> again.`,
                    initialValue     : 123456.78, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'unformat',
                            value       : true,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'doNotUnformat', //FIXME While this prevent the unformat on mouseenter, if the mouse is already on top of the element, hitting the Alt key will still unformat the element
                            value       : false,
                            description : ``,
                        },
                    ],
                    additionalInfo   : '',
                    additionalOptions: {
                        currencySymbol : '$',
                        suffixText     : 'xx',
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'unformatOnSubmit',
                    descriptionShort : `When a <code>submit</code> event is detected in the parent <code>form</code> element, temporarily removes the formatting and set the <code>rawValue</code> in each AutoNumeric child elements`,
                    description      : `The output format is a numeric string (<code>nnnn.nn</code> or <code>-nnnn.nn</code>).<br>
The formatted values are immediately set back after the <code>submit</code> event.`,
                    initialValue     : 123456.78, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'unformat',
                            value       : true,
                            description : ``,
                        },
                        {
                            optionChoice: 'keepCurrentValue', //FIXME While this prevent the unformat on mouseenter, if the mouse is already on top of the element, hitting the Alt key will still unformat the element
                            value       : false,
                            description : ``,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : 'Not much to see here, you would have to try it in your code for now! :)',
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'valuesToStrings',
                    descriptionShort : 'Provides a way for automatically replacing the formatted value with a pre-defined string, when the raw value is equal to a specific value',
                    description      : `You can specify as many 'conversion' as needed.`,
                    initialValue     : 0, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'none',
                            value       : null,
                            description : ``,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'zeroDash',
                            value       : {
                                0: '-',
                            },
                            description : `Usually used in accounting where the zero value is replaced by an hyphen`,
                        },
                        {
                            optionChoice: 'oneAroundZero',
                            value       : {
                                '-1': 'Min',
                                1   : 'Max',
                            },
                            description : ``,
                        },
                    ],
                    additionalInfo   : ``,
                    additionalOptions: {
                        wheelStep : 1,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: { 42: 'The answer' }, // Defines the default value to use in the customChoice input by default
                },
                {
                    name             : 'watchExternalChanges',
                    descriptionShort : 'Defines if the AutoNumeric element should watch external changes made without using <code>.set()</code>',
                    description      : 'This allows to be aware of changes made directly to the input value using direct access to the <code>element.value</code> property, like <code>aNElement.node().value = 42</code>.',
                    initialValue     : 1234.56, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'watch',
                            value       : true,
                            description : `AutoNumeric will format the new value using <code>.set()</code> internally`,
                        },
                        {
                            optionChoice: 'doNotWatch',
                            value       : false,
                            description : `AutoNumeric won't format the new value set externally, nor save it in the history`,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : `You can try to run <code>AutoNumeric.getElement('#watchExternalChanges input').node().value = 42</code> in the console and see how the AutoNumeric-managed element react`,
                    additionalOptions: {
                        //
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'wheelOn',
                    descriptionShort : 'Defines when the <code>wheel</code> event will increment or decrement the element value',
                    description      : `This options accepts two choices:
<ul>
<li><code>'focus'</code>: will only modify the value if the element is focused, and</li>
<li><code>'hover'</code>: will modify the value if the element is hovered (focused or not).</li>
</ul>`,
                    initialValue     : 1234, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'focus',
                            value       : 'focus',
                            description : `The AutoNumeric-managed element needs to be focused for the <code>wheel</code> event to change the value`,
                            defaultValue: true,
                        },
                        {
                            optionChoice: 'hover',
                            value       : 'hover',
                            description : `Using the <code>wheel</code> event while the mouse is hovering the element is sufficient (no focus needed)`,
                        },
                    ],
                    additionalInfo   : `That option is linked to the <code>modifyValueOnWheel</code> one and will only be used if the latter is set to <code>true</code><br><br>When <code>wheelOn</code> is set to <code>'focus'</code>, you can use the <code>Shift</code> modifier key while using the mouse wheel in order to temporarily <strong>activate</strong> the increment/decrement feature even if the element is not focused.<br>When <code>wheelOn</code> is set to <code>'hover'</code>, you can use the <code>Shift</code> modifier key while using the mouse wheel in order to temporarily <strong>disable</strong> the increment/decrement feature even if the element is not hovered.`,
                    additionalOptions: {
                        modifyValueOnWheel: true,
                    }, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: false, // Defines if the user can use other values than those defined in `optionList`
                },
                {
                    name             : 'wheelStep',
                    descriptionShort : 'Defines by how much the element value should be incremented/decremented on the <code>wheel</code> event',
                    description      : `This option defines the offset that can be either:
<ul>
<li>a <i>fixed</i> step value (a positive float or integer number like <code>1000</code>), or</li>
<li>the <code>'progressive'</code> string.</li>
</ul>
Note: A <code>float</code> step can be used, but as always Javascript has limitation when it comes to manipulating floats ; be careful when you do.`,
                    initialValue     : 22, // The initial value shared with the same v-model
                    optionList       : [
                        {
                            optionChoice: 'progressive',
                            value       : 'progressive',
                            description : `The <code>'progressive'</code> mode will increment/decrement the element value based on its current value.<br>The bigger the number, the bigger the step, and vice versa.`,
                            defaultValue: true,
                        },
                    ],
                    additionalInfo   : `That option is linked to the <code>modifyValueOnWheel</code> one and will only be used if the latter is set to <code>true</code>`,
                    additionalOptions: {}, // Other options that needs to be set in conjunction
                    isOptionChoiceOpen: true, // Defines if the user can use other values than those defined in `optionList`
                    defaultCustomValue: 100, // Defines the default value to use in the customChoice input by default
                },
            ],
        };
    },
};
