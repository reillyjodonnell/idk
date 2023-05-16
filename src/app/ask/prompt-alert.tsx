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
      <Alert className="w-80 mb-6">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="">Heads up!</AlertTitle>
        <AlertDescription>{`Don't forget to tag the post 😎`}</AlertDescription>
      </Alert>
    </div>
  ) : null;
}
