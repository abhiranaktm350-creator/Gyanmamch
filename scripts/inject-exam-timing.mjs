import fs from "node:fs";
const file = "dist/index.html";
let html = fs.readFileSync(file, "utf8");

function replaceOnce(oldText, newText, label) {
  const count = html.split(oldText).length - 1;
  if (count !== 1) throw new Error(label + ": expected one match, found " + count);
  html = html.replace(oldText, newText);
}
function replaceExamObject(id, lines) {
  const at = html.indexOf("id: '" + id + "'");
  if (at < 0) throw new Error("Missing exam object: " + id);
  const start = html.lastIndexOf("\n          {", at) + 1;
  const close = html.indexOf("\n          },", at);
  if (start <= 0 || close < 0) throw new Error("Unable to isolate exam object: " + id);
  html = html.slice(0, start) + lines.join("\n") + html.slice(close + "\n          }".length);
}

replaceExamObject("ex_ssc_cgl", [
"          {",
"            id: 'ex_ssc_cgl', categoryId: 'cat_ssc', code: 'SSC-CGL-T1', name: 'SSC CGL Tier-I (4 × 15-minute sectional timers)',",
"            syllabus: 'General Intelligence & Reasoning (15m) + General Awareness (15m) + Quantitative Aptitude (15m) + English Comprehension (15m) • 100 Qs in 60 Mins (+2.00 / -0.50)',",
"            duration: 60, totalMarks: 200, posMarks: 2.0, negMarks: 0.50, officialQs: 100, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_ga', 'sub_quant', 'sub_english', 'sub_science'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-cgl-2026-tier1-v1',",
"            timingVerificationNote: 'SSC CGL 2026 official notification: four separately timed subjects, 15 minutes each.',",
"            sessionConfig: [",
"              { id: 'cgl1_reasoning', name: 'Section 1: General Intelligence & Reasoning (15m)', name_hi: 'सामान्य बुद्धिमत्ता एवं तर्कशक्ति (15 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 },",
"              { id: 'cgl1_ga', name: 'Section 2: General Awareness (15m)', name_hi: 'सामान्य जागरूकता (15 मिनट)', subjectId: 'sub_ga', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 },",
"              { id: 'cgl1_quant', name: 'Section 3: Quantitative Aptitude (15m)', name_hi: 'मात्रात्मक अभियोग्यता (15 मिनट)', subjectId: 'sub_quant', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 },",
"              { id: 'cgl1_english', name: 'Section 4: English Comprehension (15m)', name_hi: 'अंग्रेजी बोधगम्यता (15 मिनट)', subjectId: 'sub_english', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ssc_chsl", [
"          {",
"            id: 'ex_ssc_chsl', categoryId: 'cat_ssc', code: 'SSC-CHSL-T1', name: 'SSC CHSL Tier-I (4 × 15-minute sectional timers)',",
"            syllabus: 'English Language (15m) + General Intelligence (15m) + Quantitative Aptitude (15m) + General Awareness (15m) • 100 Qs in 60 Mins (+2.00 / -0.50)',",
"            duration: 60, totalMarks: 200, posMarks: 2.0, negMarks: 0.50, officialQs: 100, isSample: false,",
"            allowedSubjects: ['sub_english', 'sub_reasoning', 'sub_quant', 'sub_ga', 'sub_science'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-chsl-2026-tier1-v1',",
"            timingVerificationNote: 'SSC CHSL 2026 official notification: four separately timed subjects, 15 minutes each.',",
"            sessionConfig: [",
"              { id: 'chsl1_english', name: 'Section 1: English Language (15m)', name_hi: 'अंग्रेजी भाषा (15 मिनट)', subjectId: 'sub_english', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 },",
"              { id: 'chsl1_reasoning', name: 'Section 2: General Intelligence (15m)', name_hi: 'सामान्य बुद्धिमत्ता (15 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 },",
"              { id: 'chsl1_quant', name: 'Section 3: Quantitative Aptitude (15m)', name_hi: 'मात्रात्मक अभियोग्यता (15 मिनट)', subjectId: 'sub_quant', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 },",
"              { id: 'chsl1_ga', name: 'Section 4: General Awareness (15m)', name_hi: 'सामान्य जागरूकता (15 मिनट)', subjectId: 'sub_ga', durationMinutes: 15, posMarks: 2.0, negMarks: 0.50 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ssc_cgl_t2", [
"          {",
"            id: 'ex_ssc_cgl_t2', categoryId: 'cat_ssc', code: 'SSC-CGL-T2', name: 'SSC CGL Tier-II Paper-I (Official 2026 sectional CBT)',",
"            syllabus: 'Session-I: Section-I Maths + Reasoning (60m) + Section-II English + General Awareness (60m) + Section-III Computer Knowledge (15m) = 135m. Session-II: DEST 15m separate. (+3 / -1).',",
"            duration: 135, totalMarks: 450, posMarks: 3.0, negMarks: 1.00, officialQs: 150, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_english', 'sub_ga', 'sub_computer'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-cgl-2026-tier2-v4',",
"            timingVerificationNote: 'SSC CGL 2026 official notification: Section-I Maths + Reasoning 60m; Section-II English + GA 60m; Section-III Computer 15m. DEST is separate Session-II.',",
"            separateSkillSession: { id: 'cgl2_dest', name: 'Session-II: Data Entry Speed Test (DEST)', durationMinutes: 15, mode: 'typing', note: 'Separate skill test, not part of the 135-minute objective Session-I.' },",
"            sessionConfig: [",
"              { id: 'cgl2_section1', name: 'Section-I: Mathematical Abilities + Reasoning (60m)', name_hi: 'अनुभाग-I: गणितीय क्षमता एवं तर्कशक्ति (60 मिनट)', subjectIds: ['sub_quant', 'sub_reasoning'], durationMinutes: 60, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_section2', name: 'Section-II: English + General Awareness (60m)', name_hi: 'अनुभाग-II: अंग्रेजी एवं सामान्य जागरूकता (60 मिनट)', subjectIds: ['sub_english', 'sub_ga'], durationMinutes: 60, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_section3', name: 'Section-III: Computer Knowledge (15m)', name_hi: 'अनुभाग-III: कंप्यूटर ज्ञान (15 मिनट)', subjectId: 'sub_computer', durationMinutes: 15, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ssc_chsl_t2", [
"          {",
"            id: 'ex_ssc_chsl_t2', categoryId: 'cat_ssc', code: 'SSC-CHSL-T2', name: 'SSC CHSL Tier-II (Official 2026 sectional CBT)',",
"            syllabus: 'Session-I: Section-I Maths + Reasoning (60m) + Section-II English + General Awareness (60m) + Section-III Computer Knowledge (15m) = 135m. Session-II: post-specific Skill/Typing Test separate. (+3 / -1).',",
"            duration: 135, totalMarks: 405, posMarks: 3.0, negMarks: 1.00, officialQs: 135, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_english', 'sub_ga', 'sub_computer'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-chsl-2026-tier2-v4',",
"            timingVerificationNote: 'SSC CHSL 2026 official notification: Section-I Maths + Reasoning 60m; Section-II English + GA 60m; Section-III Computer 15m. Skill/Typing is separate Session-II.',",
"            separateSkillSession: { id: 'chsl2_skill', name: 'Session-II Skill / Typing Test (post-specific)', durationMinutes: 15, durationOptions: [15, 10], mode: 'typing', note: 'DEO Skill Test: 15 minutes; LDC/JSA Typing Test: 10 minutes.' },",
"            sessionConfig: [",
"              { id: 'chsl2_section1', name: 'Section-I: Mathematical Abilities + Reasoning (60m)', name_hi: 'अनुभाग-I: गणितीय क्षमता एवं तर्कशक्ति (60 मिनट)', subjectIds: ['sub_quant', 'sub_reasoning'], durationMinutes: 60, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'chsl2_section2', name: 'Section-II: English + General Awareness (60m)', name_hi: 'अनुभाग-II: अंग्रेजी एवं सामान्य जागरूकता (60 मिनट)', subjectIds: ['sub_english', 'sub_ga'], durationMinutes: 60, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'chsl2_section3', name: 'Section-III: Computer Knowledge (15m)', name_hi: 'अनुभाग-III: कंप्यूटर ज्ञान (15 मिनट)', subjectId: 'sub_computer', durationMinutes: 15, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ssc_mts", [
"          {",
"            id: 'ex_ssc_mts', categoryId: 'cat_ssc', code: 'SSC-MTS', name: 'SSC MTS & Havaldar (latest notified two-session CBT)',",
"            syllabus: 'Session-I: Numerical & Mathematical Ability + Reasoning (40 Qs, 45m, +3/0). Session-II: General Awareness + English (50 Qs, 45m, +3/-1).',",
"            duration: 90, totalMarks: 270, posMarks: 3.0, negMarks: 1.00, officialQs: 90, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_ga', 'sub_english'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-mts-latest-notice-session-v3',",
"            timingVerificationNote: 'Latest available SSC MTS notification: two 45-minute sessions. The 2026 notification was not yet published at research time.',",
"            sessionConfig: [",
"              { id: 'sess_mts_1', timerMode: 'session', name: 'Session-I: Numerical Ability + Reasoning (45m)', name_hi: 'सत्र-I: संख्यात्मक योग्यता एवं तर्कशक्ति (45 मिनट)', subjectIds: ['sub_quant', 'sub_reasoning'], durationMinutes: 45, posMarks: 3.0, negMarks: 0.00 },",
"              { id: 'sess_mts_2', timerMode: 'session', name: 'Session-II: General Awareness + English (45m)', name_hi: 'सत्र-II: सामान्य जागरूकता एवं अंग्रेजी (45 मिनट)', subjectIds: ['sub_ga', 'sub_science', 'sub_english'], durationMinutes: 45, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_rrb_po", [
"          {",
"            id: 'ex_ibps_rrb_po', categoryId: 'cat_banking', code: 'IBPS-RRB-OS1', name: 'IBPS RRB Officer Scale-I Prelims (45-minute composite CBT)',",
"            syllabus: 'Reasoning (40 Qs) + Quantitative Aptitude (40 Qs) • 80 questions in 45 minutes (+1 / -0.25). One combined timer; no sectional lock.',",
"            duration: 45, totalMarks: 80, posMarks: 1.0, negMarks: 0.25, officialQs: 80, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_quant'], hasSectionalTiming: false, timingProfileVersion: 'ibps-rrb-po-xv-composite-v3',",
"            timingVerificationNote: 'IBPS RRB Officer Scale-I Prelims: 45 minutes composite timing.'",
"          }"
]);

replaceExamObject("ex_ibps_rrb_oa", [
"          {",
"            id: 'ex_ibps_rrb_oa', categoryId: 'cat_banking', code: 'IBPS-RRB-OA', name: 'IBPS RRB Office Assistant Prelims (45-minute composite CBT)',",
"            syllabus: 'Reasoning (40 Qs) + Numerical Ability (40 Qs) • 80 questions in 45 minutes (+1 / -0.25). One combined timer; no sectional lock.',",
"            duration: 45, totalMarks: 80, posMarks: 1.0, negMarks: 0.25, officialQs: 80, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_quant'], hasSectionalTiming: false, timingProfileVersion: 'ibps-rrb-oa-xv-composite-v3',",
"            timingVerificationNote: 'IBPS RRB Office Assistant Prelims: 45 minutes composite timing.'",
"          }"
]);

replaceExamObject("ex_ssc_cgl_t2", [
"          {",
"            id: 'ex_ssc_cgl_t2', categoryId: 'cat_ssc', code: 'SSC-CGL-T2', name: 'SSC CGL Tier-II Paper-I (Official 2026 sectional CBT)',",
"            syllabus: 'Session-I: Maths 30m + Reasoning 30m + English 40m + General Awareness 20m + Computer Knowledge 15m = 135m. Session-II: DEST 15m separate. (+3 / -1).',",
"            duration: 135, totalMarks: 450, posMarks: 3.0, negMarks: 1.00, officialQs: 150, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_english', 'sub_ga', 'sub_computer'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-cgl-2026-tier2-v3',",
"            timingVerificationNote: 'SSC CGL 2026 notification: Maths 30m, Reasoning 30m, English 40m, GA 20m, Computer 15m; DEST is separate.',",
"            separateSkillSession: { id: 'cgl2_dest', name: 'Session-II: Data Entry Speed Test (DEST)', durationMinutes: 15, mode: 'typing', note: 'Separate skill test, not part of the 135-minute objective Session-I.' },",
"            sessionConfig: [",
"              { id: 'cgl2_math', name: 'Section-I A: Mathematical Abilities (30m)', name_hi: 'अनुभाग-I A: गणितीय क्षमता (30 मिनट)', subjectId: 'sub_quant', durationMinutes: 30, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_reasoning', name: 'Section-I B: Reasoning & General Intelligence (30m)', name_hi: 'अनुभाग-I B: तर्कशक्ति (30 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 30, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_english', name: 'Section-II A: English Language (40m)', name_hi: 'अनुभाग-II A: अंग्रेजी भाषा (40 मिनट)', subjectId: 'sub_english', durationMinutes: 40, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_ga', name: 'Section-II B: General Awareness (20m)', name_hi: 'अनुभाग-II B: सामान्य जागरूकता (20 मिनट)', subjectId: 'sub_ga', durationMinutes: 20, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_computer', name: 'Section-III: Computer Knowledge (15m)', name_hi: 'अनुभाग-III: कंप्यूटर ज्ञान (15 मिनट)', subjectId: 'sub_computer', durationMinutes: 15, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_po_mains", [
"          {",
"            id: 'ex_ibps_po_mains', categoryId: 'cat_banking', code: 'IBPS-PO-MAINS', name: 'IBPS PO Mains (CRP PO/MT-XVI 2026)',",
"            syllabus: 'Objective: Reasoning (45m) + General/Economy/Banking Awareness (35m) + English (35m) + Data Analysis & Interpretation (45m) = 160m. Descriptive paper (30m) is separate.',",
"            duration: 160, totalMarks: 200, posMarks: 1.0, negMarks: 0.25, officialQs: 170, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_ga', 'sub_english', 'sub_quant'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ibps-po-xvi-2026-v1',",
"            timingVerificationNote: 'CRP PO/MT-XVI 2026 notification: four separately timed objective tests totaling 160 minutes; descriptive paper is a separate 30-minute test.',",
"            separateSkillSession: { id: 'ibps_po_descriptive', name: 'Descriptive Paper: Essay and Comprehension', durationMinutes: 30, mode: 'writing', note: 'Separate descriptive test after the objective Mains paper.' },",
"            sessionConfig: [",
"              { id: 'po16_reasoning', name: 'Reasoning (45m)', name_hi: 'तर्कशक्ति (45 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 45, posMarks: 1.5, negMarks: 0.375 },",
"              { id: 'po16_awareness', name: 'General / Economy / Banking Awareness (35m)', name_hi: 'सामान्य / अर्थव्यवस्था / बैंकिंग जागरूकता (35 मिनट)', subjectId: 'sub_ga', durationMinutes: 35, posMarks: 1.2, negMarks: 0.30 },",
"              { id: 'po16_english', name: 'English Language (35m)', name_hi: 'अंग्रेजी भाषा (35 मिनट)', subjectId: 'sub_english', durationMinutes: 35, posMarks: 0.5, negMarks: 0.125 },",
"              { id: 'po16_data', name: 'Data Analysis & Interpretation (45m)', name_hi: 'डेटा विश्लेषण एवं व्याख्या (45 मिनट)', subjectId: 'sub_quant', durationMinutes: 45, posMarks: 1.5, negMarks: 0.375 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_clerk_mains", [
"          {",
"            id: 'ex_ibps_clerk_mains', categoryId: 'cat_banking', code: 'IBPS-CSA-MAINS', name: 'IBPS CSA Mains (CRP CSA-XVI 2026)',",
"            syllabus: 'General / Financial Awareness (20m) + General English (35m) + Reasoning Ability (35m) + Quantitative Aptitude (35m) = 125 minutes.',",
"            duration: 125, totalMarks: 200, posMarks: 1.0, negMarks: 0.25, officialQs: 160, isSample: false,",
"            allowedSubjects: ['sub_ga', 'sub_english', 'sub_reasoning', 'sub_quant'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ibps-csa-xvi-2026-v1',",
"            timingVerificationNote: 'CRP CSA-XVI 2026 notification: four separately timed objective tests totaling 125 minutes.',",
"            sessionConfig: [",
"              { id: 'csa16_ga', name: 'General / Financial Awareness (20m)', name_hi: 'सामान्य / वित्तीय जागरूकता (20 मिनट)', subjectId: 'sub_ga', durationMinutes: 20, posMarks: 1.25, negMarks: 0.3125 },",
"              { id: 'csa16_english', name: 'General English (35m)', name_hi: 'सामान्य अंग्रेजी (35 मिनट)', subjectId: 'sub_english', durationMinutes: 35, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'csa16_reasoning', name: 'Reasoning Ability (35m)', name_hi: 'तर्कशक्ति (35 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 35, posMarks: 1.5, negMarks: 0.375 },",
"              { id: 'csa16_quant', name: 'Quantitative Aptitude (35m)', name_hi: 'मात्रात्मक योग्यता (35 मिनट)', subjectId: 'sub_quant', durationMinutes: 35, posMarks: 1.25, negMarks: 0.3125 }",
"            ]",
"          }"
]);


replaceOnce(
  `        const normalizedSections = Array.isArray(test.sections) ? test.sections : [];`,
  `        const normalizedSections = Array.isArray(test.sections) ? test.sections : [];
        if (hasSecTiming) {
          const sectionRank = function(question) { const idx = normalizedSections.findIndex(function(section) { return cbtSectionContainsQuestion(section, question); }); return idx < 0 ? 999 : idx; };
          questionsList.sort(function(a, b) { return sectionRank(a) - sectionRank(b); });
          const firstAvailableSection = normalizedSections.findIndex(function(section) { return questionsList.some(function(question) { return cbtSectionContainsQuestion(section, question); }); });
          if (firstAvailableSection >= 0) test._firstAvailableSectionIndex = firstAvailableSection;
        }`,
  "sort questions by the latest official section profile"
);
replaceOnce(
  "          activeSectionIndex: 0,",
  "          activeSectionIndex: hasSecTiming && Number.isInteger(test._firstAvailableSectionIndex) ? test._firstAvailableSectionIndex : 0,",
  "start the first section that actually contains questions"
);
replaceOnce(
  "          sectionRemainingSeconds: firstSecMins * 60,",
  "          sectionRemainingSeconds: (hasSecTiming && Number.isInteger(test._firstAvailableSectionIndex) ? Number(normalizedSections[test._firstAvailableSectionIndex].durationMinutes || firstSecMins) : firstSecMins) * 60,",
  "load the selected section's official duration"
);

const longQuestionCss = `
<style id="gm-cbt-long-question-fix">
  /* Long stems/options must expand the exam card; the question column owns scrolling. */
  #cbtOverlay > .flex-1.flex.flex-row.overflow-hidden { min-height:0; }
  #cbtOverlay > .flex-1.flex.flex-row.overflow-hidden > .flex-1.flex.flex-col.overflow-y-auto {
    min-height:0; height:100%; overflow-y:auto !important; overscroll-behavior:contain;
    align-items:stretch;
  }
  #cbtOverlay > .flex-1.flex.flex-row.overflow-hidden > .flex-1.flex.flex-col.overflow-y-auto > .max-w-5xl {
    box-sizing:border-box; flex:0 0 auto !important; min-height:100%; height:max-content !important;
    overflow:visible !important;
  }
  #cbtOverlay #cbtQuestionStemContainer {
    display:block !important; height:auto !important; max-height:none !important; min-height:84px;
    overflow:visible !important; white-space:normal !important; overflow-wrap:anywhere;
    word-break:normal; contain:none;
  }
  #cbtOverlay #cbtOptionsContainer {
    display:grid !important; height:auto !important; max-height:none !important;
    overflow:visible !important; grid-auto-rows:minmax(54px,auto); align-items:stretch;
  }
  #cbtOverlay #cbtOptionsContainer .cbt-option-btn {
    height:auto !important; max-height:none !important; min-height:54px;
    white-space:normal !important; overflow:visible !important; text-overflow:clip !important;
    overflow-wrap:anywhere; word-break:normal; align-items:flex-start;
  }
  #cbtOverlay #cbtQuestionStemContainer img,
  #cbtOverlay #cbtOptionsContainer img { max-width:100%; height:auto; }
  @media(max-width:640px) {
    #cbtOverlay > .flex-1.flex.flex-row.overflow-hidden > .flex-1.flex.flex-col.overflow-y-auto { padding:8px !important; }
    #cbtOverlay > .flex-1.flex.flex-row.overflow-hidden > .flex-1.flex.flex-col.overflow-y-auto > .max-w-5xl { padding:14px !important; }
  }
</style>`;
if (html.split("</head>").length !== 2) throw new Error("Expected one closing head tag for long-question styles");
html = html.replace("</head>", longQuestionCss + "\n</head>");

fs.writeFileSync(file, html);
console.log("Applied exam-specific timing profiles, sectional navigation guards and section deadline reset.");
