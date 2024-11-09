import Link from 'next/link';
import {
    Home,
    PanelLeft} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import { NavItem } from './nav-item';
import { SearchInput } from './search';

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <main className="flex min-h-screen w-full flex-col bg-muted/40">
                <div className="flex flex-col sm:gap-4 sm:py-4">
                    <main className="grid flex-1 items-start gap-2 p-4 sm:px-6 sm:py-0 md:gap-4 bg-muted/40">
                        {children}
                    </main>
                </div>
                <Analytics />
            </main>
        </Providers>
    );
}
