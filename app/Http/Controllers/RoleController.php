<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('Roles/Index', [
            'roles' => Role::with('permissions:id,name')
                ->select('id', 'name', 'created_at')
                ->latest()
                ->paginate(10)
                ->withQueryString(),
            'permissions' => Permission::select('id', 'name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Roles/Create', [
            'permissions' => Permission::select('id', 'name')->get()
        ]);
    }

    public function store(StoreRoleRequest $request)
    {
        $role = Role::create([
            ...$request->validated(),
            'guard_name' => 'web',
        ]);

        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('roles.index')
            ->with('message', 'Role created successfully');
    }
public function edit(Role $role)
{
    $role->load('permissions:id,name');

    return Inertia::render('Roles/Edit', [
        'role' => [
            'id' => $role->id,
            'name' => $role->name,
            'guard_name' => $role->guard_name,
            'permissions' => $role->permissions->pluck('id'),
        ],
        'permissions' => Permission::select('id', 'name')->get(),
    ]);
}
    public function update(UpdateRoleRequest $request, Role $role)
    {
        if ($role->name === 'admin') {
            return back()->with('error', 'Cannot modify admin role');
        }

        $role->update([
            ...$request->validated(),
            'guard_name' => 'web',
        ]);

        $role->syncPermissions($request->permissions ?? []);

        return redirect()->route('roles.index')
            ->with('message', 'Role updated successfully.');
    }
    public function destroy(Role $role)
    {
        if ($role->name === 'admin') {
            return back()->with('error', 'Cannot delete admin role');
        }

        if ($role->users()->count() > 0) {
            return back()->with('error', 'Role is assigned to users');
        }

        $role->delete();

        return back()->with('message', 'Role deleted successfully.');
    }
}
