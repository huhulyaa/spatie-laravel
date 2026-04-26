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

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        guard_name: 'web',
        permissions:[] as number[],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(permissionsRoute.store().url);
    };

    return (
        <>
            <Head title="Create Permission" />
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
                                    <CardTitle>Create New Permission</CardTitle>
                                    <CardDescription>
                                        Create a new permission to control
                                        access to specific resources or actions.
                                        Permission names should use kebab-case
                                        (e.g., "edit-posts", "delete-users").
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
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
                                    ? 'Creating...'
                                    : 'Create Permission'}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Permissions',
            href: permissionsRoute.index().url,
        },
        {
            title: 'Create Permission',
            href: '',
        },
    ],
};
