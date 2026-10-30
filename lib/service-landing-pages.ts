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
  {
    slug: 'u-head-jack-on-rent-varanasi',
    title: 'U Head Jack on Rent in Varanasi',
    shortTitle: 'U Head Jack on Rent',
    description: 'Rent adjustable U-head jacks for beam and slab formwork support in Varanasi. Confirm compatible sizes, quantities, duration and current availability.',
    intro: 'U-head jacks provide an adjustable top support for beams and formwork members in scaffolding and centering systems. Share the intended support arrangement, working height and quantity with our team before confirming your requirement.',
    image: '/images/services/u-jack/u-jack-batch.png',
    imageAlt: 'Adjustable U-head jacks for scaffolding and formwork support',
    serviceIds: ['svc-005', 'svc-006', 'svc-013', 'svc-027'],
    benefits: [
      { title: 'Adjustable top support', text: 'The threaded stem allows practical height adjustment within the available product range.' },
      { title: 'Coordinated equipment', text: 'Discuss U-head jacks with compatible props, standards, pipes or other formwork support components.' },
      { title: 'Project-based supply', text: 'Request current rental or purchase availability based on quantity, duration and site location.' },
    ],
    applications: ['Beam bottom support', 'Slab formwork centering', 'Scaffolding height adjustment', 'Temporary construction support systems'],
    faqs: [
      { question: 'What details are needed for a U-head jack quotation?', answer: 'Share the required quantity, expected adjustment range, project duration, start date and delivery location. Current dimensions and stock should be confirmed before ordering.' },
      { question: 'Can U-head jacks be supplied with steel props or scaffolding?', answer: 'Related support equipment can be discussed in the same enquiry. Compatibility depends on the planned arrangement, so confirm the full equipment list with your site team.' },
    ],
  },
  {
    slug: 'base-jack-on-rent-varanasi',
    title: 'Base Jack on Rent in Varanasi',
    shortTitle: 'Base Jack on Rent',
    description: 'Hire adjustable scaffolding base jacks in Varanasi for stable setup and level correction. Request current sizes, quantities and rental pricing.',
    intro: 'Adjustable base jacks sit beneath scaffolding standards and help compensate for practical level differences at the setup surface. The correct quantity and adjustment range should be planned with the overall scaffolding arrangement.',
    image: '/images/services/base-jack/base-jack-site.png',
    imageAlt: 'Adjustable base jacks installed beneath scaffolding standards',
    serviceIds: ['svc-006', 'svc-005', 'svc-027', 'svc-015'],
    benefits: [
      { title: 'Level adjustment', text: 'Threaded adjustment supports accurate setup within the component’s available working range.' },
      { title: 'Stable base connection', text: 'The base plate distributes contact beneath compatible scaffolding standards.' },
      { title: 'Rental and wholesale enquiries', text: 'Discuss temporary project rental or quantity-based purchase requirements with the team.' },
    ],
    applications: ['Scaffolding foundation setup', 'Level correction on site', 'Formwork support towers', 'Residential and commercial construction'],
    faqs: [
      { question: 'How many base jacks are required for scaffolding?', answer: 'The quantity normally depends on the number of vertical standards in the planned layout. Confirm the scaffolding design and site conditions with a competent site professional before placing an order.' },
      { question: 'Are base jacks available for short rental periods?', answer: 'Rental duration and minimum quantities depend on current availability. Share the required dates, quantity and delivery location to request a quotation.' },
    ],
  },
  {
    slug: 'scaffolding-clamps-on-rent-varanasi',
    title: 'Scaffolding Clamps on Rent in Varanasi',
    shortTitle: 'Scaffolding Clamps on Rent',
    description: 'Rent scaffolding clamps and couplers in Varanasi for connecting compatible pipes. Ask about fixed, swivel and current coupler availability.',
    intro: 'Scaffolding clamps or couplers connect compatible pipes within access and support arrangements. Clamp type, pipe compatibility and quantity should be confirmed against the intended scaffolding layout before supply.',
    image: '/images/services/scaffolding-clamp/scaffold-coupler-spec.png',
    imageAlt: 'Scaffolding pipe clamps and couplers for construction systems',
    serviceIds: ['svc-015', 'svc-027', 'svc-005', 'svc-006'],
    benefits: [
      { title: 'Connection options', text: 'Ask about currently available fixed or swivel connection types for compatible scaffolding pipes.' },
      { title: 'Quantity coordination', text: 'Plan coupler quantities together with pipe lengths, standards and the intended scaffold layout.' },
      { title: 'Availability confirmation', text: 'Current types, condition, quantities and rental duration are confirmed before booking.' },
    ],
    applications: ['Pipe-to-pipe scaffold connections', 'Access scaffolding', 'Temporary support arrangements', 'Repair and construction work'],
    faqs: [
      { question: 'Which type of scaffolding clamp should I request?', answer: 'The correct coupler depends on whether pipes meet at a right angle, require rotation or serve another connection detail. Confirm the layout and compatible pipe size before ordering.' },
      { question: 'Can clamps be rented with scaffolding pipes?', answer: 'Yes, clamps can be discussed as part of a coordinated scaffolding enquiry. Final availability, quantities, duration and transport are confirmed for each project.' },
    ],
  },
];

export function getServiceLandingPage(slug: string) {
  return SERVICE_LANDING_PAGES.find((page) => page.slug === slug);
}
