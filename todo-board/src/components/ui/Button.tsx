"use client";

import { ReactNode } from "react";

// 버튼 Props 타입 정의
interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "danger" | "icon";
    className?: string;
};

// 공통 버튼 컴포넌트
export default function Button({ children, onClick, variant = "primary", className = "" }: ButtonProps) {

    // 기본 스타일
    const variants = {
        primary: "bg-black text-white hover:bg-gray-800",
        secondary: "bg-gray-300 text-black hover:bg-gray-400",
        danger: "bg-red-500 text-white hover:bg-red-600",
        icon: "w-6 h-6 text-lg font-bold text-gray-500 hover:text-red-500 bg-transparent shadow-none",
    };

    // 버튼 스타일 통합
    const baseStyles = "px-4 py-2 rounded-lg font-semibold transition shadow-md";

    // 크기 스타일

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
}