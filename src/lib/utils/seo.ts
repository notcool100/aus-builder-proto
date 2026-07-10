export interface SeoInput {
	title: string;
	description: string;
	path?: string;
	image?: string;
	type?: 'website' | 'article';
	keywords?: string[];
}

export interface SeoData extends Required<Omit<SeoInput, 'keywords'>> {
	url: string;
	keywords: string;
}

const SITE_NAME = 'Summit Industrial Services';
const SITE_URL = 'https://www.summitindustrial.com.au';
const DEFAULT_IMAGE = '/og-image.jpg';
const TITLE_SEPARATOR = ' | ';

/**
 * Builds a consistent, fully-qualified SEO payload from minimal page input.
 * Consumed by route `load` functions and rendered via <svelte:head> in +layout.svelte.
 */
export function buildSeo(input: SeoInput): SeoData {
	const path = input.path ?? '/';
	const title = input.title.includes(SITE_NAME) ? input.title : `${input.title}${TITLE_SEPARATOR}${SITE_NAME}`;

	return {
		title,
		description: input.description,
		path,
		url: `${SITE_URL}${path === '/' ? '' : path}`,
		image: input.image ?? DEFAULT_IMAGE,
		type: input.type ?? 'website',
		keywords: (input.keywords ?? []).join(', ')
	};
}

export const siteConfig = {
	name: SITE_NAME,
	url: SITE_URL,
	locale: 'en_AU',
	phone: '+61890000000',
	email: 'info@aarcoenvironmental.com.au'
};
