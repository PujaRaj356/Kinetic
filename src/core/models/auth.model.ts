export interface PendingVerification {
  email: string;
  purpose: 'login' | 'register' | 'reset';
  returnUrl?: string;
}
