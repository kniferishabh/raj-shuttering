export interface ServiceLandingPage {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  image: string;
  imageAlt: string;
  serviceIds: string[];
  benefits: Array<{ title: string; text: string }>;
  applications: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export const SERVICE_LANDING_PAGES: ServiceLandingPage[] = [
  {
    slug: 'shuttering-plates-on-rent-varanasi',
    title: 'Shuttering Plates on Rent in Varanasi',
    shortTitle: 'Shuttering Plates on Rent',
    description:
      'Hire steel shuttering plates for slabs, beams, columns and walls in Varanasi. Discuss plate sizes, quantities, rental duration and delivery with Raj Shuttering.',
    intro:
      'Steel shuttering plates provide a strong, reusable surface for concrete formwork. We help contractors in Varanasi select suitable plate quantities and supporting accessories based on the type and duration of their project.',
    image: '/images/shuttering-slab.jpg',
    imageAlt: 'Steel shuttering plates installed for slab formwork in Varanasi',
    serviceIds: ['svc-023', 'svc-008', 'svc-009', 'svc-010', 'svc-014'],
    benefits: [
      { title: 'Project-based quantities', text: 'Discuss the slab, beam, wall or column requirement before confirming material quantities.' },
      { title: 'Supporting accessories', text: 'Tie rods, wing nuts and column clamps can be discussed with the main shuttering requirement.' },
      { title: 'Rental or purchase enquiry', text: 'Ask about availability for temporary rental requirements or wholesale supply.' },
    ],
    applications: ['RCC slab formwork', 'Beam and wall shuttering', 'Column construction', 'Residential and commercial projects'],
    faqs: [
      { question: 'Which shuttering plate sizes are currently available?', answer: 'Available plate sizes and quantities can change by project demand. Share your slab, beam, wall or column requirement with our Varanasi team so the current stock can be confirmed before booking.' },
      { question: 'Can shuttering plates be rented for a specific project period?', answer: 'Rental duration is discussed for each project. Confirm the required quantity, expected start date, rental period and transport needs to receive an availability-based quotation.' },
    ],
  },
  {
    slug: 'scaffolding-on-rent-varanasi',
    title: 'Scaffolding on Rent in Varanasi',
    shortTitle: 'Scaffolding Rental',
    description:
      'Rent scaffolding pipes, clamps, base jacks and U-head jacks for construction work in Varanasi. Contact Raj Shuttering for availability and a quotation.',
    intro:
      'A dependable scaffolding arrangement starts with the right combination of pipes, couplers and adjustable supports. Share your site requirements with our team to discuss available components for access and formwork support in Varanasi.',
    image: '/images/scaffolding-towers.jpg',
    imageAlt: 'Scaffolding pipes and access structure at a construction site',
    serviceIds: ['svc-027', 'svc-015', 'svc-005', 'svc-006'],
    benefits: [
      { title: 'Compatible components', text: 'Discuss pipes, couplers, base jacks and U-head jacks as one coordinated requirement.' },
      { title: 'Site-specific planning', text: 'Quantities and component selection depend on working height, access and support needs.' },
      { title: 'Local coordination', text: 'Enquiries are handled from Pandeypur for construction requirements across Varanasi.' },
    ],
    applications: ['Building access scaffolds', 'Slab and beam support', 'Exterior repair work', 'Residential and commercial construction'],
    faqs: [
      { question: 'Which components should be requested with scaffolding pipes?', answer: 'The requirement may include compatible clamps or couplers, base jacks and U-head jacks. Final components and quantities depend on the intended height, access and support arrangement.' },
      { question: 'Is scaffolding delivery available outside central Varanasi?', answer: 'Delivery location and transport charges must be confirmed for each order. Send the site address, equipment list and required dates so the team can check serviceability.' },
    ],
  },
  {
    slug: 'steel-props-on-rent-varanasi',
    title: 'Steel Props on Rent in Varanasi',
    shortTitle: 'Adjustable Steel Props',
    description:
      'Hire adjustable steel props and acrow props for slab, beam and formwork support in Varanasi. Request current availability and rental pricing.',
    intro:
      'Adjustable steel props are used as temporary vertical supports for slabs, beams and formwork. We supply props for project-based requirements and can help identify the related heads or base components needed for the support arrangement.',
    image: '/images/services/jack-props/acro-props-closeup.png',
    imageAlt: 'Adjustable steel acrow props available for construction support',
    serviceIds: ['svc-013', 'svc-005', 'svc-006'],
    benefits: [
      { title: 'Adjustable support', text: 'Telescopic steel props allow height adjustment for common slab and beam support arrangements.' },
      { title: 'Related jack components', text: 'Ask about U-head and base jack availability with the prop requirement.' },
      { title: 'Flexible duration', text: 'Share the expected project period to request an appropriate rental quotation.' },
    ],
    applications: ['Slab centering support', 'Beam formwork support', 'Temporary structural support', 'Residential and commercial RCC work'],
    faqs: [
      { question: 'How do I choose the required steel prop size?', answer: 'Prop selection depends on the working height, load arrangement and formwork plan. Share the site requirement with the team and confirm the available adjustment range before ordering.' },
      { question: 'Are U-head or base jacks available with steel props?', answer: 'Related jack components can be requested with the prop enquiry. Availability, quantities, rental duration and transport should be confirmed together before booking.' },
    ],
  },
];

export function getServiceLandingPage(slug: string) {
  return SERVICE_LANDING_PAGES.find((page) => page.slug === slug);
}
