import React from "react";
import Layout from "./components/Layout";
import Chat from "./components/Chat";
import ATMInterface from "./components/ATMInterface";

function App() {
    return (
        <Layout>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <Chat />
                <ATMInterface />
            </div>
        </Layout>
    );
}

export default App;
