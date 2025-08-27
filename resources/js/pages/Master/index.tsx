import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Master Data',
        href: '/masters',
    },
];

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Master Data" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                {Array.from({ length: 3 }).map((_, rowIdx) => (
                    <div key={rowIdx} className="grid auto-rows-min gap-4 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, colIdx) => (
                            <div
                                key={colIdx}
                                className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border"
                            >
                                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
