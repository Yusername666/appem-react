import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    
    const isActiveParent = (item: NavItem) => {
        if (item.children) {
            return item.children.some((child: { href: string; }) => page.url.startsWith(child.href));
        }
        return page.url.startsWith(item.href);
    };

    const toggleItem = (title: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(title)) {
            newOpenItems.delete(title);
        } else {
            newOpenItems.add(title);
        }
        setOpenItems(newOpenItems);
    };

    // Auto-open items yang memiliki child aktif
    React.useEffect(() => {
        const autoOpenItems = new Set(openItems);
        items.forEach(item => {
            if (item.children && isActiveParent(item)) {
                autoOpenItems.add(item.title);
            }
        });
        setOpenItems(autoOpenItems);
    }, [page.url]);

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isOpen = openItems.has(item.title);
                    
                    // Jika item memiliki children, render sebagai dropdown
                    if (item.children && item.children.length > 0) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton 
                                    onClick={() => toggleItem(item.title)}
                                    tooltip={{ children: item.title }}
                                    isActive={isActiveParent(item)}
                                    className="cursor-pointer"
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                    <ChevronRight 
                                        className={`ml-auto transition-transform duration-200 ${
                                            isOpen ? 'rotate-90' : ''
                                        }`} 
                                    />
                                </SidebarMenuButton>
                                
                                {/* Dropdown Content */}
                                <div 
                                    className={`overflow-hidden transition-all duration-200 ${
                                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                                >
                                    <SidebarMenuSub>
                                        {item.children.map((subItem: NavItem) => (
                                            <SidebarMenuSubItem key={subItem.title} >
                                                <SidebarMenuSubButton 
                                                    asChild 
                                                    isActive={page.url.startsWith(subItem.href)}
                                                >
                                                    <Link href={subItem.href} prefetch>
                                                        {subItem.icon && <subItem.icon />}
                                                        <span>{subItem.title}</span>
                                                    </Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </div>
                            </SidebarMenuItem>
                        );
                    }

                    // Jika item tidak memiliki children, render sebagai item biasa
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton 
                                asChild 
                                isActive={page.url.startsWith(item.href)} 
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
