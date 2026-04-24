import jsPDF from 'jspdf';

const C = {
  gold: [212, 160, 23] as [number, number, number],
  goldLight: [242, 208, 107] as [number, number, number],
  dark: [26, 26, 26] as [number, number, number],
  gray: [100, 100, 100] as [number, number, number],
  grayLight: [245, 245, 240] as [number, number, number],
  green: [22, 163, 74] as [number, number, number],
  orange: [234, 88, 12] as [number, number, number],
  red: [220, 38, 38] as [number, number, number],
};

const DEMO_DATA = {
  nombre: 'Maileth Vallejo',
  cedula: '1041772713',
  telefono: '3013092194',
  score: 738,
  scoreLabel: 'ACEPTABLE',
  totalIngresos: 2222900,
  totalGastos: 973502,
  margenNeto: 56,
  totalVentas: 178,
  factores: [
    { label: 'Consistencia de ingresos', value: 35, max: 100, qual: 'BAJO', color: C.red },
    { label: 'Capacidad de pago', value: 95, max: 100, qual: 'EXCELENTE', color: C.green },
    { label: 'Gestión de fiados y deudas', value: 85, max: 100, qual: 'EXCELENTE', color: C.green },
    { label: 'Salud de inventario', value: 92, max: 100, qual: 'EXCELENTE', color: C.green },
    { label: 'Calidad y confiabilidad de datos', value: 72, max: 100, qual: 'BIEN', color: C.gold },
  ],
  verifCode: 'VA-202604-2713-4206',
  fechaEmision: '24 de abril de 2026',
  validoHasta: '24 de julio de 2026',
  footerUrl: 'voz-activa-snowy.vercel.app'
};

function rgb(doc: jsPDF, type: 'fill' | 'text' | 'draw', color: [number, number, number]) {
  if (type === 'fill') doc.setFillColor(...color);
  if (type === 'text') doc.setTextColor(...color);
  if (type === 'draw') doc.setDrawColor(...color);
}

function formatCOP(n: number): string {
  return '$' + new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(n).replace(/,/g, '.');
}

export function generateDemoPDF() {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });

  const d = DEMO_DATA;
  const W = 210;
  const M = 15;
  const CW = W - M * 2;
  let y = 15;

  // Header Background
  rgb(doc, 'fill', C.dark);
  doc.rect(0, 0, W, 52, 'F');

  // Title
  rgb(doc, 'text', C.gold);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('VOZ·ACTIVA', M, 22);
  
  rgb(doc, 'text', [180, 180, 180]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('SCORING CREDITICIO ALTERNATIVO PARA MICRONEGOCIOS', M, 29);

  // Verif Code top right
  doc.setFontSize(7);
  doc.text(`N° ${d.verifCode}`, W - M, 18, { align: 'right' });
  doc.text('Documento verificado', W - M, 23, { align: 'right' });

  // Passport Badge
  rgb(doc, 'fill', C.gold);
  doc.roundedRect(M, 35, 70, 7, 1, 1, 'F');
  rgb(doc, 'text', C.dark);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('PASAPORTE FINANCIERO EMPRESARIAL', M + 35, 40, { align: 'center' });

  y = 65;

  // Header line
  rgb(doc, 'draw', C.gold);
  doc.setLineWidth(0.5);
  doc.line(M, y - 5, W - M, y - 5);

  doc.setFontSize(8.5);
  rgb(doc, 'text', C.dark);
  doc.setFont('helvetica', 'bold');
  doc.text('DATOS DEL TITULAR', M, y - 8);

  // Titular Data
  doc.setFontSize(16);
  doc.text(d.nombre, M, y + 5);
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  rgb(doc, 'text', C.gray);
  doc.text(`Cédula de ciudadanía: ${d.cedula}`, M, y + 12);
  doc.text(`Teléfono: ${d.telefono}`, M, y + 18);

  // Dates (right side)
  rgb(doc, 'text', C.gray);
  doc.text('Fecha de emisión:', W - M - 45, y + 2);
  rgb(doc, 'text', C.dark);
  doc.setFont('helvetica', 'bold');
  doc.text(d.fechaEmision, W - M, y + 2, { align: 'right' });
  
  rgb(doc, 'text', C.gray);
  doc.setFont('helvetica', 'normal');
  doc.text('Válido hasta:', W - M - 45, y + 12);
  rgb(doc, 'text', C.dark);
  doc.setFont('helvetica', 'bold');
  doc.text(d.validoHasta, W - M, y + 12, { align: 'right' });

  y += 40;

  // Score section
  doc.setFontSize(8.5);
  doc.text('SCORE DE CONFIANZA EMPRESARIAL', M, y - 5);
  rgb(doc, 'draw', C.gold);
  doc.setLineWidth(0.5);
  doc.line(M, y - 3, W - M, y - 3);

  // Score Box
  rgb(doc, 'draw', C.gold);
  doc.setLineWidth(0.3);
  doc.roundedRect(M, y, CW, 50, 4, 4, 'D');

  // Main Score
  rgb(doc, 'text', [132, 204, 22]); 
  doc.setFontSize(54);
  doc.setFont('helvetica', 'bold');
  doc.text(d.score.toString(), M + 55, y + 25, { align: 'right' });
  
  rgb(doc, 'text', C.gray);
  doc.setFontSize(16);
  doc.text('/ 950', M + 56, y + 24);

  // Label badge
  rgb(doc, 'fill', [132, 204, 22]);
  doc.roundedRect(M + 35, y + 32, 32, 10, 2, 2, 'F');
  rgb(doc, 'text', [255, 255, 255]);
  doc.setFontSize(10);
  doc.text(d.scoreLabel, M + 51, y + 38.5, { align: 'center' });

  // Scale
  rgb(doc, 'text', C.gray);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Posición en la escala:', M + 85, y + 8);
  
  // Bar background
  rgb(doc, 'fill', [230, 230, 225]);
  doc.roundedRect(M + 85, y + 12, CW - 100, 6, 3, 3, 'F');
  
  rgb(doc, 'fill', C.red);
  doc.roundedRect(M + 85, y + 12, 40, 6, 3, 3, 'F');
  rgb(doc, 'fill', C.gold);
  doc.rect(M + 125, y + 12, 20, 6, 'F');
  rgb(doc, 'fill', [132, 204, 22]);
  doc.roundedRect(M + 145, y + 12, CW - 100 - 60, 6, 3, 3, 'F');

  // Indicator
  const barWidthScale = CW - 100;
  const cxInd = M + 85 + ((738 - 150) / 800) * barWidthScale;
  rgb(doc, 'fill', [255, 255, 255]);
  rgb(doc, 'draw', [132, 204, 22]);
  doc.setLineWidth(2);
  doc.circle(cxInd, y + 15, 4, 'FD');

  rgb(doc, 'text', C.gray);
  doc.setFontSize(7.5);
  doc.text('150', M + 85, y + 25);
  doc.text('Riesgo alto', M + 105, y + 25, { align: 'center' });
  doc.text('500', M + 125, y + 25);
  doc.text('Aceptable', M + 145, y + 25, { align: 'center' });
  doc.text('750', M + 165, y + 25);
  doc.text('Excelente', M + 185, y + 25, { align: 'center' });
  doc.text('950', W - M - 5, y + 25);

  y += 65;

  // Financial summary
  doc.setFontSize(8.5);
  rgb(doc, 'text', C.dark);
  doc.text('RESUMEN FINANCIERO', M, y - 5);
  rgb(doc, 'draw', C.dark);
  doc.setLineWidth(0.3);
  doc.line(M, y - 3, W - M, y - 3);

  const cardW = (CW - 5) / 2;
  const cardH = 18;

  const summary = [
    { label: 'Ingresos totales', value: formatCOP(d.totalIngresos) },
    { label: 'Gastos registrados', value: formatCOP(d.totalGastos) },
    { label: 'Margen neto', value: `${d.margenNeto}%` },
    { label: 'Ventas registradas', value: `${d.totalVentas} transacciones` },
  ];

  summary.forEach((item, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = M + col * (cardW + 5);
    const cy = y + row * (cardH + 4);
    rgb(doc, 'fill', C.grayLight);
    doc.roundedRect(cx, cy, cardW, cardH, 2, 2, 'F');
    rgb(doc, 'text', C.gray);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(item.label, cx + cardW / 2, cy + 6, { align: 'center' });
    rgb(doc, 'text', C.dark);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(item.value, cx + cardW / 2, cy + 13, { align: 'center' });
  });

  y += 50;

  // Behavior analysis
  doc.setFontSize(8.5);
  rgb(doc, 'text', C.dark);
  doc.text('ANÁLISIS DE COMPORTAMIENTO DEL NEGOCIO', M, y - 5);
  rgb(doc, 'draw', C.dark);
  doc.setLineWidth(0.3);
  doc.line(M, y - 3, W - M, y - 3);

  y += 10;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');

  d.factores.forEach((f) => {
    rgb(doc, 'text', C.dark);
    doc.text(f.label, M, y);
    const barW = 60;
    const barX = W - M - barW - 35;
    rgb(doc, 'fill', [235, 235, 230]);
    doc.roundedRect(barX, y - 4, barW, 5, 2.5, 2.5, 'F');
    const fillW = (f.value / f.max) * barW;
    rgb(doc, 'fill', f.color);
    doc.roundedRect(barX, y - 4, fillW, 5, 2.5, 2.5, 'F');
    
    rgb(doc, 'fill', f.color);
    doc.roundedRect(W - M - 25, y - 6, 25, 8, 1.5, 1.5, 'F');
    rgb(doc, 'text', [255, 255, 255]);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text(f.qual, W - M - 12.5, y - 0.5, { align: 'center' });
    doc.setFontSize(9);
    y += 12;
  });

  y += 10;

  // Certification
  doc.setFontSize(8.5);
  rgb(doc, 'text', C.dark);
  doc.text('CERTIFICACIÓN', M, y - 5);
  rgb(doc, 'draw', C.dark);
  doc.setLineWidth(0.3);
  doc.line(M, y - 3, W - M, y - 3);

  rgb(doc, 'draw', C.gold);
  doc.setLineWidth(0.6);
  doc.roundedRect(M, y, CW, 35, 2, 2, 'D');
  rgb(doc, 'fill', C.gold);
  doc.rect(M, y, 4, 35, 'F');

  const cx2 = M + CW / 2;
  rgb(doc, 'text', C.dark);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Voz-Activa certifica que:', cx2, y + 10, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  rgb(doc, 'text', C.gray);
  const certRaw = 'El titular ha registrado actividad comercial verificada en la plataforma Voz-Activa. El scoring se basa en comportamiento real: consistencia de ventas, capacidad de ahorro, gestión de cartera y calidad de registros financieros. Este documento puede presentarse ante bancos, cooperativas y microfinancieras como prueba alternativa de capacidad de pago.';
  const certLines = doc.splitTextToSize(certRaw, CW - 20);
  certLines.forEach((line: string, i: number) =>
    doc.text(line, cx2, y + 18 + i * 5, { align: 'center' })
  );

  // Footer
  rgb(doc, 'fill', [25, 25, 25]);
  doc.rect(0, 260, W, 37, 'F');

  const bottomY = 275;
  rgb(doc, 'text', C.gold);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('VOZ·ACTIVA', M, bottomY);
  
  rgb(doc, 'text', [150, 150, 150]);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Scoring Crediticio Alternativo para Micronegocios de Colombia', M, bottomY + 7);
  doc.text('Este documento no constituye garantía financiera. Solo certifica actividad registrada en la plataforma.', M, bottomY + 14);
  
  rgb(doc, 'text', C.gold);
  doc.text(d.footerUrl, W - M, bottomY, { align: 'right' });
  rgb(doc, 'text', [150, 150, 150]);
  doc.text(`N° ${d.verifCode}`, W - M, bottomY + 7, { align: 'right' });

  doc.save('Pasaporte-VozActiva-MailethVallejo.pdf');
}
