import { buildSeo } from '$lib/utils/seo';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: buildSeo({
			title: 'Services — Asbestos Removal, Demolition & Hazmat WA',
			description:
				'Full range of Class A licensed asbestos removal, demolition, hazardous material management, compliance consulting and 24/7 emergency response across Perth and Karratha.',
			path: '/services',
			keywords: ['asbestos removal services', 'demolition services WA', 'hazmat management', 'compliance consulting']
		})
	};
};
