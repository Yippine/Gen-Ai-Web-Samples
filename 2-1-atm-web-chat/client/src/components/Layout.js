import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-6">
                <h1 className="text-3xl font-bold">ATM Web Chat</h1>
            </header>
            <main className="container mx-auto p-6">{children}</main>
        </div>
    );
};

export default Layout;
