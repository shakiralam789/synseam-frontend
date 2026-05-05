import { cookies } from "next/headers";

export interface Consultation {
  id: string;
  name: string;
  email: string;
  company?: string;
  need: string;
  timeline?: string;
  budget?: string;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getConsultations(): Promise<Consultation[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('synseam_auth_token')?.value;

  const res = await fetch(`${API_URL}/api/consultations`, {
    cache: 'no-store',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    },
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch consultations');
  }
  
  return res.json();
}
