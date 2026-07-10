import { buildSeo } from '$lib/utils/seo';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	return {
		seo: buildSeo({
			title: 'Summit Industrial Services',
			description:
				'Summit Industrial Services — Class A Licensed Asbestos Removal & Demolition Services in Western Australia. Perth & Karratha specialists.',
			path: '/'
		})
	};
};
