'use client';

import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import { Terminal, X } from 'lucide-react';
export default function AlertComponent() {
  const [showAlert, setShowAlert] = useState(true);

  function hideAlert() {
    setShowAlert(false);
  }
  return showAlert ? (
    <div className="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-full relative">
      <Alert className="w-80 relative">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>We fully support Markdown!</AlertDescription>
        <div
          onClick={hideAlert}
          className="absolute top-1 right-1 ml-auto justify-center items-center cursor-pointer"
        >
          <X className="h-4 w-4" />
        </div>
      </Alert>
    </div>
  ) : null;
}
