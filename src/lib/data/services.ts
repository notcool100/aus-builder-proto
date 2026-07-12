import Biohazard from 'lucide-svelte/icons/biohazard';
import Construction from 'lucide-svelte/icons/construction';
import FlaskConical from 'lucide-svelte/icons/flask-conical';
import ClipboardList from 'lucide-svelte/icons/clipboard-list';
import Leaf from 'lucide-svelte/icons/leaf';
import Siren from 'lucide-svelte/icons/siren';

export interface ServiceItem {
	num: string;
	icon: typeof Biohazard;
	title: string;
	desc: string;
	href?: string;
}

export const services: ServiceItem[] = [
	{
		num: '01',
		icon: Biohazard,
		title: 'Asbestos Removal & Remediation',
		desc: 'Class A & B licensed removal of friable and non-friable asbestos from all site types — residential, commercial, industrial, and government. Full air monitoring and clearance certification provided as standard.'
	},
	{
		num: '02',
		icon: Construction,
		title: 'Demolition & Deconstruction',
		desc: 'Safe, precision demolition for structures of all scales. From selective interior strip-outs to full structural demolition, site clearing, and controlled building collapses — all with a zero-incident safety record.'
	},
	{
		num: '03',
		icon: FlaskConical,
		title: 'Hazardous Material Management',
		desc: 'Professional identification, safe containment, and legal disposal of lead paint, mould, contaminated soil, mercury, PCBs, and all other Schedule 9 hazardous materials in full compliance with WA regulations.'
	},
	{
		num: '04',
		icon: ClipboardList,
		title: 'Compliance & Consulting',
		desc: 'End-to-end compliance documentation, asbestos management plans (AMPs), independent site audits, and regulatory consulting — keeping your site legally protected and WorkSafe WA compliant at every stage.'
	},
	{
		num: '05',
		icon: Leaf,
		title: 'Environmental Remediation',
		desc: 'Soil and groundwater contamination assessment, treatment, and remediation. Restore your land to full regulatory standards with our certified environmental engineers and NATA-accredited laboratory partners.'
	},
	{
		num: '06',
		icon: Siren,
		title: '24/7 Emergency Response',
		desc: "Rapid response for asbestos incidents, storm damage, cyclone damage, and unexpected hazardous material discoveries. We're on-call around the clock and mobilise to your site within hours — anywhere in WA."
	}
];
