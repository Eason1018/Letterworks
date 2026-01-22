import type { Template } from "../lib/types";

export const templateSeed: Omit<Template, "createdAt" | "updatedAt">[] = [
  {
    id: "tmpl_refund_request",
    name: "Refund Request",
    category: "Finance",
    description: "Request a refund for a purchase or service.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Company or contact name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "purchaseDate", label: "Purchase date", type: "date", required: true },
      { id: "referenceNumber", label: "Order or reference number", type: "text", required: false },
      { id: "whatHappened", label: "What happened", type: "textarea", required: true },
      { id: "requestedAction", label: "What you want", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false },
      { id: "recipientAddress", label: "Recipient address", type: "textarea", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}\n{{recipientAddress}}",
      subject: "",
      body:
        "I am writing to request a refund for my purchase on {{purchaseDate}}. {{whatHappened}} I am requesting the following: {{requestedAction}}.",
      closing: "Thank you for your attention to this matter.",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "Thank you for your time and consideration." },
      firmer: { closing: "Please resolve this matter promptly." }
    }
  },
  {
    id: "tmpl_building_complaint",
    name: "Building Management Complaint",
    category: "Housing",
    description: "Report a building or property issue to management.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Management contact name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "issueDate", label: "Date issue began", type: "date", required: true },
      { id: "whatHappened", label: "Describe the issue", type: "textarea", required: true },
      { id: "requestedAction", label: "Requested action", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false },
      { id: "unitNumber", label: "Unit number", type: "text", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "I am writing to report an issue that began on {{issueDate}}. {{whatHappened}} I request the following: {{requestedAction}}.",
      closing: "Thank you for addressing this promptly.",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "Thank you for your help and attention." },
      firmer: { closing: "Please address this issue as soon as possible." }
    }
  },
  {
    id: "tmpl_medical_records",
    name: "Medical Records Request",
    category: "Health",
    description: "Request copies of medical records.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Provider or office name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "dateOfBirth", label: "Date of birth", type: "date", required: true },
      { id: "recordRange", label: "Date range of records", type: "text", required: true },
      { id: "requestedAction", label: "What records you want", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "referenceNumber", label: "Patient or record number", type: "text", required: false },
      { id: "senderAddress", label: "Your address", type: "textarea", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "I am requesting copies of my medical records for the following date range: {{recordRange}}. My date of birth is {{dateOfBirth}}. Please provide: {{requestedAction}}.",
      closing: "Thank you for your assistance.",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "Thank you for your time and care." },
      firmer: { closing: "Please provide the records at your earliest convenience." }
    }
  },
  {
    id: "tmpl_bank_dispute",
    name: "Bank Dispute",
    category: "Finance",
    description: "Dispute a bank charge or transaction.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Bank or department name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "transactionDate", label: "Transaction date", type: "date", required: true },
      { id: "referenceNumber", label: "Transaction or account number", type: "text", required: true },
      { id: "whatHappened", label: "Describe the dispute", type: "textarea", required: true },
      { id: "requestedAction", label: "Requested action", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "I am writing to dispute a transaction dated {{transactionDate}} (Reference: {{referenceNumber}}). {{whatHappened}} I request: {{requestedAction}}.",
      closing: "Please investigate and respond at your earliest convenience.",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "Thank you for looking into this matter." },
      firmer: { closing: "Please resolve this dispute promptly." }
    }
  },
  {
    id: "tmpl_landlord_repair",
    name: "Landlord Repair Request",
    category: "Housing",
    description: "Request repairs from a landlord.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Landlord or manager name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "issueDate", label: "Date issue began", type: "date", required: true },
      { id: "whatHappened", label: "Describe the repair needed", type: "textarea", required: true },
      { id: "requestedAction", label: "Requested action", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false },
      { id: "unitNumber", label: "Unit number", type: "text", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "I am requesting repairs for an issue that began on {{issueDate}}. {{whatHappened}} I request: {{requestedAction}}.",
      closing: "Thank you for your prompt attention.",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "Thank you for your assistance." },
      firmer: { closing: "Please address this repair promptly." }
    }
  },
  {
    id: "tmpl_resignation",
    name: "Resignation",
    category: "Work",
    description: "Resign from a position with professional notice.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Manager name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "lastDay", label: "Last working day", type: "date", required: true },
      { id: "whatHappened", label: "Optional note", type: "textarea", required: false }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "Please accept this letter as formal notice of my resignation. My last day will be {{lastDay}}. {{whatHappened}}",
      closing: "Thank you for the opportunity.",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "Thank you for your support and guidance." },
      firmer: { closing: "Please consider this letter my formal notice." }
    }
  },
  {
    id: "tmpl_thank_you",
    name: "Thank You",
    category: "Personal",
    description: "Send a professional thank you note.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Recipient name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "whatHappened", label: "What you are thanking them for", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "Thank you for {{whatHappened}}. I appreciate your time and support.",
      closing: "With gratitude,",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "With sincere appreciation," },
      firmer: { closing: "Thank you." }
    }
  },
  {
    id: "tmpl_condolence",
    name: "Condolence",
    category: "Personal",
    description: "Send a condolence letter.",
    requiredFields: [
      { id: "senderName", label: "Your full name", type: "text", required: true },
      { id: "recipientName", label: "Recipient name", type: "text", required: true },
      { id: "date", label: "Date of letter", type: "date", required: true },
      { id: "whatHappened", label: "Name or memory to mention", type: "textarea", required: true }
    ],
    optionalFields: [
      { id: "senderAddress", label: "Your address", type: "textarea", required: false }
    ],
    structure: {
      header: "{{date}}",
      recipient: "{{recipientName}}",
      subject: "",
      body:
        "I am so sorry for your loss. {{whatHappened}} Please accept my heartfelt condolences.",
      closing: "With sympathy,",
      signature: "Sincerely,\n{{senderName}}\n{{senderAddress}}"
    },
    toneVariants: {
      politer: { closing: "With my deepest sympathy," },
      firmer: { closing: "Please accept my condolences." }
    }
  }
];
