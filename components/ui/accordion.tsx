"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
))
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("border-b", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & {
        isOpen?: boolean;
        onToggle?: () => void
    }
>(({ className, children, isOpen, onToggle, ...props }, ref) => (
    <div className="flex">
        <button
            ref={ref}
            onClick={onToggle}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline text-left",
                isOpen && "underline",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown
                className={cn(
                    "h-4 w-4 shrink-0 transition-transform duration-200",
                    isOpen && "rotate-180"
                )}
            />
        </button>
    </div>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { isOpen?: boolean }
>(({ className, children, isOpen, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "overflow-hidden text-sm transition-all duration-300 ease-in-out",
            isOpen ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0",
            className
        )}
        {...props}
    >
        <div className="pt-0">{children}</div>
    </div>
))
AccordionContent.displayName = "AccordionContent"

/* Simple compound component wrapper for standard usage */
export function SimpleAccordion({ items }: { items: { id: string, title: string, content: string }[] }) {
    const [openItem, setOpenItem] = React.useState<string | null>(null);

    return (
        <Accordion className="w-full">
            {items.map((item) => (
                <AccordionItem key={item.id}>
                    <AccordionTrigger
                        isOpen={openItem === item.id}
                        onToggle={() => setOpenItem(openItem === item.id ? null : item.id)}
                    >
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent isOpen={openItem === item.id}>
                        {item.content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
