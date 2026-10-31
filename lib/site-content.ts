export type SiteContent = Record<string, string>;

export interface ContentField {
  key: string;
  label: string;
  multiline?: boolean;
}

export interface ContentGroup {
  title: string;
  description: string;
  fields: ContentField[];
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  'nav.home': 'Home', 'nav.about': 'About', 'nav.services': 'Services', 'nav.gallery': 'Gallery', 'nav.contact': 'Contact', 'nav.quote': 'Get a Quote',
  'home.kicker': 'Trusted since {year} · Serving across India', 'home.primaryCta': 'Get a free quote', 'home.secondaryCta': 'View our projects', 'home.equipmentTitle': 'Our equipment', 'home.equipmentSubtitle': 'Rent & wholesale supply',
  'home.whyEyebrow': 'Why choose us', 'home.whyTitle': 'Dependable equipment. Practical site support.', 'home.advantage1Title': 'Serving since {year}', 'home.advantage1Text': 'Experienced construction equipment supplier', 'home.advantage2Title': 'Inspected inventory', 'home.advantage2Text': 'Equipment checked before dispatch', 'home.advantage3Title': 'Rent and wholesale', 'home.advantage3Text': 'Flexible options for different project needs', 'home.advantage4Title': 'Pan-India coordination', 'home.advantage4Text': 'Project-based delivery across India', 'home.advantage5Title': 'Clear quotations', 'home.advantage5Text': 'Quantity, duration and pricing discussed upfront',
  'home.workEyebrow': 'Our work', 'home.workTitle': 'Equipment at work on real project sites.', 'home.workCta': 'View all projects', 'home.mapTitle': 'Serving Across India', 'home.mapButton': 'Rental solutions across India', 'home.mapBase': 'Base: Varanasi', 'home.mapCoverage': 'Nationwide project coverage',
  'home.locationsTitle': 'Locations We Serve', 'home.locationsText': 'Raj Shuttering & Scaffolding supports builders, contractors and project teams with shuttering plates, scaffolding pipes, adjustable props and formwork equipment. From our base in Varanasi, we coordinate rental and wholesale requirements, material availability and project-based delivery across major cities throughout India.', 'home.locationsList': 'Varanasi, Delhi NCR, Lucknow, Prayagraj, Patna, Kolkata, Mumbai, Pune, Hyderabad, Bengaluru, Chennai, Ahmedabad, Jaipur, Guwahati, Bhopal, Chandigarh',
  'home.industriesTitle': 'Industries We Serve', 'home.industriesText': 'Reliable rental and wholesale equipment for residential, commercial, high-rise, industrial and infrastructure construction. We help project teams source dependable material with flexible quantities and coordinated delivery.', 'home.industriesList': 'Residential projects, Commercial buildings, Industrial & warehouse, Government projects, Schools & institutions, Railways & metro, Airport infrastructure',
  'home.testimonialsEyebrow': 'Client stories', 'home.testimonialsTitle': 'Trusted by contractors who build for the future.', 'home.ctaEyebrow': 'Planning a construction project?', 'home.ctaTitle': 'Get the right equipment, right when you need it.', 'home.ctaText': 'Share your material, quantity, rental duration and delivery location with our team.',
  'home.answersEyebrow': 'Quick answers', 'home.answersTitle': 'Shuttering and scaffolding: what contractors need to know', 'home.answersIntro': '{businessName} supplies shuttering, scaffolding and formwork equipment on rent and for wholesale requirements. Based in {city} and serving projects across India, we help contractors confirm suitable equipment, quantities, availability, rental duration and delivery before dispatch.',
  'home.answers': 'What shuttering and scaffolding equipment do you supply?|We supply steel shuttering plates, scaffolding pipes and clamps, adjustable steel props, U-head jacks, base jacks and related formwork equipment for residential, commercial and infrastructure projects.\nCan I rent shuttering and scaffolding equipment in Varanasi?|Yes. {businessName} handles project-based rental enquiries from {city}. Share the equipment list, quantity, site location, start date and expected rental period so current availability and transport can be confirmed.\nDo you supply construction equipment outside Varanasi?|Yes. We coordinate rental and wholesale requirements for project sites across India. Delivery feasibility, timing and transport charges are confirmed for each destination and order size.\nHow can I get an accurate equipment quotation?|Send the equipment type, required quantity, project location, start date, rental duration and any size or height requirements. Our team will confirm current stock, compatible components, transport and pricing.\nWhat is the difference between a U-head jack and a base jack?|A base jack is installed beneath a scaffolding standard to support leveling at the ground. A U-head jack is installed at the top to support beams or formwork members. The required size and adjustment range depend on the planned support arrangement.',
  'about.heroTitle': 'About Raj Shuttering & Scaffolding', 'about.heroSubtitle': 'The story of {businessName} - a Pandeypur, {city} family business serving construction since {year}.', 'about.storyEyebrow': 'Our Story', 'about.storyTitle': "From a Small Yard to Varanasi's Trusted Name", 'about.storyText2': "What began as a small operation in Pandeypur has grown into one of Varanasi's most reliable shuttering and scaffolding suppliers. Through every project, our focus has stayed the same - deliver quality materials, on time, at fair prices.", 'about.valuesEyebrow': 'What We Stand For', 'about.valuesTitle': 'Our Core Values', 'about.valuesSubtitle': 'The principles that guide every decision and every delivery.',
  'about.timeline': '2008|Founded in Pandeypur|Started with a small inventory serving local Varanasi contractors.\n2012|Expanded Inventory|Added aluminium scaffolding and H-frame systems to our catalogue.\n2016|Pan-Purvanchal Reach|Began serving customers in Chandauli, Mirzapur, Jaunpur and beyond.\n2020|Wholesale Operations|Launched wholesale supply for sub-dealers and contractors across UP.\n2024|Expanded Product Range|Added more formwork, access and construction equipment options for local projects.', 'about.values': 'Quality|Equipment condition is checked before it is supplied for a project.\nTrust|Transparent pricing, GST invoices, and honest dealings with every customer.\nService|Clear coordination for collection or delivery based on current availability.\nExperience|Serving Varanasi construction projects since 2008.',
  'services.heroTitle': 'Shuttering & Scaffolding Equipment in Varanasi', 'services.heroSubtitle': 'A complete catalogue of shuttering, scaffolding, and construction equipment - available on rent or for wholesale purchase.', 'services.popularEyebrow': 'Popular rental requirements', 'services.popularTitle': 'Explore equipment by project need', 'services.popularText': 'Practical information for frequently requested shuttering and scaffolding equipment in Varanasi.', 'services.gridEyebrow': 'What We Offer', 'services.gridTitle': 'Complete Shuttering & Scaffolding Solutions', 'services.gridText': 'From small residential slabs to multi-storey commercial projects - we have the right materials and the right expertise.',
  'gallery.heroTitle': 'Shuttering & Scaffolding Project Gallery', 'gallery.heroSubtitle': "Real projects, real materials. A visual record of the work we've supported across Purvanchal.",
  'contact.heroTitle': 'Contact Raj Shuttering & Scaffolding', 'contact.heroSubtitle': "Have a project, a question, or need a bulk quote? We're a call or message away.", 'contact.visitTitle': 'Visit Our Yard', 'contact.formTitle': 'Send Us an Enquiry', 'contact.formSubtitle': 'Fill in the details below and our team will get back to you as soon as possible.', 'contact.successTitle': 'Thank You!', 'contact.successText': 'Your enquiry has been received. Our team will review the details and contact you as soon as possible.',
  'shared.ctaEyebrow': 'Ready to Build?', 'shared.ctaTitle': 'Ready to Start Your Project?', 'shared.callLabel': 'Call Now', 'shared.whatsappLabel': 'WhatsApp Us',
  'footer.quickLinksTitle': 'Quick Links', 'footer.servicesTitle': 'Services', 'footer.contactTitle': 'Contact', 'footer.rights': 'All rights reserved.',
};

export const CONTENT_GROUPS: ContentGroup[] = [
  { title: 'Navigation & Shared Actions', description: 'Menu labels and reusable calls to action.', fields: ['nav.home','nav.about','nav.services','nav.gallery','nav.contact','nav.quote','shared.ctaEyebrow','shared.ctaTitle','shared.callLabel','shared.whatsappLabel'].map((key) => ({ key, label: key.split('.').pop()! })) },
  { title: 'Home Page', description: 'Homepage sections, supporting copy, locations and industries.', fields: Object.keys(DEFAULT_SITE_CONTENT).filter((key) => key.startsWith('home.')).map((key) => ({ key, label: key.slice(5), multiline: /Text|List|Title|Subtitle/.test(key) })) },
  { title: 'About Page', description: 'About hero, company story, timeline and values. Timeline/value rows use one row per line with | separators.', fields: Object.keys(DEFAULT_SITE_CONTENT).filter((key) => key.startsWith('about.')).map((key) => ({ key, label: key.slice(6), multiline: /Text|Subtitle|timeline|values/.test(key) })) },
  { title: 'Services Page', description: 'Services page hero and catalogue introduction.', fields: Object.keys(DEFAULT_SITE_CONTENT).filter((key) => key.startsWith('services.')).map((key) => ({ key, label: key.slice(9), multiline: /Text|Subtitle/.test(key) })) },
  { title: 'Gallery Page', description: 'Gallery hero copy.', fields: Object.keys(DEFAULT_SITE_CONTENT).filter((key) => key.startsWith('gallery.')).map((key) => ({ key, label: key.slice(8), multiline: key.endsWith('Subtitle') })) },
  { title: 'Contact Page', description: 'Contact hero, form and success messages.', fields: Object.keys(DEFAULT_SITE_CONTENT).filter((key) => key.startsWith('contact.')).map((key) => ({ key, label: key.slice(8), multiline: /Text|Subtitle/.test(key) })) },
  { title: 'Footer', description: 'Footer headings and copyright wording.', fields: Object.keys(DEFAULT_SITE_CONTENT).filter((key) => key.startsWith('footer.')).map((key) => ({ key, label: key.slice(7) })) },
];

export function mergeSiteContent(content?: SiteContent): SiteContent {
  return { ...DEFAULT_SITE_CONTENT, ...(content ?? {}) };
}

export function interpolateContent(value: string, values: Record<string, string | number>): string {
  return value.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? `{${key}}`));
}

export function parseRows(value: string, columns: number): string[][] {
  return value.split(/\r?\n/).map((row) => row.split('|').map((part) => part.trim())).filter((row) => row.length >= columns && row[0]);
}
