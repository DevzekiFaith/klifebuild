import { MemberData } from "../app/components/RegistrationForm";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lifebuildglobal.com.ng";

/**
 * Generate luxury branded HTML email for Sunday Gathering / Membership Pass
 * Features:
 * - Official Lifebuild Logo
 * - Architectural Green Growth Header Banner
 * - Member details & Sunday schedule
 */
export function generateMemberPassEmail(member: MemberData): { subject: string; html: string; text: string } {
  const subject = `Official Lifebuild Attendance Pass — ${member.fullName} [${member.memberId}]`;
  const logoUrl = `${BASE_URL}/images/lifebuild_official_logo.png`;
  const headerBannerUrl = `${BASE_URL}/images/green_architectural_vase.jpg`;

  const text = `
LIFE BUILD GATHERING • OFFICIAL ATTENDANCE PASS
--------------------------------------------------
Welcome, ${member.fullName}!

Your official Life Build Attendance Pass has been issued.

MEMBER DETAILS:
• Member ID: ${member.memberId}
• Full Name: ${member.fullName}
• Calling / Role: ${member.role}
• Attendance Mode: ${member.attendanceMode}
• Date Issued: ${member.joinedDate}

SUNDAY GATHERING INFORMATION:
• Schedule: 2nd & 4th Sunday of Every Month @ 5:00 PM (GMT+1)
• Location: Life Build Gathering Center & Global HD Stream
• Convener: Zeki Ubor
• Scriptural Anchor: Isaiah 58:12 ("And they that shall be of thee shall build the old waste places...")

Keep this email and your Member ID handy for check-in at the entrance or during our global stream broadcasts.

Rebuilding Everywhere You Go & Positioning in the Marketplace.
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
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #18181b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f4f4f5; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; border: 1px solid #e4e4e7; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.08);">
          
          <!-- Top Gold Accent Line -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #d4af37 0%, #3b2262 50%, #d4af37 100%);"></td>
          </tr>

          <!-- Top Brand Logo Header -->
          <tr>
            <td style="padding: 24px 32px 16px 32px; background-color: #ffffff; border-bottom: 1px solid #f4f4f5;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- Official Lifebuild Logo -->
                    <img src="${logoUrl}" alt="Lifebuild Logo" width="140" style="display: block; width: 140px; max-width: 140px; height: auto;" />
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 20px; font-size: 10px; font-family: monospace; color: #15803d; font-weight: bold; letter-spacing: 1px;">
                      ● VERIFIED PASS
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Graphic Header Banner (Green Architectural Vase) -->
          <tr>
            <td style="padding: 0; background-color: #1e3a2b; position: relative;">
              <img src="${headerBannerUrl}" alt="Life Build Gathering Banner" width="600" style="display: block; width: 100%; max-height: 180px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #09090b; letter-spacing: -0.5px;">
                Welcome, ${member.fullName}
              </h2>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #52525b;">
                Your official membership credentials have been confirmed. We are honored to welcome you into our community of kingdom builders, marketplace strategists, and spiritual leaders.
              </p>
            </td>
          </tr>

          <!-- Digital Credential Badge Card -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #18181b; border-radius: 16px; border: 1px solid #27272a; padding: 22px; color: #ffffff;">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa;">MEMBER PASS ID</div>
                          <div style="font-size: 20px; font-family: monospace; font-weight: bold; color: #d4af37; letter-spacing: 1px; margin-top: 2px;">
                            ${member.memberId}
                          </div>
                        </td>
                        <td align="right" style="padding-bottom: 12px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa;">DATE ISSUED</div>
                          <div style="font-size: 12px; font-family: monospace; color: #ffffff; margin-top: 2px;">
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
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">ATTENDANCE MODE</div>
                          <div style="font-size: 13px; color: #f4f4f5; font-weight: 600; margin-top: 2px;">
                            ${member.attendanceMode}
                          </div>
                        </td>
                      </tr>
                    </table>

                    ${member.vision ? `
                    <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed #3f3f46;">
                      <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">DECLARED VISION</div>
                      <div style="font-size: 12px; color: #e4e4e7; font-style: italic; margin-top: 4px; line-height: 1.4;">
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
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafc; border-radius: 14px; border: 1px solid #e2e8f0; padding: 18px;">
                <tr>
                  <td>
                    <div style="font-size: 10px; font-family: monospace; font-weight: bold; color: #0284c7; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;">
                      ✦ SUNDAY GATHERING SCHEDULE
                    </div>
                    <p style="margin: 0 0 4px 0; font-size: 13px; color: #0f172a; font-weight: 700;">
                      2nd &amp; 4th Sunday of Every Month @ 5:00 PM (GMT+1)
                    </p>
                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #64748b;">
                      Join us in-person or via Global Stream. Bring your digital pass or reference your Member ID for speedy check-in.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Scriptural Anchor Quote -->
          <tr>
            <td style="padding: 0 32px 24px 32px; text-align: center;">
              <div style="padding: 14px 18px; background-color: #fefce8; border-radius: 12px; border: 1px solid #fef08a;">
                <p style="margin: 0 0 3px 0; font-size: 12px; font-style: italic; color: #854d0e; line-height: 1.5;">
                  "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach..."
                </p>
                <span style="font-size: 10px; font-family: monospace; color: #a16207; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
                  — Isaiah 58:12
                </span>
              </div>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 32px 28px 32px;">
              <a href="https://www.lifebuildglobal.com.ng" target="_blank" style="display: inline-block; padding: 12px 30px; background-color: #18181b; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; font-weight: bold; letter-spacing: 0.5px; text-transform: uppercase;">
                Access Portal &amp; Live Stream →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #fafafa; border-top: 1px solid #f4f4f5; text-align: center;">
              <p style="margin: 0 0 3px 0; font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
                Life Build Global • 4Tribe Network • Convener: Zeki Ubor
              </p>
              <p style="margin: 0; font-size: 10px; color: #a1a1aa;">
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
 * Generate luxury branded HTML email for 4T Conference Delegate Pass
 * Features:
 * - Official Lifebuild Logo
 * - Gold & Dark Tribal Graphic Header
 * - Delegate Ticket ID & 3-Day Commissioning details
 */
export function generateConferencePassEmail(member: MemberData): { subject: string; html: string; text: string } {
  const subject = `4T Annual Conference Delegate Pass Confirmed — ${member.fullName} [${member.memberId}]`;
  const logoUrl = `${BASE_URL}/images/lifebuild_official_logo.png`;
  const headerBannerUrl = `${BASE_URL}/images/pattern_tribal_gold.jpg`;

  const text = `
4TRIBE NETWORK • ANNUAL 4T FLAGSHIP CONFERENCE PASS
--------------------------------------------------
Delegate: ${member.fullName}
Pass Reference: ${member.memberId}
Category: ${member.role}
Access Mode: ${member.attendanceMode}
Details: ${member.vision}

Your 3-Day Conference Delegate Pass has been provisioned. 
We look forward to an intensive commissioning of builders, investors, and kingdom leaders.

CONFERENCE HIGHLIGHTS:
• 3 Days of Intensive Strategic Reconstruction
• 4T Pillars: Rebuilding, Restoring, Repairing, Replenishing
• Executive Roundtables, Commissioning Sessions & Keynotes

Please present this Pass ID (${member.memberId}) at the delegate registration desk or virtual portal.

Life Build Global • Isaiah 58:12
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
<body style="margin: 0; padding: 0; background-color: #070709; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #070709; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #121217; border-radius: 24px; border: 2px solid #2e2818; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.9);">
          
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
                    <img src="${logoUrl}" alt="Lifebuild Official Logo" width="140" style="display: block; width: 140px; max-width: 140px; height: auto;" />
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 4px 10px; background-color: #121217; border: 1px solid #d4af37; border-radius: 12px; font-size: 9px; font-family: monospace; color: #d4af37; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">
                      4T CONFERENCE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Graphic Header Banner (Gold Tribal Doodle Pattern) -->
          <tr>
            <td style="padding: 0; background-color: #000000; position: relative;">
              <img src="${headerBannerUrl}" alt="4T Conference Banner" width="600" style="display: block; width: 100%; max-height: 190px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Delegate Greeting -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <h2 style="margin: 0 0 6px 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                Commissioning Awaits, ${member.fullName}
              </h2>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #a1a1aa;">
                Your delegate seat has been reserved for the 4T Annual Flagship Gathering. 3 days of intensive commissioning, strategic reconstruction, and marketplace positioning.
              </p>
            </td>
          </tr>

          <!-- Delegate Pass Box -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #1a1924; border-radius: 16px; border: 1px solid #3c3422; padding: 22px;">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa;">DELEGATE PASS ID</div>
                          <div style="font-size: 20px; font-family: monospace; font-weight: bold; color: #d4af37; letter-spacing: 1.5px; margin-top: 2px;">
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
            <td align="center" style="padding: 0 32px 28px 32px;">
              <a href="https://www.lifebuildglobal.com.ng" target="_blank" style="display: inline-block; padding: 12px 32px; background-color: #d4af37; color: #000000; text-decoration: none; border-radius: 50px; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);">
                View Conference Portal →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #07070a; border-top: 1px solid #1f1d18; text-align: center;">
              <p style="margin: 0 0 3px 0; font-size: 11px; font-family: monospace; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">
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
