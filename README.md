# ARISE · Engineering Mentor

ARISE is an offline-friendly study companion for  students. It includes a four-year roadmap, daily tasks, topic-by-topic coding practice, first-year Vardhaman references, study planning, local notes, live engineering signals, hackathon discovery, Codeforces suggestions, Sudoku, and invite-code study rooms.

The Solo Leveling-inspired hunter interface opens on a player status screen with the supplied Jinwoo portrait, a redesigned original ARISE gate logo, a gate-scene backdrop, rank/level/XP and an activity radar. The daily quest board brings your year-aware mentor task, topic practice, notes and Vardhaman review into one framed mission panel. The dark rift palette, violet/cyan energy details, restrained motion and reduced-motion support carry through the rest of the app. Dark and light themes keep their own readable colors. The Resource Library includes free engineering and AI/data science material, GeeksforGeeks explanations, topic-level lecture links, hackathon judging prep, codeathon practice loops, entrepreneurship, deployment, testing and reproducibility. Resource discovery adds fuzzy search, filters, saved searches, roadmap links, quick matching and local favorites/explored tracking. New researched paths add Stanford NLP and vision labs, Hugging Face agents, IndiaAI/AIKosh and AI4Bharat datasets and benchmarks, LLM security and evaluation, and official Indian student entrepreneurship and hackathon opportunities. Check current access, eligibility and licenses at each publisher. The TED/TEDx library now adds practical talks on deliberate learning, active listening, speaking up, creative problem solving, motivation, startup thinking and Indian engineering innovation, grouped by the skill you can practice after watching. Check course versions and eligibility at each original source. The Career Roadmap also includes a four-year, evidence-based skill passport with checkable milestones for fundamentals, software delivery, AI depth, research, entrepreneurship and career communication. Coding practice links carry an E→S ARISE rank: Codeforces numeric ratings and labeled difficulty tiers from HackerRank, LeetCode and GeeksforGeeks map into the study scale. Ranks inferred from a topic or a site without a comparable rating are marked as ARISE estimates; event and site rules remain authoritative. Sudoku starts with a valid saved/generated board, preserves entries, and pauses its clock when the app is hidden or another section is open.

## Run ARISE

**Windows quick start:** Extract the ARISE ZIP and double-click **Start ARISE.cmd**. It starts the local server and opens ARISE in your browser. If an older ARISE server is already using port 3000, the launcher checks that it is ARISE and restarts its Node.js process before opening the updated app. Install Node.js 22 LTS or later supported LTS once if the launcher asks for it.

Opening `index.html` directly also works as a downloaded offline edition. Sudoku, notes, planner and saved resources work on the device. Live feeds and Codeforces suggestions need an internet connection and the local server or Vercel Functions. Shared study rooms are available through local hosting only.

## Deploy on Vercel

The project is configured as a static **Other** app with Vercel Functions. Import this project folder—the one containing `index.html` and `vercel.json`—as the Vercel project root. Keep the framework preset as **Other**, leave the build command empty, and use the included output directory (`.`). Vercel detects API functions from the `api` folder; no environment variables or API keys are required to deploy. The included `.vercelignore` excludes local room data, tests, the old nested copy, and the local-only server. The original app logo is `assets/arise-logo.svg`; the browser/app icon is `arise-mark.svg`.

ARISE runs without setting any environment variables. Live hackathons, AI/data engineering signals and Codeforces topic suggestions run through `/api/hackathons`, `/api/signals` and `/api/problems` after deployment. Study rooms run on the local Node server and do not use a third-party database or API key. Vercel serves the learning app and its feeds; shared-room sync is disabled there.

Local study rooms use the ARISE server's live event stream. Anyone with the invite code can join; share it only with your group. The app's notes, planner, profile and progress remain stored in each person's browser.

To start manually, install Node.js 22 LTS or later supported LTS, open PowerShell in this folder, and run:

```powershell
node server.mjs
```

Then open [http://localhost:3000](http://localhost:3000). Keep the server running while using the app. It uses Node built-ins and needs no package installation.

## Check the project before changing or sharing it

Run `node tests/predeploy-smoke.mjs` from this folder for offline-safe checks of JavaScript syntax, local assets, resource links, the app shell and isolated study-room actions. Add `--live` to also refresh public hackathon and engineering-news feeds; that check needs internet access and prints which upstream sources responded. The room test uses a temporary data folder and deletes only that test folder when it finishes.

## Live events and engineering news

The Hackathon Radar refreshes public listings from Devpost and Unstop when ARISE opens, every three hours while it is visible, and when you return to the tab. The local server caches upstream listings for up to three hours; Vercel Functions cache them briefly per warm instance. Use **Refresh listings** to request a fresh pull that bypasses the cache. The page also links to Devfolio, MLH and other organizer directories. Listings can change quickly; confirm dates, location, eligibility and registration status on the organizer page.

Engineering Signals pulls public arXiv, GitHub, Hugging Face, Dev.to and Hacker News feeds when ARISE opens, hourly while it is visible, and when you return to the tab; its source panel also links to Reddit communities. The local server caches fetched feeds for 20 minutes; Vercel Functions cache them briefly per warm instance. It includes a sample of recent global-remote skill postings. Use **Refresh feed** to re-fetch the sources immediately. The page shows how many sources responded; hover over its status for failed-source details. If offline, the last successful feed remains saved on this device. The job-posting sample is a global remote snapshot, not a census of Indian hiring.

## Study and resources

The 48-month plan starts with your current C studies, keeps exam months lighter, and gradually introduces Python, DSA, math, ML, GenAI, data engineering, deployment, cybersecurity, research, entrepreneurship and communication. Each month explains why that topic comes next, what to study, an artifact to build and evidence to track. Adjust dates to your actual Vardhaman semester calendar; the suggested 9.5+ CGPA and career outcomes are targets, never guarantees.

- **Skills & courses:** staged paths for programming, data, ML, deep learning, NLP, computer vision, prompt engineering, production and research. The separate **Engineering Resources** view groups BTech foundations, tools, books, exams and the **AI & Prompting** shelf with free/paid labels, searchable notes, favorites and explored tracking.
- **Coding practice:** topic-level notes, lecture links and exercises from GeeksforGeeks, HackerRank, Codeforces, Exercism, CSES and other practice sites.
- **GATE DA:** a study pathway with links to the official syllabus and additional notes. Verify your exam-year syllabus and schedule on the official GATE site.
- **Notes and planner:** saved locally in this browser; they are available offline after opening the app. The focus timer offers 15m, 25m, 50m, 90m and custom durations.
- **Study rooms:** local hosting saves rooms to `.arise-data/rooms.json` and updates them live. Vercel does not provide shared-room storage; run **Start ARISE.cmd** to use rooms.

The in-app ARISE Study Guide opens with a brief system-reveal effect. It searches the local resource library and helps open roadmap, study and feed sections. It does not connect to Gemini, DeepSeek, ChatGPT or another model, and it requires no API key. Public feed refreshes use ARISE's own `/api` routes when online. On startup, the guide removes legacy provider-key entries saved by older ARISE versions from this browser profile.

## Offline and sharing

Install ARISE from the browser menu when served from localhost or HTTPS. The app shell, planner, checklists and notes stay available offline after the first visit. The service-worker cache is versioned with each app-shell release so updated resources can replace stale offline copies. Current web feeds need an internet connection. On local hosting, friends on your Wi-Fi can open `http://<your-computer-ip>:3000`; Vercel shares the app and public feeds, while rooms stay local-only.

## Before any public deployment

Study rooms use invite codes and do not have user accounts, per-member authorization, or moderation. Keep invite codes within your study group. Local room data is stored in `.arise-data/rooms.json` on the computer running ARISE.

## Files

- `index.html`, `styles.css`, `extras.css`, `simple-ux.css`, `arise-theme.css`, `system-aura.css`, `system-aura-v3.css`, `system-aura-v4.css`, `system-aura-v5.css`, `study-hub.css`, `cp-roadmap.css`: hunter-system app interface, clearer navigation, topic resource cards, theme contrast, motion effects and accessible styles
- `data.js`, `study-data.js`: curriculum, resources, GATE, communication, TED/TEDx and reference catalogs
- `app-v18.js`: hunter interface logic, tracker, planner, flexible focus timer, notes, feed refresh, and Sudoku clock lifecycle
- `cp-roadmap.js`, `topic-media-v17.js`: competitive-programming pathway and language-specific lecture/practice links
- `room-spark.js`, `room-spark.css`: collaborative study-room helpers and streaks
- `server.mjs`: live public feeds, Codeforces suggestions and room sync
- `api/`, `vercel-api/`, `vercel.json`: Vercel endpoints for feeds, Codeforces and persistent invite-code rooms
- `engineering-atlas-v1.js`, `practice-ranks-v22.js`, `arise-hunter-v1.css`: four-year skill passport, E→S difficulty guide and hunter interface refresh
- `arise-ui-v22.css`: keeps Sudoku difficulty and New Puzzle controls readable at desktop and narrow widths
- `sw.js`, `manifest.webmanifest`, `arise-mark.svg`, `assets/arise-logo.svg`, `assets/hunter-gate.png`, `assets/jinwoo-profile.png`, `assets/arise-gate-logo.png` (reference artwork): installable app shell, hunter scene, supplied profile portrait and original ARISE gate logo

## New researched learning resources

The new Resource Library shelves add advanced NLP and computer vision coursework, LLM agents and MCP, India-focused AI data and language benchmarks, secure and responsible AI, and student entrepreneurship and innovation pathways. Treat course years and events as changeable: confirm access, application windows, eligibility and dataset licenses at the official publisher.

- [Stanford CS224N · NLP and deep learning](https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1254/) — slides and course materials; the page distinguishes public archived lecture videos from login-only current videos.
- [Stanford CS231n · computer vision assignments](https://cs231n.stanford.edu/2025/assignments.html)
- [Hugging Face Agents Course](https://huggingface.co/agents-course)
- [AIKosh · IndiaAI datasets and models](https://aikosh.indiaai.gov.in/home/about-us/) and [university engagement](https://aikosh.indiaai.gov.in/workshop)
- [AI4Bharat repositories](https://github.com/AI4Bharat), including [IndicLLMSuite](https://github.com/AI4Bharat/IndicLLMSuite) and the [MILU benchmark](https://github.com/AI4Bharat/MILU)
- [OWASP Top 10 for LLM Applications 2025](https://genai.owasp.org/resource/owasp-top-10-for-large-language-model-applications-2025/) and the [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [Startup India Learning Program](https://www.startupindia.gov.in/content/sih/en/learning-and-development_v2.html), [online course directory](https://www.startupindia.gov.in/content/sih/en/reources/online-courses.html), and [student opportunities](https://www.startupindia.gov.in/content/sih/en/startupindia-mybharat.html)
- [Smart India Hackathon · Government of India information](https://www.india.gov.in/category/education-learning/subcategory/higher-education/details/website-of-smart-india-hackathon)

The latest research additions also cover the build-and-ship skill loop and competitive practice. The specific judging weights and entry rules always belong to each event’s current page; the general Devpost guide is only a rehearsal checklist.

- [FastAPI official tutorial](https://fastapi.tiangolo.com/tutorial/) and [Docker Get Started](https://docs.docker.com/get-started/) — take a small working project to a repeatable API/container.
- [MLflow quickstarts](https://mlflow.org/docs/latest/getting-started/) and [DVC Get Started](https://dvc.org/doc/start) — track model experiments and version data artifacts.
- [Hugging Face Spaces](https://huggingface.co/docs/hub/en/spaces-overview) — publish a small ML demo; review current compute and privacy options.
- [dbt Fundamentals](https://learn.getdbt.com/learn/course/dbt-fundamentals/welcome-to-dbt-fundamentals-5min/welcome) — practice tested and documented SQL transformations.
- [Devpost judging guidance](https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria) — translate a real event rubric into a working demo and clear submission.
- [Codeforces contest practice guide](https://codeforces.com/blog/entry/116371) — community advice for separating untimed learning from timed practice; treat it as one contestant’s method.
- [Google SRE Workbook](https://sre.google/workbook/preface/) — reliability and operations concepts for prototypes that need to work during a live demo.
- [OWASP Top 10:2025](https://top10.owasp.org/2025/en/) and [OWASP Application Security Verification Standard](https://owasp.org/www-project-application-security-verification-standard/) — risk awareness plus testable application controls.
- [web.dev Learn Accessibility](https://web.dev/learn/accessibility/) and [W3C WCAG 2.2 quick reference](https://www.w3.org/WAI/WCAG22/quickref/) — semantic UI, keyboard use, visible focus and readable controls.
- [GitHub Actions · build and test Node.js](https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs) — turn local checks into shared continuous integration.
- [MDN · using service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) — cache lifecycle, offline behavior and update checks.

## Skill outlook sources

The four-year passport prioritizes fundamentals, analytical thinking, resilience, AI and data, cybersecurity and clear communication. The World Economic Forum’s Future of Jobs 2025 is a broad employer survey and outlook through 2030, not a promise about any individual role or salary. ARISE translates that research into learning milestones and portfolio evidence.

The Windows launcher now requires a supported Node.js LTS major (22 or later). Node.js 20 reached end-of-life in March 2026; use a maintained LTS line for live feeds and study-room features.

- [World Economic Forum · Skills outlook](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/)
- [World Economic Forum · India outlook](https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/5-region-economy-and-industry-insights/)
- [Codeforces API · Problem rating field](https://codeforces.com/apiHelp/objects?locale=en)
