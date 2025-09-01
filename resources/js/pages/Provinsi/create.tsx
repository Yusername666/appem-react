// ================================================
// File: pages/Provinsi/create.tsx
// PENTING: File ini HANYA berisi form component, TANPA layout apapun
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useForm } from '@inertiajs/react';

interface CreateProvinsiFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function CreateProvinsiForm({ onSuccess, onCancel }: CreateProvinsiFormProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        kode_provinsi: '',
        nama_provinsi: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('provinsi.store'), {
            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    const handleCancel = () => {
        reset();
        onCancel?.();
    };

    return (
        <div className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Alert for form errors */}
                {Object.keys(errors).length > 0 && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertTitle className="text-sm font-medium">Error: Data tidak boleh kosong</AlertTitle>
                        <AlertDescription className="text-sm">
                            Silakan periksa kembali form yang telah diisi.
                        </AlertDescription>
                    </Alert>
                )}

                {/* Kode Wilayah Provinsi */}
                <div className="space-y-2">
                    <Label htmlFor="kode_provinsi" className="text-sm font-medium">
                        Kode Wilayah Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="kode_provinsi"
                        placeholder="Contoh: 11, 12, 13"
                        value={data.kode_provinsi}
                        onChange={(e) => setData('kode_provinsi', e.target.value)}
                        className="w-full"
                    />
                    {errors.kode_provinsi && (
                        <p className="text-sm text-red-600">{errors.kode_provinsi}</p>
                    )}
                    <p className="text-xs text-gray-500">
                        Masukkan kode provinsi sesuai dengan pengkodean BPS
                    </p>
                </div>

                {/* Nama Wilayah Provinsi */}
                <div className="space-y-2">
                    <Label htmlFor="nama_provinsi" className="text-sm font-medium">
                        Nama Wilayah Provinsi <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="nama_provinsi"
                        placeholder="Contoh: Aceh, Sumatera Utara"
                        value={data.nama_provinsi}
                        onChange={(e) => setData('nama_provinsi', e.target.value)}
                        className="w-full"
                    />
                    {errors.nama_provinsi && (
                        <p className="text-sm text-red-600">{errors.nama_provinsi}</p>
                    )}
                    <p className="text-xs text-gray-500">
                        Masukkan nama lengkap provinsi
                    </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="px-4 py-2"
                        disabled={processing}
                    >
                        Batal
                    </Button>
                    <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={processing}
                    >
                        {processing ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </div>
            </form>
        </div>
    );
}
