"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    // Simple client-side submission handler
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // In a real app, send to /api/inquiries or /api/contact
        console.log("Form Submitted:", data);

        setSubmitted(true);
    }

    return (
        <div className="container mx-auto py-12 px-4 space-y-16">
            <section className="text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary uppercase tracking-tight">Contact Us</h1>
                <p className="text-xl text-muted-foreground">
                    Get in touch with Karl Walker for quotes, custom orders, and general inquiries.
                </p>
            </section>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="bg-primary/5 p-8 rounded-3xl space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full text-primary shadow-sm">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display mb-2">Dinosaur Resin Replica</h3>
                                <div className="text-muted-foreground leading-relaxed">
                                    <p className="font-bold text-foreground">Karl Walker</p>
                                    <p>6308 Garwin Dr.</p>
                                    <p>Fort Worth, Texas 76132</p>
                                    <p>USA</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full text-primary shadow-sm">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display mb-2">Phone & Text</h3>
                                <div className="text-muted-foreground">
                                    <p><span className="font-medium text-foreground">Call:</span> 817-703-1619 (USA)</p>
                                    <p><span className="font-medium text-foreground">TXT:</span> 817-703-1619</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full text-primary shadow-sm">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display mb-2">Email</h3>
                                <p className="text-muted-foreground">
                                    <a href="mailto:dinosaurresinreplica@gmail.com" className="hover:underline text-accent font-medium">
                                        dinosaurresinreplica@gmail.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Embed */}
                    <div className="h-[300px] bg-stone-100 rounded-3xl w-full border border-stone-200 overflow-hidden shadow-sm relative">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3358.397063673436!2d-97.41162492350634!3d32.67540209939529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e6da206105555%3A0x864e6da206105555!2s6308%20Garwin%20Dr%2C%20Fort%20Worth%2C%20TX%2076132!5e0!3m2!1sen!2sus!4v1709123456789!5m2!1sen!2sus"
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Google Maps"
                        ></iframe>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm">
                    <h2 className="text-2xl font-bold font-display mb-6">Send a Message</h2>
                    {submitted ? (
                        <div className="text-center py-20 space-y-4 animate-in fade-in zoom-in">
                            <div className="inline-flex items-center justify-center p-4 bg-green-100 text-green-600 rounded-full">
                                <MessageSquare className="h-8 w-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
                            <p className="text-muted-foreground">Thank you for contacting us. We will get back to you shortly.</p>
                            <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-4">
                                Send Another
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="userName" className="text-sm font-medium">Name</label>
                                    <input name="userName" id="userName" required className="w-full flex h-12 rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50" placeholder="Your Name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="userEmail" className="text-sm font-medium">Email</label>
                                    <input name="userEmail" id="userEmail" type="email" required className="w-full flex h-12 rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all placeholder:text-muted-foreground/50" placeholder="your@email.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <select name="subject" id="subject" className="w-full flex h-12 rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all">
                                    <option>Quote Request</option>
                                    <option>Custom Order Inquiry</option>
                                    <option>Shipping Question</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea name="message" id="message" required rows={6} className="w-full flex rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all resize-none placeholder:text-muted-foreground/50" placeholder="How can we help you?" />
                            </div>
                            <Button type="submit" size="lg" className="w-full rounded-full text-lg shadow-md hover:shadow-lg">Send Message</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
