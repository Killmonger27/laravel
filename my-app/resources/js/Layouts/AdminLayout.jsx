import React, { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import {
    FiHome,
    FiUsers,
    FiSettings,
    FiBarChart3,
    FiClock,
    FiLogOut,
    FiMenu,
    FiX,
    FiBell,
    FiUser,
    FiShield
} from 'react-icons/fi';

export default function AdminLayout({ children, header }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const menuItems = [
        {
            name: "Vue d'ensemble",
            href: "/admin",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    ></path>
                </svg>
            ),
        },
        {
            name: "Guichets",
            href: "/admin/guichets",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                </svg>
            ),
        },
        {
            name: "Agents",
            href: "/admin/agents",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    ></path>
                </svg>
            ),
        },
        {
            name: "Services",
            href: "/admin/services",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m0 0h2M9 13h2m-2 0V9a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v4m-6 0a2 2 0 002 2h2a2 2 0 002-2"
                    ></path>
                </svg>
            ),
        },
        {
            name: "Rapports",
            href: "/admin/rapports",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    ></path>
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-25"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                </div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
            >
                {/* Logo */}
                <div className="flex items-center justify-center h-20 px-4 bg-blue-600">
                    <div className="flex items-center">
                        <svg
                            className="w-8 h-8 text-white mr-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h4M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            ></path>
                        </svg>
                        <span className="text-xl font-bold text-white">
                            Admin Panel
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        {menuItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                                    window.location.pathname === item.href
                                        ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                                        : ""
                                }`}
                            >
                                {item.icon}
                                <span className="ml-3 font-medium">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Actions rapides */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="space-y-2">
                        <Link
                            href="/mobile"
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
                                ></path>
                            </svg>
                            Interface Mobile
                        </Link>
                        <Link
                            href="/affichage"
                            className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                ></path>
                            </svg>
                            Affichage Public
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Navigation */}
                <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                {/* Mobile menu button */}
                                <button
                                    type="button"
                                    className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                                    onClick={() => setSidebarOpen(true)}
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        ></path>
                                    </svg>
                                </button>

                                {/* Header */}
                                <div className="ml-4 lg:ml-0">{header}</div>
                            </div>

                            {/* User menu */}
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    <div className="text-sm">
                                        <div className="font-medium text-gray-700">
                                            {auth.user.name}
                                        </div>
                                        <div className="text-gray-500 capitalize">
                                            {auth.user.role}
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-5 h-5 text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>

                                <Link
                                    href="/logout"
                                    method="post"
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                >
                                    Déconnexion
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
