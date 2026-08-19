import { NextResponse } from "next/server";
import { Resend } from "resend";
import { MemberData } from "../../components/RegistrationForm";
import {
  generateMemberPassEmail,
  generateConferencePassEmail,
} from "../../../lib/email-templates";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, member }: { type: "MEMBER_PASS" | "CONFERENCE_PASS"; member: MemberData } = body;

    if (!member || !member.email || !member.fullName) {
      return NextResponse.json(
        { error: "Missing required member information (email, full name)" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    // Graceful fallback if API key is not configured yet
    if (!apiKey || apiKey.trim() === "" || apiKey === "re_your_api_key_here") {
      console.warn(
        "⚠️ [Resend Service Notice]: RESEND_API_KEY is not set in .env.local. Email sending was simulated for:",
        member.email
      );
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Email dispatch simulated (RESEND_API_KEY not configured in .env.local).",
      });
    }

    const resend = new Resend(apiKey);
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Life Build <onboarding@resend.dev>";

    // Generate appropriate template based on pass type
    const emailData =
      type === "CONFERENCE_PASS"
        ? generateConferencePassEmail(member)
        : generateMemberPassEmail(member);

    // Prepare E-Book Attachments
    const attachments: Array<{ filename: string; content: Buffer }> = [];
    try {
      const fs = await import("fs");
      const path = await import("path");
      const identityBookPath = path.join(process.cwd(), "public", "books", "self-discovery-divine-identity.pdf");
      const placementBookPath = path.join(process.cwd(), "public", "books", "kingdom-placement-marketplace-dominion.pdf");

      if (fs.existsSync(identityBookPath)) {
        attachments.push({
          filename: "Self-Discovery-Divine-Identity.pdf",
          content: fs.readFileSync(identityBookPath),
        });
      }
      if (fs.existsSync(placementBookPath)) {
        attachments.push({
          filename: "Kingdom-Placement-Marketplace-Dominion.pdf",
          content: fs.readFileSync(placementBookPath),
        });
      }
    } catch (attachErr) {
      console.warn("Could not read PDF attachments for email:", attachErr);
    }

    const adminEmail = process.env.RESEND_ADMIN_ALERT_EMAIL || "lifebuildinnovators@gmail.com";

    // 1. Send confirmation pass email to the user with 2 attached ebooks + BCC to admin mailbox
    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: [member.email],
      bcc: [adminEmail],
      subject: emailData.subject,
      html: emailData.html,
      text: emailData.text,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (sendResult.error) {
      console.error("Resend API delivery error:", sendResult.error);
      return NextResponse.json(
        { error: sendResult.error.message || "Failed to dispatch email via Resend" },
        { status: 500 }
      );
    }

    // 2. Also send dedicated admin notification alert with structured attendee details
    try {
      await resend.emails.send({
        from: fromEmail,
        to: [adminEmail],
        subject: `🔔 [Registration Alert] ${member.fullName} (${type === "CONFERENCE_PASS" ? "4T Conference" : "Sunday Gathering"}) [${member.memberId}]`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 24px; background-color: #f6f4f9; color: #1e1b24;">
            <div style="max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1.5px solid #3b2262; padding: 24px; box-shadow: 0 4px 15px rgba(59,34,98,0.1);">
              <h2 style="color: #3b2262; margin-top: 0; font-size: 20px;">🔔 New ${type === "CONFERENCE_PASS" ? "4T Conference Delegate" : "Sunday Gathering Member"} Registered</h2>
              <p style="font-size: 13px; color: #64748b;">A new attendee has registered and received their digital pass and 2 E-Books:</p>
              
              <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin: 16px 0;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262; width: 130px;">Full Name:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${member.fullName}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262;">Email:</td>
                  <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${member.email}" style="color: #3b2262; font-weight: bold;">${member.email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262;">Phone / WhatsApp:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${member.phone || "N/A"}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262;">Role / Category:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${member.role}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262;">Mode:</td>
                  <td style="padding: 8px 0; color: #0f172a;">${member.attendanceMode}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262;">Pass ID:</td>
                  <td style="padding: 8px 0; font-family: monospace; font-weight: bold; color: #d4af37;">${member.memberId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #3b2262;">Vision / Focus:</td>
                  <td style="padding: 8px 0; color: #334155; font-style: italic;">"${member.vision}"</td>
                </tr>
              </table>

              <div style="padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">
                Life Build Global • 4Tribe Network • Admin Alert System
              </div>
            </div>
          </div>
        `,
        text: `New registration received:\n\nName: ${member.fullName}\nEmail: ${member.email}\nPhone: ${member.phone}\nRole: ${member.role}\nMode: ${member.attendanceMode}\nID: ${member.memberId}\nVision: ${member.vision}`,
      });
    } catch (adminErr) {
      console.warn("Admin notification alert warning:", adminErr);
    }

    return NextResponse.json({
      success: true,
      emailId: sendResult.data?.id,
      recipient: member.email,
    });
  } catch (err: any) {
    console.error("API Route /api/send-pass error:", err);
    return NextResponse.json(
      { error: err?.message || "Internal server error occurred while sending email" },
      { status: 500 }
    );
  }
}
