"use client";

import { useState, useEffect } from "react";
import { ToastMessage } from "./types";

let toastListeners: Array<(toasts: ToastMessage[]) => void> = [];
let memoryToasts: ToastMessage[] = [];

function notifyListeners() {
  toastListeners.forEach((listener) => listener([...memoryToasts]));
}

export function triggerToast(
  title: string,
  type: "success" | "info" | "warning" | "error" = "info",
  message?: string,
  duration = 3500
) {
  const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const newToast: ToastMessage = { id, title, type, message, duration };
  
  memoryToasts = [...memoryToasts, newToast];
  notifyListeners();

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }
}

export function dismissToast(id: string) {
  memoryToasts = memoryToasts.filter((t) => t.id !== id);
  notifyListeners();
}

export function useToastNotifications() {
  const [toasts, setToasts] = useState<ToastMessage[]>(memoryToasts);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== setToasts);
    };
  }, []);

  return {
    toasts,
    toast: triggerToast,
    dismiss: dismissToast,
  };
}
