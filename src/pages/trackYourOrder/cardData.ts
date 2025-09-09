import RealTimeTrackingIcon from '../../assets/icons/real-time-tracking.svg';
import AiBasedReroutingIcon from '../../assets/icons/ai-based-rerouting.svg';
import InstantPricingIcon from '../../assets/icons/instant-pricing.svg';

export interface CardData {
  icon: string;
  title: string;
  description: string;
}

export const cards: CardData[] = [
  {
    icon: RealTimeTrackingIcon,
    title: 'Real-Time Tracking',
    description: 'Monitor your shipments with live updates and precise location tracking via secure links.',
  },
  {
    icon: AiBasedReroutingIcon,
    title: 'AI Based Rerouting',
    description: 'AI manages order of deliveries to achieve optimum number of shipments delivered in the fastest time possible.',
  },
  {
    icon: InstantPricingIcon,
    title: 'Instant Pricing',
    description: 'Gives accurate pricing based on package weight, distance traveled, and special cases.',
  },
];
