'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/column-header';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TanggalIndo } from '@/utils/dateFormat';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Copy, MoreHorizontal, Pencil, Trash } from 'lucide-react';
import { useState, useCallback } from 'react';

export type Menu = {
    id: string;
    name: string;
    created_at: string;
};

export const columns: ColumnDef<Menu>[] = [
    {
        accessorKey: 'id',
        header: ({ column }) => <DataTableColumnHeader column={column} title="id" />,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title="name" />,
    },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader column={column} title="Tanggal Buat" />,
        cell: ({ row }) => TanggalIndo(row.getValue('created_at')),
    },
    {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        enableHiding: false,
        header: () => "Kelola",
        cell: ({ row }) => {
            const menu = row.original;
            const [open, setOpen] = useState(false);
            const [isDropdownOpen, setIsDropdownOpen] = useState(false);

            // Handle delete dengan callback yang lebih explicit
            const handleDelete = useCallback(() => {
                setOpen(false); // Pastikan dialog tertutup dulu
                router.delete(`/admin/menu/${menu.id}`, {
                    preserveScroll: true,
                    replace: true,
                    preserveState: false,
                });
            }, [menu.id]);

            // Handle cancel dengan explicit state reset
            const handleCancel = useCallback(() => {
                setOpen(false);
            }, []);

            // Handle copy ID
            const handleCopyId = useCallback(async () => {
                try {
                    await navigator.clipboard.writeText(menu.id);
                    setIsDropdownOpen(false);
                } catch (error) {
                    console.error('Failed to copy ID:', error);
                }
            }, [menu.id]);

            // Handle edit
            const handleEdit = useCallback(() => {
                setIsDropdownOpen(false);
                router.visit(`/admin/menu/${menu.id}/edit`);
            }, [menu.id]);

            // Handle delete button click
            const handleDeleteClick = useCallback(() => {
                setIsDropdownOpen(false);
                setOpen(true);
            }, []);

            return (
                <>
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={handleCopyId}>
                                <Copy />
                                Copy Menu ID
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleEdit}>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleDeleteClick}>
                                <Trash className="text-red-500" />
                                <span className="text-red-500 hover:text-red-500">Hapus</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        <AlertDialogContent className="sm:max-w-md">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Data menu <strong>"{menu.name}"</strong> akan dihapus secara permanen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
                                <AlertDialogCancel onClick={handleCancel}>
                                    Batal
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    className="bg-red-600 hover:bg-red-700 focus:ring-red-600" 
                                    onClick={handleDelete}
                                >
                                    Ya, Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            );
        },
    },
];