import { buildSeo } from '$lib/utils/seo';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seo: buildSeo({
			title: 'About Us — Indigenous-Owned Environmental Specialists',
			description:
				'Family-run, Indigenous-owned and Supply Nation certified. Learn about Summit Industrial Services, our leadership team, credentials, and commitment to Western Australia.',
			path: '/about',
			keywords: ['Indigenous owned business WA', 'Supply Nation certified', 'about Summit Industrial Services']
		})
	};
};
