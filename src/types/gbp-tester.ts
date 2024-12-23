export interface RequestDetails {
  url: string;
  method: string;
  headers: Record<string, string>;
  response?: any;
  error?: any;
}