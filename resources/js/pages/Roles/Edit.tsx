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
import { ArrowLeft, Shield, AlertCircle } from 'lucide-react';
import rolesRoute from '@/routes/roles';

interface Permission {
    id: number;
    name: string;
    guard_name: string;
}

interface EditProps {
    role: {
        id: number;
        name: string;
        guard_name: string;
        permissions: number[];
    };
    permissions?: Permission[];
}

export default function Edit({ role, permissions = [] }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: role.name,
        guard_name: role.guard_name,
        permissions: role.permissions || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/roles/${role.id}`);
    };

    const togglePermission = (permissionId: number) => {
        if (data.permissions.includes(permissionId)) {
            setData(
                'permissions',
                data.permissions.filter((id) => id !== permissionId),
            );
        } else {
            setData('permissions', [...data.permissions, permissionId]);
        }
    };

    const selectAllPermissions = () => {
        if (data.permissions.length === permissions.length) {
            setData('permissions', []);
        } else {
            setData(
                'permissions',
                permissions.map((p) => p.id),
            );
        }
    };

    const hasPermissions = permissions && permissions.length > 0;
    const isProtectedRole = role.name === 'admin' || role.name === 'super-admin';

    return (
        <>
            <Head title="Edit Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href={rolesRoute.index().url}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Roles
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <Shield className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Edit Role</CardTitle>
                                    <CardDescription>
                                        Update the role name and permissions. Role names should
                                        use kebab-case (e.g., "content-manager", "support-agent").
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Protected Role Warning */}
                            {isProtectedRole && (
                                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/20">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="mt-0.5 h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                                        <div>
                                            <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">
                                                Protected Role
                                            </h4>
                                            <p className="text-xs text-yellow-700 dark:text-yellow-500">
                                                The "{role.name}" role is system-critical. Be careful when modifying it.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Role Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Role Name{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="e.g., content-manager, support-agent, editor"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        required
                                        autoFocus
                                        disabled={isProtectedRole}
                                        className={
                                            errors.name
                                                ? 'border-red-500 pr-10 focus-visible:ring-red-500'
                                                : isProtectedRole
                                                ? 'bg-muted cursor-not-allowed'
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
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.name}
                                    </p>
                                )}
                                {isProtectedRole && (
                                    <p className="text-xs text-yellow-600 dark:text-yellow-500">
                                        The "{role.name}" role name cannot be changed.
                                    </p>
                                )}
                            </div>

                            {/* Permissions Section */}
                            {hasPermissions && (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-base font-semibold">
                                            Permissions
                                        </Label>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={selectAllPermissions}
                                        >
                                            {data.permissions.length ===
                                            permissions.length
                                                ? 'Deselect All'
                                                : 'Select All'}
                                        </Button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto rounded-lg border p-4">
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                            {permissions.map(
                                                (permissionItem) => {
                                                    const isChecked =
                                                        data.permissions.includes(
                                                            permissionItem.id,
                                                        );

                                                    return (
                                                        <label
                                                            key={
                                                                permissionItem.id
                                                            }
                                                            className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-all ${
                                                                isChecked
                                                                    ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                                                    : 'border-muted hover:bg-muted/50'
                                                            }`}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={
                                                                    isChecked
                                                                }
                                                                onChange={() =>
                                                                    togglePermission(
                                                                        permissionItem.id,
                                                                    )
                                                                }
                                                                className="hidden"
                                                            />

                                                            <div
                                                                className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                                                                    isChecked
                                                                        ? 'border-black bg-black dark:bg-white'
                                                                        : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-black'
                                                                }`}
                                                            >
                                                                {isChecked && (
                                                                    <svg
                                                                        className="h-3 w-3 text-white dark:text-black"
                                                                        viewBox="0 0 20 20"
                                                                        fill="currentColor"
                                                                    >
                                                                        <path
                                                                            fillRule="evenodd"
                                                                            d="M16.707 5.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                                                                            clipRule="evenodd"
                                                                        />
                                                                    </svg>
                                                                )}
                                                            </div>

                                                            <span className="text-sm font-medium">
                                                                {
                                                                    permissionItem.name
                                                                }
                                                            </span>
                                                        </label>
                                                    );
                                                },
                                            )}
                                        </div>
                                    </div>
                                    {errors.permissions && (
                                        <p className="text-sm text-red-500">
                                            <AlertCircle className="mr-1 inline h-3 w-3" />
                                            {errors.permissions}
                                        </p>
                                    )}
                                </div>
                            )}

                            {(!permissions || permissions.length === 0) && (
                                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-950/20">
                                    <p className="text-sm text-yellow-800 dark:text-yellow-400">
                                        No permissions available. Create some
                                        permissions first.
                                    </p>
                                </div>
                            )}

                            {/* Role Information Section */}
                            <div className="rounded-lg bg-muted/30 p-4">
                                <h4 className="mb-3 text-sm font-semibold">
                                    Role Information
                                </h4>
                                <div className="space-y-2 text-xs text-muted-foreground">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Role ID:</span>
                                        <span>{role.id}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Guard Name:</span>
                                        <code className="rounded bg-muted px-1 py-0.5">
                                            {role.guard_name}
                                        </code>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">Current Permissions:</span>
                                        <span>
                                            {data.permissions.length > 0
                                                ? `${data.permissions.length} permission(s) assigned`
                                                : 'No permissions assigned'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="mb-3 text-sm font-semibold">
                                    Role Naming Tips:
                                </h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>
                                        • Use <strong>kebab-case</strong> (e.g.,
                                        "content-manager")
                                    </li>
                                    <li>
                                        • Be descriptive and consistent with
                                        naming
                                    </li>
                                    <li>
                                        • Common roles: "admin", "manager",
                                        "editor", "viewer"
                                    </li>
                                    <li>
                                        • Use prefixes for department roles
                                        (e.g., "hr-manager", "it-admin")
                                    </li>
                                    <li>
                                        • Examples: "sales-team",
                                        "support-agent", "moderator"
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                            <Link href={rolesRoute.index().url}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing || isProtectedRole}>
                                {processing ? 'Updating...' : 'Update Role'}
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
            title: 'Roles',
            href: rolesRoute.index().url,
        },
        {
            title: 'Edit Role',
            href: '',
        },
    ],
};
