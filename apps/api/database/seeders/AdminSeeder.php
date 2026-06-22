<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $email    = env('ADMIN_EMAIL', 'admin@javaroyale.com');
        $password = env('ADMIN_PASSWORD', 'changeme');

        User::updateOrCreate(
            ['email' => $email],
            [
                'name'     => 'Admin Java Royale',
                'email'    => $email,
                'password' => Hash::make($password),
            ]
        );
    }
}
