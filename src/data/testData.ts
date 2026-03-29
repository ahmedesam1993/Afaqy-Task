export const ADMIN_CREDENTIALS = {
  username: 'Admin',
  password: 'admin123',
} as const;

export const EXPECTED_LOGGED_USER = 'minSree';


// ── Random number helper ───────────────────────────────────────────────────
export function generateRandomNumber(min: number = 1000, max: number = 9999): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ── Employee Data ──────────────────────────────────────────────────────────
export interface EmployeeData {
  firstName:  string;
  middleName: string;
  lastName:   string;
}

export function buildEmployeeData(): EmployeeData {
  const num = generateRandomNumber();
  return {
    firstName:  'Ahmed',
    middleName: 'Esam',
    lastName:   `${num}`,
  };
}
// ── User Data ──────────────────────────────────────────────────────────────
export interface NewUserData {
  userRole:        'Admin' | 'ESS';
  status:          'Enabled' | 'Disabled';
  usernameBase:    string;
  password:        string;
  confirmPassword: string;
}

export const NEW_USERS: NewUserData[] = [
  {
    userRole:        'Admin',
    status:          'Enabled',
    usernameBase:    'Ahmed_Esam',
    password:        'Admin@12345',
    confirmPassword: 'Admin@12345',
  },
];


