import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ComboBoxResponsive, type  ComboBoxOption } from '@/components/ui/combo-box-responsive';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Regions',
        href: '',
    },
];

// Define your custom options
const statusOptions: ComboBoxOption[] = [
    { 
        value: "0", 
        label: "Aktif",
    },
    { 
        value: "1", 
        label: "Tidak Aktif",
    },
];

// Custom render for status options
const renderStatusOption = (option: ComboBoxOption) => (
    <div className="flex items-center gap-2 w-full">
        <div className= {`w-2 h-2 rounded-full ${option.value === "0" ? "bg-green-500" : "bg-red-500"}`}></div>
        <span>{option.label}</span>
    </div>
);

const renderSelectedStatus = (option: ComboBoxOption | null) => {
    if (!option) return <span className="text-muted-foreground">Pilih status...</span>;
    
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${option.value === "0" ? "bg-green-500" : "bg-red-500"}`}></div>
            <span>{option.label}</span>
        </div>
    );
};

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        kd_kecamatan: '',
        kd_kelurahan: '',
        nama_kelurahan: '',
        status: '0', // 0 = aktif, 1 = tidak aktif
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('regions.store'), {
            onSuccess: () => {
                setData({
                    kd_kecamatan: '',
                    kd_kelurahan: '',
                    nama_kelurahan: '',
                    status: '0', // Reset to default value
                });
            }
        });
    };  
    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={breadcrumbs[0].title} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border p-6">
                    <div className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-full mx-auto w-full px-4 sm:px-0">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Kelurahan Baru</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Lengkapi informasi master kelurahan yang akan ditambahkan
                            </p>
                        </div>
                        <form onSubmit={handleSubmit} className='space-y-6'>  
                            {/* Kode Kecamatan */}
                            {/* <div className="space-y-2">
                                <Label htmlFor="kd_kecamatan" className="text-sm font-medium text-gray-900 dark:text-white">
                                    Kode Kecamatan <i className='text-red-600 dark:text-red-400'>*</i>
                                </Label>
                                <ComboBoxResponsive
                                    options={[]}
                                    value={data.kd_kecamatan}
                                    onValueChange={(value) => setData('kd_kecamatan', value)}
                                    placeholder="Pilih kode kecamatan..."
                                    searchPlaceholder="Cari kode kecamatan..."
                                    emptyMessage="Kecamatan tidak ditemukan."
                                    buttonClassName='w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white'
                                    renderOption={(option) => (
                                        <div className="flex items-center gap-2 w-full">
                                            <span className="font-medium">{option.value}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{option.label}</span>
                                        </div>
                                    )}
                                    renderSelectedValue={(option) => (
                                        <span className="text-sm text-gray-900 dark:text-white">
                                            {option ? `${option.value} - ${option.label}` : 'Pilih kode kecamatan...'}
                                        </span>
                                    )}
                                />
                                {errors.kd_kecamatan && (
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                                        {errors.kd_kecamatan}
                                    </p>
                                )}
                            </div> */}
                            {/* Kode Kelurahan */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">
                                    Kode Kelurahan <i className='text-red-600 dark:text-red-400'>*</i>
                                </Label>
                                <Input
                                    id="kd_kelurahan"
                                    placeholder="Masukan kode kelurahan..."
                                    value={data.kd_kelurahan}
                                    onChange={(e) => setData('kd_kelurahan', e.target.value)}
                                    className="w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.kd_kelurahan && (
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                                        {errors.kd_kelurahan}
                                    </p>
                                )}
                            </div>
                            {/* Nama Kelurahan */}
                            <div className="space-y-2">
                                <Label htmlFor="nama_kelurahan" className="text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Kelurahan <i className='text-red-600 dark:text-red-400'>*</i>
                                </Label>
                                <Input
                                    id="nama_kelurahan"
                                    placeholder="Masukan nama kelurahan..."
                                    value={data.nama_kelurahan}
                                    onChange={(e) => setData('nama_kelurahan', e.target.value)}
                                    className="w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.nama_kelurahan && (
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                                        {errors.nama_kelurahan}
                                    </p>
                                )}
                            </div>
                            {/* Status */}
                            <div className="space-y-2">
                                <Label className='text-sm font-medium text-gray-900 dark:text-white'>
                                    Status <i className='text-red-600 dark:text-red-400'>*</i>
                                </Label>
                                <ComboBoxResponsive
                                    options={statusOptions}
                                    value={data.status}
                                    onValueChange={(value) => setData('status', value)}
                                    placeholder="Pilih status..."
                                    searchPlaceholder="Cari status..."
                                    emptyMessage="Status tidak ditemukan."  
                                    buttonClassName='w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white'
                                    renderOption={renderStatusOption}
                                    renderSelectedValue={renderSelectedStatus}
                                />
                                {errors.status && (
                                    <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                                        {errors.status}
                                    </p>
                                )}
                            </div>
                            {/* Submit Button */}
                            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="px-6"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Simpan Menu
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}