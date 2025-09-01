// File: pages/Provinsi/index.tsx
import { DataTableServer } from '@/components/custom/table/datatable-server';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { CheckCircle2, Plus } from 'lucide-react';
import { useState } from 'react';
import CreateProvinsiForm from '@/pages/Provinsi/create';
import { columns } from '@/pages/Provinsi/columns';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wilayah ⟺ Provinsi',
        href: '/provinsi',
    },
];

export default function Index() {
    const { provinsi, flash } = usePage().props;
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateSuccess = () => {
        setIsCreateModalOpen(false);
        // Optional: Show success toast or refresh table
        // window.location.reload(); // or use more sophisticated state management
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Provinsi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-hidden p-4">
                {flash.success && (
                    <Alert className="border-teal-500 bg-teal-100 dark:bg-teal-950">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Data Provinsi</h1>
                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                        <DialogTrigger asChild>
                            <div className="p-2 rounded-xl backdrop-blur-sm bg-white/30 dark:bg-slate-700/20 border border-slate-300/50 dark:border-slate-600/30 hover:bg-white/50 dark:hover:bg-slate-700/30 transition-all duration-200 hover:scale-110 cursor-pointer group">
                                <Button className="cursor-pointer">
                                    <Plus className="h-4 w-4 text-white dark:text-black group-hover:rotate-90 transition-transform duration-300" />
                                    Tambah Data
                                </Button>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                                    Buat Data Provinsi Baru
                                </DialogTitle>
                                <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                                    Lengkapi informasi data wilayah provinsi sesuai format BPS.
                                </DialogDescription>
                            </DialogHeader>
                            {/* Form langsung tanpa wrapper tambahan */}
                            <CreateProvinsiForm
                                onSuccess={handleCreateSuccess}
                                onCancel={() => setIsCreateModalOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex-1 rounded-xl border border-dashed p-4">
                        <DataTableServer columns={columns} initialData={provinsi} />
                </div>
            </div>
        </AppLayout>
    );
}
