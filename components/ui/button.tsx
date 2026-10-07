"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "glass";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "secondary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    let baseStyles =
      "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

    // Size variants
    const sizeStyles = {
      xs: "text-xs px-2 py-1 gap-1 h-7",
      sm: "text-xs px-2.5 py-1.5 gap-1.5 h-8 font-medium",
      md: "text-sm px-3.5 py-2 gap-2 h-9",
      lg: "text-sm sm:text-base px-5 py-2.5 gap-2.5 h-11",
    }[size];

    // Color variants
    const variantStyles = {
      primary:
        "bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white shadow-sm hover:shadow-indigo-500/20 hover:shadow-md border border-indigo-400/20",
      secondary:
        "bg-[var(--bg-tertiary)] hover:bg-[var(--border-medium)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] shadow-sm",
      outline:
        "bg-transparent hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-medium)] hover:border-[var(--border-strong)]",
      ghost:
        "bg-transparent hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-transparent",
      danger:
        "bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 hover:border-red-500/40",
      glass:
        "bg-white/10 dark:bg-slate-900/50 backdrop-blur-md hover:bg-white/20 dark:hover:bg-slate-900/80 text-[var(--text-primary)] border border-white/20 dark:border-slate-800 shadow-sm",
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
