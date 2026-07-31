"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Download, Save, Trash2, Check, Sparkles } from "lucide-react";

interface RebuildersNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MeetingNote {
  id: string;
  date: string;
  title: string;
  scripture: string;
  pillar: string;
  content: string;
  actionItems: string;
}

export default function RebuildersNotesModal({
  isOpen,
  onClose,
}: RebuildersNotesModalProps) {
  const [title, setTitle] = useState("Sunday Gathering — Isaiah 58:12 Reflection");
  const [scripture, setScripture] = useState("Isaiah 58:12");
  const [pillar, setPillar] = useState("01. Rebuilding");
  const [content, setContent] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [savedNotes, setSavedNotes] = useState<MeetingNote[]>([]);
  const [isSavedAlert, setIsSavedAlert] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const existing = localStorage.getItem("lifebuild_meeting_notes");
      if (existing) {
        setSavedNotes(JSON.parse(existing));
      }
    } catch (e) {
      console.error("Failed to load notes:", e);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const newNote: MeetingNote = {
      id: selectedNoteId || `note_${Date.now()}`,
      date: new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      title: title || "Untitled Sanctuary Note",
      scripture: scripture || "Isaiah 58:12",
      pillar,
      content,
      actionItems,
    };

    let updated: MeetingNote[];
    if (selectedNoteId) {
      updated = savedNotes.map((n) => (n.id === selectedNoteId ? newNote : n));
    } else {
      updated = [newNote, ...savedNotes];
    }

    setSavedNotes(updated);
    localStorage.setItem("lifebuild_meeting_notes", JSON.stringify(updated));
    setSelectedNoteId(newNote.id);
    setIsSavedAlert(true);
    setTimeout(() => setIsSavedAlert(false), 2500);
  };

  const handleNewNote = () => {
    setSelectedNoteId(null);
    setTitle("Sunday Gathering Note");
    setScripture("Isaiah 58:12");
    setPillar("01. Rebuilding");
    setContent("");
    setActionItems("");
  };

  const handleSelectNote = (note: MeetingNote) => {
    setSelectedNoteId(note.id);
    setTitle(note.title);
    setScripture(note.scripture);
    setPillar(note.pillar);
    setContent(note.content);
    setActionItems(note.actionItems);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedNotes.filter((n) => n.id !== id);
    setSavedNotes(updated);
    localStorage.setItem("lifebuild_meeting_notes", JSON.stringify(updated));
    if (selectedNoteId === id) {
      handleNewNote();
    }
  };

  const handleDownloadTxt = () => {
    const textData = `LIFEBUILD SANCTUARY MEETING NOTE
Date: ${new Date().toLocaleDateString()}
Title: ${title}
Pillar Focus: ${pillar}
Scriptural Anchor: ${scripture}

--- TEACHING & SPIRITUAL REFLECTIONS ---
${content || "(No reflections recorded)"}

--- 4T ACTION ITEMS & DEPLOYMENT TARGETS ---
${actionItems || "(No action items recorded)"}

— Lifebuild 4Tribe Network • Isaiah 58:12 Mandate`;

    const blob = new Blob([textData], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Lifebuild_Meeting_Note_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-white text-black rounded-3xl shadow-2xl overflow-hidden border border-gray-200 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
        >
          {/* Left Sidebar: Saved Notes List */}
          <div className="lg:col-span-4 bg-zinc-950 text-white p-6 space-y-4 flex flex-col justify-between border-r border-zinc-800">
            <div className="space-y-4 overflow-y-auto max-h-[70vh] pr-1">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#d4af37]">
                  <BookOpen className="w-4 h-4" />
                  <span>Rebuilder Notes</span>
                </div>
                <button
                  onClick={handleNewNote}
                  className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  + New Note
                </button>
              </div>

              <div className="space-y-2">
                {savedNotes.length === 0 ? (
                  <p className="text-xs text-zinc-500 font-light italic pt-4 text-center">
                    No saved notes yet. Start recording your meeting takeaways!
                  </p>
                ) : (
                  savedNotes.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleSelectNote(n)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between group ${
                        selectedNoteId === n.id
                          ? "bg-zinc-900 border-[#d4af37] text-white"
                          : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                      }`}
                    >
                      <div className="space-y-1 pr-2 overflow-hidden">
                        <span className="text-[9px] font-mono text-[#d4af37] font-bold block truncate">
                          {n.date} • {n.pillar}
                        </span>
                        <h4 className="font-heading font-bold text-xs text-white truncate">
                          {n.title}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => handleDelete(n.id, e)}
                        className="text-zinc-600 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                        title="Delete note"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
              Isaiah 58:12 Marketplace Journal
            </div>
          </div>

          {/* Right Column: Note Editor */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
                  Sunday Gathering Journal
                </span>
                <h3 className="font-serif-headline text-2xl text-black">
                  Sanctuary Notes & 4T Action Items
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-zinc-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Note Fields */}
            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-500 uppercase text-[9px] font-bold block mb-1">
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black font-sans text-xs font-medium"
                    placeholder="e.g., Grounding & 4T Leadership"
                  />
                </div>

                <div>
                  <label className="text-zinc-500 uppercase text-[9px] font-bold block mb-1">
                    4T Pillar Focus
                  </label>
                  <select
                    value={pillar}
                    onChange={(e) => setPillar(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black font-sans text-xs"
                  >
                    <option value="01. Rebuilding">01. Rebuilding (Walls & Systems)</option>
                    <option value="02. Restoring">02. Restoring (Identity & Calling)</option>
                    <option value="03. Repairing">03. Repairing (Breaches & Community)</option>
                    <option value="04. Replenishing">04. Replenishing (Overflow & Legacy)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-zinc-500 uppercase text-[9px] font-bold block mb-1">
                  Scriptural Anchor
                </label>
                <input
                  type="text"
                  value={scripture}
                  onChange={(e) => setScripture(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black font-mono text-xs"
                  placeholder="e.g., Isaiah 58:12"
                />
              </div>

              <div>
                <label className="text-zinc-500 uppercase text-[9px] font-bold block mb-1">
                  Teaching Notes & Spiritual Insights
                </label>
                <textarea
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black font-sans text-xs font-light leading-relaxed resize-none"
                  placeholder="Write your key takeaways, divine impressions, and teaching points during the gathering..."
                />
              </div>

              <div>
                <label className="text-zinc-500 uppercase text-[9px] font-bold block mb-1">
                  Weekly 4T Action Items & Marketplace Deployment
                </label>
                <textarea
                  rows={3}
                  value={actionItems}
                  onChange={(e) => setActionItems(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-black focus:outline-none focus:border-black font-sans text-xs font-light leading-relaxed resize-none"
                  placeholder="List your specific action steps for the workweek ahead..."
                />
              </div>
            </div>

            {/* Actions Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-full bg-black text-white font-mono text-xs font-bold uppercase hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{selectedNoteId ? "Update Note" : "Save Note"}</span>
                </button>

                <button
                  onClick={handleDownloadTxt}
                  className="px-4 py-2.5 rounded-full border border-gray-300 text-zinc-700 font-mono text-xs hover:border-black transition-colors flex items-center gap-1.5 cursor-pointer bg-white"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-600" />
                  <span>Download .txt</span>
                </button>
              </div>

              {isSavedAlert && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-mono text-emerald-700 font-bold flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Note Saved!
                </motion.span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
