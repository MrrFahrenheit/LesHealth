// src/common/decorators/check-owner.decorator.ts
import { SetMetadata } from '@nestjs/common';

export type RequestSource = 'body' | 'params' | 'query';

export interface OwnerCheckOptions {
  source?: RequestSource; 
  fieldPath: string;      
  allowAdmin?: boolean;   
}

export const CHECK_OWNER_KEY = 'check_owner_key';

export const CheckOwner = (options: OwnerCheckOptions) =>
  SetMetadata(CHECK_OWNER_KEY, { source: 'body', allowAdmin: true, ...options });