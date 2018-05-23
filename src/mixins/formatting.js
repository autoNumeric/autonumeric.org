export default {
    methods: {
        /**
         * Add quotes if the given value is a String
         *
         * @param {*|string} value
         * @returns {*}
         */
        shownValue(value) {
            if (typeof value === 'string') {
                return `'${value}'`;
            } else if (value === null) {
                return 'null';
            } else {
                return value;
            }
        },
    },
};
