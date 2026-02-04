"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

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
                <h1 className="text-4xl md:text-5xl font-bold font-display text-primary">Get in Touch</h1>
                <p className="text-xl text-muted-foreground">
                    We are here to help with quotes, custom orders, and general inquiries.
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
                                <h3 className="text-xl font-bold font-display mb-2">Visit Our Workshop</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    123 Fossil Creek Road<br />
                                    Drumheller, Alberta<br />
                                    Canada, T0J 0Y0
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full text-primary shadow-sm">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display mb-2">Call Us</h3>
                                <p className="text-muted-foreground">
                                    +1 (555) 123-4567<br />
                                    <span className="text-sm opacity-80">Mon-Fri, 9am - 5pm MST</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full text-primary shadow-sm">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold font-display mb-2">Email Us</h3>
                                <p className="text-muted-foreground">
                                    info@dinoreplica.com<br />
                                    sales@dinoreplica.com
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="h-[300px] bg-stone-200 rounded-3xl w-full flex items-center justify-center text-muted-foreground">
                        <div className="text-center">
                            <span className="text-4xl">🗺️</span>
                            <p className="mt-2 text-sm">Interactive Google Map Placeholder</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-card p-8 rounded-3xl border shadow-sm">
                    <h2 className="text-2xl font-bold font-display mb-6">Send us a Message</h2>
                    {submitted ? (
                        <div className="text-center py-20 space-y-4 animate-in fade-in zoom-in">
                            <div className="text-5xl">✅</div>
                            <h3 className="text-2xl font-bold text-primary">Message Sent!</h3>
                            <p className="text-muted-foreground">Thank you for contacting us. We will get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="userName" className="text-sm font-medium">Name</label>
                                    <input name="userName" id="userName" required className="w-full flex h-12 rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="userEmail" className="text-sm font-medium">Email</label>
                                    <input name="userEmail" id="userEmail" type="email" required className="w-full flex h-12 rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                                <select name="subject" id="subject" className="w-full flex h-12 rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all">
                                    <option>General Inquiry</option>
                                    <option>Custom Order Request</option>
                                    <option>Shipping Question</option>
                                    <option>Partnership/Exhibition</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">Message</label>
                                <textarea name="message" id="message" required rows={6} className="w-full flex rounded-xl border bg-background px-3 py-2 text-sm focus:ring-2 ring-primary/20 outline-none transition-all resize-none" />
                            </div>
                            <Button type="submit" size="lg" className="w-full rounded-full text-lg shadow-md hover:shadow-lg">Send Message</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
