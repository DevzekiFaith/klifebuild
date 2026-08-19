import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

const PUBLIC_DIR = path.resolve("./public");
const BOOKS_DIR = path.join(PUBLIC_DIR, "books");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");

if (!fs.existsSync(BOOKS_DIR)) {
  fs.mkdirSync(BOOKS_DIR, { recursive: true });
}

// Brand Colors
const PURPLE = rgb(59 / 255, 34 / 255, 98 / 255); // #3b2262
const GOLD = rgb(212 / 255, 175 / 255, 55 / 255);  // #d4af37
const DARK_TEXT = rgb(25 / 255, 23 / 255, 29 / 255);
const MUTED_TEXT = rgb(90 / 255, 85 / 255, 100 / 255);
const LIGHT_BG = rgb(246 / 255, 244 / 255, 249 / 255);
const WHITE = rgb(1, 1, 1);

function sanitizeText(str) {
  if (!str) return "";
  return String(str)
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/[\u2022\u25CF\u2219]/g, "-")
    .replace(/[\u2026]/g, "...")
    .replace(/[^\x20-\x7E\n]/g, ""); // printable ASCII only
}

function safeDrawText(page, text, options) {
  const clean = sanitizeText(text);
  if (!clean.trim()) return;
  page.drawText(clean, options);
}

function wrapText(text, maxWidth, font, fontSize) {
  const clean = sanitizeText(text);
  const paragraphs = clean.split("\n");
  const lines = [];

  for (const para of paragraphs) {
    if (para.trim() === "") {
      lines.push("");
      continue;
    }
    const words = para.split(" ");
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, fontSize);
      if (width <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
  }
  return lines;
}

// Helper to draw clean header & footer on pages
function drawPageChrome(page, fontBold, fontRegular, bookTitle, pageNum, totalPages) {
  const { width, height } = page.getSize();
  
  // Top purple accent line
  page.drawRectangle({
    x: 40,
    y: height - 30,
    width: width - 80,
    height: 3,
    color: PURPLE,
  });

  // Top header text
  safeDrawText(page, "LIFE BUILD GLOBAL | IMPACT READING SERIES", {
    x: 40,
    y: height - 44,
    size: 7.5,
    font: fontBold,
    color: PURPLE,
  });

  const titleUpper = sanitizeText(bookTitle.toUpperCase());
  safeDrawText(page, titleUpper, {
    x: width - 40 - fontRegular.widthOfTextAtSize(titleUpper, 7.5),
    y: height - 44,
    size: 7.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // Bottom footer line
  page.drawRectangle({
    x: 40,
    y: 40,
    width: width - 80,
    height: 1,
    color: rgb(225 / 255, 220 / 255, 235 / 255),
  });

  safeDrawText(page, "Life Build Movement | Isaiah 58:12 | www.lifebuildglobal.com.ng", {
    x: 40,
    y: 26,
    size: 8,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  const pageStr = `Page ${pageNum} of ${totalPages}`;
  safeDrawText(page, pageStr, {
    x: width - 40 - fontBold.widthOfTextAtSize(pageStr, 8),
    y: 26,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });
}

/**
 * =========================================================================
 * BOOK 1: SELF-DISCOVERY: The Blueprint of Divine Identity
 * =========================================================================
 */
async function generateIdentityBook() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const imagePath = path.join(IMAGES_DIR, "book_cover_identity.jpg");
  const imageBytes = fs.readFileSync(imagePath);
  const coverImage = await doc.embedJpg(imageBytes);

  // PAGE 1: COVER & CHAPTER 1
  const page1 = doc.addPage([595.28, 841.89]); // A4
  const { width, height } = page1.getSize();

  // Top Title Banner
  page1.drawRectangle({
    x: 0,
    y: height - 100,
    width: width,
    height: 100,
    color: PURPLE,
  });

  safeDrawText(page1, "LIFE BUILD EMPOWERMENT SERIES - VOL. 1", {
    x: 40,
    y: height - 36,
    size: 9,
    font: fontBold,
    color: GOLD,
  });

  safeDrawText(page1, "SELF-DISCOVERY: THE BLUEPRINT OF DIVINE IDENTITY", {
    x: 40,
    y: height - 60,
    size: 14,
    font: fontBold,
    color: WHITE,
  });

  safeDrawText(page1, "Awakening the Rebuilder Within & Recovering Original Kingdom DNA", {
    x: 40,
    y: height - 80,
    size: 9.5,
    font: fontRegular,
    color: rgb(235 / 255, 225 / 255, 250 / 255),
  });

  // Featured Cover Image (Left column)
  const imgWidth = 200;
  const imgHeight = 265;
  page1.drawImage(coverImage, {
    x: 40,
    y: height - 390,
    width: imgWidth,
    height: imgHeight,
  });

  // Photo caption
  safeDrawText(page1, "The Regal Stature of a Rebuilder", {
    x: 40,
    y: height - 405,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });
  safeDrawText(page1, "Rooted in divine authority and purpose.", {
    x: 40,
    y: height - 418,
    size: 7.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // Scripture Box (Right of image)
  page1.drawRectangle({
    x: 255,
    y: height - 190,
    width: width - 295,
    height: 75,
    color: LIGHT_BG,
    borderColor: PURPLE,
    borderWidth: 1,
  });

  safeDrawText(page1, "ANCHOR SCRIPTURE", {
    x: 270,
    y: height - 132,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });

  const scriptureLines = wrapText(
    '"Before I formed you in the belly I knew you; and before you came forth out of the womb I sanctified you, and I ordained you a prophet unto the nations." - Jeremiah 1:5',
    width - 325,
    fontOblique,
    8.5
  );
  let sY = height - 148;
  for (const line of scriptureLines) {
    safeDrawText(page1, line, { x: 270, y: sY, size: 8.5, font: fontOblique, color: DARK_TEXT });
    sY -= 12;
  }

  // Chapter 1 Introduction (Right Column)
  safeDrawText(page1, "CHAPTER 1: THE CRISIS OF BORROWED IDENTITY", {
    x: 255,
    y: height - 215,
    size: 10,
    font: fontBold,
    color: PURPLE,
  });

  const ch1Text = 
    "The greatest tragedy in human leadership is not failure; it is succeeding in an assignment God never authored for your life. Across Africa and the diaspora, countless high-achieving professionals operate under borrowed expectations-chasing validation in industries and positions detached from their divine blueprint.\n\n" +
    "True self-discovery is not psychological introspection; it is theological alignment. You cannot know what you were engineered to build until you consult the Architect who laid your spiritual foundations (Isaiah 58:12). Identity is the seed from which every lasting institution and generational legacy germinates.";

  const ch1Lines = wrapText(ch1Text, width - 295, fontRegular, 8.5);
  let cY = height - 235;
  for (const line of ch1Lines) {
    if (line === "") {
      cY -= 6;
      continue;
    }
    safeDrawText(page1, line, { x: 255, y: cY, size: 8.5, font: fontRegular, color: DARK_TEXT });
    cY -= 12.5;
  }

  // Lower Full-Width Section
  page1.drawRectangle({
    x: 40,
    y: 55,
    width: width - 80,
    height: 180,
    color: LIGHT_BG,
    borderColor: rgb(225 / 255, 218 / 255, 238 / 255),
    borderWidth: 1,
  });

  safeDrawText(page1, "THE THREE PILLARS OF SPIRITUAL ANCHORAGE", {
    x: 58,
    y: 215,
    size: 10,
    font: fontBold,
    color: PURPLE,
  });

  const p1Text = [
    "1. Divine Origin (Who Conceived You?): You are not an accident of geography or economic cycles. You were sovereignly scheduled for this generation.",
    "2. Apostolic Wiring (How Were You Engineered?): Your unique mix of problem-solving abilities, burdens for societal reform, and creative insight are intentional blueprints for kingdom utility.",
    "3. Territorial Mandate (Where Are You Sent?): Every builder has a geographical and marketplace sphere. Confusion ceases when assignment begins."
  ];

  let pY = 195;
  for (const pt of p1Text) {
    const wrapped = wrapText(pt, width - 116, fontRegular, 8.5);
    for (const w of wrapped) {
      safeDrawText(page1, w, { x: 58, y: pY, size: 8.5, font: fontRegular, color: DARK_TEXT });
      pY -= 12;
    }
    pY -= 4;
  }

  drawPageChrome(page1, fontBold, fontRegular, "Self-Discovery: Divine Identity", 1, 3);

  // PAGE 2: DIAGNOSTIC & DISCOVERY FRAMEWORK
  const page2 = doc.addPage([595.28, 841.89]);
  
  safeDrawText(page2, "CHAPTER 2: DISMANTLING IMPOSTOR SYNDROME & FALSE FOUNDATIONS", {
    x: 40,
    y: height - 70,
    size: 12,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page2, "Recognizing the subtle traps that derail marketplace leaders and kingdom builders.", {
    x: 40,
    y: height - 88,
    size: 9.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // Diagnostic Comparison Table Box
  page2.drawRectangle({
    x: 40,
    y: height - 310,
    width: width - 80,
    height: 200,
    color: WHITE,
    borderColor: PURPLE,
    borderWidth: 1.5,
  });

  // Table Header
  page2.drawRectangle({
    x: 40,
    y: height - 140,
    width: width - 80,
    height: 30,
    color: PURPLE,
  });

  safeDrawText(page2, "SIGNS OF BORROWED IDENTITY", {
    x: 60,
    y: height - 122,
    size: 9,
    font: fontBold,
    color: WHITE,
  });

  safeDrawText(page2, "MARKS OF KINGDOM BLUEPRINT IDENTITY", {
    x: 310,
    y: height - 122,
    size: 9,
    font: fontBold,
    color: GOLD,
  });

  const comparisons = [
    ["Driven by applause, status symbols, and peer comparison", "Fueled by internal conviction, stewardship, and eternal impact"],
    ["Constant burnout: operating outside your divine grace zone", "Supernatural ease: even in intense labor, peace remains uninterrupted"],
    ["Territorial insecurity: threatened by other leaders' growth", "Kingdom collaboration: empowering others to build alongside you"],
    ["Easily paralyzed by economic downturns or shifting trends", "Resilient under pressure: anchored in unshakeable prophetic promise"],
    ["View work purely as transactional survival mechanism", "View work as an altar of reconstruction and national transformation"]
  ];

  let tY = height - 160;
  for (const [left, right] of comparisons) {
    const leftLines = wrapText(`- ${left}`, 230, fontRegular, 8);
    const rightLines = wrapText(`- ${right}`, 230, fontRegular, 8);
    const maxLines = Math.max(leftLines.length, rightLines.length);

    for (let i = 0; i < leftLines.length; i++) {
      safeDrawText(page2, leftLines[i], { x: 55, y: tY - (i * 10), size: 8, font: fontRegular, color: DARK_TEXT });
    }
    for (let i = 0; i < rightLines.length; i++) {
      safeDrawText(page2, rightLines[i], { x: 305, y: tY - (i * 10), size: 8, font: fontRegular, color: PURPLE });
    }

    tY -= (maxLines * 11) + 8;
  }

  // Section: The Rebuilder's Self-Discovery Audit
  safeDrawText(page2, "THE 4-STAGE DISCOVERY AUDIT FOR EXECUTIVES & INNOVATORS", {
    x: 40,
    y: height - 340,
    size: 10.5,
    font: fontBold,
    color: PURPLE,
  });

  const auditSteps = [
    "Stage 01: Audit Your Holy Burdens - What broken system in your nation, industry, or community provokes holy discontent in your spirit? Your burden is a compass to your assignment.",
    "Stage 02: Inventory Your Sovereign Experiences - Review your life trajectory, including setbacks, cultural heritage, and professional milestones. God wastes nothing in building a rebuilder.",
    "Stage 03: Clarify Your Marketplace Mountain - Are you called to Governance, Enterprise, Technology, Media, Education, Family, or Religion? Precision in territory prevents wasted momentum.",
    "Stage 04: Submit to Apostolic Community - Identity is affirmed and refined in the presence of trusted elders and fellow builders. Isolation breeds distortion."
  ];

  let aY = height - 365;
  for (const step of auditSteps) {
    page2.drawRectangle({
      x: 40,
      y: aY - 36,
      width: width - 80,
      height: 44,
      color: LIGHT_BG,
      borderColor: rgb(230 / 255, 225 / 255, 240 / 255),
      borderWidth: 1,
    });

    const lines = wrapText(step, width - 110, fontRegular, 8.5);
    let stY = aY - 6;
    for (const l of lines) {
      safeDrawText(page2, l, { x: 55, y: stY, size: 8.5, font: fontRegular, color: DARK_TEXT });
      stY -= 11.5;
    }
    aY -= 54;
  }

  drawPageChrome(page2, fontBold, fontRegular, "Self-Discovery: Divine Identity", 2, 3);

  // PAGE 3: ACTIVATION, PRAYER & MANIFESTO
  const page3 = doc.addPage([595.28, 841.89]);

  safeDrawText(page3, "CHAPTER 3: THE REBUILDER'S CREED & ACTIVATION", {
    x: 40,
    y: height - 70,
    size: 13,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page3, "Stepping into the marketplace as an anointed repairer of broken foundations.", {
    x: 40,
    y: height - 88,
    size: 9.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // Daily Creed Box in Luxury Purple
  page3.drawRectangle({
    x: 40,
    y: height - 370,
    width: width - 80,
    height: 260,
    color: PURPLE,
  });

  safeDrawText(page3, "THE DAILY REBUILDER'S MANIFESTO", {
    x: 60,
    y: height - 120,
    size: 11,
    font: fontBold,
    color: GOLD,
  });

  const manifestoLines = [
    "1. I confess that my life, intellect, and resources belong sovereignly to Jesus Christ.",
    "2. I refuse the paralysis of fear, imposter syndrome, and false cultural limitations.",
    "3. I am called by God under Isaiah 58:12 to rebuild the old waste places and restore broken paths.",
    "4. In the marketplace, I operate with divine wisdom, uncompromised integrity, and technological excellence.",
    "5. I am not an isolated survivor; I am part of the 4Tribe global army establishing generational wealth.",
    "6. My voice carries apostolic weight, my enterprise creates ethical prosperity, and my legacy will endure."
  ];

  let mY = height - 150;
  for (const m of manifestoLines) {
    const wrapped = wrapText(m, width - 120, fontRegular, 9.5);
    for (const w of wrapped) {
      safeDrawText(page3, w, { x: 60, y: mY, size: 9.5, font: fontRegular, color: WHITE });
      mY -= 14;
    }
    mY -= 6;
  }

  // Prayer of Dedication Box
  page3.drawRectangle({
    x: 40,
    y: 180,
    width: width - 80,
    height: 180,
    color: LIGHT_BG,
    borderColor: PURPLE,
    borderWidth: 1,
  });

  safeDrawText(page3, "PRAYER OF APOSTOLIC COMMISSIONING", {
    x: 60,
    y: 335,
    size: 10,
    font: fontBold,
    color: PURPLE,
  });

  const prayerText = 
    '"Heavenly Father, in the name of Jesus, I surrender every false title, borrowed identity, and generational limitation. Today, I receive the clarity of my original blueprint. Give me the courage of Nehemiah to rebuild broken walls, the wisdom of Solomon to steward wealth, and the single-minded focus of Paul to finish my course. Let my career, business, and leadership reflect Your glory across Africa and the nations. Amen."';

  const prayerLines = wrapText(prayerText, width - 120, fontOblique, 9);
  let prY = 310;
  for (const pl of prayerLines) {
    safeDrawText(page3, pl, { x: 60, y: prY, size: 9, font: fontOblique, color: DARK_TEXT });
    prY -= 13;
  }

  // Call to Action strip
  page3.drawRectangle({
    x: 40,
    y: 60,
    width: width - 80,
    height: 95,
    color: WHITE,
    borderColor: GOLD,
    borderWidth: 1.5,
  });

  safeDrawText(page3, "CONTINUE YOUR JOURNEY WITH THE LIFE BUILD COMMUNITY", {
    x: 60,
    y: 135,
    size: 9.5,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page3, "Join Convener Zeki Ubor and fellow Kingdom builders every 2nd & 4th Sunday @ 5:00 PM GMT+1.", {
    x: 60,
    y: 118,
    size: 8.5,
    font: fontRegular,
    color: DARK_TEXT,
  });

  safeDrawText(page3, "Official Web Portal: www.lifebuildglobal.com.ng | Support: hello@lifebuildglobal.com.ng", {
    x: 60,
    y: 98,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page3, "Life Build Global | 4Tribe Network | Rebuilding Everywhere You Go", {
    x: 60,
    y: 80,
    size: 8,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  drawPageChrome(page3, fontBold, fontRegular, "Self-Discovery: Divine Identity", 3, 3);

  const pdfBytes = await doc.save();
  const destPath = path.join(BOOKS_DIR, "self-discovery-divine-identity.pdf");
  fs.writeFileSync(destPath, pdfBytes);
  console.log("Successfully generated:", destPath);
}

/**
 * =========================================================================
 * BOOK 2: KINGDOM PLACEMENT: Positioning for Marketplace Dominion
 * =========================================================================
 */
async function generatePlacementBook() {
  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await doc.embedFont(StandardFonts.HelveticaOblique);

  const imagePath = path.join(IMAGES_DIR, "book_cover_placement.jpg");
  const imageBytes = fs.readFileSync(imagePath);
  const coverImage = await doc.embedJpg(imageBytes);

  // PAGE 1: COVER & CHAPTER 1
  const page1 = doc.addPage([595.28, 841.89]);
  const { width, height } = page1.getSize();

  // Top Title Banner
  page1.drawRectangle({
    x: 0,
    y: height - 100,
    width: width,
    height: 100,
    color: PURPLE,
  });

  safeDrawText(page1, "LIFE BUILD EMPOWERMENT SERIES - VOL. 2", {
    x: 40,
    y: height - 36,
    size: 9,
    font: fontBold,
    color: GOLD,
  });

  safeDrawText(page1, "KINGDOM PLACEMENT: POSITIONING FOR MARKETPLACE DOMINION", {
    x: 40,
    y: height - 60,
    size: 13,
    font: fontBold,
    color: WHITE,
  });

  safeDrawText(page1, "Strategic Reconstruction, Wealth Transfer & The 4T Framework", {
    x: 40,
    y: height - 80,
    size: 9.5,
    font: fontRegular,
    color: rgb(235 / 255, 225 / 255, 250 / 255),
  });

  // Featured Cover Image (Left column)
  const imgWidth = 200;
  const imgHeight = 265;
  page1.drawImage(coverImage, {
    x: 40,
    y: height - 390,
    width: imgWidth,
    height: imgHeight,
  });

  safeDrawText(page1, "Marketplace Dominion & Strategic Council", {
    x: 40,
    y: height - 405,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });
  safeDrawText(page1, "African executives shaping the economic future.", {
    x: 40,
    y: height - 418,
    size: 7.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // Scripture Box
  page1.drawRectangle({
    x: 255,
    y: height - 190,
    width: width - 295,
    height: 75,
    color: LIGHT_BG,
    borderColor: PURPLE,
    borderWidth: 1,
  });

  safeDrawText(page1, "ANCHOR SCRIPTURE", {
    x: 270,
    y: height - 132,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });

  const scriptureLines = wrapText(
    '"And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion..." - Genesis 1:28',
    width - 325,
    fontOblique,
    8.5
  );
  let sY = height - 148;
  for (const line of scriptureLines) {
    safeDrawText(page1, line, { x: 270, y: sY, size: 8.5, font: fontOblique, color: DARK_TEXT });
    sY -= 12;
  }

  // Chapter 1 Introduction
  safeDrawText(page1, "CHAPTER 1: FROM THE PEW TO THE CITY GATES", {
    x: 255,
    y: height - 215,
    size: 10,
    font: fontBold,
    color: PURPLE,
  });

  const ch1Text = 
    "For too long, the Church has excelled in sanctuary worship while retreating from cultural and economic command centers. Yet biblical history reveals that God's greatest reformers-Joseph in Egypt, Daniel in Babylon, Esther in Shushan, and Nehemiah in Susa-were deployed to strategic governmental and corporate thrones.\n\n" +
    "Kingdom placement is God's sovereign positioning of His sons and daughters at the decision-making tables of human civilization. When righteous leaders govern, the people rejoice (Proverbs 29:2). Marketplace dominion is not about aggressive ambition; it is stewardship of influence for societal flourishing.";

  const ch1Lines = wrapText(ch1Text, width - 295, fontRegular, 8.5);
  let cY = height - 235;
  for (const line of ch1Lines) {
    if (line === "") {
      cY -= 6;
      continue;
    }
    safeDrawText(page1, line, { x: 255, y: cY, size: 8.5, font: fontRegular, color: DARK_TEXT });
    cY -= 12.5;
  }

  // Lower Full-Width Section
  page1.drawRectangle({
    x: 40,
    y: 55,
    width: width - 80,
    height: 180,
    color: LIGHT_BG,
    borderColor: rgb(225 / 255, 218 / 255, 238 / 255),
    borderWidth: 1,
  });

  safeDrawText(page1, "THE THREE LAWS OF MARKETPLACE POSITIONING", {
    x: 58,
    y: 215,
    size: 10,
    font: fontBold,
    color: PURPLE,
  });

  const p1Text = [
    "1. The Law of Undeniable Competence: Daniel was selected not merely for his prayer life, but because he was ten times better in wisdom and understanding than all his peers.",
    "2. The Law of Uncompromising Righteousness: Influence without integrity produces corruption. Kingdom leaders are incorruptible custodians of public trust.",
    "3. The Law of Wealth Transfer: True riches are measured in generational institutions, human empowerment, and systemic solutions that uplift communities."
  ];

  let pY = 195;
  for (const pt of p1Text) {
    const wrapped = wrapText(pt, width - 116, fontRegular, 8.5);
    for (const w of wrapped) {
      safeDrawText(page1, w, { x: 58, y: pY, size: 8.5, font: fontRegular, color: DARK_TEXT });
      pY -= 12;
    }
    pY -= 4;
  }

  drawPageChrome(page1, fontBold, fontRegular, "Kingdom Placement: Marketplace Dominion", 1, 3);

  // PAGE 2: THE 4T REBUILDING FRAMEWORK
  const page2 = doc.addPage([595.28, 841.89]);

  safeDrawText(page2, "CHAPTER 2: THE 4T PILLARS OF TERRITORIAL EXPANSION", {
    x: 40,
    y: height - 70,
    size: 12.5,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page2, "The operational blueprint of the 4Tribe Network anchored in Isaiah 58:12.", {
    x: 40,
    y: height - 88,
    size: 9.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // 4T Grid Cards (4 Boxes)
  const boxWidth = (width - 95) / 2;
  const boxHeight = 135;

  const fourTPillars = [
    {
      num: "01",
      title: "REBUILDING",
      subtitle: "Restoring Broken Foundations",
      desc: "Reconstructing damaged ethical infrastructure in commerce, governance, and technology. Laying bedrock principles that withstand generational shifts."
    },
    {
      num: "02",
      title: "RESTORING",
      subtitle: "Reclaiming Spiritual Authority",
      desc: "Bringing back prophetic clarity, intellectual rigor, and heavenly innovation into boardrooms, hospitals, universities, and creative studios."
    },
    {
      num: "03",
      title: "REPAIRING",
      subtitle: "Healing Societal Breaches",
      desc: "Closing economic and educational divides through enterprise incubators, vocational mastery, and equitable wealth distribution systems."
    },
    {
      num: "04",
      title: "REPLENISHING",
      subtitle: "Multiplying Generational Legacy",
      desc: "Fulfilling the Genesis 1:28 dominion mandate by building financial endowments, scalable enterprises, and mentorship pipelines across Africa."
    }
  ];

  let cardPositions = [
    { x: 40, y: height - 245 },
    { x: 40 + boxWidth + 15, y: height - 245 },
    { x: 40, y: height - 395 },
    { x: 40 + boxWidth + 15, y: height - 395 },
  ];

  for (let i = 0; i < fourTPillars.length; i++) {
    const p = fourTPillars[i];
    const pos = cardPositions[i];

    page2.drawRectangle({
      x: pos.x,
      y: pos.y,
      width: boxWidth,
      height: boxHeight,
      color: LIGHT_BG,
      borderColor: PURPLE,
      borderWidth: 1.2,
    });

    safeDrawText(page2, `${p.num}. ${p.title}`, {
      x: pos.x + 14,
      y: pos.y + boxHeight - 24,
      size: 11,
      font: fontBold,
      color: PURPLE,
    });

    safeDrawText(page2, p.subtitle, {
      x: pos.x + 14,
      y: pos.y + boxHeight - 38,
      size: 8,
      font: fontBold,
      color: GOLD,
    });

    const descLines = wrapText(p.desc, boxWidth - 28, fontRegular, 8);
    let dY = pos.y + boxHeight - 54;
    for (const dl of descLines) {
      safeDrawText(page2, dl, { x: pos.x + 14, y: dY, size: 8, font: fontRegular, color: DARK_TEXT });
      dY -= 11.5;
    }
  }

  // Section: The 7 Mountains Matrix
  safeDrawText(page2, "THE 7 MOUNTAINS OF SOCIETAL INFLUENCE", {
    x: 40,
    y: height - 425,
    size: 10.5,
    font: fontBold,
    color: PURPLE,
  });

  const mountains = 
    "1. Business & Finance - 2. Government & Policy - 3. Media & Communications - 4. Arts & Culture - 5. Education & Academia - 6. Healthcare & Science - 7. Church & Faith\n\n" +
    "Every rebuilder is anointed for at least one mountain. When you locate your mountain, competition dissolves into divine destiny.";

  const mLines = wrapText(mountains, width - 80, fontRegular, 8.5);
  let myY = height - 445;
  for (const ml of mLines) {
    if (ml === "") { myY -= 4; continue; }
    safeDrawText(page2, ml, { x: 40, y: myY, size: 8.5, font: fontRegular, color: DARK_TEXT });
    myY -= 12;
  }

  drawPageChrome(page2, fontBold, fontRegular, "Kingdom Placement: Marketplace Dominion", 2, 3);

  // PAGE 3: EXECUTION & COVENANT COMMISSION
  const page3 = doc.addPage([595.28, 841.89]);

  safeDrawText(page3, "CHAPTER 3: THE 100-YEAR VISION & COVENANT DECLARATION", {
    x: 40,
    y: height - 70,
    size: 12.5,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page3, "Building enduring institutions that outlive generations and glorify God.", {
    x: 40,
    y: height - 88,
    size: 9.5,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  // Covenant Box in Solid Brand Purple
  page3.drawRectangle({
    x: 40,
    y: height - 370,
    width: width - 80,
    height: 260,
    color: PURPLE,
  });

  safeDrawText(page3, "THE MARKETPLACE COVENANT OF DOMINION", {
    x: 60,
    y: height - 120,
    size: 11,
    font: fontBold,
    color: GOLD,
  });

  const covenantStatements = [
    "1. I establish my career, enterprise, and leadership upon the immovable Rock of Jesus Christ.",
    "2. I covenant to deploy my profits, skills, and authority to lift the poor and rebuild broken communities.",
    "3. I reject bribery, exploitation, and ungodly shortcuts, knowing the blessing of the Lord makes rich without sorrow.",
    "4. I will raise up younger builders, opening doors of opportunity for the next generation of African leaders.",
    "5. I operate with international excellence, bringing glory to God in boardroom deliberations and global summits.",
    "6. I stand with the 4Tribe Network to see Isaiah 58:12 manifested across our land in our lifetime."
  ];

  let covY = height - 150;
  for (const c of covenantStatements) {
    const wrapped = wrapText(c, width - 120, fontRegular, 9.5);
    for (const w of wrapped) {
      safeDrawText(page3, w, { x: 60, y: covY, size: 9.5, font: fontRegular, color: WHITE });
      covY -= 14;
    }
    covY -= 6;
  }

  // Closing Apostolic Blessings
  page3.drawRectangle({
    x: 40,
    y: 180,
    width: width - 80,
    height: 180,
    color: LIGHT_BG,
    borderColor: PURPLE,
    borderWidth: 1,
  });

  safeDrawText(page3, "CONVENER'S CHARGE - ZEKI UBOR", {
    x: 60,
    y: 335,
    size: 10,
    font: fontBold,
    color: PURPLE,
  });

  const chargeText = 
    '"You are not just a business person, engineer, doctor, lawyer, or creative. You are an ambassador of the Kingdom of Heaven strategically placed in the earth. The Lord has chosen you to repair the breach and raise up foundations of many generations. Arise, take your place, and build without apology!"';

  const chargeLines = wrapText(chargeText, width - 120, fontOblique, 9);
  let chY = 310;
  for (const cl of chargeLines) {
    safeDrawText(page3, cl, { x: 60, y: chY, size: 9, font: fontOblique, color: DARK_TEXT });
    chY -= 13;
  }

  // Footer Contact Block
  page3.drawRectangle({
    x: 40,
    y: 60,
    width: width - 80,
    height: 95,
    color: WHITE,
    borderColor: GOLD,
    borderWidth: 1.5,
  });

  safeDrawText(page3, "ENGAGE THE 4TRIBE & LIFE BUILD ECOSYSTEM", {
    x: 60,
    y: 135,
    size: 9.5,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page3, "Sunday Vision Gatherings: 2nd & 4th Sunday @ 5:00 PM GMT+1 (Hybrid: Center & Global HD Stream)", {
    x: 60,
    y: 118,
    size: 8.5,
    font: fontRegular,
    color: DARK_TEXT,
  });

  safeDrawText(page3, "Portal: www.lifebuildglobal.com.ng | Annual 4T Flagship Conference Pass & Registration", {
    x: 60,
    y: 98,
    size: 8,
    font: fontBold,
    color: PURPLE,
  });

  safeDrawText(page3, "Life Build Global | Rebuilding Everywhere You Go | Isaiah 58:12", {
    x: 60,
    y: 80,
    size: 8,
    font: fontRegular,
    color: MUTED_TEXT,
  });

  drawPageChrome(page3, fontBold, fontRegular, "Kingdom Placement: Marketplace Dominion", 3, 3);

  const pdfBytes = await doc.save();
  const destPath = path.join(BOOKS_DIR, "kingdom-placement-marketplace-dominion.pdf");
  fs.writeFileSync(destPath, pdfBytes);
  console.log("Successfully generated:", destPath);
}

async function run() {
  await generateIdentityBook();
  await generatePlacementBook();
  console.log("Both books successfully generated in public/books!");
}

run().catch(console.error);
