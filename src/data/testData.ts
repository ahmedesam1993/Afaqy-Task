

// ── Random Number Generation ───────────────────────────────────────────────────
export function generateRandomNumber(min: number = 1000, max: number = 9999): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const num = generateRandomNumber();

// ── New User Data ──────────────────────────────────────────────────────────
export interface newUserdata {
  name:  string;
  email: string;
}

export function buildNewUserData(): newUserdata {
  const firstName = 'Ahmed';
  const lastName = 'Esam';
  return {
    
    name:  `${firstName} ${lastName} ${num}`,
    email: `${firstName}${lastName}${num}@example.com`,
  };
}

export interface completeUserData {
  title: 'Mr.' | 'Mrs.';
  name: string;
  password: string;
  day: number;
  month: number;
  year: number;
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: number;
  mobileNumber: string;
}

export function buildCompleteUserData(): completeUserData {
  return {
    title: 'Mr.',
    name:  buildNewUserData().name,
    password: 'P@ssw0rd',
    day: Math.floor(Math.random() * 28) + 1,
    month: Math.floor(Math.random() * 12) + 1,
    year: Math.floor(Math.random() * 20) + 1990,
    firstName: buildNewUserData().name.split(' ')[0],
    lastName: buildNewUserData().name.split(' ')[1],
    company: 'Afaqy',
    address: 'Zahraa El Maadi, Cairo, Egypt',
    country: 'United States',
    state: 'Cairo',
    city: 'Maadi',
    zipcode: generateRandomNumber(10000, 99999),
    mobileNumber: `+20-${generateRandomNumber(100, 999)}-${generateRandomNumber(100, 999)}-${generateRandomNumber(1000, 9999)}`,
  };

}




