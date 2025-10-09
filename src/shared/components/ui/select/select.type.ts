export type OptionTone = 'positive' | 'negative' | 'neutral';

export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  tone?: OptionTone;
}

export type SelectVariant = 'form' | 'filter';
