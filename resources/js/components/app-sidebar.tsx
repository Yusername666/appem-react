import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, UsersRound, PackageSearch, Box, Map, ChartCandlestick, FileSearch, Library, BookImage, BookText } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
        children: []
    },
    {
        title: 'Master Data',
        href: '#',
        icon: Box,
        children: 
        [
            {
                title: 'Sektor Ekonomi',
                href: '/Sekonomis',
                icon: PackageSearch,
            },
            {
                title: 'Sektor Investasi',
                href: '/Sinvestasis',
                icon: PackageSearch,
            },
            {
                title: 'Instansi Kab/Kota',
                href: '/OpdKabKotas',
                icon: PackageSearch,
            },
            {
                title: 'Wilayah',
                href: '/wilayahs',
                icon: PackageSearch,
            },
            {
                title: 'Menus',
                href: '/menus',
                icon: PackageSearch,
            },
        ]
    },
    {
        title: 'Laporan Rekap',
        href: '#',
        icon: ChartCandlestick,
        children: 
        [
            {
                title: 'Rekap Data Izin',
                href: '/RekapIzins',
                icon: FileSearch,
            },
            {
                title: 'Rekap Data LKPM',
                href: '/RekapLkpms',
                icon: FileSearch,
            },
        ]
    },
    {
        title: 'Peta Investasi',
        href: '/PetaInvestasis',
        icon: Map,
        children: []
    },
    {
        title: 'Berita & Informasi',
        href: '#',
        icon: Library,
        children: 
        [
            {
                title: 'Katalog Investasi',
                href: '/KatalogInvestasis',
                icon: BookImage,
            },
            {
                title: 'Katalog Informasi',
                href: '/KatalogInformasis',
                icon: BookText,
            },
        ]
    },

];

const footerNavItems: NavItem[] = [
    {
        title: 'Users Management',
        href: '/users',
        icon: UsersRound,
        children: []
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
        
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>
        
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
