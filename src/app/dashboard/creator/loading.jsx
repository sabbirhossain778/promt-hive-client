import React from 'react';

export default function Loading() {
    return (
        <div className="flex justify-center items-center h-screen text-white bg-[#050B14]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8B5CF6]"></div>
        </div>
    );
}