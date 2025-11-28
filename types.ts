export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Designer {
  id: string;
  name: string;
  location: string;
  specialty: string;
  priceRange: string;
  rating: number;
  imageUrl: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distance?: number; // Distance in km from user
}

export interface DesignRequest {
  id: string;
  title: string;
  type: 'analysis' | 'generation';
  description: string;
  aiResponse: string;
  imageUrl?: string;
  createdAt: number;
}

export enum ViewState {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  HOME = 'HOME', // Designers List
  AI_TOOL = 'AI_TOOL',
  PLANS = 'PLANS',
  PAYMENT = 'PAYMENT',
  PROFILE = 'PROFILE' // Dashboard
}