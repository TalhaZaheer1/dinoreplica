"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface SubscribeButtonProps {
  userEmail?: string | null;
}

export function SubscribeButton({ userEmail }: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailOption, setEmailOption] = useState<'default' | 'custom'>(userEmail ? 'default' : 'custom');
  const [customEmail, setCustomEmail] = useState('');

  const handleSubscribe = async () => {
    const emailToSubscribe = emailOption === 'default' ? userEmail : customEmail;

    if (!emailToSubscribe) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/mailing-list/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailToSubscribe }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setOpen(false);
        setCustomEmail('');
      } else {
        alert(data.error || "Failed to subscribe");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="hidden bg-primary md:flex gap-2"
        >
          <Mail className="h-4 w-4" />
          Subscribe to Mailing List
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to our Mailing List</DialogTitle>
          <DialogDescription>
            Receive updates and special offers directly to your inbox.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {userEmail && (
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="default-email"
                name="email-option"
                value="default"
                checked={emailOption === 'default'}
                onChange={() => setEmailOption('default')}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="default-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Use registered email: <span className="text-muted-foreground">{userEmail}</span>
              </label>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="custom-email"
              name="email-option"
              value="custom"
              checked={emailOption === 'custom'}
              onChange={() => setEmailOption('custom')}
              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="custom-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Use a different email
            </label>
          </div>
          {emailOption === 'custom' && (
            <div className="ml-6">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                required
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubscribe} disabled={loading} className="w-full">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Subscribe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
