/**
 * Debug Page for Testing Communications Service
 * Use this page to debug email sending issues
 */

import React from 'react';
import CommunicationsTest from '@/components/examples/CommunicationsTest';
import ExpertPanelTest from '@/components/test/ExpertPanelTest';
import { config } from '@/lib/config';

const DebugPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Debug Communications</h1>
        
        {/* Configuration Info */}
        <div className="max-w-2xl mx-auto mb-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Configuration Status</h2>
          <div className="space-y-2 text-sm font-mono">
            <div>
              <strong>Environment:</strong> {config.env}
            </div>
            <div>
              <strong>Communications URL:</strong> {config.functions.communications.url || 'Not configured'}
            </div>
            <div>
              <strong>Communications Key:</strong> {
                config.functions.communications.key 
                  ? `${config.functions.communications.key.substring(0, 12)}...` 
                  : 'Not configured'
              }
            </div>
          </div>
        </div>

        {/* Test Components */}
        <div className="grid gap-8 max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Communications Test</h2>
            <CommunicationsTest />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Expert Panel Test</h2>
            <ExpertPanelTest />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;
