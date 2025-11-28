import { Designer } from './types';

export const MOCK_DESIGNERS: Designer[] = [
  {
    id: '1',
    name: 'Aarav Patel',
    location: 'Mumbai, Maharashtra',
    specialty: 'Traditional Gold & Jadau',
    priceRange: '₹2,500/hr',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop',
    description: 'Master craftsman with 20 years of experience in intricate Jadau and traditional Maharashtrian gold jewelry designs.',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Jaipur, Rajasthan',
    specialty: 'Meenakari & Gemstones',
    priceRange: '₹1,200/hr',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop',
    description: 'Specializing in the vibrant art of Meenakari. Priya brings the colors of Rajasthan to life in her custom silver and gold pieces.',
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: '3',
    name: 'Rohan Verma',
    location: 'Bangalore, Karnataka',
    specialty: 'Contemporary Diamond',
    priceRange: '₹3,000/hr',
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=800&auto=format&fit=crop',
    description: 'Modern minimalist designs for the new generation. Rohan uses ethically sourced diamonds and platinum for sleek, everyday luxury.',
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: '4',
    name: 'Ananya Singh',
    location: 'New Delhi, Delhi',
    specialty: 'Polki Bridal Sets',
    priceRange: '₹2,800/hr',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=800&auto=format&fit=crop',
    description: 'Creating royal bridal heirlooms. Ananya works closely with brides to design statement Polki sets that are regal and timeless.',
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
];