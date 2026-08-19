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

    // 1. Send confirmation pass email to the user with 2 attached ebooks
    const sendResult = await resend.emails.send({
      from: fromEmail,
      to: [member.email],
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

    // 2. Optional: Notify Admin / Convener if RESEND_ADMIN_ALERT_EMAIL is configured
    const adminAlertEmail = process.env.RESEND_ADMIN_ALERT_EMAIL;
    if (adminAlertEmail && adminAlertEmail !== member.email) {
      try {
        await resend.emails.send({
          from: fromEmail,
          to: [adminAlertEmail],
          subject: `[New Registration Alert] ${member.fullName} (${type === "CONFERENCE_PASS" ? "4T Conference" : "Sunday Gathering"})`,
          text: `New registration received:\n\nName: ${member.fullName}\nEmail: ${member.email}\nPhone: ${member.phone}\nRole: ${member.role}\nMode: ${member.attendanceMode}\nID: ${member.memberId}\nVision: ${member.vision}`,
        });
      } catch (adminErr) {
        console.warn("Admin notification alert warning:", adminErr);
      }
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
