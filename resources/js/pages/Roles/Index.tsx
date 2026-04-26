import { Head, Link, router } from '@inertiajs/react';
import rolesRoute from '@/routes/roles';
import { Button } from '@/components/ui/button';
import { Plus, Shield, Trash2, Edit } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface Permission {
    id: number;
    name: string;
}

interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions?: Permission[];
}

interface Pagination<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface RoleProps {
    roles: Pagination<Role>;
}

export default function Index({ roles }: RoleProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (role: Role) => {
        if (role.name === 'admin') {
            alert('Cannot delete admin role');
            return;
        }
        setSelectedRole(role);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedRole) {
            setIsDeleting(true);
            router.delete(`/roles/${selectedRole.id}`, {
                onFinish: () => {
                    setIsDeleting(false);
                    setDeleteDialogOpen(false);
                    setSelectedRole(null);
                },
            });
        }
    };

    return (
        <>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Roles
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage user roles and permissions
                        </p>
                    </div>
                    <Link href="/roles/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Role
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Role Name</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles?.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-64 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <Shield
                                                className="h-16 w-16 text-muted-foreground/50"
                                                strokeWidth={1.5}
                                            />
                                            <div className="space-y-1 text-center">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    No roles found
                                                </p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Create your first role to
                                                    get started
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                roles?.data.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell className="font-medium">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    role.name === 'admin'
                                                        ? 'border-green-500 text-green-600 dark:border-green-400 dark:text-green-400'
                                                        : ''
                                                }
                                            >
                                                {role.name}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions &&
                                                role.permissions.length > 0 ? (
                                                    <>
                                                        {role.permissions
                                                            .slice(0, 3)
                                                            .map(
                                                                (
                                                                    permission,
                                                                ) => (
                                                                    <Badge
                                                                        key={
                                                                            permission.id
                                                                        }
                                                                        variant="secondary"
                                                                        className="text-xs"
                                                                    >
                                                                        {
                                                                            permission.name
                                                                        }
                                                                    </Badge>
                                                                ),
                                                            )}
                                                        {role.permissions
                                                            .length > 3 && (
                                                            <Badge
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                +
                                                                {role
                                                                    .permissions
                                                                    .length -
                                                                    3}{' '}
                                                                more
                                                            </Badge>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        No permissions assigned
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                role.created_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/roles/${role.id}/edit`}
                                                >
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                    >
                                                        <Edit className="mr-1 h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() =>
                                                        handleDeleteClick(role)
                                                    }
                                                >
                                                    <Trash2 className="mr-1 h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {roles?.last_page > 1 && (
                    <div className="mt-4 flex items-center justify-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const page = roles.current_page - 1;
                                if (page >= 1) {
                                    router.get(`/roles?page=${page}`);
                                }
                            }}
                            disabled={roles.current_page === 1}
                        >
                            Previous
                        </Button>

                        <div className="flex gap-1">
                            {Array.from(
                                { length: Math.min(5, roles.last_page) },
                                (_, i) => {
                                    let pageNum;
                                    if (roles.last_page <= 5) {
                                        pageNum = i + 1;
                                    } else if (roles.current_page <= 3) {
                                        pageNum = i + 1;
                                    } else if (
                                        roles.current_page >=
                                        roles.last_page - 2
                                    ) {
                                        pageNum = roles.last_page - 4 + i;
                                    } else {
                                        pageNum = roles.current_page - 2 + i;
                                    }

                                    return (
                                        <Button
                                            key={pageNum}
                                            variant={
                                                pageNum === roles.current_page
                                                    ? 'default'
                                                    : 'outline'
                                            }
                                            size="sm"
                                            onClick={() =>
                                                router.get(
                                                    `/roles?page=${pageNum}`,
                                                )
                                            }
                                        >
                                            {pageNum}
                                        </Button>
                                    );
                                },
                            )}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                const page = roles.current_page + 1;
                                if (page <= roles.last_page) {
                                    router.get(`/roles?page=${page}`);
                                }
                            }}
                            disabled={roles.current_page === roles.last_page}
                        >
                            Next
                        </Button>
                    </div>
                )}
            </div>

            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-red-500" />
                            Delete Role
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the role{' '}
                            <span className="font-semibold text-red-600 dark:text-red-400">
                                "{selectedRole?.name}"
                            </span>
                            ?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                            This action cannot be undone. Any users with this
                            role will lose these permissions.
                        </p>
                        {selectedRole?.permissions &&
                            selectedRole.permissions.length > 0 && (
                                <div className="mt-3 rounded-md bg-yellow-50 p-3 dark:bg-yellow-950/20">
                                    <p className="text-xs text-yellow-800 dark:text-yellow-400">
                                        This role has{' '}
                                        {selectedRole.permissions.length}{' '}
                                        permission(s) assigned.
                                    </p>
                                </div>
                            )}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Deleting...
                                </>
                            ) : (
                                'Delete Role'
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Roles',
            href: rolesRoute.index().url,
        },
    ],
};
