import hljs from 'highlight.js';

// This directive comes from https://github.com/metachris/vue-highlightjs
// See https://www.metachris.com/2017/02/vuejs-syntax-highlighting-with-highlightjs
export default {
    deep: true,

    bind(el, binding) {
        // On first bind, highlight all targets
        const targets = el.querySelectorAll('code');
        targets.forEach(target => {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.textContent = binding.value;
            }

            hljs.highlightBlock(target);
        });
    },

    componentUpdated(el, binding) {
        // after an update, re-fill the content and then highlight
        const targets = el.querySelectorAll('code');
        targets.forEach(target => {
            if (binding.value) {
                target.textContent = binding.value;
                hljs.highlightBlock(target);
            }
        });
    },
};
