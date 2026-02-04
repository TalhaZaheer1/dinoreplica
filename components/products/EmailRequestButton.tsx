"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmailRequestButtonProps {
  productName: string;
  productModel?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export function EmailRequestButton({
  productName,
  productModel,
  className,
  children,
  variant = "default",
  size = "default"
}: EmailRequestButtonProps) {

  const handleEmailClick = () => {
    const email = process.env.NEXT_PUBLIC_EMAIL || "dinocreatures@gmail.com";
    const subject = encodeURIComponent(`Inquiry: ${productName}`);

    const body = `I am interested in: ${productName}${productModel ? ` (Model: ${productModel})` : ''}

Please provide a quote including shipping.

My Details:
Name: 
Phone: 
Email: 
Address: 
`;

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <Button
      onClick={handleEmailClick}
      className={cn(className)}
      variant={variant}
      size={size}
    >
      {children || (
        <>
          <Mail className="mr-2 h-4 w-4" />
          Request Quote
        </>
      )}
    </Button>
  );
}
