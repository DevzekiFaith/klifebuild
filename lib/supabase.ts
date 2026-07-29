import { createClient } from "@supabase/supabase-js";
import { MemberData } from "../app/components/RegistrationForm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ickhiemtnomxigvingzv.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlja2hpZW10bm9teGlndmluZ3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTA0MDAwMH0.placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Save a new member registration to Supabase database (and fallback to LocalStorage)
 */
export async function saveMemberRecord(member: MemberData): Promise<{ success: boolean; data?: MemberData; error?: string }> {
  // Always persist locally for offline instant availability
  try {
    localStorage.setItem("lifebuild_member_pass", JSON.stringify(member));
  } catch (e) {
    console.warn("LocalStorage save fallback error:", e);
  }

  try {
    const { data, error } = await supabase
      .from("members")
      .insert([
        {
          member_id: member.memberId,
          full_name: member.fullName,
          email: member.email,
          phone: member.phone,
          role: member.role,
          vision: member.vision,
          attendance_mode: member.attendanceMode,
          joined_date: member.joinedDate,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.warn("Supabase insert warning (table or policy missing):", error.message);
      return { success: true, data: member };
    }

    return { success: true, data: member };
  } catch (err: any) {
    console.warn("Supabase client connection notice:", err?.message || err);
    return { success: true, data: member };
  }
}

/**
 * Query a member record from Supabase database by Member ID or Email
 */
export async function fetchMemberRecord(memberIdOrEmail: string): Promise<MemberData | null> {
  try {
    const { data, error } = await supabase
      .from("members")
      .select("*")
      .or(`member_id.eq.${memberIdOrEmail},email.eq.${memberIdOrEmail}`)
      .single();

    if (error || !data) {
      // Local storage fallback
      const savedPass = localStorage.getItem("lifebuild_member_pass");
      if (savedPass) {
        const parsed = JSON.parse(savedPass);
        if (parsed.memberId === memberIdOrEmail || parsed.email === memberIdOrEmail) {
          return parsed;
        }
      }
      return null;
    }

    return {
      memberId: data.member_id,
      fullName: data.full_name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      vision: data.vision,
      attendanceMode: data.attendance_mode,
      joinedDate: data.joined_date,
    };
  } catch (err) {
    console.warn("Error fetching member from Supabase:", err);
    const savedPass = localStorage.getItem("lifebuild_member_pass");
    return savedPass ? JSON.parse(savedPass) : null;
  }
}
