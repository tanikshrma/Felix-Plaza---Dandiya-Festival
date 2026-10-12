export interface RegistrationData {
  id: string;
  fullName: string;
  mobile: string;
  email?: string;
  guests: string;
  city?: string;
  whatsapp?: string;
  passCode: string;
  seatCategory: string;
  registeredAt: string;
  storage?: 'backend' | 'demo';
}

export interface FormValues {
  fullName: string;
  mobile: string;
  email: string;
  guests: string;
  city: string;
  whatsapp: string;
  isSameAsMobile: boolean;
}

export interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  guests?: string;
  whatsapp?: string;
}
