import { Link, usePage } from '@inertiajs/react';
import {
    UserRound,
    UserRoundPen,
    LockOpen,
    LayoutGrid,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';

import { dashboard } from '@/routes';
import userRoutes from '@/routes/users';
import rolesRoutes from '@/routes/roles';
import permissionRoutes from '@/routes/permissions';

import type { NavItem } from '@/types';
import { hasPermission, hasRole } from '@/utils/permissions';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },

        ...(hasPermission(user, 'handle-users')
            ? [
                  {
                      title: 'Users',
                      href: userRoutes.index().url,
                      icon: UserRound,
                  },
              ]
            : []),

        // ROLES (admin only)
        ...(hasRole(user, 'admin')
            ? [
                  {
                      title: 'Roles',
                      href: rolesRoutes.index().url,
                      icon: UserRoundPen,
                  },
              ]
            : []),

        ...(hasPermission(user, 'view permissions') ||
        hasRole(user, 'admin')
            ? [
                  {
                      title: 'Permissions',
                      href: permissionRoutes.index().url,
                      icon: LockOpen,
                  },
              ]
            : []),
    ];

    const footerNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
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
