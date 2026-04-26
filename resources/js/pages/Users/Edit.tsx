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
import {
    ArrowLeft,
    Save,
    User,
    AlertCircle,
    Eye,
    EyeOff,
    Shield,
} from 'lucide-react';
import usersRoute from '@/routes/users';
import { useState } from 'react';

interface Role {
    id: number;
    name: string;
}

interface EditProps {
    user: {
        id: number;
        name: string;
        email: string;
        is_active: boolean;
        roles: Role[]; // This is an array of role objects from the backend
    };
    roles?: Role[];
}

export default function Edit({ user, roles = [] }: EditProps) {
    const [showPassword, setShowPassword] = useState(false);

    // Extract role IDs from user.roles (which are role objects)
    const userRoleIds = user.roles?.map((role: Role) => role.id) || [];

    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        is_active: Boolean(user.is_active),
        roles: userRoleIds, // Now using the extracted IDs
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/users/${user.id}`);
    };

    const toggleRole = (roleId: number) => {
        if (data.roles.includes(roleId)) {
            setData(
                'roles',
                data.roles.filter((id) => id !== roleId),
            );
        } else {
            setData('roles', [...data.roles, roleId]);
        }
    };

    const selectAllRoles = () => {
        if (data.roles.length === roles.length) {
            setData('roles', []);
        } else {
            setData(
                'roles',
                roles.map((r) => r.id),
            );
        }
    };

    const hasRoles = roles && roles.length > 0;

    return (
        <>
            <Head title="Edit User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Link href={usersRoute.index().url}>
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Users
                        </Button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-primary/10 p-2">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Edit User</CardTitle>
                                    <CardDescription>
                                        Update user account information and role
                                        assignments.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Full Name{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter full name"
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
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email Address{' '}
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter email address"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        required
                                        className={
                                            errors.email
                                                ? 'border-red-500 pr-10 focus-visible:ring-red-500'
                                                : ''
                                        }
                                        aria-invalid={!!errors.email}
                                        aria-describedby={
                                            errors.email
                                                ? 'email-error'
                                                : undefined
                                        }
                                    />
                                    {errors.email && (
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <AlertCircle className="h-4 w-4 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.email && (
                                    <p
                                        id="email-error"
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password Field - Optional in edit */}
                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    New Password{' '}
                                    <span className="text-xs text-muted-foreground">
                                        (Optional)
                                    </span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        placeholder="Leave blank to keep current password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        className={
                                            errors.password
                                                ? 'border-red-500 pr-10 focus-visible:ring-red-500'
                                                : ''
                                        }
                                        aria-invalid={!!errors.password}
                                        aria-describedby={
                                            errors.password
                                                ? 'password-error'
                                                : undefined
                                        }
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p
                                        id="password-error"
                                        className="mt-1 flex items-center gap-1 text-sm text-red-500"
                                    >
                                        <AlertCircle className="h-3 w-3" />
                                        {errors.password}
                                    </p>
                                )}
                                <p className="text-xs text-muted-foreground">
                                    Leave password blank to keep the current
                                    password.
                                </p>
                            </div>

                            {/* Confirm Password Field - Optional in edit */}
                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                'password_confirmation',
                                                e.target.value,
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            {/* Status Field */}
                            <div className="space-y-2">
                                <Label>Account Status</Label>
                                <div className="flex gap-4">
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="radio"
                                            name="is_active"
                                            value="active"
                                            checked={data.is_active === true}
                                            onChange={() =>
                                                setData('is_active', true)
                                            }
                                            className="h-4 w-4"
                                        />
                                        <span className="text-sm">Active</span>
                                    </label>
                                    <label className="flex cursor-pointer items-center gap-2">
                                        <input
                                            type="radio"
                                            name="is_active"
                                            value="inactive"
                                            checked={data.is_active === false}
                                            onChange={() =>
                                                setData('is_active', false)
                                            }
                                            className="h-4 w-4"
                                        />
                                        <span className="text-sm">
                                            Inactive
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Roles Section */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-semibold">
                                        Assign Roles
                                    </Label>
                                    {hasRoles && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={selectAllRoles}
                                        >
                                            {data.roles.length === roles.length
                                                ? 'Deselect All'
                                                : 'Select All'}
                                        </Button>
                                    )}
                                </div>

                                {hasRoles ? (
                                    <div className="max-h-64 overflow-y-auto rounded-lg border p-4">
                                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                            {roles.map((role) => {
                                                const isChecked =
                                                    data.roles.includes(
                                                        role.id,
                                                    );
                                                return (
                                                    <label
                                                        key={role.id}
                                                        className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 transition-all ${
                                                            isChecked
                                                                ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                                                : 'border-muted hover:bg-muted/50'
                                                        }`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={isChecked}
                                                            onChange={() =>
                                                                toggleRole(
                                                                    role.id,
                                                                )
                                                            }
                                                            className="hidden"
                                                        />
                                                        <div
                                                            className={`flex h-5 w-5 items-center justify-center rounded border-2 transition-all ${
                                                                isChecked
                                                                    ? 'border-primary bg-black dark:bg-white'
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
                                                            {role.name}
                                                        </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center dark:border-yellow-900 dark:bg-yellow-950/20">
                                        <Shield className="mx-auto h-10 w-10 text-yellow-600 dark:text-yellow-400" />
                                        <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-400">
                                            No roles available
                                        </p>
                                        <p className="mt-1 text-xs text-yellow-700 dark:text-yellow-500">
                                            Please create roles first before
                                            assigning them to users.
                                        </p>
                                        <Link
                                            href="/roles/create"
                                            className="mt-3 inline-block"
                                        >
                                            <Button variant="outline" size="sm">
                                                Create Role
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {errors.roles && (
                                    <p className="text-sm text-red-500">
                                        <AlertCircle className="mr-1 inline h-3 w-3" />
                                        {errors.roles}
                                    </p>
                                )}
                            </div>

                            {/* Current Roles Display */}
                            {userRoleIds.length > 0 && (
                                <div className="rounded-lg bg-muted/30 p-4">
                                    <h4 className="mb-3 text-sm font-semibold">
                                        Current Roles
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {user.roles.map((role) => (
                                            <span
                                                key={role.id}
                                                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="rounded-lg bg-muted/50 p-4">
                                <h4 className="mb-3 text-sm font-semibold">
                                    User Update Tips:
                                </h4>
                                <ul className="space-y-1 text-xs text-muted-foreground">
                                    <li>
                                        • Leave password blank to keep the
                                        current password
                                    </li>
                                    <li>
                                        • Inactive users cannot log into the
                                        system
                                    </li>
                                    <li>
                                        • Roles control what permissions a user
                                        has
                                    </li>
                                    <li>• Changes take effect immediately</li>
                                </ul>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-3">
                            <Link href={usersRoute.index().url}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Updating...' : 'Update User'}
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
        { title: 'Users', href: usersRoute.index().url },
        { title: 'Edit User', href: '' },
    ],
};
