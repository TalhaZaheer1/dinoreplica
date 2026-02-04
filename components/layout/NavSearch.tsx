"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
            // Optional: Blur input on submit if desired
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className={cn(
                "relative transition-all duration-300 ease-in-out",
                isFocused ? "w-64" : "w-10 md:w-48"
            )}
        >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
                type="search"
                placeholder="Search catalog..."
                className={cn(
                    "w-full h-10 rounded-full border border-input bg-background/50 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-muted-foreground",
                    "focus:bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary/50",
                    !isFocused && "cursor-pointer md:cursor-text bg-transparent border-transparent md:border-input md:bg-background/50"
                )}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </form>
    );
}

export function NavSearch() {
    return (
        <Suspense fallback={<div className="w-10 h-10" />}>
            <SearchBar />
        </Suspense>
    );
}
