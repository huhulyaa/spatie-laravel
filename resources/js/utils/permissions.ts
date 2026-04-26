// utils/permissions.ts

export function hasRole(user: any, role: string) {
    return user?.roles?.some((r: any) => r.name === role);
}

export function hasPermission(user: any, permission: string) {
    return user?.roles?.some((role: any) =>
        role?.permissions?.some((p: any) => p.name === permission)
    );
}
