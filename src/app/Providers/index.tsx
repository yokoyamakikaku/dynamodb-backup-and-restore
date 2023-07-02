'use client'

import { FC, PropsWithChildren } from "react";
import { Amplify, I18n } from 'aws-amplify';
import { Authenticator, translations } from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import config from '@/aws-exports'
import Header from './AuthenticatorHeader'

Amplify.configure(config);
I18n.putVocabularies(translations);
I18n.setLanguage('ja');

const client = new QueryClient()

const Providers: FC<PropsWithChildren> =({children}) => {
  return (
    <QueryClientProvider client={client}>
      <Authenticator components={{ Header }}>
        {children}
      </Authenticator>
    </QueryClientProvider>
  )
}

export default Providers
