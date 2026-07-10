import { buildSeo } from '$lib/utils/seo';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: buildSeo({
			title: 'Class A Licensed Asbestos Removal & Demolition WA',
			description:
				'Summit Industrial Services — Class A Licensed Asbestos Removal & Demolition Services in Western Australia. Perth & Karratha specialists. Indigenous-owned, 15+ years experience.',
			path: '/',
			keywords: ['asbestos removal WA', 'demolition Perth', 'asbestos removal Karratha', 'hazmat removal']
		})
	};
};
