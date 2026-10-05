import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generatePdf() {
  const outDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // If user provided their own PDF file, use and deploy it directly!
  const userOwnPdf = path.join(__dirname, '..', 'PON VIJAYA PRABU S own.pdf');
  if (fs.existsSync(userOwnPdf)) {
    console.log('Found user uploaded "PON VIJAYA PRABU S own.pdf", synchronizing to public folder...');
    fs.copyFileSync(userOwnPdf, path.join(outDir, 'PON VIJAYA PRABU S own.pdf'));
    fs.copyFileSync(userOwnPdf, path.join(outDir, 'PON_VIJAYA_PRABU_S_own.pdf'));
    fs.copyFileSync(userOwnPdf, path.join(outDir, 'Pon_Vijaya_Prabu_S_Resume.pdf'));
    console.log('Successfully synchronized user own.pdf to all public endpoints!');
    return;
  }

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm

  // Colors
  const dark = [20, 20, 20];
  const bodyText = [35, 35, 35];
  const muted = [70, 70, 70];
  const lineGray = [160, 160, 160];
  const iconBg = [50, 50, 50];

  // -------------------------------------------------------------
  // HEADER
  // -------------------------------------------------------------
  let y = 17;

  // Name
  doc.setFont('times', 'bold');
  doc.setFontSize(23);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('PON VIJAYA PRABU S', marginX, y);

  // Line under name
  y += 2.5;
  doc.setDrawColor(dark[0], dark[1], dark[2]);
  doc.setLineWidth(0.4);
  doc.line(marginX, y, marginX + 66, y);

  // Subtitle
  y += 5.5;
  doc.setFont('times', 'normal');
  doc.setFontSize(13);
  doc.text('UI/UX Designer', marginX, y);

  // Top Right Contact Block
  let contactY = 13.5;
  const rightAlignX = pageWidth - marginX - 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);

  function drawBadge(cx, cy, label) {
    doc.setFillColor(iconBg[0], iconBg[1], iconBg[2]);
    doc.circle(cx, cy, 2.2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5);
    doc.setTextColor(255, 255, 255);
    doc.text(label, cx, cy + 0.7, { align: 'center' });
    doc.setFont('times', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  }

  // Phone
  doc.text('+91 6382059153', rightAlignX, contactY, { align: 'right' });
  drawBadge(pageWidth - marginX - 2.5, contactY - 1, 'P');

  // Email
  contactY += 4.5;
  doc.text('ponvijayprabhu@gmail.com', rightAlignX, contactY, { align: 'right' });
  drawBadge(pageWidth - marginX - 2.5, contactY - 1, 'M');

  // LinkedIn
  contactY += 4.5;
  doc.text('www.linkedin.com/in/pon-vijay-prabhu3774', rightAlignX, contactY, { align: 'right' });
  drawBadge(pageWidth - marginX - 2.5, contactY - 1, 'in');

  // Portfolio
  contactY += 4.5;
  doc.text('https://ponvijayprabhu.github.io/Pon-vijaya-prabu-S-portfolio/', rightAlignX, contactY, { align: 'right' });
  drawBadge(pageWidth - marginX - 2.5, contactY - 1, 'G');

  // -------------------------------------------------------------
  // DIVIDER 1
  // -------------------------------------------------------------
  y = 34.5;
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.setLineWidth(0.35);
  doc.line(marginX, y, pageWidth - marginX, y);

  // -------------------------------------------------------------
  // PROFESSIONAL SUMMARY
  // -------------------------------------------------------------
  y += 5.5;
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('PROFESSIONAL SUMMARY', pageWidth / 2, y, { align: 'center' });

  y += 4.5;
  doc.setFont('times', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const summaryText =
    'Passionate UI/UX Designer with experience in designing responsive web and mobile applications using Figma. ' +
    'Skilled in wireframing, prototyping, and creating user-centered interfaces that improve usability and user experience.';
  const splitSummary = doc.splitTextToSize(summaryText, contentWidth - 10);
  doc.text(splitSummary, pageWidth / 2, y, { align: 'center', lineHeightFactor: 1.35 });

  // -------------------------------------------------------------
  // DIVIDER 2
  // -------------------------------------------------------------
  y += 10.5;
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.setLineWidth(0.35);
  doc.line(marginX, y, pageWidth - marginX, y);

  // -------------------------------------------------------------
  // TWO COLUMNS SETUP
  // -------------------------------------------------------------
  const colGap = 7;
  const leftColWidth = 73;
  const leftColX = marginX;
  const dividerX = leftColX + leftColWidth + colGap / 2;
  const rightColX = dividerX + colGap / 2;
  const rightColWidth = pageWidth - marginX - rightColX;

  const colStartY = y + 5;
  let leftY = colStartY;
  let rightY = colStartY;

  // Vertical dividing rule
  const colEndY = 286;
  doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
  doc.setLineWidth(0.3);
  doc.line(dividerX, y + 2, dividerX, colEndY);

  function sectionHeader(text, x, curY, width) {
    doc.setFont('times', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(dark[0], dark[1], dark[2]);
    doc.text(text, x, curY);
    curY += 1.5;
    doc.setDrawColor(lineGray[0], lineGray[1], lineGray[2]);
    doc.setLineWidth(0.3);
    doc.line(x, curY, x + width, curY);
    return curY + 4;
  }

  // =============================================================
  // LEFT COLUMN
  // =============================================================

  // 1. EDUCATION
  leftY = sectionHeader('EDUCATION', leftColX, leftY, leftColWidth);

  // Bachelor
  doc.setFont('times', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('BACHELOR IN MECHANICAL ENGINEERING', leftColX, leftY);
  leftY += 3.5;
  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  doc.text("Stella Mary's college of engineering", leftColX, leftY);
  leftY += 3.2;
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('Nagercoil, Kanyakumari', leftColX, leftY);
  leftY += 3.2;
  doc.setFont('times', 'bold');
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('2022-2025', leftColX, leftY);
  leftY += 4.5;

  // Diploma
  doc.setFont('times', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('DIPLOMA IN MECHANICAL ENGINEERING', leftColX, leftY);
  leftY += 3.5;
  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  doc.text('N.M.S Kamaraj polytechnic college', leftColX, leftY);
  leftY += 3.2;
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('Nagercoil, Kanyakumari', leftColX, leftY);
  leftY += 3.2;
  doc.setFont('times', 'bold');
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('2019-2022', leftColX, leftY);
  leftY += 4.5;

  // SSLC
  doc.setFont('times', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('SSLC', leftColX, leftY);
  leftY += 3.5;
  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  doc.text('Sri Ramji Matric.Hr.Sec.School', leftColX, leftY);
  leftY += 3.2;
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('Ganapathipuram, Kanyakumari', leftColX, leftY);
  leftY += 3.2;
  doc.setFont('times', 'bold');
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('2019', leftColX, leftY);
  leftY += 6;

  // 2. DESIGN TOOLS
  leftY = sectionHeader('DESIGN TOOLS', leftColX, leftY, leftColWidth);
  const tools = ['Figma', 'Adobe XD', 'Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Miro'];
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  tools.forEach(tool => {
    doc.text(`•  ${tool}`, leftColX + 1, leftY);
    leftY += 3.6;
  });
  leftY += 3;

  // 3. CORE UI/UX SKILLS
  leftY = sectionHeader('CORE UI/UX SKILLS', leftColX, leftY, leftColWidth);
  const coreSkills = ['User Research', 'Wireframing', 'Prototyping', 'User Flows', 'Responsive Design'];
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  coreSkills.forEach(skill => {
    doc.text(`•  ${skill}`, leftColX + 1, leftY);
    leftY += 3.6;
  });
  leftY += 3;

  // 4. CERTIFICATIONS
  leftY = sectionHeader('CERTIFICATIONS', leftColX, leftY, leftColWidth);
  const certs = [
    'UI/UX Design Certification',
    'AI and Machine Learning Fundamentals (2024)',
    'Internet of Things (IoT) Certification (2024)',
    'Non-Destructive Testing (NDT) Level 2\nCertification (2024)',
    'Master CAM-CNC Lathe and Milling\nCertification (2023)',
  ];
  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  certs.forEach(cert => {
    const lines = cert.split('\n');
    lines.forEach((l, idx) => {
      if (idx === 0) {
        doc.text(`•  ${l}`, leftColX + 1, leftY);
      } else {
        doc.text(`   ${l}`, leftColX + 1, leftY);
      }
      leftY += 3.4;
    });
    leftY += 0.4;
  });
  leftY += 2.5;

  // 5. LANGUAGES
  leftY = sectionHeader('LANGUAGES', leftColX, leftY, leftColWidth);
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  doc.text('•  Tamil      •  English', leftColX + 1, leftY);

  // =============================================================
  // RIGHT COLUMN
  // =============================================================

  // 1. WORK EXPERIENCE
  rightY = sectionHeader('WORK EXPERIENCE', rightColX, rightY, rightColWidth);

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('UI/UX Designer', rightColX, rightY);
  rightY += 3.8;

  doc.setFont('times', 'bold');
  doc.setFontSize(8.8);
  doc.text('Canvendor software solutions private limited - Nagercoil', rightColX, rightY);
  rightY += 3.5;

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('(Nov 2025) Present', rightColX, rightY);
  rightY += 3.8;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const workBullets = [
    'Designed web and mobile interfaces for EMR, AI, HRMS, logistics, and landing page projects.',
    'Created wireframes, user flows, and interactive prototypes using Figma.',
    'Collaborated with developers to deliver responsive and user-friendly designs.',
  ];
  workBullets.forEach(b => {
    const split = doc.splitTextToSize(`•  ${b}`, rightColWidth - 2);
    doc.text(split, rightColX, rightY, { lineHeightFactor: 1.3 });
    rightY += split.length * 3.3 + 1;
  });
  rightY += 3.5;

  // 2. INTERNSHIP EXPERIENCE
  rightY = sectionHeader('INTERNSHIP EXPERIENCE', rightColX, rightY, rightColWidth);

  // Canvendor Intern
  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('UI/UX Design Intern', rightColX, rightY);
  rightY += 3.6;

  doc.text('Canvendor software solutions private limited - Nagercoil', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('Nagercoil, (Jun 2025 – Oct 2025)', rightColX, rightY);
  rightY += 3.6;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const internBullets = [
    'Assisted in designing responsive web and mobile interfaces using Figma.',
    'Created wireframes and interactive prototypes for client projects.',
    'Contributed to EMR Healthcare System and HRMS Platform UI design projects.',
  ];
  internBullets.forEach(b => {
    const split = doc.splitTextToSize(`•  ${b}`, rightColWidth - 2);
    doc.text(split, rightColX, rightY, { lineHeightFactor: 1.3 });
    rightY += split.length * 3.3 + 0.8;
  });
  rightY += 2;

  // AK Infopark
  doc.setFont('times', 'bold');
  doc.setFontSize(8.6);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('AK Infopark private limited', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('Nagercoil, (Jan 2025 )', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const akBullets = [
    'Designed responsive web and mobile interfaces using Figma.',
    'Created wireframes and prototypes to improve user experience.',
  ];
  akBullets.forEach(b => {
    const split = doc.splitTextToSize(`•  ${b}`, rightColWidth - 2);
    doc.text(split, rightColX, rightY, { lineHeightFactor: 1.3 });
    rightY += split.length * 3.3 + 0.8;
  });
  rightY += 2;

  // R.K. Motors
  doc.setFont('times', 'bold');
  doc.setFontSize(8.6);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('R.K. Motors (BOSCH Car Service Center), Nagercoil', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('(Jul 2024)', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const rkSplit = doc.splitTextToSize('•  Assisted in vehicle diagnostics, maintenance, and repair operations.', rightColWidth - 2);
  doc.text(rkSplit, rightColX, rightY, { lineHeightFactor: 1.3 });
  rightY += rkSplit.length * 3.3 + 2;

  // Bajaj Bike
  doc.setFont('times', 'bold');
  doc.setFontSize(8.6);
  doc.setTextColor(dark[0], dark[1], dark[2]);
  doc.text('Bajaj Bike Service Center, Nagercoil', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(muted[0], muted[1], muted[2]);
  doc.text('(Jul 2023)', rightColX, rightY);
  rightY += 3.4;

  doc.setFont('times', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  const bajajSplit = doc.splitTextToSize('Gained practical experience in motorcycle maintenance and workshop operations.', rightColWidth - 2);
  doc.text(bajajSplit, rightColX + 3.5, rightY, { lineHeightFactor: 1.3 });
  rightY += bajajSplit.length * 3.3 + 4;

  // 3. SOFT SKILLS
  rightY = sectionHeader('SOFT SKILLS', rightColX, rightY, rightColWidth);
  const softSkills = [
    'Problem Solving',
    'Leadership',
    'Project & Time Management',
    'Team Collaboration',
    'Communication',
  ];
  doc.setFont('times', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(bodyText[0], bodyText[1], bodyText[2]);
  softSkills.forEach(s => {
    doc.text(`•  ${s}`, rightColX + 1, rightY);
    rightY += 3.6;
  });

  // Write file to public/Pon_Vijaya_Prabu_S_Resume.pdf
  const outFile = path.join(outDir, 'Pon_Vijaya_Prabu_S_Resume.pdf');
  const buffer = Buffer.from(doc.output('arraybuffer'));
  fs.writeFileSync(outFile, buffer);
  console.log(`Successfully generated: ${outFile} (${buffer.length} bytes)`);
}

generatePdf();
