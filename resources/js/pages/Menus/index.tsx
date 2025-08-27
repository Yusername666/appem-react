import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { columns } from '@/pages/Menus/colums';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Menus',
        href: '/menus',
    },
];

export default function index() {
    const { menu, flash } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Menus" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Data Menu</h1>
                    <Link href={route('menus.create')}>
                        <Button>Create Menu</Button>
                    </Link>
                </div>
                <div className="flex-1 rounded-xl border border-dashed p-4">
                    <DataTableServer columns={columns} initialData={menu} ></DataTableServer>
                </div>
            </div>
        </AppLayout>
    );
} 
