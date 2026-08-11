export type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

export type DropdownPosition =
  | 'bottomLeft'
  | 'bottomRight'
  | 'topLeft'
  | 'topRight';

export type SubDropdownPosition =
  | 'rightStart'
  | 'leftStart'
  | 'rightEnd'
  | 'leftEnd';
