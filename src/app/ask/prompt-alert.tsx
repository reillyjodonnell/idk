'use client';
import { Alert, AlertDescription, AlertTitle } from '@/components/alert';
import { Terminal, X } from 'lucide-react';
import { useState } from 'react';

export default function PromptAlert() {
  const [showAlert, setShowAlert] = useState(true);

  return showAlert ? (
    <div className="relative w-fit">
      <X
        onClick={() => setShowAlert(false)}
        className="h-4 w-4 absolute right-1 top-1 cursor-pointer  z-10"
      />
      <Alert className="w-fit mb-6">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>We fully support Mardown 😎</AlertDescription>
      </Alert>
    </div>
  ) : null;
}
