export interface CountryCode {
  code: string;
  label: string;
  flag: string;
}

export const countryCodes: CountryCode[] = [
{ code: '+1', label: 'United States', flag: '🇺🇸' },
{ code: '+44', label: 'United Kingdom', flag: '🇬🇧' },
{ code: '+61', label: 'Australia', flag: '🇦🇺' },
{ code: '+64', label: 'New Zealand', flag: '🇳🇿' },
{ code: '+353', label: 'Ireland', flag: '🇮🇪' },
{ code: '+27', label: 'South Africa', flag: '🇿🇦' },
{ code: '+91', label: 'India', flag: '🇮🇳' },
{ code: '+49', label: 'Germany', flag: '🇩🇪' }];