export enum View {
  HOME = 'HOME',
  MARKETPLACE = 'MARKETPLACE',
  BOOKING = 'BOOKING',
  HOME_GYM = 'HOME_GYM',
  ASSISTANT = 'ASSISTANT',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  LOGIN = 'LOGIN',
  PROFILE_COMPLETION = 'PROFILE_COMPLETION'
}

export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  joinedDate: string;
  phone?: string;
  age?: number;
  sex?: 'Male' | 'Female' | 'Other';
  isProfileComplete: boolean;
  isPro: boolean;
  isPhoneVerified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

export interface Gym {
  id: string;
  name: string;
  location: string;
  type: 'GYM' | 'TRAINER' | 'CLASS';
  pricePerSession: number;
  rating: number;
  image: string;
  features: string[];
}

export interface Package {
  id: string;
  name: string;
  tier: 'STARTER' | 'PRO' | 'ELITE';
  price: number;
  items: string[];
  description: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface WorkoutData {
  day: string;
  calories: number;
  duration: number; // minutes
}