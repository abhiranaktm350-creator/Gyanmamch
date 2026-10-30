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

replaceExamObject("ex_ssc_chsl_t2", [
"          {",
"            id: 'ex_ssc_chsl_t2', categoryId: 'cat_ssc', code: 'SSC-CHSL-T2', name: 'SSC CHSL Tier-II (Official 2026 sectional CBT)',",
"            syllabus: 'Session-I: Maths 30m + Reasoning 30m + English 45m + General Awareness 25m + Computer Knowledge 15m = 135m. Session-II: post-specific Skill/Typing Test separate. (+3 / -1).',",
"            duration: 135, totalMarks: 405, posMarks: 3.0, negMarks: 1.00, officialQs: 135, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_english', 'sub_ga', 'sub_computer'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-chsl-2026-tier2-v3',",
"            timingVerificationNote: 'SSC CHSL 2026 notification: Maths 30m, Reasoning 30m, English 45m, GA 25m, Computer 15m; skill/typing is separate.',",
"            separateSkillSession: { id: 'chsl2_skill', name: 'Session-II Skill / Typing Test (post-specific)', durationMinutes: 15, durationOptions: [15, 10], mode: 'typing', note: 'DEO Skill Test: 15 minutes; LDC/JSA Typing Test: 10 minutes.' },",
"            sessionConfig: [",
"              { id: 'chsl2_math', name: 'Section-I A: Mathematical Abilities (30m)', name_hi: 'अनुभाग-I A: गणितीय क्षमता (30 मिनट)', subjectId: 'sub_quant', durationMinutes: 30, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'chsl2_reasoning', name: 'Section-I B: Reasoning & General Intelligence (30m)', name_hi: 'अनुभाग-I B: तर्कशक्ति (30 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 30, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'chsl2_english', name: 'Section-II A: English Language (45m)', name_hi: 'अनुभाग-II A: अंग्रेजी भाषा (45 मिनट)', subjectId: 'sub_english', durationMinutes: 40, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'chsl2_ga', name: 'Section-II B: General Awareness (25m)', name_hi: 'अनुभाग-II B: सामान्य जागरूकता (25 मिनट)', subjectId: 'sub_ga', durationMinutes: 20, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'chsl2_computer', name: 'Section-III: Computer Knowledge (15m)', name_hi: 'अनुभाग-III: कंप्यूटर ज्ञान (15 मिनट)', subjectId: 'sub_computer', durationMinutes: 15, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ssc_mts", [
"          {",
"            id: 'ex_ssc_mts', categoryId: 'cat_ssc', code: 'SSC-MTS', name: 'SSC MTS & Havaldar (2026 two-session CBT)',",
"            syllabus: 'Session-I: Numerical & Mathematical Ability + Reasoning (40 Qs, 45m, +3/0). Session-II: General Awareness + English (50 Qs, 45m, +3/-1).',",
"            duration: 90, totalMarks: 270, posMarks: 3.0, negMarks: 1.00, officialQs: 90, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_ga', 'sub_english'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-mts-2026-session-v2',",
"            timingVerificationNote: 'SSC MTS two separately timed 45-minute sessions; each session contains two subject modules.',",
"            sessionConfig: [",
"              { id: 'sess_mts_1', timerMode: 'session', name: 'Session-I: Numerical Ability + Reasoning (45m)', name_hi: 'सत्र-I: संख्यात्मक योग्यता एवं तर्कशक्ति (45 मिनट)', subjectIds: ['sub_quant', 'sub_reasoning'], durationMinutes: 45, posMarks: 3.0, negMarks: 0.00 },",
"              { id: 'sess_mts_2', timerMode: 'session', name: 'Session-II: General Awareness + English (45m)', name_hi: 'सत्र-II: सामान्य जागरूकता एवं अंग्रेजी (45 मिनट)', subjectIds: ['sub_ga', 'sub_science', 'sub_english'], durationMinutes: 45, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_rrb_po", [
"          {",
"            id: 'ex_ibps_rrb_po', categoryId: 'cat_banking', code: 'IBPS-RRB-OS1', name: 'IBPS RRB Officer Scale-I Prelims (25 + 20 minute sectional timers)',",
"            syllabus: 'Reasoning (40 Qs, 25m) + Quantitative Aptitude (40 Qs, 20m) • 80 questions in 45 minutes (+1 / -0.25).',",
"            duration: 45, totalMarks: 80, posMarks: 1.0, negMarks: 0.25, officialQs: 80, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_quant'], hasSectionalTiming: true, timingProfileVersion: 'ibps-rrb-po-xv-2026-v2',",
"            timingVerificationNote: 'IBPS RRB XV 2026: Reasoning 25 minutes, Quantitative Aptitude 20 minutes; separately timed tests.',",
"            sessionConfig: [",
"              { id: 'rrbpo_reasoning', name: 'Reasoning Ability (25m)', name_hi: 'तर्कशक्ति (25 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 25, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'rrbpo_quant', name: 'Quantitative Aptitude (20m)', name_hi: 'मात्रात्मक योग्यता (20 मिनट)', subjectId: 'sub_quant', durationMinutes: 20, posMarks: 1.0, negMarks: 0.25 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_rrb_oa", [
"          {",
"            id: 'ex_ibps_rrb_oa', categoryId: 'cat_banking', code: 'IBPS-RRB-OA', name: 'IBPS RRB Office Assistant Prelims (25 + 20 minute sectional timers)',",
"            syllabus: 'Reasoning (40 Qs, 25m) + Numerical Ability (40 Qs, 20m) • 80 questions in 45 minutes (+1 / -0.25).',",
"            duration: 45, totalMarks: 80, posMarks: 1.0, negMarks: 0.25, officialQs: 80, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_quant'], hasSectionalTiming: true, timingProfileVersion: 'ibps-rrb-oa-xv-2026-v2',",
"            timingVerificationNote: 'IBPS RRB XV 2026: Reasoning 25 minutes, Numerical Ability 20 minutes; separately timed tests.',",
"            sessionConfig: [",
"              { id: 'rrboa_reasoning', name: 'Reasoning Ability (25m)', name_hi: 'तर्कशक्ति (25 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 25, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'rrboa_numerical', name: 'Numerical Ability (20m)', name_hi: 'संख्यात्मक योग्यता (20 मिनट)', subjectId: 'sub_quant', durationMinutes: 20, posMarks: 1.0, negMarks: 0.25 }",
"            ]",
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

const migration = [
"          const profileVersion = String(exam.timingProfileVersion || 'legacy');",
"          let timingChanged = false;",
"          db.tests.filter(t => t.examId === exam.id && t.testType === 'full_mock').forEach(function(mock) {",
"            if (mock.timingProfileVersion === profileVersion) return;",
"            mock.hasSectionalTiming = Boolean(exam.hasSectionalTiming && Array.isArray(exam.sessionConfig) && exam.sessionConfig.length > 1);",
"            if (mock.hasSectionalTiming) {",
"              mock.sections = JSON.parse(JSON.stringify(exam.sessionConfig));",
"              mock.durationMinutes = exam.sessionConfig.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0);",
"            } else {",
"              mock.durationMinutes = Number(exam.duration || 60);",
"            }",
"            mock.timingProfileVersion = profileVersion;",
"            mock.timingVerificationNote = exam.timingVerificationNote || '';",
"            mock.separateSkillSession = exam.separateSkillSession ? JSON.parse(JSON.stringify(exam.separateSkillSession)) : null;",
"            timingChanged = true;",
"          });",
"          if (timingChanged) saveDatabase(db);",
"        let examFullMocks = db.tests.filter(t => t.examId === exam.id && t.testType === 'full_mock' && t.isPublished);"
].join("\n");
replaceOnce("        let examFullMocks = db.tests.filter(t => t.examId === exam.id && t.testType === 'full_mock' && t.isPublished);", migration, "all published full mock timing migration");

replaceOnce(
  "            durationMinutes: Number(exam.duration || 60),",
  "            durationMinutes: Number(exam.hasSectionalTiming && Array.isArray(exam.sessionConfig) ? exam.sessionConfig.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0) : (exam.duration || 60)),",
  "official mock sectional duration"
);
replaceOnce(
  "            sections: autoSections,",
  "            sections: autoSections,\n            separateSkillSession: exam.separateSkillSession ? JSON.parse(JSON.stringify(exam.separateSkillSession)) : null,\n            timingProfileVersion: String(exam.timingProfileVersion || 'legacy'),\n            timingVerificationNote: exam.timingVerificationNote || '',",
  "official mock timing metadata"
);

replaceOnce("        const test = db.tests.find(t => t.id === testId);\n        if (!test) {\n          showToast('Selected mock test could not be found.', 'error');\n          return;\n        }", "        const test = db.tests.find(t => t.id === testId);\n        if (!test) {\n          showToast('Selected mock test could not be found.', 'error');\n          return;\n        }\n        const examTimingProfile = test.testType === 'full_mock' && test.examId ? db.exams.find(e => e.id === test.examId) : null;\n        if (examTimingProfile && examTimingProfile.hasSectionalTiming && Array.isArray(examTimingProfile.sessionConfig) && examTimingProfile.sessionConfig.length > 1) {\n          test.hasSectionalTiming = true;\n          test.sections = JSON.parse(JSON.stringify(examTimingProfile.sessionConfig));\n          test.durationMinutes = test.sections.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0);\n          test.timingProfileVersion = String(examTimingProfile.timingProfileVersion || 'official');\n          test.timingVerificationNote = examTimingProfile.timingVerificationNote || '';\n        }", "apply exam sectional profile to every full mock at launch");

replaceOnce("        const questionsList = test.questionIds\n          .map(qId => db.questions.find(q => q.id === qId))\n          .filter(Boolean)\n          .map(q => Object.assign({}, q));", "        const questionsList = test.questionIds\n          .map(qId => db.questions.find(q => q.id === qId))\n          .filter(Boolean)\n          .map(q => Object.assign({}, q));\n        if (test.hasSectionalTiming && Array.isArray(test.sections)) {\n          const sectionRank = function(q) { const idx = test.sections.findIndex(sec => cbtSectionContainsQuestion(sec, q)); return idx < 0 ? 999 : idx; };\n          questionsList.sort((a, b) => sectionRank(a) - sectionRank(b));\n        }", "order questions by official timed section");

replaceOnce("      function pauseCbtExam() {", "      function cbtSectionContainsQuestion(section, question) {\n        if (!section || !question) return false;\n        const subjectIds = Array.isArray(section.subjectIds) ? section.subjectIds : (section.subjectId ? [section.subjectId] : []);\n        return subjectIds.length ? subjectIds.includes(question.subjectId) : true;\n      }\n\n      function pauseCbtExam() {", "support subject groups inside timed sections");

replaceOnce("          currentIndex: 0,\n          hasSectionalTiming: hasSecTiming,", "          currentIndex: hasSecTiming ? Math.max(0, questionsList.findIndex(q => cbtSectionContainsQuestion(test.sections[0], q))) : 0,\n          hasSectionalTiming: hasSecTiming,", "start at first question in first timed section");

replaceOnce("      function advanceToNextTimedSection(isAutoExpiry) {\n        const cbt = state.activeCbt;\n        if (!cbt || !cbt.hasSectionalTiming) return;\n        const sections = cbt.test.sections || [];\n        if (cbt.activeSectionIndex < sections.length - 1) {\n          cbt.activeSectionIndex += 1;\n          const nextSec = sections[cbt.activeSectionIndex];\n          cbt.sectionRemainingSeconds = Number(nextSec.durationMinutes || 20) * 60;\n          // Jump to first question of this new section\n          const nextIdx = cbt.questions.findIndex(q => !nextSec.subjectId || q.subjectId === nextSec.subjectId);\n          if (nextIdx !== -1) cbt.currentIndex = nextIdx;\n          showToast(\n            (isAutoExpiry ? 'Section time expired! ' : 'Section submitted! ') +\n            'Moved to ' + nextSec.name + ' (' + (nextSec.durationMinutes || 20) + ' Mins).',\n            'info'\n          );\n          renderCbtHeaderAndTabs();\n          renderCbtCurrentQuestion();\n          renderCbtPalette();\n        } else {\n          // Last section finished -> submit entire test\n          finalizeAndScoreAttempt(isAutoExpiry);\n        }\n      }", "      function advanceToNextTimedSection(isAutoExpiry) {\n        const cbt = state.activeCbt;\n        if (!cbt || !cbt.hasSectionalTiming) return;\n        if (cbt.timerInterval) { window.clearInterval(cbt.timerInterval); cbt.timerInterval = null; }\n        const sections = cbt.test.sections || [];\n        let nextSectionIndex = cbt.activeSectionIndex + 1;\n        while (nextSectionIndex < sections.length && !cbt.questions.some(q => cbtSectionContainsQuestion(sections[nextSectionIndex], q))) nextSectionIndex += 1;\n        if (nextSectionIndex >= sections.length) {\n          showToast(isAutoExpiry ? 'Last section time expired. Submitting your test...' : 'All timed sections completed. Submitting your test...', 'warning');\n          finalizeAndScoreAttempt(Boolean(isAutoExpiry));\n          return;\n        }\n        cbt.activeSectionIndex = nextSectionIndex;\n        const nextSec = sections[nextSectionIndex];\n        cbt.sectionRemainingSeconds = Math.max(1, Number(nextSec.durationMinutes || 20) * 60);\n        cbt.sectionDeadlineAt = Date.now() + cbt.sectionRemainingSeconds * 1000;\n        const nextIdx = cbt.questions.findIndex(q => cbtSectionContainsQuestion(nextSec, q));\n        if (nextIdx !== -1) cbt.currentIndex = nextIdx;\n        showToast((isAutoExpiry ? 'Section time expired. ' : 'Section ended. ') + 'Now starting ' + nextSec.name + ' (' + nextSec.durationMinutes + ' minutes).', 'info');\n        renderCbtHeaderAndTabs();\n        renderCbtCurrentQuestion();\n        renderCbtPalette();\n        if (cbt.isStarted && !cbt.isPaused) resumeCbtExam();\n      }", "restart timer with fresh deadline on every section transition");

replaceOnce("            secLbl.textContent = currSec.name + ' Timer:';\n            secVal.textContent = formatSeconds(cbt.sectionRemainingSeconds);", "            secLbl.textContent = 'Section ' + (cbt.activeSectionIndex + 1) + '/' + cbt.test.sections.length + ': ' + currSec.name;\n            secVal.textContent = formatSeconds(cbt.sectionRemainingSeconds);", "show section counter and countdown");

replaceOnce("          const isCurrentSec = !sec.subjectId || (currentQ && currentQ.subjectId === sec.subjectId);", "          const isCurrentSec = cbt.hasSectionalTiming ? secIdx === cbt.activeSectionIndex : (!sec.subjectId || cbtSectionContainsQuestion(sec, currentQ));", "highlight active section");

replaceOnce("              data-sec-sub=\"${sec.subjectId || 'ALL'}\"", "              data-sec-index=\"${secIdx}\"", "use section index for section navigation");

replaceOnce("            const subId = btn.getAttribute('data-sec-sub');\n            if (subId === 'ALL') {\n              cbt.currentIndex = 0;\n            } else {\n              const idx = cbt.questions.findIndex(q => q.subjectId === subId);\n              if (idx !== -1) cbt.currentIndex = idx;\n            }", "            const selectedSectionIndex = Number(btn.getAttribute('data-sec-index'));\n            const selectedSection = cbt.test.sections && cbt.test.sections[selectedSectionIndex];\n            const idx = selectedSection ? cbt.questions.findIndex(q => cbtSectionContainsQuestion(selectedSection, q)) : 0;\n            if (idx !== -1) cbt.currentIndex = idx;", "navigate by grouped section subject ids");

replaceOnce("        if (!Number.isInteger(cbt.currentIndex) || cbt.currentIndex < 0 || cbt.currentIndex >= cbt.questions.length) cbt.currentIndex = 0;\n        const q = cbt.questions[cbt.currentIndex];", "        if (!Number.isInteger(cbt.currentIndex) || cbt.currentIndex < 0 || cbt.currentIndex >= cbt.questions.length) cbt.currentIndex = 0;\n        if (cbt.hasSectionalTiming && cbt.test.sections && cbt.test.sections[cbt.activeSectionIndex]) {\n          const activeSection = cbt.test.sections[cbt.activeSectionIndex];\n          if (!cbtSectionContainsQuestion(activeSection, cbt.questions[cbt.currentIndex])) {\n            const firstActiveQuestion = cbt.questions.findIndex(item => cbtSectionContainsQuestion(activeSection, item));\n            if (firstActiveQuestion !== -1) cbt.currentIndex = firstActiveQuestion;\n          }\n        }\n        const q = cbt.questions[cbt.currentIndex];", "keep current question within active timed section");

replaceOnce("            cbt.currentIndex = Number(btn.getAttribute('data-pal-idx'));\n            renderCbtHeaderAndTabs();", "            const requestedIndex = Number(btn.getAttribute('data-pal-idx'));\n            if (cbt.hasSectionalTiming && !cbtSectionContainsQuestion(cbt.test.sections[cbt.activeSectionIndex], cbt.questions[requestedIndex])) {\n              showToast('This section is locked. You can only open questions in the active section.', 'warning');\n              return;\n            }\n            cbt.currentIndex = requestedIndex;\n            renderCbtHeaderAndTabs();", "lock question palette to active section");

replaceOnce("          if (cbt.currentIndex > 0) {\n            cbt.currentIndex -= 1;", "          const activeSectionStart = cbt.hasSectionalTiming ? cbt.questions.findIndex(q => cbtSectionContainsQuestion(cbt.test.sections[cbt.activeSectionIndex], q)) : 0;\n          if (cbt.currentIndex > Math.max(0, activeSectionStart)) {\n            cbt.currentIndex -= 1;", "prevent previous navigation crossing section boundary");

replaceOnce("          if (cbt.currentIndex < cbt.questions.length - 1) {\n            cbt.currentIndex += 1;\n            renderCbtHeaderAndTabs();", "          const activeSectionQuestions = cbt.hasSectionalTiming ? cbt.questions.map((q, idx) => cbtSectionContainsQuestion(cbt.test.sections[cbt.activeSectionIndex], q) ? idx : -1).filter(idx => idx >= 0) : cbt.questions.map((q, idx) => idx);\n          const activeSectionEnd = activeSectionQuestions.length ? activeSectionQuestions[activeSectionQuestions.length - 1] : cbt.questions.length - 1;\n          if (cbt.currentIndex < activeSectionEnd) {\n            cbt.currentIndex += 1;\n            renderCbtHeaderAndTabs();", "prevent next navigation crossing section boundary");

replaceOnce(
  "              // Remove hard-coded sample identities/results from old local demo data.",
  "              // Upgrade existing local exam records to the current built-in official timing profiles.\n              const seededTimingProfiles = createDefaultDatabase().exams;\n              parsed.exams.forEach(function(existingExam) {\n                const officialProfile = seededTimingProfiles.find(e => e.id === existingExam.id && e.timingProfileVersion);\n                if (!officialProfile || existingExam.timingProfileVersion === officialProfile.timingProfileVersion) return;\n                existingExam.duration = officialProfile.duration;\n                existingExam.hasSectionalTiming = Boolean(officialProfile.hasSectionalTiming);\n                existingExam.timingProfileVersion = officialProfile.timingProfileVersion;\n                existingExam.timingVerificationNote = officialProfile.timingVerificationNote || '';\n                existingExam.sessionConfig = Array.isArray(officialProfile.sessionConfig) ? JSON.parse(JSON.stringify(officialProfile.sessionConfig)) : [];\n                existingExam.separateSkillSession = officialProfile.separateSkillSession ? JSON.parse(JSON.stringify(officialProfile.separateSkillSession)) : null;\n              });\n              (parsed.tests || []).filter(t => t.testType === 'full_mock' && t.examId).forEach(function(mock) {\n                const officialExam = parsed.exams.find(e => e.id === mock.examId);\n                if (!officialExam || !officialExam.timingProfileVersion || mock.timingProfileVersion === officialExam.timingProfileVersion) return;\n                mock.hasSectionalTiming = Boolean(officialExam.hasSectionalTiming && Array.isArray(officialExam.sessionConfig) && officialExam.sessionConfig.length > 1);\n                if (mock.hasSectionalTiming) {\n                  mock.sections = JSON.parse(JSON.stringify(officialExam.sessionConfig));\n                  mock.durationMinutes = officialExam.sessionConfig.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0);\n                } else { mock.durationMinutes = Number(officialExam.duration || 60); }\n                mock.timingProfileVersion = officialExam.timingProfileVersion;\n                mock.timingVerificationNote = officialExam.timingVerificationNote || '';\n                mock.separateSkillSession = officialExam.separateSkillSession ? JSON.parse(JSON.stringify(officialExam.separateSkillSession)) : null;\n              });\n              // Remove hard-coded sample identities/results from old local demo data.",
  "migrate existing localStorage exam and mock timing profiles"
);


replaceOnce(
  "        const exam = db.exams.find(e => e.id === state.selectedExamId) || db.exams[0];",
  "        const exam = db.exams.find(e => e.id === state.selectedExamId) || db.exams[0];\n        const latestExamTiming = createDefaultDatabase().exams.find(e => e.id === exam.id);\n        if (latestExamTiming && latestExamTiming.hasSectionalTiming !== undefined) Object.assign(exam, { hasSectionalTiming: latestExamTiming.hasSectionalTiming, duration: latestExamTiming.duration, sessionConfig: latestExamTiming.sessionConfig, timingProfileVersion: latestExamTiming.timingProfileVersion, timingVerificationNote: latestExamTiming.timingVerificationNote, separateSkillSession: latestExamTiming.separateSkillSession });",
  "refresh selected exam timing from current built-in catalogue"
);

replaceOnce("          } else {\n            openSubmitConfirmationModal();\n          }\n        });", "          } else if (cbt.hasSectionalTiming) {\n            showToast(\"You have reached the end of this section. The next section will open when its timer expires.\", \"info\");\n          } else {\n            openSubmitConfirmationModal();\n          }\n        });", "do not offer full-test submission at the end of an active section");

replaceOnce("<div class=\"text-[11px] text-slate-400 hidden sm:inline\">Time:</div>", "<div id=\"cbtTimerLabel\" class=\"text-[11px] text-slate-400 hidden sm:inline\">Time:</div>", "give total timer a distinct label");

replaceOnce("        const timerText = document.getElementById('cbtTimerText');\n        if (timerText) {", "        const timerLabel = document.getElementById('cbtTimerLabel');\n        if (timerLabel) timerLabel.textContent = cbt.hasSectionalTiming ? 'Total:' : 'Time:';\n        const nextSectionButton = document.getElementById('btnCbtNextSectionLock');\n        if (nextSectionButton) nextSectionButton.classList.add('hidden');\n        const timerText = document.getElementById('cbtTimerText');\n        if (timerText) {", "show overall and section clocks distinctly and prevent manual section skipping");

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
