import type { Phase } from '$lib/components/sections/PhaseStepper.svelte';

const MIXKIT = 'https://assets.mixkit.co/videos';

export const buildPhases: Phase[] = [
	{
		label: 'consultation',
		title: ['Initial', 'Consultation'],
		description:
			'We discuss your project, timeline, and specific requirements. Free site visits available within 48 hours across Perth and Karratha.',
		video: `${MIXKIT}/23243/23243-720.mp4`
	},
	{
		label: 'assessment',
		title: ['Site', 'Assessment'],
		description:
			'Our licensed assessors conduct a thorough site inspection — identifying all hazardous materials, quantities, and risk classifications.',
		video: `${MIXKIT}/4010/4010-720.mp4`
	},
	{
		label: 'planning',
		title: ['Compliance', 'Planning'],
		description:
			'We develop a full asbestos removal control plan, SWMS, and WorkSafe notifications before a single tool is lifted.',
		video: `${MIXKIT}/1439/1439-720.mp4`
	},
	{
		label: 'removal',
		title: ['Safe', 'Removal'],
		description:
			'Our licensed team executes removal to the highest safety standards — with continuous air monitoring and full PPE protocols.',
		video: `${MIXKIT}/48655/48655-720.mp4`
	},
	{
		label: 'clearance',
		title: ['Clearance &', 'Certification'],
		description:
			'Independent clearance inspection, final air monitoring, and your complete compliance documentation package.',
		video: `${MIXKIT}/23378/23378-720.mp4`
	}
];

export const heroStoryVideo = `${MIXKIT}/4380/4380-720.mp4`;

export const servicePhases: Phase[] = [
	{
		label: 'asbestos',
		title: ['Asbestos', 'Removal'],
		description:
			'Class A & B licensed removal of friable and non-friable asbestos — full air monitoring and clearance certification included.',
		video: `${MIXKIT}/40723/40723-720.mp4`
	},
	{
		label: 'demolition',
		title: ['Demolition &', 'Deconstruction'],
		description:
			'Safe, precision demolition for structures of all scales — from interior strip-outs to controlled structural collapse.',
		video: `${MIXKIT}/48655/48655-720.mp4`
	},
	{
		label: 'hazmat',
		title: ['Hazardous Material', 'Management'],
		description:
			'Identification, containment, and legal disposal of lead paint, mould, contaminated soil, and Schedule 9 materials.',
		video: `${MIXKIT}/47755/47755-720.mp4`
	},
	{
		label: 'compliance',
		title: ['Compliance &', 'Consulting'],
		description: 'End-to-end compliance documentation, asbestos management plans, and independent site audits.',
		video: `${MIXKIT}/1439/1439-720.mp4`
	},
	{
		label: 'environmental',
		title: ['Environmental', 'Remediation'],
		description: 'Soil and groundwater treatment, restoring your land to full regulatory standards.',
		video: `${MIXKIT}/14631/14631-720.mp4`
	},
	{
		label: 'emergency',
		title: ['24/7 Emergency', 'Response'],
		description: "Rapid mobilisation for asbestos incidents and storm damage — on-call around the clock, anywhere in WA.",
		video: `${MIXKIT}/46753/46753-720.mp4`
	}
];

export const videos = {
	corridor: `${MIXKIT}/4380/4380-720.mp4`,
	refinery: `${MIXKIT}/14631/14631-720.mp4`,
	teamOnSite: `${MIXKIT}/46753/46753-720.mp4`,
	welding: `${MIXKIT}/47755/47755-720.mp4`,
	warehouse: `${MIXKIT}/4705/4705-720.mp4`,
	structure: `${MIXKIT}/40723/40723-720.mp4`,
	demolition: `${MIXKIT}/48655/48655-720.mp4`,
	blueprint: `${MIXKIT}/1439/1439-720.mp4`
};
