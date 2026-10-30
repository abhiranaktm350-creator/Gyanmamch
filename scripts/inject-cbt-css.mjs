import fs from "node:fs";

const path = "dist/index.html";
let html = fs.readFileSync(path, "utf8");

html = html.replace("</head>", '<link rel="stylesheet" href="/cbt-modern.css">\n</head>');
html = html.replace(
  '<span class="text-slate-700 font-semibold">Unans</span>',
  '<span class="text-slate-700 font-semibold">Not Answered</span>'
);
html = html.replace(
  '<span class="text-slate-700 font-semibold">Review</span>',
  '<span class="text-slate-700 font-semibold">Marked for Review</span>'
);
html = html.replace(
  '<span class="text-slate-700 font-semibold">Ans+Rev</span>',
  '<span class="text-slate-700 font-semibold">Ans. + Review</span>'
);
html = html.replace("★ Mark for Review &amp; Next", "Mark for Review &amp; Next");

fs.writeFileSync(path, html);
console.log("Injected modern CBT skin and refreshed palette labels.");
