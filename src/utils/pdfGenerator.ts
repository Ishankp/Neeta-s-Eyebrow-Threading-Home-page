import { jsPDF } from 'jspdf';
import { AftercareGuide } from '../data/careData';

export function generateAftercarePDF(data: AftercareGuide, pageTitle: string) {
  // Create PDF on an A4 layout (210mm x 297mm)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2); // 170mm

  let y = 25; // Vertical coordinate tracker
  let pageNum = 1;

  // Colors
  const cCharcoal = [28, 25, 23];      // #1c1917 (Stone-900)
  const cDeepBlue = [12, 74, 110];     // #0c4a6e (Brand-900)
  const cAccentBlue = [2, 132, 199];   // #0284c7 (Brand-600)
  const cAccentRed = [185, 28, 28];    // #b91c1c (Red-700)
  const cSoftBlueBg = [240, 249, 255]; // #f0f9ff (Brand-50)
  const cSoftRedBg = [254, 242, 242];  // #fef2f2 (Red-50)
  const cGold = [194, 167, 129];      // Warm golden border / highlight

  // Check and transition page break smoothly
  function checkPageBreak(heightNeeded: number) {
    if (y + heightNeeded > pageHeight - margin - 15) {
      doc.addPage();
      pageNum++;
      y = 25;
      drawHeaderAndFooter();
    }
  }

  // Draw consistent Headers and Footers for every page
  function drawHeaderAndFooter() {
    // Header
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175); // Light Gray
    doc.text("NEETA'S EYEBROW THREADING  |  POST-TREATMENT AFTERCARE", margin, 15);
    doc.setDrawColor(229, 231, 235); // border-gray-200
    doc.setLineWidth(0.2);
    doc.line(margin, 17, pageWidth - margin, 17);

    // Footer
    doc.line(margin, pageHeight - 17, pageWidth - margin, pageHeight - 17);
    doc.text(`Page ${pageNum}`, pageWidth - margin - 12, pageHeight - 12);
    doc.text("Contact Support: (407) 614-8138  |  Instagram: @neetaseyebrowthreading", margin, pageHeight - 12);
  }

  // Helper: Draw elegant title headers for sections
  function drawSectionHeader(titleStr: string, subtitleStr?: string, color = cDeepBlue) {
    checkPageBreak(18);
    y += 4;
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(titleStr.toUpperCase(), margin, y);
    y += 5;

    if (subtitleStr) {
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 113, 108); // Grayish-brown
      doc.text(subtitleStr.toUpperCase(), margin, y);
      y += 4;
    }

    doc.setDrawColor(color[0], color[1], color[2]);
    doc.setLineWidth(0.6);
    doc.line(margin, y, margin + 40, y);
    y += 8;
  }

  // Helper: Elegant wrapped paragraph writing
  function drawParagraph(text: string, leftIndent: number, width: number, fontSize = 9.5, isBold = false) {
    doc.setFont('Helvetica', isBold ? 'bold' : 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, width);
    
    lines.forEach((line: string) => {
      checkPageBreak(5);
      doc.text(line, leftIndent, y);
      y += 4.5;
    });
    y += 1.5; // space under paragraph
  }

  // Initialize first page
  drawHeaderAndFooter();

  // 1. BRAND HERO HEADER
  // Decorative soft background
  doc.setFillColor(cSoftBlueBg[0], cSoftBlueBg[1], cSoftBlueBg[2]);
  doc.rect(margin, y, contentWidth, 34, 'F');
  
  // Decorative border on left
  doc.setFillColor(cAccentBlue[0], cAccentBlue[1], cAccentBlue[2]);
  doc.rect(margin, y, 1.5, 34, 'F');

  // Title texts inside hero box
  doc.setTextColor(cDeepBlue[0], cDeepBlue[1], cDeepBlue[2]);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10);
  doc.text("NEETA'S EYEBROW THREADING AFTERCARE COURIER", margin + 6, y + 8);

  doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
  doc.setFontSize(20);
  doc.setFont('Helvetica', 'bold');
  const printableTitle = pageTitle.toUpperCase();
  doc.text(printableTitle, margin + 6, y + 18);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(`Category: ${data.category}  |  Critical Phase: ${data.criticalPhase}`, margin + 6, y + 26);
  y += 44;

  // Description block
  drawSectionHeader("Treatment Overview", "General Description & Expected Outcome", cDeepBlue);
  
  // Bullet points for phase properties
  doc.setFillColor(cSoftBlueBg[0], cSoftBlueBg[1], cSoftBlueBg[2]);
  doc.setDrawColor(219, 234, 254);
  doc.rect(margin, y, contentWidth, 18, 'FD');

  doc.setTextColor(cDeepBlue[0], cDeepBlue[1], cDeepBlue[2]);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(9);
  doc.text("EXPECTED OUTCOME:", margin + 5, y + 6);
  doc.setFont('Helvetica', 'normal');
  doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
  
  // Wrap expected outcome text
  const wrappedOutcome = doc.splitTextToSize(data.expectedResults, contentWidth - 46);
  doc.text(wrappedOutcome, margin + 41, y + 6);
  y += 24;

  doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
  drawParagraph(data.description, margin, contentWidth, 10);
  y += 6;

  // 2. TIMELINE/CHRONOLOGICAL STEPS
  const timelineHeaderTitle = data.id === 'microblading' ? "1. Day 1-14 After Care" : "Chronological Recovery Timeline";
  const timelineHeaderSubtitle = data.id === 'microblading' ? "Active Recovery Timeline - Principle Steps" : "Follow these intervals meticulously";
  drawSectionHeader(timelineHeaderTitle, timelineHeaderSubtitle, cAccentBlue);

  // Draw each step beautifully with line guides
  data.timeline.forEach((step, idx) => {
    // Check space for the step header + a bit of paragraph details
    checkPageBreak(25);

    // Timeline Node circle
    doc.setDrawColor(cAccentBlue[0], cAccentBlue[1], cAccentBlue[2]);
    doc.setFillColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.circle(margin + 4, y + 1.5, 3.5, 'FD');

    // Step index
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(cAccentBlue[0], cAccentBlue[1], cAccentBlue[2]);
    doc.text((idx + 1).toString(), margin + 3.1, y + 2.5);

    // Render Time badge
    doc.setFillColor(cSoftBlueBg[0], cSoftBlueBg[1], cSoftBlueBg[2]);
    doc.setDrawColor(191, 219, 254);
    doc.setLineWidth(0.2);
    // Dynamic width of badge depends on text size
    const badgeTextWidth = doc.getTextWidth(step.time.toUpperCase());
    doc.roundedRect(margin + 12, y - 2, badgeTextWidth + 4, 5, 1, 1, 'FD');
    doc.setTextColor(cDeepBlue[0], cDeepBlue[1], cDeepBlue[2]);
    doc.setFontSize(7.5);
    doc.text(step.time.toUpperCase(), margin + 14, y + 1.5);

    // Title text
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    doc.text(step.title, margin + 12 + badgeTextWidth + 8, y + 1.5);
    y += 6.5;

    // Line guide connecting steps (vertical)
    if (idx < data.timeline.length - 1) {
      // Find where detail paragraphs end to draw standard connector lines
      const detailLines = doc.splitTextToSize(step.details, contentWidth - 14).length;
      const verticalLineHeight = (detailLines * 4.5) + 8;
      
      doc.setDrawColor(191, 219, 254);
      doc.setLineWidth(0.5);
      doc.line(margin + 4, y - 1, margin + 4, y + verticalLineHeight - 4);
    }

    // Step details paragraph
    doc.setTextColor(60, 60, 60);
    drawParagraph(step.details, margin + 12, contentWidth - 15, 9);
    y += 4;
  });

  y += 6;

  // 3. SEC_THINGS TO AVOID
  const avoidTitle = data.id === 'microblading' ? "2. Things to Avoid" : "Strict Guidelines: What to Avoid";
  const avoidSubtitle = data.id === 'microblading' ? "Do not cancel recovery progress - Stage 1 Restrictions" : "Avoid to prevent irritation and ensure perfect healing";
  drawSectionHeader(avoidTitle, avoidSubtitle, cAccentRed);

  // Group warnings in a high-contrast container
  const avoidStartHeight = y;
  checkPageBreak(20);
  
  // Custom list rendering with X bullet icons and colored boxes
  data.avoid.forEach((item) => {
    // Split key labels (e.g. "Swimming:") out for bold styling if a colon is present
    const colonIndex = item.indexOf(':');
    let label = '';
    let text = item;

    if (colonIndex !== -1) {
      label = item.substring(0, colonIndex + 1);
      text = item.substring(colonIndex + 1).trim();
    }

    checkPageBreak(12);

    // Draw little red warning checkbox
    doc.setFillColor(cSoftRedBg[0], cSoftRedBg[1], cSoftRedBg[2]);
    doc.setDrawColor(254, 202, 202);
    doc.setLineWidth(0.15);
    doc.roundedRect(margin, y - 2, 4, 4, 0.8, 0.8, 'FD');
    doc.setTextColor(cAccentRed[0], cAccentRed[1], cAccentRed[2]);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.text("X", margin + 1.1, y + 0.8);

    // Text box details
    doc.setFontSize(9);
    doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
    
    if (label) {
      doc.setFont('Helvetica', 'bold');
      doc.text(label, margin + 7, y + 1);
      const labelWidth = doc.getTextWidth(label);
      
      doc.setFont('Helvetica', 'normal');
      const textLines = doc.splitTextToSize(text, contentWidth - 7 - labelWidth - 2);
      
      textLines.forEach((tLine: string, tIdx: number) => {
        if (tIdx === 0) {
          doc.text(tLine, margin + 7 + labelWidth + 1, y + 1);
        } else {
          y += 4.5;
          checkPageBreak(5);
          doc.text(tLine, margin + 7, y + 1);
        }
      });
    } else {
      drawParagraph(text, margin + 7, contentWidth - 8, 9);
    }
    
    y += 5.5;
  });

  y += 6;

  // 4. MICROBLADING EXTRA SECTIONS (What to Expect, Healing Outcomes, Long term)
  if (data.id === 'microblading') {
    // Section 3: What to Expect
    drawSectionHeader("3. What to Expect During Recovery", "Healing Matrix - Week-by-Week Expectation Cycles", cDeepBlue);

    if (data.whatToExpect) {
      data.whatToExpect.forEach((item, idx) => {
        checkPageBreak(25);

        // Header for expectation time frame
        doc.setFillColor(245, 245, 244); // Stone-100
        doc.setDrawColor(214, 211, 209); // Stone-300
        doc.setLineWidth(0.2);
        doc.roundedRect(margin, y - 2.5, 45, 6, 1, 1, 'FD');
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(68, 64, 60); // Stone-700
        doc.text(item.time.toUpperCase(), margin + 3, y + 1.5);
        y += 7.5;

        // Draw bullets
        item.bullets.forEach((bullet) => {
          checkPageBreak(12);
          doc.setFillColor(cAccentBlue[0], cAccentBlue[1], cAccentBlue[2]);
          doc.circle(margin + 5, y, 0.8, 'F');
          
          doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
          drawParagraph(bullet, margin + 9, contentWidth - 10, 8.5);
          y += 1;
        });
        
        y += 3;
      });
    }

    y += 4;

    // Section 3.1: Possible Healing Outcomes
    if (data.healingOutcomes) {
      drawSectionHeader("Possible Healing Outcomes & Skin Adaptations", "Understand how different skin textures retain microblading pigment", cDeepBlue);

      data.healingOutcomes.forEach((outcome) => {
        checkPageBreak(18);

        // Draw a light gray/green block for each outcome
        let blockBg = [240, 253, 244]; // emerald-50
        let blockBorder = [187, 247, 208]; // emerald-200
        let tagColor = [21, 128, 61]; // emerald-700
        
        if (outcome.status === 'light') {
          blockBg = [255, 251, 235]; // amber-50
          blockBorder = [253, 230, 138]; // amber-200
          tagColor = [180, 83, 9]; // amber-700
        } else if (outcome.status === 'touchup') {
          blockBg = [250, 250, 249]; // stone-50
          blockBorder = [231, 229, 228]; // stone-200
          tagColor = [120, 113, 108]; // stone-600
        }

        doc.setFillColor(blockBg[0], blockBg[1], blockBg[2]);
        doc.setDrawColor(blockBorder[0], blockBorder[1], blockBorder[2]);
        doc.roundedRect(margin, y - 2, contentWidth, 18, 1.5, 1.5, 'FD');

        // Draw standard outcome title
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(tagColor[0], tagColor[1], tagColor[2]);
        doc.text(outcome.title.toUpperCase(), margin + 4, y + 3);

        // Body details
        doc.setFontSize(8);
        doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
        
        const lines = doc.splitTextToSize(outcome.details, contentWidth - 8);
        lines.forEach((line: string, lIdx: number) => {
          doc.text(line, margin + 4, y + 8 + (lIdx * 4));
        });

        y += 20;
      });
    }

    y += 4;

    // Section 4: Long Term Care
    if (data.longTermCare) {
      drawSectionHeader("4. Long Term Care & Pigment Longevity", "Ensure brow structure aesthetics endure over subsequent months", cAccentBlue);

      data.longTermCare.forEach((item, idx) => {
        checkPageBreak(25);

        // Draw card with accent-blue left strip
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(224, 242, 254);
        doc.setLineWidth(0.2);
        doc.roundedRect(margin, y - 2, contentWidth, 18, 1, 1, 'FD');
        doc.setFillColor(cAccentBlue[0], cAccentBlue[1], cAccentBlue[2]);
        doc.rect(margin, y - 2, 1.5, 18, 'F');

        // Draw title
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.setTextColor(cDeepBlue[0], cDeepBlue[1], cDeepBlue[2]);
        doc.text(item.title, margin + 5, y + 3);

        // Details
        doc.setTextColor(cCharcoal[0], cCharcoal[1], cCharcoal[2]);
        drawParagraph(item.details, margin + 5, contentWidth - 10, 8.5);
        y += 11;
      });
    }
  }

  // 5. SIGNATURE FOOTNOTE / SALON WELCOME
  checkPageBreak(28);
  y += 6;
  doc.setDrawColor(cGold[0], cGold[1], cGold[2]);
  doc.setLineWidth(0.4);
  doc.line(margin + 20, y, pageWidth - margin - 20, y);
  y += 6;

  doc.setTextColor(cDeepBlue[0], cDeepBlue[1], cDeepBlue[2]);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.text("WE ARE DEDICATED TO YOUR COMFORT & BEAUTY CARE", pageWidth / 2, y, { align: 'center' });
  y += 5;

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(115, 115, 115);
  doc.text("If you notice severe pain, swelling, or have queries, phone us immediately.", pageWidth / 2, y, { align: 'center' });
  y += 4;
  doc.text("Book touch-ups or followups via our booking link, social media, or call (407) 614-8138.", pageWidth / 2, y, { align: 'center' });

  // Save the generated document
  const fileName = `Neeta_Eyebrow_Threading_${data.id}_Aftercare.pdf`;
  doc.save(fileName);
}
