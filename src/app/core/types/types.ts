/**
 * Permits a type T to be null.
 */
export type Nullable<T> = T | null;

export enum CallType {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
}

export interface DeclinedState {
  isDeclined: boolean;
  reason: string;
}
