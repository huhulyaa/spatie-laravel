import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import AppLogoIcon from '@/components/app-logo-icon'; // Adjust path as needed

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white font-sans dark:bg-[#0b0b0a]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {/* Navigation */}
                <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0b0b0a] sticky top-0 z-50">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <span className="text-lg font-semibold text-black tracking-tight dark:text-white">
                                    Huhulya
                                </span>
                            </Link>

                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="rounded-md bg-black px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-[#0b0b0a]"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="text-sm font-medium text-gray-600 transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="rounded-md bg-black px-4 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-[#0b0b0a]"
                                            >
                                                Sign up
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main>
                    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            {/* App Logo - Large */}
                            <div className="flex justify-center mb-8">
                                <AppLogoIcon className="h-24 w-auto text-black dark:text-white" />
                            </div>

                            <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl dark:text-white">
                                Welcome
                            </h1>
                            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                                A clean, simple platform for building modern applications.
                            </p>
                            {!auth.user && canRegister && (
                                <div className="mt-8">
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-[#0b0b0a]"
                                    >
                                        Get started
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-28 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
                                    <h3 className="text-base font-semibold text-black dark:text-white">
                                        Documentation
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Comprehensive guides and references.
                                    </p>
                                    <a
                                        href="https://laravel.com/docs"
                                        target="_blank"
                                        className="mt-4 inline-flex items-center text-sm font-medium text-black transition-colors hover:opacity-70 dark:text-white"
                                    >
                                        Read docs →
                                    </a>
                                </div>

                                <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
                                    <h3 className="text-base font-semibold text-black dark:text-white">
                                        Tutorials
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Learn from video courses.
                                    </p>
                                    <a
                                        href="https://laracasts.com"
                                        target="_blank"
                                        className="mt-4 inline-flex items-center text-sm font-medium text-black transition-colors hover:opacity-70 dark:text-white"
                                    >
                                        Watch now →
                                    </a>
                                </div>

                                <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
                                    <h3 className="text-base font-semibold text-black dark:text-white">
                                        Deployment
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                        Deploy instantly to the cloud.
                                    </p>
                                    <a
                                        href="https://cloud.laravel.com"
                                        target="_blank"
                                        className="mt-4 inline-flex items-center text-sm font-medium text-black transition-colors hover:opacity-70 dark:text-white"
                                    >
                                        Deploy now →
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
