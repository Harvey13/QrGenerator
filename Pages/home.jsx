import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download, QrCode, Sparkles } from "lucide-react";
import QRCodeLib from "qrcode";

export default function Home() {
    const [inputValue, setInputValue] = useState("03339501");
    const [qrValue, setQrValue] = useState("03339501");
    const [isGenerating, setIsGenerating] = useState(false);
    const [qrDataUrl, setQrDataUrl] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setQrValue(inputValue.trim());
        }, 500);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        const generateQrCode = async () => {
            if (!qrValue) {
                setQrDataUrl("");
                return;
            }

            setIsGenerating(true);
            try {
                const url = await QRCodeLib.toDataURL(qrValue, {
                    errorCorrectionLevel: 'H',
                    margin: 2,
                    width: 400,
                    color: {
                        dark: '#000000',
                        light: '#FFFFFF'
                    }
                });
                setQrDataUrl(url);
            } catch (err) {
                console.error("Failed to generate QR code:", err);
                setQrDataUrl(""); // Clear QR on error
            } finally {
                setIsGenerating(false);
            }
        }

        generateQrCode();
    }, [qrValue]);

    const handleDownload = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-6">
            <div className="w-full max-w-xl">
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-black mb-6 shadow-2xl shadow-black/20">
                        <QrCode className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-3">
                        QR Code <span className="font-semibold">Generator</span>
                    </h1>
                    <p className="text-slate-500 text-lg font-light">
                        Transformez n'importe quel texte en QR code instantanément
                    </p>
                </motion.div>

                {/* Input Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="mb-10"
                >
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Entrez un texte ou une URL..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full h-14 px-6 text-lg bg-white border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-300 placeholder:text-slate-400"
                        />
                        <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <Sparkles className="w-5 h-5 text-slate-400 animate-pulse" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* QR Code Display */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="relative bg-white rounded-3xl p-8 shadow-2xl shadow-slate-200/80 border border-slate-100">
                        <AnimatePresence mode="wait">
                            {qrValue ? (
                                <motion.div
                                    key="qr"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="relative">
                                        {qrDataUrl && (
                                            <img
                                                src={qrDataUrl}
                                                alt="QR Code"
                                                className="w-64 h-64 md:w-72 md:h-72 rounded-xl"
                                            />
                                        )}
                                        <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-slate-900/5" />
                                    </div>

                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-6 text-center"
                                    >
                                        <p className="text-sm text-slate-500 mb-4 max-w-[250px] truncate px-4">
                                            {qrValue}
                                        </p>
                                        <Button
                                            onClick={handleDownload}
                                            className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-6 h-11 shadow-lg shadow-slate-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/30"
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Télécharger
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-64 h-64 md:w-72 md:h-72 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                                        <QrCode className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <p className="text-slate-400 font-light">
                                        Votre QR code apparaîtra ici
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-slate-400 text-sm mt-12 font-light"
                >
                    Généré instantanément • Fonctionne hors ligne • Gratuit
                </motion.p>
            </div>
        </div>
    );
}