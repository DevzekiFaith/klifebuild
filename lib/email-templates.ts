import { MemberData } from "../app/components/RegistrationForm";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lifebuildglobal.com.ng";

/**
 * Generate exciting luxury branded HTML email for Sunday Gathering / Membership Pass
 * Unified with Single Purple Brand Colour (#3b2262) and clean vector SVG icons
 */
export function generateMemberPassEmail(member: MemberData): { subject: string; html: string; text: string } {
  const subject = `Welcome to the Family, ${member.fullName}! Your Lifebuild Pass is Ready [${member.memberId}]`;
  const logoUrl = `${BASE_URL}/images/lifebuild_official_logo.png`;
  const happyBuildersUrl = `${BASE_URL}/images/welcome_happy_builders.jpg`;

  const text = `
WELCOME TO THE LIFE BUILD VISION & MOVEMENT!
==================================================
Dear ${member.fullName},

We are thrilled and overjoyed to welcome you into our global community of Kingdom Builders, marketplace strategists, and spiritual reformers!

Your official Life Build Attendance Pass has been successfully provisioned.

OFFICIAL CREDENTIALS:
• Member Pass ID: ${member.memberId}
• Full Name: ${member.fullName}
• Calling / Role: ${member.role}
• Attendance Mode: ${member.attendanceMode}
• Date Issued: ${member.joinedDate}
${member.vision ? `• Declared Vision: "${member.vision}"` : ""}

SUNDAY GATHERING DETAILS:
• When: 2nd & 4th Sunday of Every Month @ 5:00 PM (GMT+1)
• Where: Life Build Gathering Center & Global HD Stream
• Convener: Zeki Ubor
• Anchor Scripture: Isaiah 58:12 ("And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach...")

3 QUICK STEPS TO GET READY:
1. Save your Pass ID (${member.memberId}) for quick check-in at the gates.
2. Set a reminder for the 2nd & 4th Sunday @ 5:00 PM GMT+1.
3. Come ready for apostolic alignment, prophetic empowerment, and strategic marketplace networking!

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
<body style="margin: 0; padding: 0; background-color: #f6f4f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e1b24;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f6f4f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 26px; border: 1.5px solid #ebe5f2; overflow: hidden; box-shadow: 0 15px 40px rgba(59,34,98,0.07);">
          
          <!-- Top Single Brand Purple Bar -->
          <tr>
            <td style="height: 6px; background-color: #3b2262;"></td>
          </tr>

          <!-- Top Brand Logo Header -->
          <tr>
            <td style="padding: 24px 32px 18px 32px; background-color: #ffffff; border-bottom: 1px solid #f4f0f8;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- Official SVG Logo Lockup in Brand Purple -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right: 10px;">
                          <!-- SVG House + Leaf Icon in Brand Purple (#3b2262) -->
                          <svg width="36" height="36" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 100 26 L 44 72 A 8 8 0 0 0 40 78 L 40 162 A 16 16 0 0 0 56 178 L 144 178 A 16 16 0 0 0 160 162 L 160 80 A 8 8 0 0 0 156 74 L 100 26 Z" stroke="#3b2262" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                            <path d="M 100 176 L 100 106" stroke="#3b2262" stroke-width="13" stroke-linecap="round"/>
                            <path d="M 100 106 C 86 92, 86 64, 100 48 C 114 64, 114 92, 100 106 Z" fill="#3b2262"/>
                            <path d="M 96 112 C 78 116, 52 104, 52 82 C 70 78, 92 94, 96 112 Z" fill="#3b2262"/>
                            <path d="M 104 112 C 122 116, 148 104, 148 82 C 130 78, 108 94, 104 112 Z" fill="#3b2262"/>
                          </svg>
                        </td>
                        <td valign="middle">
                          <div style="font-size: 20px; font-weight: 800; color: #3b2262; letter-spacing: -0.5px; line-height: 1;">
                            lifebuild<span style="color: #3b2262;">.</span>
                          </div>
                          <div style="font-size: 8px; font-family: monospace; font-weight: 700; color: #3b2262; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; opacity: 0.85;">
                            REBUILDING EVERYWHERE YOU GO
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <!-- Purple SVG Verified Badge -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f2fa; border: 1px solid #dcd4e8; border-radius: 50px; padding: 5px 12px;">
                      <tr>
                        <td valign="middle" style="padding-right: 5px;">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#3b2262" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="m9 12 2 2 4-4"/>
                          </svg>
                        </td>
                        <td valign="middle" style="font-size: 10px; font-family: monospace; color: #3b2262; font-weight: 800; letter-spacing: 0.8px;">
                          VERIFIED PASS
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Happy Welcoming Community Image -->
          <tr>
            <td style="padding: 0; background-color: #1e1b24; position: relative;">
              <img src="${happyBuildersUrl}" alt="Life Build Community" width="600" style="display: block; width: 100%; height: auto; max-height: 250px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Headline & Greeting -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <!-- Purple Tagline Pill -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color: #f5f2fa; border: 1px solid #e1d8ee; border-radius: 8px; padding: 4px 10px; margin-bottom: 12px;">
                <tr>
                  <td valign="middle" style="padding-right: 6px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b2262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                  </td>
                  <td valign="middle" style="font-size: 10px; font-weight: 800; color: #3b2262; letter-spacing: 1px; text-transform: uppercase;">
                    OFFICIAL MEMBERSHIP CREDENTIALS
                  </td>
                </tr>
              </table>

              <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 800; color: #1e1b24; letter-spacing: -0.5px; line-height: 1.3;">
                Welcome, ${member.fullName}!
              </h2>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #524e5a;">
                We are thrilled to welcome you to <strong>Life Build</strong>. You have joined a dedicated community of kingdom builders, innovators, and leaders committed to repairing broken foundations under <strong>Isaiah 58:12</strong>.
              </p>
            </td>
          </tr>

          <!-- Digital Credential Badge Card (In Brand Purple) -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #3b2262; border-radius: 20px; border: 1.5px solid #2e1a4d; padding: 24px; color: #ffffff; box-shadow: 0 10px 25px rgba(59,34,98,0.25);">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 14px;">
                          <!-- Ticket Icon + Label -->
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td valign="middle" style="padding-right: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.85;">
                                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                                  <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
                                </svg>
                              </td>
                              <td valign="middle" style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #d6cae6;">
                                MEMBER PASS ID
                              </td>
                            </tr>
                          </table>
                          <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #ffffff; letter-spacing: 1px; margin-top: 4px;">
                            ${member.memberId}
                          </div>
                        </td>
                        <td align="right" style="padding-bottom: 14px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #d6cae6;">ISSUED</div>
                          <div style="font-size: 12px; font-family: monospace; color: #ffffff; margin-top: 4px;">
                            ${member.joinedDate}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="height: 1px; background-color: rgba(255,255,255,0.15); margin-bottom: 14px;"></div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 8px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #d6cae6;">CALLING / ROLE</div>
                          <div style="font-size: 13px; color: #ffffff; font-weight: 600; margin-top: 2px;">
                            ${member.role}
                          </div>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 8px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #d6cae6;">PARTICIPATION MODE</div>
                          <div style="font-size: 13px; color: #ffffff; font-weight: 600; margin-top: 2px;">
                            ${member.attendanceMode}
                          </div>
                        </td>
                      </tr>
                    </table>

                    ${member.vision ? `
                    <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed rgba(255,255,255,0.2);">
                      <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #d6cae6;">DECLARED VISION</div>
                      <div style="font-size: 12px; color: #f4eff9; font-style: italic; margin-top: 4px; line-height: 1.4;">
                        "${member.vision}"
                      </div>
                    </div>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sunday Gathering Details Box (Purple Vector Calendar Icon) -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8f6fb; border-radius: 16px; border: 1.5px solid #e7e0f0; padding: 20px;">
                <tr>
                  <td>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 8px;">
                      <tr>
                        <td valign="middle" style="padding-right: 8px;">
                          <!-- SVG Calendar in Brand Purple -->
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b2262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect width="18" height="18" x="3" y="4" rx="2"/>
                            <path d="M3 10h18"/>
                            <path d="M8 2v4"/>
                            <path d="M16 2v4"/>
                          </svg>
                        </td>
                        <td valign="middle" style="font-size: 11px; font-family: monospace; font-weight: 800; color: #3b2262; text-transform: uppercase; letter-spacing: 1.5px;">
                          SUNDAY GATHERING SCHEDULE
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 0 0 6px 0; font-size: 14px; color: #1e1b24; font-weight: 800;">
                      2nd &amp; 4th Sunday of Every Month @ 5:00 PM (GMT+1)
                    </p>
                    <p style="margin: 0; font-size: 12px; line-height: 1.6; color: #5c5666;">
                      Join us in-person at the Life Build Center or stream globally. Bring your Member Pass ID for seamless check-in verification.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3 Steps Callout Box with Purple SVG Number Icons -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; border: 1.5px solid #e7e0f0; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-family: monospace; font-weight: 800; color: #3b2262; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
                      NEXT STEPS:
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="28" valign="top" style="padding-bottom: 10px;">
                          <!-- Step 1 Purple Badge -->
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #3b2262; color: #ffffff; font-size: 11px; font-weight: bold; text-align: center; line-height: 20px;">1</div>
                        </td>
                        <td style="font-size: 12px; color: #433e4b; line-height: 1.5; padding-bottom: 10px;">
                          <strong>Save your Pass ID:</strong> Keep <code style="background: #f5f2fa; color: #3b2262; padding: 2px 6px; border-radius: 4px; font-weight: bold; border: 1px solid #e1d8ee;">${member.memberId}</code> handy for entrance.
                        </td>
                      </tr>
                      <tr>
                        <td width="28" valign="top" style="padding-bottom: 10px;">
                          <!-- Step 2 Purple Badge -->
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #3b2262; color: #ffffff; font-size: 11px; font-weight: bold; text-align: center; line-height: 20px;">2</div>
                        </td>
                        <td style="font-size: 12px; color: #433e4b; line-height: 1.5; padding-bottom: 10px;">
                          <strong>Mark your Calendar:</strong> Block out 2nd &amp; 4th Sunday @ 5:00 PM GMT+1.
                        </td>
                      </tr>
                      <tr>
                        <td width="28" valign="top">
                          <!-- Step 3 Purple Badge -->
                          <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #3b2262; color: #ffffff; font-size: 11px; font-weight: bold; text-align: center; line-height: 20px;">3</div>
                        </td>
                        <td style="font-size: 12px; color: #433e4b; line-height: 1.5;">
                          <strong>Engage the Vision:</strong> Prepare to be equipped for leadership and marketplace impact.
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
              <div style="padding: 16px 20px; background-color: #fbf9fd; border-radius: 14px; border: 1.5px solid #ebe5f2;">
                <p style="margin: 0 0 4px 0; font-size: 12px; font-style: italic; color: #3b2262; line-height: 1.5; font-weight: 500;">
                  "And they that shall be of thee shall build the old waste places: thou shalt raise up the foundations of many generations; and thou shalt be called, The repairer of the breach, The restorer of paths to dwell in."
                </p>
                <span style="font-size: 10px; font-family: monospace; color: #3b2262; text-transform: uppercase; letter-spacing: 1px; font-weight: 800;">
                  — Isaiah 58:12
                </span>
              </div>
            </td>
          </tr>

          <!-- Action Button in Brand Purple (#3b2262) -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="https://www.lifebuildglobal.com.ng" target="_blank" style="display: inline-block; padding: 14px 36px; background-color: #3b2262; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 6px 20px rgba(59,34,98,0.35);">
                Access Portal &amp; Live Stream →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #1e1b24; color: #a9a3b2; text-align: center; border-top: 1px solid #2e2a36;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-family: monospace; color: #ffffff; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">
                Life Build Global • 4Tribe Network
              </p>
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #c4bdcd;">
                Convener: <strong>Zeki Ubor</strong> • Lagos, Nigeria &amp; Worldwide
              </p>
              <p style="margin: 0; font-size: 10px; color: #847e8e;">
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
 * Unified with Single Purple Brand Colour (#3b2262) and clean vector SVG icons
 */
export function generateConferencePassEmail(member: MemberData): { subject: string; html: string; text: string } {
  const subject = `4T Conference Pass Confirmed — Delegate ${member.fullName} [${member.memberId}]`;
  const logoUrl = `${BASE_URL}/images/lifebuild_official_logo.png`;
  const headerBannerUrl = `${BASE_URL}/images/pattern_tribal_gold.jpg`;
  const happyBuildersUrl = `${BASE_URL}/images/welcome_happy_builders.jpg`;

  const text = `
4TRIBE NETWORK • ANNUAL 4T FLAGSHIP CONFERENCE PASS CONFIRMED
==================================================================
Dear Delegate ${member.fullName},

Congratulations! Your official 3-Day Delegate Pass for the Annual 4T Flagship Conference has been confirmed and reserved.

We are excited to welcome you into this intensive gathering of Kingdom builders, marketplace investors, societal leaders, and spiritual conveners.

DELEGATE CREDENTIALS:
• Pass Reference: ${member.memberId}
• Delegate Name: ${member.fullName}
• Category: ${member.role}
• Participation Tier: ${member.attendanceMode}
• Details: ${member.vision}

CONFERENCE HIGHLIGHTS:
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
<body style="margin: 0; padding: 0; background-color: #0d0b12; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #0d0b12; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #17141f; border-radius: 26px; border: 2px solid #3b2262; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.9);">
          
          <!-- Top Single Brand Purple Bar -->
          <tr>
            <td style="height: 6px; background-color: #3b2262;"></td>
          </tr>

          <!-- Top Logo Strip in White with Purple SVG Logo -->
          <tr>
            <td style="padding: 20px 32px; background-color: #ffffff;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <!-- SVG House + Leaf Icon in Brand Purple (#3b2262) -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="middle" style="padding-right: 10px;">
                          <svg width="36" height="36" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 100 26 L 44 72 A 8 8 0 0 0 40 78 L 40 162 A 16 16 0 0 0 56 178 L 144 178 A 16 16 0 0 0 160 162 L 160 80 A 8 8 0 0 0 156 74 L 100 26 Z" stroke="#3b2262" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                            <path d="M 100 176 L 100 106" stroke="#3b2262" stroke-width="13" stroke-linecap="round"/>
                            <path d="M 100 106 C 86 92, 86 64, 100 48 C 114 64, 114 92, 100 106 Z" fill="#3b2262"/>
                            <path d="M 96 112 C 78 116, 52 104, 52 82 C 70 78, 92 94, 96 112 Z" fill="#3b2262"/>
                            <path d="M 104 112 C 122 116, 148 104, 148 82 C 130 78, 108 94, 104 112 Z" fill="#3b2262"/>
                          </svg>
                        </td>
                        <td valign="middle">
                          <div style="font-size: 20px; font-weight: 800; color: #3b2262; letter-spacing: -0.5px; line-height: 1;">
                            lifebuild<span style="color: #3b2262;">.</span>
                          </div>
                          <div style="font-size: 8px; font-family: monospace; font-weight: 700; color: #3b2262; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px;">
                            4TRIBE NETWORK
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 5px 12px; background-color: #3b2262; border-radius: 12px; font-size: 9px; font-family: monospace; color: #ffffff; font-weight: bold; letter-spacing: 1.5px; text-transform: uppercase;">
                      4T CONFERENCE
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Graphic Header Banner -->
          <tr>
            <td style="padding: 0; background-color: #000000; position: relative;">
              <img src="${headerBannerUrl}" alt="4T Conference Banner" width="600" style="display: block; width: 100%; max-height: 175px; object-fit: cover;" />
            </td>
          </tr>

          <!-- Delegate Greeting -->
          <tr>
            <td style="padding: 28px 32px 16px 32px;">
              <!-- Purple Pill Tag -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="background-color: #241d30; border: 1px solid #3b2262; border-radius: 8px; padding: 4px 10px; margin-bottom: 10px;">
                <tr>
                  <td valign="middle" style="padding-right: 6px;">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d6cae6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                  </td>
                  <td valign="middle" style="font-size: 9px; font-family: monospace; color: #d6cae6; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
                    DELEGATE PASS CONFIRMED
                  </td>
                </tr>
              </table>

              <h2 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                Commissioning Awaits, ${member.fullName}!
              </h2>
              <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #b7b0c2;">
                Your seat has been reserved for the <strong>4T Annual Flagship Gathering</strong>. Prepare for 3 days of intensive commissioning, strategic reconstruction, and marketplace positioning alongside visionary leaders.
              </p>
            </td>
          </tr>

          <!-- Delegate Pass Box in Brand Purple Style -->
          <tr>
            <td style="padding: 0 32px 20px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #231c2d; border-radius: 18px; border: 1.5px solid #3b2262; padding: 22px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <!-- Ticket Icon + Label -->
                          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td valign="middle" style="padding-right: 6px;">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d6cae6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
                                  <path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/>
                                </svg>
                              </td>
                              <td valign="middle" style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #a9a0b8;">
                                DELEGATE PASS ID
                              </td>
                            </tr>
                          </table>
                          <div style="font-size: 22px; font-family: monospace; font-weight: 800; color: #ffffff; letter-spacing: 1.5px; margin-top: 4px;">
                            ${member.memberId}
                          </div>
                        </td>
                        <td align="right" style="padding-bottom: 12px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1.5px; color: #c4b9d4; font-weight: bold;">CONFIRMED</div>
                        </td>
                      </tr>
                    </table>

                    <div style="height: 1px; background-color: #3b2262; margin-bottom: 14px;"></div>

                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td width="50%" style="vertical-align: top; padding-right: 8px; padding-bottom: 10px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a9a0b8;">DELEGATE CATEGORY</div>
                          <div style="font-size: 13px; color: #ffffff; font-weight: 600; margin-top: 2px;">
                            ${member.role}
                          </div>
                        </td>
                        <td width="50%" style="vertical-align: top; padding-left: 8px; padding-bottom: 10px;">
                          <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a9a0b8;">PARTICIPATION TIER</div>
                          <div style="font-size: 13px; color: #ffffff; font-weight: 600; margin-top: 2px;">
                            ${member.attendanceMode}
                          </div>
                        </td>
                      </tr>
                    </table>

                    <div style="padding-top: 10px; border-top: 1px dashed #3b2262;">
                      <div style="font-size: 9px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #a9a0b8;">WORKSHOP &amp; VISION FOCUS</div>
                      <div style="font-size: 12px; color: #e4deec; margin-top: 3px; line-height: 1.4;">
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
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-radius: 16px; overflow: hidden; border: 1.5px solid #3b2262;">
                <tr>
                  <td>
                    <img src="${happyBuildersUrl}" alt="4T Builders Community" width="600" style="display: block; width: 100%; height: auto; max-height: 200px; object-fit: cover;" />
                    <div style="padding: 10px 14px; background-color: #231c2d; text-align: center; font-size: 11px; font-family: monospace; color: #d6cae6;">
                      Connect with hundreds of kingdom leaders, investors, and societal builders.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 4T Pillars Banner in Brand Purple -->
          <tr>
            <td style="padding: 0 32px 24px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #231c2d; border-radius: 12px; border: 1px solid #3b2262; padding: 14px;">
                <tr>
                  <td align="center" style="font-size: 10px; font-family: monospace; color: #ffffff; letter-spacing: 1.5px; text-transform: uppercase; font-weight: bold;">
                    REBUILDING • RESTORING • REPAIRING • REPLENISHING
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Call to Action in Brand Purple (#3b2262) -->
          <tr>
            <td align="center" style="padding: 0 32px 32px 32px;">
              <a href="https://www.lifebuildglobal.com.ng" target="_blank" style="display: inline-block; padding: 14px 36px; background-color: #3b2262; color: #ffffff; text-decoration: none; border-radius: 50px; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 6px 20px rgba(59,34,98,0.45); border: 1px solid #5a3891;">
                View Conference Portal &amp; Schedule →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #0d0b12; border-top: 1px solid #282234; text-align: center;">
              <p style="margin: 0 0 4px 0; font-size: 11px; font-family: monospace; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                4Tribe Network • Annual Flagship Gathering • Isaiah 58:12
              </p>
              <p style="margin: 0; font-size: 10px; color: #8c8596;">
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
