<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePermissionRequest;
use App\Http\Requests\UpdatePermissionRequest;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('Permissions/Index', [
            'permissions' => Permission::select('id', 'name', 'created_at')
                ->latest()
                ->paginate(10)
                ->withQueryString(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Permissions/Create');
    }

    public function store(StorePermissionRequest $request)
    {
       Permission::create([
            ...$request->validated(),
            'guard_name' => 'web',
        ]);
        return redirect()->route('permissions.index')
            ->with('message', 'Permission created successfully');
    }

    public function edit(Permission $permission)
    {
        return Inertia::render('Permissions/Edit', [
            'permission' => $permission->only(['id','name','guard_name'])
        ]);
    }

    public function update(UpdatePermissionRequest $request, Permission $permission)
    {

        $permission->update([...$request->validated(), 'guard_name' => 'web']);

        return redirect()->route('permissions.index')
            ->with('message', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        $permission->delete();
        if ($permission->roles()->count() > 0) {
            return back()->with('error', 'Permission is assigned to roles');
        }
        return back()->with('message', 'Permission deleted successfully.');
    }
}
