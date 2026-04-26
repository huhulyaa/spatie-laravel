import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Key, AlertCircle } from 'lucide-react';
import permissionsRoute from '@/routes/permissions';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
}

interface EditProps {
    permission: Permission;
}

export default function Edit({ permission }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: permission.name,
        guard_name: permission.guard_name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(permissionsRoute.update(permission.id).url);
    };

    return (
        <>
            <Head title="Edit Permission" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href={permissionsRoute.index().url}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Permissions
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <Key className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Edit Permission</CardTitle>
                                    <CardDescription>
                                        Update the permission name. Changes will
                                        affect all roles and users with this
                                        permission. Permission names should use
                                        kebab-case (e.g., "edit-posts",
                                        "delete-users").
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {permission.name === 'admin' && (
                                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/20">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
                                                Protected Permission
                                            </h4>
                                            <p className="text-xs text-yellow-700 dark:text-yellow-500">
                                                The "{permission.name}"
                                                permission is system-critical.
                                                Modifying it may affect core
                                                functionality.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Permission Name{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="e.g., create-posts, edit-users, view-reports"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                        autoFocus
                                        className={
                                            errors.name
                                                ? 'border-red-500 pr-10 focus-visible:ring-red-500'
                                                : ''
                                        }
                                        aria-invalid={!!errors.name}
                                        aria-describedby={
                                            errors.name
                                                ? 'name-error'
                                                : undefined
                                        }
                                    />
                                    {errors.name && (
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.name && (
                                    <p
                                        id="name-error"
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                    >
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="mb-3 text-sm font-semibold">
                                    Permission Naming Tips:
                                </h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>
                                        • Use <strong>kebab-case</strong> (e.g.,
                                        "edit-posts")
                                    </li>
                                    <li>
                                        • Be consistent with naming conventions
                                    </li>
                                    <li>
                                        • Use verbs to describe actions (create,
                                        read, update, delete)
                                    </li>
                                    <li>
                                        • Group related permissions with
                                        prefixes (e.g., "posts-create",
                                        "posts-edit")
                                    </li>
                                    <li>
                                        • Examples: "view-users",
                                        "manage-roles", "assign-permissions"
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                            <Link href={permissionsRoute.index().url}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? 'Updating...'
                                    : 'Update Permission'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Permissions',
            href: permissionsRoute.index().url,
        },
        {
            title: 'Edit Permission',
        },
    ],
};
