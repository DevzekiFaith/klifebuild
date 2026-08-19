import { MemberData } from "../app/components/RegistrationForm";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lifebuildglobal.com.ng";

/**
 * Generate exciting luxury branded HTML email for Sunday Gathering / Membership Pass
 * Features:
 * - Official Lifebuild Logo
 * - Happy welcoming community builders photo
 * - Vibrant emojis & inspiring tone
 * - Complete gathering schedule & next steps
 */
export function generateMemberPassEmail(member: MemberData): { subject: string; html: string; text: string } {
  const subject = `🎉 Welcome to the Family, ${member.fullName}! Your Lifebuild Pass is Ready [${member.memberId}]`;
  const logoUrl = `${BASE_URL}/images/lifebuild_official_logo.png`;
  const happyBuildersUrl = `${BASE_URL}/images/welcome_happy_builders.jpg`;

  const text = `
🎉 WELCOME TO THE LIFE BUILD VISION & MOVEMENT!
==================================================
Dear ${member.fullName},

We are thrilled and overjoyed to welcome you into our global community of Kingdom Builders, marketplace strategists, and spiritual reformers! 🙌✨

Your official Life Build Attendance Pass has been successfully provisioned.

🎟️ YOUR OFFICIAL CREDENTIALS:
• Member Pass ID: ${member.memberId}
• Full Name: ${member.fullName}
• Calling / Role: ${member.role}
• Attendance Mode: ${member.attendanceMode}
• Date Issued: ${member.joinedDate}
${member.vision ? `• Declared Vision: "${member.vision}"` : ""}

📅 SUNDAY GATHERING DETAILS:
• When: 2nd & 4th Sunday of Every Month @ 5:00 PM (GMT+1)
• Where: Life Build Gathering Center & Global HD Stream
• Convener: Zeki Ubor
• Anchor Scripture: Isaiah 58:12 ("And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach...")

🚀 3 QUICK STEPS TO GET READY:
1. 📲 Save your Pass ID (${member.memberId}) for quick check-in at the gates.
2. 🗓️ Set a reminder for the 2nd & 4th Sunday @ 5:00 PM GMT+1.
3. 🔥 Come ready for apostolic alignment, prophetic empowerment, and strategic marketplace networking!

We can't wait to fellowship and build with you!

Warm regards,
Zeki Ubor & The Life Build Global Team
https://www.lifebuildglobal.com.ng
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 28px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.06);">
          
          <!-- Top Multi-Tone Gold/Purple Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #d4af37 0%, #3b2262 50%, #d4af37 100%);"></td>
          </tr>

          <!-- Top Brand Logo Header -->
          <tr>
            <td style="padding: 24px 32px 18px 32px; background-color: #ffffff; border-bottom: 1px solid #f1f5f9;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- Official Lifebuild Logo -->
                    <img src="${logoUrl}" alt="Lifebuild Logo" width="145" style="display: block; width: 145px; max-width: 145px; height: auto;" />
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 6px 14px; background-color: #f0fdf4; border: 1px solid #86efac; border-radius: 50px; font-size: 10px; font-family: monospace; color: #166534; font-weight: bold; letter-spacing: 1px;">
                      ● VERIFIED BUILDER
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Happy Welcoming Community Image -->
          <tr>
            <td style="padding: 0; background-color: #0f172a; position: relative;">
              <img src="${happyBuildersUrl}" alt="Life Build Community" width="600" style="display: block; width: 100%; height: auto; max-height: 260px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Exciting Headline & Greeting -->
          <tr>
            <td style="padding: 30px 32px 16px 32px;">
              <div style="display: inline-block; padding: 4px 10px; background-color: #fef3c7; border: 1px solid #fde047; border-radius: 8px; font-size: 11px; font-weight: 700; color: #854d0e; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 10px;">
                ✨ Welcome to the Movement
              </div>
              <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #09090b; letter-spacing: -0.5px; line-height: 1.3;">
                Welcome, ${member.fullName}! 🎉
              </h2>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #475569;">
                We are thrilled to welcome you to <strong>Life Build</strong>! You have just stepped into an anointed ecosystem of visionary builders, innovators, and kingdom strategists dedicated to restoring broken foundations under <strong>Isaiah 58:12</strong>. 🙌🔥
              </p>
            </td>
          </tr>

          <!-- Digital Credential Badge Card -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background: linear-gradient(145deg, #18181b 0%, #111113 100%); border-radius: 20px; border: 1.5px solid #3f3f46; padding: 24px; color: #ffffff; box-shadow: 0 10px 25px rgba(0,0,0,0.25);">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa;">🎟️ OFFICIAL MEMBER PASS ID</div>
                          <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #d4af37; letter-spacing: 1px; margin-top: 4px;">
                            ${member.memberId}
                          </div>
                        </td>
                        <td align="right" style="padding-bottom: 14px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa;">ISSUED</div>
                          <div style="font-size: 12px; font-family: monospace; color: #ffffff; margin-top: 4px;">
                            ${member.joinedDate}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="height: 1px; background-color: #27272a; margin-bottom: 14px;"></div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 8px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">CALLING / ROLE</div>
                          <div style="font-size: 13px; color: #f4f4f5; font-weight: 600; margin-top: 2px;">
                            ${member.role}
                          </div>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 8px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">PARTICIPATION</div>
                          <div style="font-size: 13px; color: #f4f4f5; font-weight: 600; margin-top: 2px;">
                            ${member.attendanceMode}
                          </div>
                        </td>
                      </tr>
                    </table>

                    ${member.vision ? `
                    <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #3f3f46;">
                      <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">YOUR REBUILDING VISION</div>
                      <div style="font-size: 12px; color: #e4e4e7; font-style: italic; margin-top: 4px; line-height: 1.5;">
                        "${member.vision}"
                      </div>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sunday Gathering Details Box -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-family: monospace; font-weight: 800; color: #0284c7; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">
                      📅 SUNDAY GATHERING SCHEDULE &amp; TIME
                    </div>
                    <p style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a; font-weight: 800;">
                      2nd &amp; 4th Sunday of Every Month @ 5:00 PM (GMT+1)
                    </p>
                    <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #64748b;">
                      Join us live in-person at the Life Build Center or globally via our HD livestream broadcast. Present your Pass ID for fast gate entrance!
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3 Steps Callout Box -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #fafaf9; border-radius: 16px; border: 1px solid #e7e5e4; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-family: monospace; font-weight: 800; color: #1c1917; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                      🚀 3 THINGS TO DO RIGHT NOW:
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="28" valign="top" style="font-size: 14px;">1️⃣</td>
                        <td style="font-size: 12px; color: #44403c; line-height: 1.5; padding-bottom: 8px;">
                          <strong>Save your Pass ID:</strong> Keep <code style="background: #e7e5e4; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #1c1917;">${member.memberId}</code> in your phone notes.
                        </td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="font-size: 14px;">2️⃣</td>
                        <td style="font-size: 12px; color: #44403c; line-height: 1.5; padding-bottom: 8px;">
                          <strong>Block your calendar:</strong> Mark 2nd &amp; 4th Sunday @ 5:00 PM GMT+1.
                        </td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="font-size: 14px;">3️⃣</td>
                        <td style="font-size: 12px; color: #44403c; line-height: 1.5;">
                          <strong>Expect transformation:</strong> Come expectant for spiritual clarity and marketplace positioning!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Scriptural Anchor Quote -->
          <tr>
            <td style="padding: 0 32px 24px 32px; text-align: center;">
              <div style="padding: 16px 20px; background-color: #fefce8; border-radius: 14px; border: 1px solid #fef08a;">
                <p style="margin: 0 0 4px 0; font-size: 12px; font-style: italic; color: #854d0e; line-height: 1.5;">
                  "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in."
                </p>
                <span style="font-size: 10px; font-family: monospace; color: #a16207; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                  — Isaiah 58:12
                </span>
              </div>
            </td>
          </tr>

          <!-- Action Button -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="https://www.lifebuildglobal.com.ng" target="_blank" style="display: inline-block; padding: 14px 36px; background-color: #0f172a; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 18px rgba(15, 23, 42, 0.25);">
                Access Member Portal &amp; Live Stream →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #09090b; color: #a1a1aa; text-align: center; border-top: 1px solid #27272a;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-family: monospace; color: #e4e4e7; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">
                Life Build Global • 4Tribe Network
              </p>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #a1a1aa;">
                Convener: <strong>Zeki Ubor</strong> • Lagos, Nigeria &amp; Worldwide
              </p>
              <p style="margin: 0; font-size: 10px; color: #71717a;">
                Rebuilding Everywhere You Go &amp; Positioning in the Marketplace
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject, html, text };
}

/**
 * Generate exciting luxury branded HTML email for 4T Conference Delegate Pass
 * Features:
 * - Official Lifebuild Logo
 * - Gold & Dark Tribal Graphic Header
 * - Happy welcoming community photo
 * - Delegate Ticket ID & 3-Day Commissioning details
 */
export function generateConferencePassEmail(member: MemberData): { subject: string; html: string; text: string } {
  const subject = `🔥 4T Conference Pass Confirmed! Welcome, Delegate ${member.fullName} [${member.memberId}]`;
  const logoUrl = `${BASE_URL}/images/lifebuild_official_logo.png`;
  const headerBannerUrl = `${BASE_URL}/images/pattern_tribal_gold.jpg`;
  const happyBuildersUrl = `${BASE_URL}/images/welcome_happy_builders.jpg`;

  const text = `
🔥 4TRIBE NETWORK • ANNUAL 4T FLAGSHIP CONFERENCE PASS CONFIRMED!
==================================================================
Dear Delegate ${member.fullName},

Congratulations! Your official 3-Day Delegate Pass for the Annual 4T Flagship Conference has been confirmed and reserved. 🚀👑

We are excited to welcome you into this intensive gathering of Kingdom builders, marketplace investors, societal leaders, and spiritual conveners.

🎟️ DELEGATE CREDENTIALS:
• Pass Reference: ${member.memberId}
• Delegate Name: ${member.fullName}
• Category: ${member.role}
• Participation Tier: ${member.attendanceMode}
• Details: ${member.vision}

🌟 CONFERENCE HIGHLIGHTS:
• 3 Days of Intensive Strategic Reconstruction & Apostolic Commissioning
• The 4T Pillars: Rebuilding, Restoring, Repairing, Replenishing
• Executive Roundtables, Wealth Transfer Sessions & Strategic Keynotes

Please keep this email and Pass ID (${member.memberId}) for entrance verification at the delegate desk.

We look forward to building the future with you!

Convener Zeki Ubor & The 4Tribe Leadership Council
Isaiah 58:12 • https://www.lifebuildglobal.com.ng
`.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070709; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #070709; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #121217; border-radius: 28px; border: 2px solid #3c3422; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.9);">
          
          <!-- Top Multi-Tone Gold Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #d4af37 0%, #ffffff 50%, #d4af37 100%);"></td>
          </tr>

          <!-- Top Logo Strip -->
          <tr>
            <td style="padding: 20px 32px; background-color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- Official Lifebuild Logo -->
                    <img src="${logoUrl}" alt="Lifebuild Official Logo" width="145" style="display: block; width: 145px; max-width: 145px; height: auto;" />
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; background-color: #121217; border: 1px solid #d4af37; border-radius: 12px; font-size: 9px; font-family: monospace; color: #d4af37; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">
                      ✦ 4T CONFERENCE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Graphic Header Banner (Gold Tribal Doodle Pattern) -->
          <tr>
            <td style="padding: 0; background-color: #000000; position: relative;">
              <img src="${headerBannerUrl}" alt="4T Conference Banner" width="600" style="display: block; width: 100%; max-height: 180px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Delegate Greeting -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <div style="display: inline-block; padding: 4px 10px; background-color: #272210; border: 1px solid #d4af37; border-radius: 8px; font-size: 10px; font-family: monospace; color: #d4af37; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px;">
                👑 DELEGATE PASS CONFIRMED
              </div>
              <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                Commissioning Awaits, ${member.fullName}! 🚀
              </h2>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #a1a1aa;">
                Your seat has been reserved for the <strong>4T Annual Flagship Gathering</strong>. Prepare for 3 days of intensive commissioning, strategic reconstruction, and marketplace positioning alongside visionary leaders.
              </p>
            </td>
          </tr>

          <!-- Delegate Pass Box -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1a1924; border-radius: 18px; border: 1.5px solid #4a3e20; padding: 22px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa;">🎟️ DELEGATE PASS ID</div>
                          <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #d4af37; letter-spacing: 1.5px; margin-top: 2px;">
                            ${member.memberId}
                          </div>
                        </td>
                        <td align="right" style="padding-bottom: 12px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #10b981; font-weight: bold;">● CONFIRMED</div>
                        </td>
                      </tr>
                    </table>

                    <div style="height: 1px; background-color: #2b2535; margin-bottom: 14px;"></div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 8px; padding-bottom: 10px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a;">DELEGATE CATEGORY</div>
                          <div style="font-size: 13px; color: #f4f4f5; font-weight: 600; margin-top: 2px;">
                            ${member.role}
                          </div>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 8px; padding-bottom: 10px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a;">PARTICIPATION TIER</div>
                          <div style="font-size: 13px; color: #f4f4f5; font-weight: 600; margin-top: 2px;">
                            ${member.attendanceMode}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="padding-top: 10px; border-top: 1px dashed #2b2535;">
                      <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #71717a;">WORKSHOP &amp; VISION FOCUS</div>
                      <div style="font-size: 12px; color: #e4e4e7; margin-top: 3px; line-height: 1.4;">
                        ${member.vision}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Happy Community Photo Inside Conference Email -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius: 16px; overflow: hidden; border: 1px solid #2e2a3a;">
                <tr>
                  <td>
                    <img src="${happyBuildersUrl}" alt="4T Builders Community" width="600" style="display: block; width: 100%; height: auto; max-height: 200px; object-fit: cover;" />
                    <div style="padding: 10px 14px; background-color: #171622; text-align: center; font-size: 11px; font-family: monospace; color: #d4af37;">
                      🤝 Join 100s of Kingdom leaders, investors, and societal builders.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 4T Pillars Banner -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0c0b10; border-radius: 12px; border: 1px solid #232230; padding: 14px;">
                <tr>
                  <td align="center" style="font-size: 10px; font-family: monospace; color: #d4af37; letter-spacing: 1.5px; text-transform: uppercase; font-weight: bold;">
                    REBUILDING • RESTORING • REPAIRING • REPLENISHING
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call to Action -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="https://www.lifebuildglobal.com.ng" target="_blank" style="display: inline-block; padding: 14px 36px; background-color: #d4af37; color: #000000; text-decoration: none; border-radius: 50px; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 18px rgba(212, 175, 55, 0.4);">
                View Conference Portal &amp; Schedule →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #07070a; border-top: 1px solid #1f1d18; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                4Tribe Network • Annual Flagship Gathering • Isaiah 58:12
              </p>
              <p style="margin: 0; font-size: 10px; color: #52525b;">
                Convener: Zeki Ubor • Lagos, Nigeria &amp; Global Network
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

  return { subject, html, text };
}
