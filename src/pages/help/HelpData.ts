export interface TopicCard {
  title: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const browseTopics: TopicCard[] = [
  {
    title: 'Getting Started'
  },
  {
    title: 'Troubleshooting'
  },
];

export const faqItems: FAQItem[] = [
  {
    question: 'How long does delivery usually take?',
    answer: 'Delivery times vary depending on your location and shipping method. Standard delivery typically takes 3-5 business days, while express delivery takes 1-2 business days.',
  },
  {
    question: 'Can I change the delivery address after placing an order?',
    answer: 'Yes, you can change the delivery address within 24 hours of placing your order. Please contact our support team or use the tracking portal to make changes.',
  },
  {
    question: 'Are there extra charges for same-day delivery?',
    answer: 'Same-day delivery may have additional charges depending on your location and package size. You can view all applicable charges during checkout before confirming your order.',
  },
];
