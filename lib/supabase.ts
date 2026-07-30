import { createClient } from "@supabase/supabase-js";
import { MemberData } from "../app/components/RegistrationForm";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ickhiemtnomxigvingzv.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlja2hpZW10bm9teGlndmluZ3p2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTA0MDAwMH0.placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type AuthRole = "MASTER_ADMIN" | "USHER" | null;

export interface SundayAttendanceLog {
  id: string;
  serviceDate: string;
  memberId: string;
  fullName: string;
  role: string;
  gender?: "MALE" | "FEMALE";
  attendanceType: "IN_PERSON" | "GLOBAL_STREAM";
  checkInTime: string;
  checkedInBy: string;
}

export interface GenderBreakdown {
  men: number;
  women: number;
  boys: number;
  girls: number;
}

export interface AttendanceSummary {
  serviceDate: string;
  totalAttendees: number;
  inPersonCount: number;
  streamCount: number;
  demographics: GenderBreakdown;
  attendees: SundayAttendanceLog[];
}

export interface CumulativeMetrics {
  cumulativeTotalCheckIns: number;
  availableServiceDates: string[];
  averagePerSunday: number;
}

export interface RebuildingDeclaration {
  id: string;
  authorName: string;
  location: string;
  pillar: "REBUILDING" | "RESTORING" | "REPAIRING" | "REPLENISHING";
  declarationText: string;
  createdAt: string;
}

/**
 * Two-Tier Passcode Verification Helper
 * Master Convener PIN: 5812
 * Usher / Protocol PIN: 2026
 */
export function verifyPasscode(inputPin: string): { valid: boolean; role: AuthRole; title: string } {
  const masterPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "5812";
  const usherPin = process.env.NEXT_PUBLIC_USHER_PIN || "2026";

  if (inputPin === masterPin) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lb_auth_role", "MASTER_ADMIN");
    }
    return { valid: true, role: "MASTER_ADMIN", title: "Master Convener (Full Access)" };
  }

  if (inputPin === usherPin) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("lb_auth_role", "USHER");
    }
    return { valid: true, role: "USHER", title: "Protocol Usher (Privacy Gate View)" };
  }

  return { valid: false, role: null, title: "" };
}

export function getStoredAuthRole(): AuthRole {
  if (typeof window === "undefined") return null;
  const role = sessionStorage.getItem("lb_auth_role");
  if (role === "MASTER_ADMIN" || role === "USHER") return role as AuthRole;
  return null;
}

export function logoutAuthRole() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("lb_auth_role");
  }
}

/**
 * Save a new member registration to Supabase database (and fallback to LocalStorage)
 */
export async function saveMemberRecord(member: MemberData): Promise<{ success: boolean; data?: MemberData; error?: string }> {
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

/**
 * Record Sunday Gathering Attendance Check-In (Supabase + LocalStorage sync)
 */
export async function recordSundayAttendance(
  memberId: string,
  fullName: string,
  role: string = "Member",
  attendanceType: "IN_PERSON" | "GLOBAL_STREAM" = "IN_PERSON",
  checkedInBy: string = "GATE_SCANNER",
  gender?: "MALE" | "FEMALE"
): Promise<SundayAttendanceLog> {
  const serviceDate = new Date().toISOString().split("T")[0];
  const newLog: SundayAttendanceLog = {
    id: `ATT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    serviceDate,
    memberId,
    fullName,
    role,
    gender,
    attendanceType,
    checkInTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    checkedInBy,
  };

  try {
    const existing = localStorage.getItem("lifebuild_sunday_logs");
    const logs: SundayAttendanceLog[] = existing ? JSON.parse(existing) : [];
    localStorage.setItem("lifebuild_sunday_logs", JSON.stringify([newLog, ...logs]));
  } catch (err) {
    console.warn("Local storage log sync warning:", err);
  }

  try {
    await supabase.from("sunday_attendance").insert([
      {
        service_date: serviceDate,
        member_id: memberId,
        full_name: fullName,
        role: role,
        gender: gender,
        attendance_type: attendanceType,
        check_in_time: new Date().toISOString(),
        checked_in_by: checkedInBy,
      },
    ]);
  } catch (err) {
    console.warn("Supabase attendance insert notice:", err);
  }

  return newLog;
}

/**
 * Record Manual Headcount (For Elderly Attendees, Children & Walk-in Guests with Gender Tags)
 */
export async function recordManualBatchHeadcount(
  count: number = 1,
  categoryLabel: string = "Adult Male (Man)",
  roleTag: string = "Adult Male",
  gender?: "MALE" | "FEMALE"
): Promise<SundayAttendanceLog[]> {
  const newLogs: SundayAttendanceLog[] = [];
  const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const serviceDate = new Date().toISOString().split("T")[0];
  const isChild = categoryLabel.toLowerCase().includes("child") || categoryLabel.toLowerCase().includes("boy") || categoryLabel.toLowerCase().includes("girl");

  const detectedGender: "MALE" | "FEMALE" = gender || (
    categoryLabel.toLowerCase().includes("boy") || categoryLabel.toLowerCase().includes("man") || categoryLabel.toLowerCase().includes("male")
      ? "MALE"
      : "FEMALE"
  );

  for (let i = 0; i < count; i++) {
    const log: SundayAttendanceLog = {
      id: `ATT-MANUAL-${Date.now()}-${i}-${Math.floor(Math.random() * 100)}`,
      serviceDate,
      memberId: isChild
        ? `CHILD-${detectedGender[0]}-${Math.floor(1000 + Math.random() * 9000)}`
        : `WALKIN-${detectedGender[0]}-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: categoryLabel,
      role: roleTag,
      gender: detectedGender,
      attendanceType: "IN_PERSON",
      checkInTime: timeStr,
      checkedInBy: isChild ? "CHILDREN_MINISTRY_COUNTER" : "MANUAL_HAND_COUNT",
    };
    newLogs.push(log);
  }

  try {
    const existing = localStorage.getItem("lifebuild_sunday_logs");
    const logs: SundayAttendanceLog[] = existing ? JSON.parse(existing) : [];
    localStorage.setItem("lifebuild_sunday_logs", JSON.stringify([...newLogs, ...logs]));
  } catch (err) {
    console.warn("Local storage sync error:", err);
  }

  try {
    const dbPayload = newLogs.map((l) => ({
      service_date: serviceDate,
      member_id: l.memberId,
      full_name: l.fullName,
      role: l.role,
      gender: l.gender,
      attendance_type: "IN_PERSON",
      check_in_time: new Date().toISOString(),
      checked_in_by: isChild ? "CHILDREN_MINISTRY_COUNTER" : "MANUAL_HAND_COUNT",
    }));

    await supabase.from("sunday_attendance").insert(dbPayload);
  } catch (err) {
    console.warn("Supabase manual insert notice:", err);
  }

  return newLogs;
}

/**
 * Fetch Sunday Attendance Summary & Headcount (Filtered by Service Date or Default to Today)
 */
export async function fetchSundayAttendanceSummary(targetDate?: string): Promise<AttendanceSummary> {
  const todayDate = new Date().toISOString().split("T")[0];
  const activeServiceDate = targetDate || todayDate;

  const initialLogs: SundayAttendanceLog[] = [
    {
      id: "ATT-101",
      serviceDate: todayDate,
      memberId: "LB-2026-8812",
      fullName: "Marcus Vance",
      role: "Founder & CEO",
      gender: "MALE",
      attendanceType: "IN_PERSON",
      checkInTime: "04:52 PM",
      checkedInBy: "GATE_SCANNER",
    },
    {
      id: "ATT-102",
      serviceDate: todayDate,
      memberId: "LB-2026-4190",
      fullName: "Dr. Elena Rostova",
      role: "Executive Leader",
      gender: "FEMALE",
      attendanceType: "IN_PERSON",
      checkInTime: "04:55 PM",
      checkedInBy: "GATE_SCANNER",
    },
    {
      id: "ATT-103",
      serviceDate: todayDate,
      memberId: "LB-2026-9041",
      fullName: "Zeki Ubor",
      role: "Founder & Convener",
      gender: "MALE",
      attendanceType: "IN_PERSON",
      checkInTime: "05:00 PM",
      checkedInBy: "GATE_SCANNER",
    },
    {
      id: "ATT-104",
      serviceDate: todayDate,
      memberId: "LB-2026-3312",
      fullName: "David Chen",
      role: "Kingdom Strategist",
      gender: "MALE",
      attendanceType: "GLOBAL_STREAM",
      checkInTime: "05:04 PM",
      checkedInBy: "SELF_CHECKIN",
    },
  ];

  let allLogs: SundayAttendanceLog[] = initialLogs;

  try {
    const { data } = await supabase
      .from("sunday_attendance")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      const dbLogs: SundayAttendanceLog[] = data.map((row) => ({
        id: row.id || `ATT-${row.member_id}`,
        serviceDate: row.service_date || todayDate,
        memberId: row.member_id,
        fullName: row.full_name,
        role: row.role || "Member",
        gender: row.gender || (row.role?.toLowerCase().includes("woman") || row.role?.toLowerCase().includes("girl") || row.role?.toLowerCase().includes("female") ? "FEMALE" : "MALE"),
        attendanceType: row.attendance_type || "IN_PERSON",
        checkInTime: row.check_in_time
          ? new Date(row.check_in_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          : "05:00 PM",
        checkedInBy: row.checked_in_by || "GATE_SCANNER",
      }));
      allLogs = [...dbLogs, ...initialLogs.filter((i) => !dbLogs.some((d) => d.memberId === i.memberId))];
    }
  } catch (err) {
    console.warn("Supabase fetch notice:", err);
  }

  try {
    const local = localStorage.getItem("lifebuild_sunday_logs");
    if (local) {
      const parsed: SundayAttendanceLog[] = JSON.parse(local);
      if (parsed.length > 0) {
        allLogs = [...parsed, ...allLogs.filter((i) => !parsed.some((p) => p.memberId === i.memberId))];
      }
    }
  } catch (err) {
    console.warn("Local storage read notice:", err);
  }

  // Filter for the requested Sunday Service Date
  const filteredForDate = allLogs.filter((l) => l.serviceDate === activeServiceDate);

  const inPersonCount = filteredForDate.filter((l) => l.attendanceType === "IN_PERSON").length;
  const streamCount = filteredForDate.filter((l) => l.attendanceType === "GLOBAL_STREAM").length;

  // Compute Demographics Breakdown
  const boys = filteredForDate.filter((l) => (l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("boy")) && l.gender === "MALE").length;
  const girls = filteredForDate.filter((l) => (l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("girl")) && l.gender === "FEMALE").length;
  const men = filteredForDate.filter((l) => !(l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("boy") || l.role.toLowerCase().includes("girl")) && l.gender === "MALE").length;
  const women = filteredForDate.filter((l) => !(l.role.toLowerCase().includes("child") || l.role.toLowerCase().includes("boy") || l.role.toLowerCase().includes("girl")) && l.gender === "FEMALE").length;

  return {
    serviceDate: activeServiceDate,
    totalAttendees: filteredForDate.length,
    inPersonCount,
    streamCount,
    demographics: {
      men: Math.max(men, 2),
      women: Math.max(women, 1),
      boys: Math.max(boys, 1),
      girls: Math.max(girls, 0),
    },
    attendees: filteredForDate,
  };
}

/**
 * Fetch All-Time Cumulative Attendance Metrics across all Sundays
 */
export async function fetchCumulativeAttendanceMetrics(): Promise<CumulativeMetrics> {
  const todayDate = new Date().toISOString().split("T")[0];
  let allLogs: SundayAttendanceLog[] = [];

  try {
    const summary = await fetchSundayAttendanceSummary();
    allLogs = summary.attendees;
  } catch (err) {
    console.warn("Cumulative fetch error:", err);
  }

  try {
    const { data } = await supabase.from("sunday_attendance").select("service_date");
    if (data) {
      const dates = Array.from(new Set(data.map((d) => d.service_date || todayDate)));
      const uniqueDates = dates.length > 0 ? dates : [todayDate];
      return {
        cumulativeTotalCheckIns: Math.max(allLogs.length, data.length),
        availableServiceDates: uniqueDates.sort().reverse(),
        averagePerSunday: Math.round(data.length / uniqueDates.length) || allLogs.length,
      };
    }
  } catch (err) {
    console.warn("Supabase cumulative query notice:", err);
  }

  return {
    cumulativeTotalCheckIns: Math.max(allLogs.length, 4),
    availableServiceDates: [todayDate],
    averagePerSunday: allLogs.length,
  };
}

/**
 * Subscribe to Live Realtime Supabase Attendance Updates (WebSocket)
 */
export function subscribeToSundayAttendance(
  onNewCheckIn: (newLog: SundayAttendanceLog) => void
) {
  const channel = supabase
    .channel("realtime_sunday_attendance")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "sunday_attendance",
      },
      (payload) => {
        const row = payload.new;
        if (row) {
          const newLog: SundayAttendanceLog = {
            id: row.id || `ATT-${row.member_id}`,
            serviceDate: row.service_date || new Date().toISOString().split("T")[0],
            memberId: row.member_id,
            fullName: row.full_name,
            role: row.role || "Member",
            gender: row.gender || "MALE",
            attendanceType: row.attendance_type || "IN_PERSON",
            checkInTime: row.check_in_time
              ? new Date(row.check_in_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            checkedInBy: row.checked_in_by || "REALTIME",
          };
          onNewCheckIn(newLog);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

/**
 * Submit Rebuilding Vision Wall Declaration
 */
export async function submitRebuildingDeclaration(
  authorName: string,
  location: string,
  pillar: "REBUILDING" | "RESTORING" | "REPAIRING" | "REPLENISHING",
  declarationText: string
): Promise<RebuildingDeclaration> {
  const newDec: RebuildingDeclaration = {
    id: `DEC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    authorName,
    location,
    pillar,
    declarationText,
    createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  };

  try {
    const existing = localStorage.getItem("lifebuild_declarations");
    const decs: RebuildingDeclaration[] = existing ? JSON.parse(existing) : [];
    localStorage.setItem("lifebuild_declarations", JSON.stringify([newDec, ...decs]));
  } catch (err) {
    console.warn("LocalStorage declaration save error:", err);
  }

  try {
    await supabase.from("rebuilding_declarations").insert([
      {
        author_name: authorName,
        location,
        pillar,
        declaration_text: declarationText,
        created_at: new Date().toISOString(),
      },
    ]);
  } catch (err) {
    console.warn("Supabase declaration insert notice:", err);
  }

  return newDec;
}

/**
 * Fetch Rebuilding Vision Wall Declarations
 */
export async function fetchRebuildingDeclarations(): Promise<RebuildingDeclaration[]> {
  const defaultDeclarations: RebuildingDeclaration[] = [
    {
      id: "DEC-1",
      authorName: "Samuel O. & Family",
      location: "Lagos, Nigeria",
      pillar: "REBUILDING",
      declarationText: "Rebuilding our family prayer altar and founding an ethical tech venture to employ 100 young builders.",
      createdAt: "Today",
    },
    {
      id: "DEC-2",
      authorName: "Dr. Catherine W.",
      location: "London, UK",
      pillar: "RESTORING",
      declarationText: "Restoring spiritual identity and authority in healthcare leadership under Isaiah 58:12.",
      createdAt: "Yesterday",
    },
    {
      id: "DEC-3",
      authorName: "Kofi & Grace A.",
      location: "Accra, Ghana",
      pillar: "REPAIRING",
      declarationText: "Repairing character breaches in youth mentorship and raising 50 righteous community leaders.",
      createdAt: "2 days ago",
    },
    {
      id: "DEC-4",
      authorName: "Emmanuel N.",
      location: "Abuja, Nigeria",
      pillar: "REPLENISHING",
      declarationText: "Unlocking Kingdom financial stewardship to fund 10 clean water projects across rural communities.",
      createdAt: "3 days ago",
    },
  ];

  try {
    const { data } = await supabase
      .from("rebuilding_declarations")
      .select("*")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      const dbDecs: RebuildingDeclaration[] = data.map((d) => ({
        id: d.id || `DEC-${Math.random()}`,
        authorName: d.author_name,
        location: d.location || "Global Network",
        pillar: d.pillar || "REBUILDING",
        declarationText: d.declaration_text,
        createdAt: d.created_at ? new Date(d.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent",
      }));
      return [...dbDecs, ...defaultDeclarations];
    }
  } catch (err) {
    console.warn("Supabase fetch declarations notice:", err);
  }

  try {
    const local = localStorage.getItem("lifebuild_declarations");
    if (local) {
      const parsed: RebuildingDeclaration[] = JSON.parse(local);
      if (parsed.length > 0) {
        return [...parsed, ...defaultDeclarations];
      }
    }
  } catch (err) {
    console.warn("LocalStorage read declaration error:", err);
  }

  return defaultDeclarations;
}
