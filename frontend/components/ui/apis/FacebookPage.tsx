'use client';

import React from 'react';
import { FacebookProvider, Page } from 'react-facebook';

interface FacebookPageEmbedProps {
  appId: string;
  user:string
}

export default function FacebookPageEmbed({ appId, user }: FacebookPageEmbedProps) {
  return (
    <FacebookProvider appId={appId}>
      <div style={{ maxWidth: '200px', margin: '20px auto' }}>
        <h2>Follow Our Facebook Page</h2>
        
        <Page 
          href={`https://www.facebook.com/${user}`} 
          tabs="timeline"             
          width="400"                 
          height="120"                
          smallHeader={false}         
          hideCover={false}           
          showFacepile={true}         
          adaptContainerWidth={true}  
        />
      </div>
    </FacebookProvider>
  );
}