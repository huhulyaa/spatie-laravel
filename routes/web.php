<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PermissionController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::inertia('dashboard', 'dashboard')->name('dashboard');


    Route::resource('users', UserController::class)
        ->middleware('role:manager');

    Route::resource('roles', RoleController::class)
        ->middleware('role:admin');

    Route::resource('permissions', PermissionController::class)
        ->middleware('role:admin');
});

require __DIR__ . '/settings.php';
