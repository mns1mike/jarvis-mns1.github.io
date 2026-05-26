export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: Array<{
    heading?: string;
    paragraphs: Array<string | Array<string | { text: string; href: string }>>;
  }>;
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Privacy policy for MNS1 Express website visitors, CDL-A driver applicants, and shipper contacts.",
    updated: "May 18, 2026",
    sections: [
      {
        paragraphs: [
          "MNS1 Express uses website forms, contact links, and business tools to respond to driver applicants, shipper inquiries, marketing operations, and general company messages. We collect the information you choose to submit, such as name, phone number, email address, ZIP code, driver experience, and message details.",
        ],
      },
      {
        heading: "How we use information",
        paragraphs: [
          "We use submitted information to contact you about employment opportunities, respond to freight and shipper requests, provide support, and improve website performance. We do not sell applicant or shipper contact information.",
        ],
      },
      {
        heading: "Recruiting and hiring",
        paragraphs: [
          "Driver application information may be reviewed by recruiting, safety, and operations staff to evaluate fit, schedule follow-up, and complete required hiring steps.",
        ],
      },
      {
        heading: "Meta ads and social media tools",
        paragraphs: [
          "MNS1 Express may use Meta business tools, including the Meta Marketing API, to manage and measure Facebook and Instagram advertising for MNS1 Express and related recruiting or shipper campaigns. These tools may provide access to business assets such as ad accounts, campaigns, ads, creatives, Facebook Pages, Instagram accounts, audiences, and performance insights.",
          "Information from Meta business tools is used for internal advertising operations, campaign reporting, budget management, recruiting analysis, and content performance measurement. We do not sell data received through Meta business tools.",
        ],
      },
      {
        heading: "Data deletion",
        paragraphs: [
          [
            "You may request deletion of data associated with MNS1 Express website forms or Meta-connected business tools by following the instructions on our ",
            { text: "Data Deletion Instructions", href: "/data-deletion/" },
            " page.",
          ],
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          [
            "Questions can be sent to ",
            { text: "info@mns1express.com", href: "mailto:info@mns1express.com" },
            " or by calling ",
            { text: "630-246-3280", href: "tel:6302463280" },
            ".",
          ],
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "Website terms of use for MNS1 Express driver recruiting and shipper information pages.",
    updated: "May 15, 2026",
    sections: [
      {
        paragraphs: [
          "This website provides general information about MNS1 Express, CDL-A driver opportunities, and shipper services. The information on this site is not a contract, guarantee of employment, or guarantee of freight service availability.",
        ],
      },
      {
        heading: "Driver recruiting information",
        paragraphs: [
          "Pay, lanes, equipment, home time, and orientation details may vary by qualifications, location, freight network conditions, safety requirements, and company policy.",
        ],
      },
      {
        heading: "Shipper information",
        paragraphs: [
          "Service descriptions are general summaries. Freight commitments, rates, and operating details are confirmed through direct communication with MNS1 Express.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          [
            "For current details, call ",
            { text: "630-246-3280", href: "tel:6302463280" },
            " or email ",
            { text: "info@mns1express.com", href: "mailto:info@mns1express.com" },
            ".",
          ],
        ],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "Accessibility statement for the MNS1 Express website.",
    updated: "May 15, 2026",
    sections: [
      {
        paragraphs: [
          "MNS1 Express aims to make this website usable for drivers, applicants, shippers, and visitors using current browsers and assistive technology.",
        ],
      },
      {
        heading: "Need help?",
        paragraphs: [
          [
            "If any page, form, or document is difficult to use, contact us and we will help directly. Call ",
            { text: "630-246-3280", href: "tel:6302463280" },
            " or email ",
            { text: "info@mns1express.com", href: "mailto:info@mns1express.com" },
            ".",
          ],
        ],
      },
    ],
  },
  {
    slug: "data-deletion",
    title: "Data Deletion Instructions",
    description: "Instructions for requesting deletion of MNS1 Express website, recruiting, and Meta business tool data.",
    updated: "May 18, 2026",
    sections: [
      {
        paragraphs: [
          "MNS1 Express respects requests to delete personal information submitted through our website, recruiting forms, contact forms, and Meta-connected business tools used for advertising and reporting.",
        ],
      },
      {
        heading: "How to request deletion",
        paragraphs: [
          [
            "Email ",
            { text: "privacy@mns1express.com", href: "mailto:privacy@mns1express.com" },
            ' with the subject line "Data deletion request." Include your name, preferred contact method, and a short description of the data you want deleted, such as a driver inquiry, shipper inquiry, website contact form submission, or Facebook/Instagram advertising interaction.',
          ],
        ],
      },
      {
        heading: "What we delete",
        paragraphs: [
          "After verifying the request, we will delete or anonymize personal information we control, including website form submissions, recruiting inquiry records, contact request details, and internally stored data connected to Meta advertising operations when applicable.",
        ],
      },
      {
        heading: "Data we may not control",
        paragraphs: [
          "Some information may remain in systems controlled by third parties, including Meta, driver application platforms, email providers, analytics tools, or legal and compliance record systems. For data controlled by Meta, you may also use Meta's account privacy controls or contact Meta directly.",
        ],
      },
      {
        heading: "Timing",
        paragraphs: [
          "We will respond to deletion requests within a reasonable period and aim to complete eligible deletion requests within 30 days unless a longer period is required for verification, legal, safety, employment, tax, or regulatory reasons.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          [
            "Questions about this process can be sent to ",
            { text: "privacy@mns1express.com", href: "mailto:privacy@mns1express.com" },
            " or ",
            { text: "info@mns1express.com", href: "mailto:info@mns1express.com" },
            ".",
          ],
        ],
      },
    ],
  },
];
