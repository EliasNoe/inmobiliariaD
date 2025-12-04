<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        
        // Forzar HTTPS en producción
        if (config('app.env') === 'production') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }
        
        // Registrar comandos de consola
        if ($this->app->runningInConsole()) {
            $this->commands([
                \App\Console\Commands\DiagnosticoSistema::class,
                \App\Console\Commands\VerificarErrores::class,
            ]);
        }
    }
}
