import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export async function exportToPNG(
  element: HTMLElement,
  filename: string
): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('PNG 내보내기 실패:', error);
    throw error;
  }
}

export async function exportToPDF(
  element: HTMLElement,
  filename: string
): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = img.width;
    const imgHeight = img.height;

    // A4 사이즈 기준 (mm)
    const pdfWidth = 210;
    const pdfHeight = 297;

    // 이미지 비율에 맞춰 크기 조정
    const ratio = Math.min(
      (pdfWidth - 20) / imgWidth,
      (pdfHeight - 20) / imgHeight
    );
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // 가운데 정렬
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    const pdf = new jsPDF({
      orientation: scaledWidth > scaledHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    pdf.addImage(dataUrl, 'PNG', x, y, scaledWidth, scaledHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('PDF 내보내기 실패:', error);
    throw error;
  }
}
