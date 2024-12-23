export interface GBPAccount {
  name: string;
  accountName: string;
  type: 'PERSONAL' | 'BUSINESS' | 'ORGANIZATION';
  role: 'OWNER' | 'PRIMARY_OWNER' | 'MANAGER';
  verificationState: 'VERIFIED' | 'UNVERIFIED';
  vettedState: 'VETTED' | 'NOT_VETTED';
  permissionLevel: 'OWNER_LEVEL' | 'MEMBER_LEVEL';
}

export interface GBPAccountList {
  accounts: GBPAccount[];
  nextPageToken?: string;
}

export interface GBPApiError {
  error: {
    code: number;
    message: string;
    status: string;
    details?: any[];
  };
}