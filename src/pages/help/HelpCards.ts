import robotIcon from '../../assets/supportPageIcons/robot.svg';
import whatsappIcon from '../../assets/supportPageIcons/whatsapp.svg';
import callIcon from '../../assets/supportPageIcons/call.svg';

export interface HelpCard {
  icon: string; 
  title: string;
  description: string;
  buttonText: string;
}

export const helpCards: HelpCard[] = [
  {
    icon: robotIcon,
    title: 'AI Chat Assistant',
    description: 'Get instant answers to your questions',
    buttonText: 'Start Chat',
  },
  {
    icon: whatsappIcon,
    title: 'WhatsApp Support',
    description: 'Chat with our support team',
    buttonText: 'Open Whatsapp',
  },
  {
    icon: callIcon,
    title: 'Call Support',
    description: 'Speak directly with an agent',
    buttonText: 'Call Now',
  },
];