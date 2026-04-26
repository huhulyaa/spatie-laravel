import { Head, Link, router } from '@inertiajs/react';
import permissionsRoute from '@/routes/permissions';
import { Button } from '@/components/ui/button';
import { Plus, Key, Trash2, AlertTriangle, Edit } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

interface PermissionProps {
    permissions: {
        data: Permission[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
}

export default function Index({ permissions }: PermissionProps) {
    const [selectedPermission, setSelectedPermission] =
        useState<Permission | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (selectedPermission) {
            setIsDeleting(true);
            router.delete(`/permissions/${selectedPermission.id}`, {
                onFinish: () => {
                    setIsDeleting(false);
                    setSelectedPermission(null);
                },
            });
        }
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        router.get(`/permissions?page=${selected + 1}`);
    };

    return (
        <>
            <Head title="Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Permissions
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage user permissions and access controls
                        </p>
                    </div>
                    <Link href="/permissions/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create Permission
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Permission Name</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {permissions?.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="h-64 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <Key
                                                className="h-16 w-16 text-muted-foreground/50"
                                                strokeWidth={1.5}
                                            />
                                            <div className="space-y-1 text-center">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    No permissions found
                                                </p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Create your first permission
                                                    to get started
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                permissions?.data.map((permission) => (
                                    <TableRow key={permission.id}>
                                        <TableCell className="font-medium">
                                            <Badge variant="secondary">
                                                {permission.name}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                permission.created_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/permissions/${permission.id}/edit`}
                                                >
                                                    <Button
                                                        variant="default"
                                                        size="sm"
                                                    >
                                                        <Edit className="mr-1 h-3 w-3" />
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                setSelectedPermission(
                                                                    permission,
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle className="flex items-center gap-2">
                                                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                                                Delete
                                                                Permission
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Are you sure you
                                                                want to delete
                                                                the permission{' '}
                                                                <span className="font-semibold text-red-500 dark:text-red-500">
                                                                    "
                                                                    {
                                                                        permission.name
                                                                    }
                                                                    "
                                                                </span>
                                                                ?
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <p className="text-sm text-muted-foreground">
                                                                This action
                                                                cannot be
                                                                undone. Users
                                                                with this
                                                                permission will
                                                                lose access to
                                                                associated
                                                                features.
                                                            </p>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose
                                                                asChild
                                                            >
                                                                <Button variant="outline">
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>
                                                            <Button
                                                                variant="destructive"
                                                                onClick={
                                                                    handleDelete
                                                                }
                                                                disabled={
                                                                    isDeleting
                                                                }
                                                            >
                                                                {isDeleting ? (
                                                                    <>
                                                                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                                        Deleting...
                                                                    </>
                                                                ) : (
                                                                    'Delete Permission'
                                                                )}
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {permissions?.last_page > 1 && (
                    <div className="mt-4 flex justify-center">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next →"
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={5}
                            pageCount={permissions.last_page}
                            previousLabel="← Previous"
                            renderOnZeroPageCount={null}
                            forcePage={permissions.current_page - 1}
                            containerClassName="flex items-center gap-2"
                            pageClassName="inline-flex"
                            pageLinkClassName="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            previousClassName="inline-flex"
                            previousLinkClassName="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            nextClassName="inline-flex"
                            nextLinkClassName="px-3 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                            breakClassName="inline-flex"
                            breakLinkClassName="px-3 py-2 text-sm font-medium"
                            activeClassName="!bg-primary !text-primary-foreground"
                            disabledClassName="opacity-50 cursor-not-allowed"
                        />
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Permissions',
            href: permissionsRoute.index().url,
        },
    ],
};
