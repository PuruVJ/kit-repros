// A custom element (could come from a design system) that reads Kit's page state.
// It lives outside Kit's component tree, so it cannot use afterNavigate or onMount.
import { page } from '$app/state';

if (typeof customElements !== 'undefined')
	customElements.define(
		'page-badge',
		class extends HTMLElement {
			connectedCallback() {
				// The element upgrades as soon as this module runs, which is before Kit's client has
				// applied the first page. There is no public signal to wait for.
				console.log(
					`[page-badge] connected: status=${page.status} url=${page.url?.pathname} data=${JSON.stringify(page.data)}`
				);
				this.textContent = `status ${page.status}`;
			}
		}
	);
