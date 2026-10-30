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

replaceExamObject("ex_ssc_cgl_t2", [
"          {",
"            id: 'ex_ssc_cgl_t2', categoryId: 'cat_ssc', code: 'SSC-CGL-T2', name: 'SSC CGL Tier-II Paper-I (Sectional / Session Timed)',",
"            syllabus: 'Session-I: Maths 30m + Reasoning 30m + English 40m + General Awareness 20m + Computer 15m (135m). Session-II: DEST skill test 15m separately. (+3.00 / -1.00)',",
"            duration: 150, totalMarks: 450, posMarks: 3.0, negMarks: 1.00, officialQs: 150, isSample: false,",
"            allowedSubjects: ['sub_quant', 'sub_reasoning', 'sub_english', 'sub_ga', 'sub_computer', 'sub_science'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ssc-cgl-2026-tier2-v1',",
"            timingVerificationNote: 'SSC CGL 2026 official notification. Session-I objective sections total 135 minutes; DEST is a separate 15-minute Session-II skill test, not an MCQ section.',",
"            separateSkillSession: { id: 'cgl2_dest', name: 'Data Entry Speed Test (DEST) — separate Session-II', durationMinutes: 15, mode: 'typing', note: 'Separate skill test after Session-I; not included in the MCQ section countdown.' },",
"            sessionConfig: [",
"              { id: 'cgl2_math', name: 'Section-I, Module-I: Mathematical Abilities (30m)', name_hi: 'गणितीय क्षमताएं (30 मिनट)', subjectId: 'sub_quant', durationMinutes: 30, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_reasoning', name: 'Section-I, Module-II: Reasoning & General Intelligence (30m)', name_hi: 'तर्कशक्ति एवं सामान्य बुद्धिमत्ता (30 मिनट)', subjectId: 'sub_reasoning', durationMinutes: 30, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_english', name: 'Section-II, Module-I: English Language & Comprehension (40m)', name_hi: 'अंग्रेजी भाषा एवं बोधगम्यता (40 मिनट)', subjectId: 'sub_english', durationMinutes: 40, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_ga', name: 'Section-II, Module-II: General Awareness (20m)', name_hi: 'सामान्य जागरूकता (20 मिनट)', subjectId: 'sub_ga', durationMinutes: 20, posMarks: 3.0, negMarks: 1.00 },",
"              { id: 'cgl2_computer', name: 'Section-III: Computer Knowledge Test (15m)', name_hi: 'कंप्यूटर ज्ञान परीक्षा (15 मिनट)', subjectId: 'sub_computer', durationMinutes: 15, posMarks: 3.0, negMarks: 1.00 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_po_mains", [
"          {",
"            id: 'ex_ibps_po_mains', categoryId: 'cat_banking', code: 'IBPS-PO-MAINS', name: 'IBPS PO Mains (CRP PO XV previous official timing profile)',",
"            syllabus: 'Previous official CRP PO XV reference: Reasoning & Computer (50m) + Banking / Economy GA (25m) + English (40m) + Data Analysis & Interpretation (45m) • 160 Mins. Verify CRP PO XVI timing before current-cycle publication.',",
"            duration: 160, totalMarks: 200, posMarks: 1.0, negMarks: 0.25, officialQs: 155, isSample: false,",
"            allowedSubjects: ['sub_reasoning', 'sub_computer', 'sub_ga', 'sub_english', 'sub_quant'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ibps-po-xv-reference-v1',",
"            timingVerificationNote: 'Previous official CRP PO XV pattern only. Latest CRP PO XVI detailed sectional timing was not independently verified; admin must confirm before current-cycle publication.',",
"            separateSkillSession: { id: 'ibps_po_descriptive', name: 'Descriptive Writing Test — separate paper', durationMinutes: 30, mode: 'writing', note: 'Separate descriptive test after the objective Mains paper.' },",
"            sessionConfig: [",
"              { id: 'sec_ipm_1', name: 'Section 1: Reasoning & Computer Aptitude (50m)', name_hi: 'तर्कशक्ति एवं कंप्यूटर अभिक्षमता (50 मिनट)', subjectIds: ['sub_reasoning', 'sub_computer'], durationMinutes: 50, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'sec_ipm_2', name: 'Section 2: General / Economy / Banking Awareness (25m)', name_hi: 'सामान्य / अर्थव्यवस्था / बैंकिंग जागरूकता (25 मिनट)', subjectId: 'sub_ga', durationMinutes: 25, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'sec_ipm_3', name: 'Section 3: English Language (40m)', name_hi: 'अंग्रेजी भाषा (40 मिनट)', subjectId: 'sub_english', durationMinutes: 40, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'sec_ipm_4', name: 'Section 4: Data Analysis & Interpretation (45m)', name_hi: 'डेटा विश्लेषण एवं व्याख्या (45 मिनट)', subjectId: 'sub_quant', durationMinutes: 45, posMarks: 1.0, negMarks: 0.25 }",
"            ]",
"          }"
]);

replaceExamObject("ex_ibps_clerk_mains", [
"          {",
"            id: 'ex_ibps_clerk_mains', categoryId: 'cat_banking', code: 'IBPS-CLERK-MAINS', name: 'IBPS CSA Mains (CRP CSA XV previous official timing profile)',",
"            syllabus: 'Previous official CRP CSA XV reference: General / Financial Awareness (20m) + English (35m) + Reasoning & Computer (35m) + Quantitative Aptitude (30m) • 120 Mins. Verify CRP CSA XVI timing before current-cycle publication.',",
"            duration: 120, totalMarks: 200, posMarks: 1.0, negMarks: 0.25, officialQs: 190, isSample: false,",
"            allowedSubjects: ['sub_ga', 'sub_english', 'sub_reasoning', 'sub_computer', 'sub_quant'],",
"            hasSectionalTiming: true, timingProfileVersion: 'ibps-csa-xv-reference-v1',",
"            timingVerificationNote: 'Previous official CRP CSA XV pattern only. Latest CRP CSA XVI detailed sectional timing was not independently verified; admin must confirm before current-cycle publication.',",
"            sessionConfig: [",
"              { id: 'sec_icm_1', name: 'Section 1: General / Financial Awareness (20m)', name_hi: 'सामान्य / वित्तीय जागरूकता (20 मिनट)', subjectId: 'sub_ga', durationMinutes: 20, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'sec_icm_2', name: 'Section 2: General English (35m)', name_hi: 'अंग्रेजी भाषा (35 मिनट)', subjectId: 'sub_english', durationMinutes: 35, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'sec_icm_3', name: 'Section 3: Reasoning & Computer (35m)', name_hi: 'तर्कशक्ति एवं कंप्यूटर (35 मिनट)', subjectIds: ['sub_reasoning', 'sub_computer'], durationMinutes: 35, posMarks: 1.0, negMarks: 0.25 },",
"              { id: 'sec_icm_4', name: 'Section 4: Quantitative Aptitude (30m)', name_hi: 'मात्रात्मक अभियोग्यता (30 मिनट)', subjectId: 'sub_quant', durationMinutes: 30, posMarks: 1.0, negMarks: 0.25 }",
"            ]",
"          }"
]);

const migration = [
"          const managedOfficialId = 'test_official_' + exam.id;",
"          const managedOfficialMock = db.tests.find(t => t.id === managedOfficialId && t.testType === 'full_mock');",
"          const profileVersion = String(exam.timingProfileVersion || 'legacy');",
"          if (managedOfficialMock && managedOfficialMock.timingProfileVersion !== profileVersion) {",
"            if (exam.hasSectionalTiming && Array.isArray(exam.sessionConfig) && exam.sessionConfig.length > 1) {",
"              managedOfficialMock.hasSectionalTiming = true;",
"              managedOfficialMock.sections = JSON.parse(JSON.stringify(exam.sessionConfig));",
"              managedOfficialMock.durationMinutes = exam.sessionConfig.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0);",
"            } else {",
"              managedOfficialMock.hasSectionalTiming = false;",
"              managedOfficialMock.durationMinutes = Number(exam.duration || 60);",
"            }",
"            managedOfficialMock.timingProfileVersion = profileVersion;",
"            managedOfficialMock.timingVerificationNote = exam.timingVerificationNote || '';",
"            managedOfficialMock.separateSkillSession = exam.separateSkillSession ? JSON.parse(JSON.stringify(exam.separateSkillSession)) : null;",
"            saveDatabase(db);",
"          }",
"          let examFullMocks = db.tests.filter(t => t.examId === exam.id && t.testType === 'full_mock' && t.isPublished);"
].join("\n");
replaceOnce("          let examFullMocks = db.tests.filter(t => t.examId === exam.id && t.testType === 'full_mock' && t.isPublished);", migration, "official mock timing migration");

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

const sectionHelpers = [
"      function cbtSectionContainsQuestion(section, question) {",
"        if (!section || !question) return false;",
"        const subjectIds = Array.isArray(section.subjectIds) && section.subjectIds.length ? section.subjectIds : (section.subjectId ? [section.subjectId] : []);",
"        return subjectIds.length === 0 || subjectIds.includes(question.subjectId);",
"      }",
"",
"      function cbtQuestionInActiveSection(cbt, question) {",
"        if (!cbt || !cbt.hasSectionalTiming) return true;",
"        const activeSection = cbt.test && Array.isArray(cbt.test.sections) ? cbt.test.sections[cbt.activeSectionIndex] : null;",
"        return cbtSectionContainsQuestion(activeSection, question);",
"      }",
"",
"      function findCbtQuestionInActiveSection(cbt, fromIndex, direction) {",
"        if (!cbt || !Array.isArray(cbt.questions)) return -1;",
"        for (let idx = fromIndex + direction; idx >= 0 && idx < cbt.questions.length; idx += direction) {",
"          if (cbtQuestionInActiveSection(cbt, cbt.questions[idx])) return idx;",
"        }",
"        return -1;",
"      }",
"",
"      function advanceToNextTimedSection(isAutoExpiry) {"
].join("\n");
replaceOnce("      function advanceToNextTimedSection(isAutoExpiry) {", sectionHelpers, "section membership helpers");

replaceOnce(
  "          cbt.sectionRemainingSeconds = Number(nextSec.durationMinutes || 20) * 60;",
  "          cbt.sectionRemainingSeconds = Math.max(1, Number(nextSec.durationMinutes || 20) * 60);\n          cbt.sectionDeadlineAt = Date.now() + cbt.sectionRemainingSeconds * 1000;",
  "reset next section deadline"
);
replaceOnce(
  "          const nextIdx = cbt.questions.findIndex(q => !nextSec.subjectId || q.subjectId === nextSec.subjectId);",
  "          const nextIdx = cbt.questions.findIndex(q => cbtSectionContainsQuestion(nextSec, q));",
  "find next section first question"
);
replaceOnce(
  "          renderCbtPalette();\n        } else {\n          // Last section finished -> submit entire test",
  "          renderCbtPalette();\n          updateCbtTimerDisplay();\n        } else {\n          // Last section finished -> submit entire test",
  "refresh next section timer display"
);
replaceOnce(
  "          const isCurrentSec = !sec.subjectId || (currentQ && currentQ.subjectId === sec.subjectId);",
  "          const isCurrentSec = cbtSectionContainsQuestion(sec, currentQ);",
  "section tab active state"
);
replaceOnce(
  "            const subId = btn.getAttribute('data-sec-sub');\n            if (subId === 'ALL') {\n              cbt.currentIndex = 0;\n            } else {\n              const idx = cbt.questions.findIndex(q => q.subjectId === subId);\n              if (idx !== -1) cbt.currentIndex = idx;\n            }",
  "            const subId = btn.getAttribute('data-sec-sub');\n            if (cbt.hasSectionalTiming) {\n              const activeSection = cbt.test.sections[cbt.activeSectionIndex];\n              const idx = cbt.questions.findIndex(q => cbtSectionContainsQuestion(activeSection, q));\n              if (idx !== -1) cbt.currentIndex = idx;\n            } else if (subId === 'ALL') {\n              cbt.currentIndex = 0;\n            } else {\n              const idx = cbt.questions.findIndex(q => q.subjectId === subId);\n              if (idx !== -1) cbt.currentIndex = idx;\n            }",
  "active section tab navigation"
);
replaceOnce(
  "        const activeSecObj = (cbt.hasSectionalTiming && cbt.test.sections && cbt.test.sections[cbt.activeSectionIndex]) ||\n          (cbt.test.sections && cbt.test.sections.find(s => s.subjectId === q.subjectId));",
  "        const activeSecObj = (cbt.hasSectionalTiming && cbt.test.sections && cbt.test.sections[cbt.activeSectionIndex]) ||\n          (cbt.test.sections && cbt.test.sections.find(s => cbtSectionContainsQuestion(s, q)));",
  "marks for grouped subjects"
);

replaceOnce(
  "        grid.innerHTML = cbt.questions.map(function(q, idx) {\n          const st = cbt.answers[q.id];",
  "        grid.innerHTML = cbt.questions.map(function(q, idx) {\n          const inActiveSection = cbtQuestionInActiveSection(cbt, q);\n          const st = cbt.answers[q.id];",
  "palette active section state"
);
replaceOnce(
  "          btn.addEventListener('click', function() {\n            cbt.currentIndex = Number(btn.getAttribute('data-pal-idx'));\n            renderCbtHeaderAndTabs();",
  "          btn.addEventListener('click', function() {\n            const targetIndex = Number(btn.getAttribute('data-pal-idx'));\n            if (!cbtQuestionInActiveSection(cbt, cbt.questions[targetIndex])) {\n              showToast('This section has its own timer. Finish or submit the active section before moving on.', 'warning');\n              return;\n            }\n            cbt.currentIndex = targetIndex;\n            renderCbtHeaderAndTabs();",
  "guard palette section access"
);
replaceOnce(
  "        document.getElementById('btnCbtPrev').addEventListener('click', function() {\n          const cbt = state.activeCbt;\n          if (!cbt) return;\n          if (cbt.currentIndex > 0) {\n            cbt.currentIndex -= 1;\n            renderCbtHeaderAndTabs();\n            renderCbtCurrentQuestion();\n            renderCbtPalette();\n          }\n        });",
  "        document.getElementById('btnCbtPrev').addEventListener('click', function() {\n          const cbt = state.activeCbt;\n          if (!cbt) return;\n          const previousIndex = findCbtQuestionInActiveSection(cbt, cbt.currentIndex, -1);\n          if (previousIndex !== -1) {\n            cbt.currentIndex = previousIndex;\n            renderCbtHeaderAndTabs();\n            renderCbtCurrentQuestion();\n            renderCbtPalette();\n          }\n        });",
  "previous question active section guard"
);
replaceOnce(
  "        document.getElementById('btnCbtSaveNext').addEventListener('click', function() {\n          const cbt = state.activeCbt;\n          if (!cbt) return;\n          triggerAutoSaveIndicator();\n          if (cbt.currentIndex < cbt.questions.length - 1) {\n            cbt.currentIndex += 1;\n            renderCbtHeaderAndTabs();\n            renderCbtCurrentQuestion();\n            renderCbtPalette();\n          } else {\n            openSubmitConfirmationModal();\n          }\n        });",
  "        document.getElementById('btnCbtSaveNext').addEventListener('click', function() {\n          const cbt = state.activeCbt;\n          if (!cbt) return;\n          triggerAutoSaveIndicator();\n          const nextIndex = findCbtQuestionInActiveSection(cbt, cbt.currentIndex, 1);\n          if (nextIndex !== -1) {\n            cbt.currentIndex = nextIndex;\n            renderCbtHeaderAndTabs();\n            renderCbtCurrentQuestion();\n            renderCbtPalette();\n          } else if (cbt.hasSectionalTiming) {\n            showToast('You have reached the end of this timed section. Use Submit Section or wait for its timer to move to the next section.', 'info');\n          } else {\n            openSubmitConfirmationModal();\n          }\n        });",
  "save next active section guard"
);
replaceOnce(
  "          if (cbt.currentIndex < cbt.questions.length - 1) {\n            cbt.currentIndex += 1;\n          }\n          renderCbtHeaderAndTabs();\n          renderCbtCurrentQuestion();\n          renderCbtPalette();\n        });",
  "          const nextIndex = findCbtQuestionInActiveSection(cbt, cbt.currentIndex, 1);\n          if (nextIndex !== -1) cbt.currentIndex = nextIndex;\n          else if (cbt.hasSectionalTiming) showToast('This is the last question in the active section. Submit the section when ready.', 'info');\n          renderCbtHeaderAndTabs();\n          renderCbtCurrentQuestion();\n          renderCbtPalette();\n        });",
  "mark review active section guard"
);

replaceOnce(
  "            const sections = selectedTest && Array.isArray(selectedTest.sections) ? selectedTest.sections : [];\n            const sessionTotal = sections.length > 1 && selectedTest.hasSectionalTiming\n              ? sections.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0) : 0;\n            if (durationEl) durationEl.textContent = (sessionTotal > 0 ? sessionTotal : Number(selectedTest && selectedTest.durationMinutes) || 0) > 0\n              ? ((sessionTotal > 0 ? sessionTotal : Number(selectedTest.durationMinutes)) + ' minutes' + (sessionTotal > 0 ? ' total across sessions' : ''))\n              : 'As configured for this test';",
  "            const sections = selectedTest && Array.isArray(selectedTest.sections) ? selectedTest.sections : [];\n            const sessionTotal = sections.length > 1 && selectedTest.hasSectionalTiming\n              ? sections.reduce((sum, sec) => sum + Math.max(0, Number(sec.durationMinutes) || 0), 0) : 0;\n            const skillSession = selectedTest && selectedTest.separateSkillSession;\n            if (durationEl) durationEl.textContent = (sessionTotal > 0 ? sessionTotal : Number(selectedTest && selectedTest.durationMinutes) || 0) > 0\n              ? ((sessionTotal > 0 ? sessionTotal : Number(selectedTest.durationMinutes)) + ' minutes' + (sessionTotal > 0 ? ' across timed sections' : '') +\n                 (skillSession ? ' + separate ' + Number(skillSession.durationMinutes || 0) + '-minute ' + skillSession.name : ''))\n              : 'As configured for this test';",
  "separate skill session duration label"
);

fs.writeFileSync(file, html);
console.log("Applied exam-specific timing profiles, sectional navigation guards and section deadline reset.");
