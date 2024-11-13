export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: "personal" | "meal" | "work";
}

export interface DayProps {
  day: number;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
}

export interface CategoryProps {
  name: string;
  color: string;
}

export interface UserInfoProps {
  label: string;
  value: string;
  hasIcon?: boolean;
  iconSrc?: string;
}

export interface WelcomeCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface SocialButtonProps {
  icon: string;
  alt: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  ariaLabel: string;
}
