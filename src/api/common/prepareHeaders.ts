// common/prepareHeaders.ts
import type { FetchArgs, FetchBaseQueryArgs } from '@reduxjs/toolkit/query';
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react';

export const prepareHeaders = (headers: Headers) => {
  headers.set('Accept', 'application/json');

  const lang = localStorage.getItem('lang') || 'ar';
  headers.set('Lang', lang);
  headers.set('accept-language', lang);

  const token = localStorage.getItem('HrSystem') || '';
  headers.set('Authorization', `Bearer ${token}`);

  const company = localStorage.getItem('X-Company') || 'default_company';
  headers.set('X-Company', company);

  return headers;
};
