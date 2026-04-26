import type { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            {...props}
            viewBox="0 0 40 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Main cat head - rounded diamond/oval shape */}
            <path
                d="M20 10L10 20V32L20 40L30 32V20L20 10Z"
                fill="currentColor"
                className="text-black dark:text-white"
            />

            {/* Left ear - rounded triangle */}
            <path
                d="M10 30L4 8L14 13Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.5"
            />

            {/* Right ear - rounded triangle */}
            <path
                d="M30 30L36 8L26 13Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.8"
            />

            {/* Inner left ear detail */}
            <path
                d="M10 18L7 11L13 15Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.2"
            />

            {/* Inner right ear detail */}
            <path
                d="M30 18L33 11L27 15Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.2"
            />

            {/* Left eye - rounded almond */}
            <path
                d="M13 24L11 27L13 30L16 27L13 24Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.9"
            />

            {/* Right eye - rounded almond */}
            <path
                d="M27 24L25 27L27 30L30 27L27 24Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.9"
            />

            {/* Nose */}
            <path
                d="M20 31L18 34L22 34L20 31Z"
                fill="currentColor"
                className="text-black dark:text-white"
                opacity="0.9"
            />

            {/* Mouth - curved lines for cuter look */}
            <path
                d="M18 35L20 37L22 35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-black dark:text-white"
                opacity="0.7"
                fill="none"
            />

            {/* Left whiskers */}
            <path
                d="M5 27L12 27M6 30L12 29"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-black dark:text-white"
                opacity="0.6"
            />

            {/* Right whiskers */}
            <path
                d="M28 27L35 27M28 29L34 30"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="text-black dark:text-white"
                opacity="0.6"
            />
        </svg>
    );
}
