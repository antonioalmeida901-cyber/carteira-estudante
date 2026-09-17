"use client";

import { QRCodeCanvas } from "qrcode.react";

export default function QRCode({
  valor,
}: {
  valor: string;
}) {
  return (
    <div className="flex flex-col items-center mt-6">
      <QRCodeCanvas
        value={valor}
        size={180}
        bgColor="#ffffff"
        fgColor="#000000"
        level="H"
      />

      <p className="text-sm text-gray-500 mt-3 text-center">
        Aponte a câmera do celular para validar esta carteira.
      </p>
    </div>
  );
}