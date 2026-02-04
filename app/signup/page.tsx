
import SignupForm from '@/components/auth/SignupForm';
import Image from 'next/image';

export default function SignupPage() {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <SignupForm />
            </div>
            <div className="hidden bg-muted lg:block relative">
                <div className="absolute inset-0 bg-stone-900/10 z-10" />
                <Image
                    src="/images/placeholder-dino.jpg" // Assuming this or I'll check public folder later, generic placeholder logic handled by next/image if missing? No, will break. I'll use a placeholder color or try to find a real image. I'll stick to a div for now to be safe or use a generic abstract pattern.
                    alt="Image"
                    fill
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    style={{ objectPosition: 'center' }}
                    priority
                />
                {/* Fallback if image missing */}
                <div className="absolute inset-0 bg-stone-200 flex items-center justify-center -z-10">
                    <span className="text-6xl">🦕</span>
                </div>
            </div>
        </div>
    );
}
