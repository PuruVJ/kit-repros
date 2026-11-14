// A custom element that marks its own host once it has upgraded, as many web component
// libraries do (e.g. a `hydrated` class their CSS waits for).
if (typeof customElements !== 'undefined')
	customElements.define(
		'x-badge',
		class extends HTMLElement {
			connectedCallback() {
				this.classList.add('hydrated');
			}
		}
	);
