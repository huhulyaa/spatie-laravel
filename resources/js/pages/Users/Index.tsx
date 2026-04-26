import { Head, Link, router } from '@inertiajs/react';
import usersRoute from '@/routes/users';
import { Button } from '@/components/ui/button';
import { Plus, UsersRound, Edit, Eye, Trash2 } from 'lucide-react';
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
} from '@/components/ui/dialog';

interface Role {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    is_active?: boolean;
    created_at: string;
    roles?: Role[];
}

interface UserProps {
    user: {
        data: User[];
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

export default function Index({ user }: UserProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (user: User) => {
        setSelectedUser(user);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUser) {
            setIsDeleting(true);
            router.delete(`/users/${selectedUser.id}`, {
                onFinish: () => {
                    setIsDeleting(false);
                    setDeleteDialogOpen(false);
                    setSelectedUser(null);
                },
            });
        }
    };

    const handlePageChange = ({ selected }: { selected: number }) => {
        router.get(`/users?page=${selected + 1}`);
    };

    return (
        <>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            User Accounts
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage and track all users
                        </p>
                    </div>
                    <Link href="/users/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Create User
                        </Button>
                    </Link>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {user?.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-64 text-center"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-4">
                                            <UsersRound
                                                className="h-16 w-16 text-muted-foreground/50"
                                                strokeWidth={1.5}
                                            />
                                            <div className="space-y-1 text-center">
                                                <p className="text-sm font-medium text-muted-foreground">
                                                    No users found
                                                </p>
                                                <p className="text-xs text-muted-foreground/70">
                                                    Create your first user to
                                                    get started
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                user?.data?.map((userItem) => (
                                    <TableRow key={userItem.id}>
                                        <TableCell className="font-medium">
                                            {userItem.name}
                                        </TableCell>
                                        <TableCell>{userItem.email}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {userItem.roles &&
                                                userItem.roles.length > 0 ? (
                                                    userItem.roles
                                                        .slice(0, 2)
                                                        .map((role) => (
                                                            <Badge
                                                                key={role.id}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {role.name}
                                                            </Badge>
                                                        ))
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        No roles
                                                    </span>
                                                )}
                                                {userItem.roles &&
                                                    userItem.roles.length >
                                                        2 && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-xs"
                                                        >
                                                            +
                                                            {userItem.roles
                                                                .length -
                                                                2}{' '}
                                                            more
                                                        </Badge>
                                                    )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    userItem.is_active
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                }
                                            >
                                                {userItem.is_active
                                                    ? 'Active'
                                                    : 'Inactive'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                userItem.created_at,
                                            ).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link
                                                    href={`/users/${userItem.id}/edit`}
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
                                                        handleDeleteClick(
                                                            userItem,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {user?.last_page > 1 && (
                    <div className="mt-4 flex justify-center">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next →"
                            onPageChange={handlePageChange}
                            pageRangeDisplayed={5}
                            pageCount={user.last_page}
                            previousLabel="← Previous"
                            renderOnZeroPageCount={null}
                            forcePage={user.current_page - 1}
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

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <UsersRound className="h-5 w-5 text-red-500" />
                            Delete User
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete the user{' '}
                            <span className="font-semibold text-red-600 dark:text-red-400">
                                "{selectedUser?.name}"
                            </span>
                            ?
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-muted-foreground">
                            This action cannot be undone. The user account will
                            be permanently deleted.
                        </p>
                        {selectedUser?.roles &&
                            selectedUser.roles.length > 0 && (
                                <div className="mt-3 rounded-md bg-yellow-50 p-3 dark:bg-yellow-950/20">
                                    <p className="text-xs text-yellow-800 dark:text-yellow-400">
                                        This user has{' '}
                                        {selectedUser.roles.length} role(s)
                                        assigned.
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
                                'Delete User'
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
            title: 'Users',
            href: usersRoute.index().url,
        },
    ],
};
