import { buildSeo } from '$lib/utils/seo';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: buildSeo({
			title: 'Contact Us — Free Quote Within 24 Hours',
			description:
				'Get in touch with Summit Industrial Services for a free, no-obligation quote. Offices in Perth and Karratha, with a 24/7 emergency asbestos response line.',
			path: '/contact',
			keywords: ['contact asbestos removal WA', 'free quote demolition Perth', 'emergency asbestos response']
		})
	};
};
