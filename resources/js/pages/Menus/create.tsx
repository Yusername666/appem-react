// Example usage in your menu form
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ComboBoxResponsive, type ComboBoxOption } from '@/components/ui/combo-box-responsive';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon} from "lucide-react"
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create a New Menu',
        href: '',
    },
];

// Define your custom options
const menuStatusOptions: ComboBoxOption[] = [
    { 
        value: "1", 
        label: "Tersedia",
    },
    { 
        value: "0", 
        label: "Tidak Tersedia",
    },
];

// Custom render for status options
const renderStatusOption = (option: ComboBoxOption) => (
    <div className="flex items-center gap-2 w-full">
        <div className= {`w-2 h-2 rounded-full ${option.value === "1" ? "bg-green-500" : "bg-red-500"}`}></div>
        <span>{option.label}</span>
    </div>
);

const renderSelectedStatus = (option: ComboBoxOption | null) => {
    if (!option) return <span className="text-muted-foreground">Pilih status...</span>;
    
    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${option.value === "1" ? "bg-green-500" : "bg-red-500"}`}></div>
            <span>{option.label}</span>
        </div>
    );
};

const menuCategoryOptions: ComboBoxOption[] = [
    { value: "makanan", label: "Makanan Utama" },
    { value: "appetizer", label: "Appetizer" },
    { value: "dessert", label: "Dessert" },
    { value: "minuman", label: "Minuman" },
    { value: "snack", label: "Snack" },
    { value: "salad", label: "Salad" },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        category: '',
        is_available: '1',
    });

    const [priceDisplay, setPriceDisplay] = useState('');

    const formatRupiah = (value: string) => {
        const numericValue = value.replace(/\D/g, '');
        if (numericValue === '') return '';
        const formatted = new Intl.NumberFormat('id-ID').format(parseInt(numericValue));
        return `Rp ${formatted}`;
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numericValue = inputValue.replace(/\D/g, '');
        setData('price', numericValue);
        setPriceDisplay(formatRupiah(numericValue));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('menus.store'), {
            onSuccess: () => {
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    is_available: '1',
                });
                setPriceDisplay('');
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create a New Menu" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-full mx-auto w-full px-4 sm:px-0">
                    <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tambah Menu Baru</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Lengkapi informasi menu yang akan ditambahkan
                            </p>
                        </div>


                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* alert submit form */}
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive" className="bg-red-100/90 border-l-4 border-red-500 text-red-700 mb-4">
                                    <AlertCircleIcon className="h-5 w-5" />
                                    <AlertTitle>Error: Data tidak boleh kosong</AlertTitle>
                                    <AlertDescription>
                                        Silakan periksa kembali form yang telah diisi.
                                    </AlertDescription>
                                </Alert>
                            )}
                            {/* Nama Menu */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">
                                    Nama Menu *
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Masukan nama menu..."
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                                )}
                            </div>

                            {/* Deskripsi Menu */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-sm font-medium text-gray-900 dark:text-white">
                                    Deskripsi Menu
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Masukan deskripsi menu..."
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full min-h-[100px] resize-none bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                                )}
                            </div>

                            {/* Grid untuk Price dan Category */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Harga Menu */}
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-sm font-medium text-gray-900 dark:text-white">
                                        Harga Menu *
                                    </Label>
                                    <Input
                                        id="price"
                                        placeholder="Rp 0"
                                        value={priceDisplay}
                                        onChange={handlePriceChange}
                                        className="w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                    />
                                    {errors.price && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.price}</p>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Masukkan harga dalam rupiah
                                    </p>
                                </div>

                                {/* Kategori Menu - Using ComboBox */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                        Kategori Menu *
                                    </Label>
                                    <ComboBoxResponsive
                                        options={menuCategoryOptions}
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                        placeholder="Pilih kategori menu..."
                                        searchPlaceholder="Cari kategori..."
                                        emptyMessage="Kategori tidak ditemukan."
                                        buttonClassName="w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                    />
                                    {errors.category && (
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.category}</p>
                                    )}
                                </div>
                            </div>

                            {/* Status Menu - Using ComboBox with Custom Render */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-900 dark:text-white">
                                    Status Menu *
                                </Label>
                                <ComboBoxResponsive
                                    options={menuStatusOptions}
                                    value={data.is_available}
                                    onValueChange={(value) => setData('is_available', value)}
                                    placeholder="Pilih status menu..."
                                    searchPlaceholder="Cari status..."
                                    emptyMessage="Status tidak ditemukan."
                                    buttonClassName="w-full bg-neutral text-black dark:bg-zinc-950 dark:text-white"
                                    renderOption={renderStatusOption}
                                    renderSelectedValue={renderSelectedStatus}
                                />
                                {errors.is_available && (
                                    <p className="text-sm text-red-600 dark:text-red-400">{errors.is_available}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
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