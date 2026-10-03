/* Curated study links for ARISE. Search links are topic-specific YouTube queries,
   while the notes and practice links point to their publishers. */
window.ARISE_STUDY = {
  resources: [
    {
      category: 'Core engineering lecture paths · curated',
      resources: [
        {icon:'▶',tag:'Free · Harvard CS50',name:'Start here · computer science and C',desc:'A structured introduction to problem solving, C, memory, algorithms, data structures, Python, SQL and web programming, with lectures and hands-on problem sets.',url:'https://cs50.harvard.edu/x/'},
        {icon:'▶',tag:'Free · Harvard CS50P',name:'Python programming, step by step',desc:'A full Python course with lectures and exercises covering functions, conditionals, loops, exceptions, libraries, file I/O, regular expressions and OOP.',url:'https://cs50.harvard.edu/python/'},
        {icon:'▶',tag:'Free · MIT OpenCourseWare',name:'Algorithms and data structures · MIT 6.006',desc:'A complete undergraduate lecture series on sorting, hashing, trees, graph search, shortest paths and dynamic programming, with notes and problem sets.',url:'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-videos/'},
        {icon:'▶',tag:'Free · Harvard CS50AI',name:'Artificial intelligence with Python',desc:'Lecture-based introduction to search, knowledge, uncertainty, optimization, learning and neural networks; work through the linked projects after each unit.',url:'https://cs50.harvard.edu/ai/'},
        {icon:'▶',tag:'Free · Stanford CS229',name:'Machine learning · lectures and notes',desc:'Open Stanford summer-course lectures and notes across regression, classification, neural networks, SVMs, clustering, PCA and reinforcement learning. Some newer Stanford class materials may require university access.',url:'https://cs229.stanford.edu/syllabus-summer2020.html'},
        {icon:'▶',tag:'Free · fast.ai',name:'Practical deep learning for coders',desc:'Build working models for vision, NLP, tabular data and recommendation, then study the underlying ideas. Best after you are comfortable writing basic Python.',url:'https://course.fast.ai/'},
        {icon:'▶',tag:'Free · MIT OpenCourseWare',name:'Linear algebra · lectures, notes and practice',desc:'Gilbert Strang’s approachable course on vectors, matrices, eigenvalues and applications; a strong foundation for graphics, data science and machine learning.',url:'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/'}
      ]
    },
    {
      category: 'Engineering skills · free study toolkit',
      resources: [
        {icon:'⌘',tag:'Open curriculum · GitHub',name:'OSSU computer science curriculum',desc:'A broad, sequenced self-study map of programming, math, systems, algorithms, theory and advanced CS using university-level online material. Use it as a long-range supplement, not a replacement for your Vardhaman syllabus.',url:'https://github.com/ossu/computer-science'},
        {icon:'⌘',tag:'Git & collaboration · GitHub',name:'GitHub Skills hands-on courses',desc:'Practice repositories, Markdown, branches, pull requests, merge conflicts and publishing inside guided GitHub workflows.',url:'https://skills.github.com/'},
        {icon:'⌘',tag:'Programming · GeeksforGeeks',name:'GeeksforGeeks free tutorials',desc:'Browse programming-language, CS subject, DSA, AI/ML and data-science tutorials. Treat these as explanations and practice support alongside course notes.',url:'https://www.geeksforgeeks.org/gfg-academy/geeksforgeeks-online-tutorials-free/'},
        {icon:'◉',tag:'Machine learning · Google',name:'Google Machine Learning Crash Course',desc:'A practical, interactive ML path with short videos, visualizations, modules and exercises. Follow its prerequisite guidance and build Python/math fundamentals first.',url:'https://developers.google.com/machine-learning/crash-course/'},
        {icon:'◉',tag:'Data science · Kaggle',name:'Kaggle Learn micro-courses',desc:'Free, hands-on short courses for Python, pandas, data visualization, SQL, introductory machine learning and more, paired with notebooks.',url:'https://www.kaggle.com/learn'},
        {icon:'◉',tag:'AI · Hugging Face',name:'Hugging Face Learn',desc:'Practical courses and documentation for NLP, transformers, computer vision, audio, diffusion and AI agents; choose a path after Python basics.',url:'https://huggingface.co/learn'},
        {icon:'▤',tag:'Tools · MIT',name:'The Missing Semester of Your CS Education',desc:'University lessons on shell, command-line tools, editors, Git, debugging and other practical tools that make engineering work smoother.',url:'https://missing.csail.mit.edu/'},
        {icon:'▤',tag:'India · NPTEL',name:'NPTEL course catalogue',desc:'Find IIT/IISc courses across engineering, programming, mathematics and computer science. Check the current run, enrollment dates and certificate terms.',url:'https://nptel.ac.in/courses'}
      ]
    },
    {
      category: 'GeeksforGeeks · learn, revise & practice',
      resources: [
        {icon:'⌘',tag:'C · fundamentals',name:'C fundamental practice problems',desc:'A useful match for your current C topics: input/output, data types, operators, conditionals and loops, with an online compiler and test cases.',url:'https://www.geeksforgeeks.org/c/c-fundamental-practice-problems/'},
        {icon:'⌘',tag:'DSA · beginner → advanced',name:'Step-by-step DSA tutorial',desc:'A staged topic sequence from programming and complexity through recursion, arrays, trees, graphs and dynamic programming. Skip difficult problems on the first pass.',url:'https://www.geeksforgeeks.org/blogs/the-ultimate-beginners-guide-for-dsa/'},
        {icon:'⌘',tag:'Practice · topic filters',name:'GeeksforGeeks problem practice',desc:'Browse live practice questions by arrays, strings, searching, sorting, recursion, graphs and difficulty. Some pages may ask you to sign in.',url:'https://www.geeksforgeeks.org/explore'},
        {icon:'⌘',tag:'GATE · supplementary notes',name:'GATE CS notes and topic index',desc:'Quick-reference notes for overlapping CS subjects such as C, algorithms, data structures, OS, DBMS and discrete math. Use the official GATE DA syllabus as your authority; these are not a DA syllabus replacement.',url:'https://www.geeksforgeeks.org/gate/gate-cs-notes-gq/'},
        {icon:'⌘',tag:'GATE · preparation guide',name:'GATE CS preparation and subject links',desc:'A subject-organized set of preparation links and revision material for GATE CSE. Check what overlaps your target paper before spending time on it.',url:'https://www.geeksforgeeks.org/gate/gate-corner-2-gq/'},
        {icon:'⌘',tag:'AI & data science',name:'GeeksforGeeks AI/ML and data-science hub',desc:'Explore explanations and tutorials across machine learning, AI, Python and data science; pair each article with code and a small project.',url:'https://www.geeksforgeeks.org/'},
        {icon:'⌘',tag:'C programming · written notes',name:'C programming language guide',desc:'Review C syntax and core concepts, then apply them in the C fundamental practice set above.',url:'https://www.geeksforgeeks.org/c/c-language-introduction/'},
        {icon:'▶',tag:'Video · GeeksforGeeks',name:'GeeksforGeeks video lectures',desc:'Search the GFG video library for topic explanations and revision lessons. Check the lesson level and date before following a playlist.',url:'https://www.youtube.com/@GeeksforGeeksVideos'}
      ]
    },
    {
      category: 'Watch and build · coding lectures',
      resources: [
        {icon:'▶',tag:'YouTube · NPTEL',name:'C programming, concept by concept',desc:'Open NPTEL lecture playlists for C lessons, including conditions, loops, arrays and functions.',url:'https://www.youtube.com/channel/UCjDLYQh2r-4nHxDmQsOIsGQ/playlists'},
        {icon:'▶',tag:'YouTube · IIT Delhi',name:'Data structures and algorithms',desc:'IIT Delhi’s NPTEL lecture series, starting with algorithm analysis and core data structures.',url:'https://www.youtube.com/watch?v=zWg7U0OEAoE'},
        {icon:'▶',tag:'YouTube · CS50',name:'Computer science foundations',desc:'Open CS50 playlists for approachable explanations of C, memory, algorithms and software.',url:'https://www.youtube.com/@cs50/playlists'},
        {icon:'▶',tag:'YouTube · DSA practice',name:'Visualize DSA patterns',desc:'Open Take U Forward playlists on arrays, recursion, trees, graphs, sorting and complexity before solving problems.',url:'https://www.youtube.com/@takeUforward/playlists'},
        {icon:'▶',tag:'YouTube · Git & GitHub',name:'Git, GitHub and team workflow',desc:'Open GitHub playlists for commits, branches, pull requests and project collaboration.',url:'https://www.youtube.com/@GitHub/playlists'},
        {icon:'▶',tag:'YouTube · Python',name:'Python for data science',desc:'Find beginner lessons for Python, NumPy, pandas, notebooks and data visualization.',url:'https://www.youtube.com/@coreyms/playlists'},
        {icon:'▶',tag:'YouTube · Machine learning',name:'Machine learning, from intuition to math',desc:'Open StatQuest’s ML playlists for clear intuition; build math and Python foundations first.',url:'https://www.youtube.com/@statquest/playlists'},
        {icon:'▶',tag:'YouTube · Deep learning',name:'Deep learning foundations',desc:'Open DeepLearning.AI playlists on neural networks, backpropagation, CNNs, transformers and evaluation.',url:'https://www.youtube.com/@DeepLearningAI/playlists'},
        {icon:'▶',tag:'YouTube · Communication',name:'Practice speaking with structure',desc:'Open TED playlists for talks about communication, presenting ideas and explaining technical work.',url:'https://www.youtube.com/@TED/playlists'},
        {icon:'▶',tag:'YouTube · Hackathons',name:'Hackathon idea to demo',desc:'Open Devfolio playlists for event demos and builder guidance; follow each event’s own rules.',url:'https://www.youtube.com/@Devfolio/playlists'}
      ]
    },
    {
      category: 'Hackathon essentials · ship as a team',
      resources: [
        {icon:'⚡',tag:'Practice',name:'MLH Hackathon Prep',desc:'Organizer guidance for forming a team, planning a build, presenting and getting the most from a hackathon.',url:'https://hackathon.guide/'},
        {icon:'✦',tag:'Find events',name:'Devpost hackathons',desc:'Browse active online and in-person hackathons; always confirm dates and eligibility on the organizer page.',url:'https://devpost.com/hackathons'},
        {icon:'⌘',tag:'GitHub',name:'GitHub Skills',desc:'Hands-on GitHub courses for repositories, Markdown, pull requests, merge conflicts and publishing.',url:'https://skills.github.com/'},
        {icon:'◈',tag:'Design',name:'Figma for collaborative prototyping',desc:'Learn to sketch a clear user flow and clickable prototype before coding the full product.',url:'https://help.figma.com/hc/en-us/categories/360002042553-Get-started'},
        {icon:'▤',tag:'Pitching',name:'Make a clear product demo',desc:'A short demo should show the user, the problem, the working flow and what your team learned.',url:'https://www.youtube.com/@Devfolio/playlists'},
        {icon:'☁',tag:'Deployment',name:'Deploy a project with GitHub Pages',desc:'Publish a static prototype so judges and teammates can try it without setting up your laptop.',url:'https://docs.github.com/en/pages'}
      ]
    },
    {
      category: 'Communication · writing · teamwork',
      resources: [
        {icon:'▤',tag:'Free course',name:'Google technical writing',desc:'Practice concise sentences, useful headings, lists and explanations for technical readers.',url:'https://developers.google.com/tech-writing'},
        {icon:'◉',tag:'Speaking',name:'Toastmasters learning resources',desc:'Build deliberate practice in prepared talks, impromptu speaking, listening and feedback.',url:'https://www.toastmasters.org/resources'},
        {icon:'✦',tag:'TEDx · public speaking',name:'The 110 techniques of communication',desc:'David JP Phillips breaks down practical choices that make a talk easier to follow and remember.',url:'https://www.ted.com/talks/david_jp_phillips_the_110_techniques_of_communication_and_public_speaking'},
        {icon:'✦',tag:'TED · presentations',name:'How to create and deliver a talk that rocks',desc:'Laura Penn on shaping a focused talk, preparing well and delivering an idea with purpose.',url:'https://www.ted.com/talks/laura_penn_how_to_create_and_deliver_a_talk_that_rocks'},
        {icon:'✦',tag:'TEDx · teamwork',name:'The surprisingly simple reason teams fail',desc:'Tessa West explores communication habits and assumptions that can quietly undermine teamwork.',url:'https://www.ted.com/talks/tessa_west_the_surprisingly_simple_reason_teams_fail'},
        {icon:'✦',tag:'TEDx · communication',name:'Why communication goes wrong—and how to fix it',desc:'Tim Pollard shares a framework for making a message land with the people who need it.',url:'https://www.ted.com/talks/tim_pollard_why_communication_goes_wrong_and_how_to_fix_it'},
        {icon:'✦',tag:'TED · collaboration',name:'How to turn a group of strangers into a team',desc:'Amy Edmondson explains psychological safety and learning together in teams.',url:'https://www.ted.com/talks/amy_edmondson_how_to_turn_a_group_of_strangers_into_a_team'},
        {icon:'✦',tag:'TED · active listening',name:'How to be a great listener',desc:'Maegan Stephens and Nicole Lowenbraun offer a practical listening framework for building trust and getting better outcomes in group projects. Try asking one clarifying question before proposing your solution.',url:'https://www.ted.com/talks/maegan_stephens_and_nicole_lowenbraun_how_to_be_a_great_listener'},
        {icon:'✦',tag:'TEDx · confidence & communication',name:'How to speak up for yourself',desc:'Adam Galinsky shares ways to express your ideas and advocate for yourself while taking other people’s perspectives into account. Try using one evidence-backed point in your next team discussion.',url:'https://www.ted.com/talks/adam_galinsky_how_to_speak_up_for_yourself'},
        {icon:'✦',tag:'TEDx · meetings & teamwork',name:'How to save yourself from bad meetings',desc:'David Grady explains how to make meetings more useful and protect time for focused work. Try ending your next team sync with one owner and one next step per decision.',url:'https://www.ted.com/talks/david_grady_how_to_save_the_world_or_at_least_yourself_from_bad_meetings'},
        {icon:'◌',tag:'Reflection',name:'TED teamwork talks',desc:'A wider collection to explore collaboration, conflict, trust and team habits.',url:'https://www.ted.com/topics/teamwork'}
      ]
    },
    {
      category: 'TED & TEDx · self-improvement, purpose and entrepreneurship',
      resources: [
        {icon:'✦',tag:'TED · resilience',name:'Grit: The power of passion and perseverance',desc:'Angela Lee Duckworth explains why sustained effort matters when a goal takes more than a quick burst of motivation.',url:'https://www.ted.com/talks/angela_lee_duckworth_grit_the_power_of_passion_and_perseverance'},
        {icon:'✦',tag:'TED · growth mindset',name:'The power of believing that you can improve',desc:'Carol Dweck introduces the growth-mindset idea: treat a difficult problem as a chance to learn and improve.',url:'https://www.ted.com/talks/carol_dweck_the_power_of_believing_that_you_can_improve'},
        {icon:'✦',tag:'TED · focus & procrastination',name:'Inside the mind of a master procrastinator',desc:'Tim Urban makes the habits behind procrastination memorable and encourages us to notice what we keep putting off.',url:'https://www.ted.com/talks/tim_urban_inside_the_mind_of_a_master_procrastinator'},
        {icon:'✦',tag:'TED · practical goal setting',name:'Why the secret to success is setting the right goals',desc:'John Doerr explains Objectives and Key Results as a way to turn ambitious intentions into specific, trackable outcomes.',url:'https://www.ted.com/talks/john_doerr_why_the_secret_to_success_is_setting_the_right_goals'},
        {icon:'✦',tag:'TED · student entrepreneurship',name:'What does it take to become a student entrepreneur?',desc:'Jackie Tan discusses balancing a student life with building a venture, including the trade-offs and mindset involved.',url:'https://www.ted.com/talks/jackie_tan_what_does_it_take_to_become_a_student_entrepreneur'},
        {icon:'✦',tag:'TED · startup execution',name:'The single biggest reason why start-ups succeed',desc:'Bill Gross compares factors behind startup outcomes and makes a case for timing as one important factor to examine.',url:'https://www.ted.com/talks/bill_gross_the_single_biggest_reason_why_start_ups_succeed'},
        {icon:'✦',tag:'TEDx · start small',name:'The power of starting small · perseverance and entrepreneurship',desc:'Aman Goel shares lessons from starting young, solving a real customer problem and executing steadily.',url:'https://www.ted.com/talks/aman_goel_the_power_of_starting_small_perseverance_and_entrepreneurship'},
        {icon:'✦',tag:'TED · creativity',name:'A powerful way to unleash your natural creativity',desc:'Tim Harford looks at how moving between projects and combining interests can help people find creative ideas.',url:'https://www.ted.com/talks/tim_harford_a_powerful_way_to_unleash_your_natural_creativity'},
        {icon:'✦',tag:'TED · stress & perspective',name:'How to make stress your friend',desc:'Kelly McGonigal explores how our beliefs and social connection can shape the experience of stress. Use it as a perspective, not medical advice.',url:'https://ed.ted.com/lessons/q22s5JoA'},
        {icon:'✦',tag:'TED · communication',name:'How to speak so that people want to listen',desc:'Julian Treasure gives practical speaking and listening ideas for presentations, interviews and teamwork.',url:'https://www.ted.com/talks/julian_treasure_how_to_speak_so_that_people_want_to_listen'},
        {icon:'✦',tag:'TED · learning how to learn',name:'How to get better at the things you care about',desc:'Eduardo Briceño explains the difference between practicing to improve and performing to show what you know. Pick one coding skill and schedule a low-stakes practice session this week.',url:'https://www.ted.com/talks/eduardo_briceno_how_to_get_better_at_the_things_you_care_about'},
        {icon:'✦',tag:'TED · original thinking',name:'The surprising habits of original thinkers',desc:'Adam Grant looks at how people develop and act on new ideas, including learning from attempts that do not work. Use the takeaway to run one small experiment on a hackathon idea.',url:'https://www.ted.com/talks/adam_grant_the_surprising_habits_of_original_thinkers'},
        {icon:'✦',tag:'TED · motivation',name:'The puzzle of motivation',desc:'Dan Pink discusses autonomy, mastery and purpose at work. Reflect on which one would make your next study sprint more meaningful.',url:'https://www.ted.com/talks/dan_pink_the_puzzle_of_motivation'},
        {icon:'✦',tag:'TEDx · creative problem solving',name:'Want to be more creative? Go for a walk',desc:'Marily Oppezzo shares research on walking and idea generation. Try a short screen-free walk when you are stuck on a project problem.',url:'https://www.ted.com/talks/marily_oppezzo_want_to_be_more_creative_go_for_a_walk'},
        {icon:'✦',tag:'TEDx · work & wellbeing',name:'The happy secret to better work',desc:'Shawn Achor makes a case for how positive habits can affect how we approach work. Take one small action that makes your study environment more supportive.',url:'https://www.ted.com/talks/shawn_achor_the_happy_secret_to_better_work'},
        {icon:'✦',tag:'TEDWomen · entrepreneurship',name:'How entrepreneurs can unlock their full potential',desc:'Jay Bailey discusses access, belonging and the people who help turn ideas into ventures. Note one person or community that could help you test a student startup idea.',url:'https://www.ted.com/talks/jay_bailey_how_entrepreneurs_can_unlock_their_full_potential'},
        {icon:'✦',tag:'TED · collaboration',name:'How to start a movement',desc:'Derek Sivers uses a short, memorable example to show how early followers help an idea gather momentum.',url:'https://www.ted.com/talks/derek_sivers_how_to_start_a_movement'}
      ]
    },
    {
      category: 'TEDx India · engineering, technology and entrepreneurship',
      resources: [
        {icon:'✦',tag:'TEDx · Indian engineering',name:'India — engineering the future of innovation',desc:'Siddharth Rajhans reflects on engineering education and innovation in India. Use it as a discussion starter: what local problem could your technical skills help solve?',url:'https://www.ted.com/talks/siddharth_rajhans_india_engineering_the_future_of_innovation'},
        {icon:'✦',tag:'TEDx · India 2030',name:'India 2030: a problem-solving machine?',desc:'Kumar Anshu discusses the challenge of turning India’s engineering talent into high-impact products and innovation. Write down one product gap you can investigate with users.',url:'https://www.ted.com/talks/kumar_anshu_india_2030_a_country_of_unemployed_or_world_s_problem_solving_machine'},
        {icon:'✦',tag:'TEDxIITPatna · founder journey',name:'Stepping stones to success',desc:'Javed Khatri reflects on his engineering days, building with friends and learning through entrepreneurship. Look for the practical trade-offs and experiments in the founder story.',url:'https://www.ted.com/talks/javed_khatri_stepping_stones_to_success'},
        {icon:'✦',tag:'TEDx · startup craft',name:'Checklist for an entrepreneur',desc:'Suhas Misra shares lessons from building companies, including learning from failure and shaping a clear venture story. Turn one idea into a testable customer question.',url:'https://www.ted.com/talks/suhas_misra_check_list_for_an_entrepreneur'},
        {icon:'✦',tag:'TEDxNITTrichy · AI for India',name:'Bridging the digital divide using the power of voice',desc:'Anant Nagaraj discusses speech technology for India’s language diversity and digital access. Consider how language, data and usability change the design of an AI product.',url:'https://www.ted.com/talks/anant_nagaraj_bridging_the_digital_divide_using_the_power_of_voice'},
        {icon:'✦',tag:'TED Talks India · technology leadership',name:'What’s Google’s vision for India?',desc:'Sundar Pichai discusses technology and India’s potential in this TED Talks India conversation. Note one opportunity and one responsibility that come with building technology at scale.',url:'https://www.ted.com/talks/sundar_pichai_what_s_google_s_vision_for_india_extended'}
      ]
    },
    {
      category: 'GATE DA · official material and notes',
      resources: [
        {icon:'✓',tag:'Official · IIT Madras',name:'GATE 2027 DA syllabus',desc:'Use the current official Data Science & Artificial Intelligence syllabus. The 2027 syllabi were revised.',url:'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf'},
        {icon:'◈',tag:'Official · IIT Madras',name:'GATE question-paper pattern',desc:'Check the official marks, question types, duration and MCQ negative-marking rules.',url:'https://gate2027.iitm.ac.in/question_paper_pattern'},
        {icon:'▶',tag:'Free · NPTEL',name:'NPTEL GATE portal and DA practice',desc:'IIT/IISc-supported courses, topic assignments, previous-question explanations and registered mock tests.',url:'https://gate.nptel.ac.in/exam.html'},
        {icon:'▤',tag:'Official · IIT Guwahati',name:'GATE 2026 DA paper and answer key',desc:'Solve the official paper under timed conditions, then review with the matching key.',url:'https://gate2026.iitg.ac.in/QPs-answer-keys.html'},
        {icon:'▤',tag:'Open course · MIT',name:'Linear algebra notes and lectures',desc:'Gilbert Strang’s course covers vectors, matrices, linear transformations, eigenvalues and applications.',url:'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/'},
        {icon:'▤',tag:'Open course · MIT',name:'Calculus notes, lectures and practice',desc:'Open lecture notes, videos, problem sets and exams for single-variable calculus.',url:'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/'},
        {icon:'▤',tag:'Open textbook',name:'OpenIntro Statistics',desc:'Free statistics text and supporting materials; use alongside the official DA syllabus.',url:'https://www.openintro.org/book/os/'},
        {icon:'▤',tag:'Official · Stanford',name:'CS229 machine-learning notes',desc:'Lecture notes on supervised learning, SVMs, regularization, clustering, PCA and more.',url:'https://cs229.stanford.edu/materials.html-full'},
        {icon:'▤',tag:'Official · Python',name:'Python tutorial',desc:'The language reference for syntax, control flow, data structures, functions and modules.',url:'https://docs.python.org/3/tutorial/'},
        {icon:'▶',tag:'YouTube · topic search',name:'GATE DA subject-wise video lectures',desc:'Search current topic-specific NPTEL and university lectures; compare each playlist against the revised syllabus.',url:'https://www.youtube.com/channel/UCjDLYQh2r-4nHxDmQsOIsGQ/playlists'}
      ]
    },
    {
      category: 'Books · free and legal editions',
      resources: [
        {icon:'▤',tag:'C programming',name:'Beej’s Guide to C Programming',desc:'A friendly, free guide for C fundamentals. Pair it with your college lab exercises and the official C reference.',url:'https://beej.us/guide/bgc/'},
        {icon:'▤',tag:'Python',name:'Think Python · 3rd edition',desc:'Free beginner book with runnable notebooks and exercises. The author publishes it under a Creative Commons license.',url:'https://greenteapress.com/wp/think-python-3rd-edition/'},
        {icon:'▤',tag:'C++',name:'LearnCpp',desc:'A carefully sequenced, freely accessible C++ textbook-style tutorial with practice along the way.',url:'https://www.learncpp.com/'},
        {icon:'▤',tag:'Git & GitHub',name:'Pro Git',desc:'The full Pro Git book is available to read online for free from the official Git project site.',url:'https://git-scm.com/book/en/v2'},
        {icon:'▤',tag:'Data structures',name:'OpenDSA eTextbooks',desc:'Free interactive textbooks with visualizations and practice for data structures, algorithms and programming languages.',url:'https://opendsa.org/home/books'},
        {icon:'▤',tag:'Competitive programming',name:'Competitive Programmer’s Handbook',desc:'Antti Laaksonen’s free online book, paired with the CSES problem set for deliberate practice.',url:'https://cses.fi/book/index.php'},
        {icon:'▤',tag:'Calculus · OpenStax',name:'Calculus, Volume 1',desc:'Free textbook covering functions, limits, derivatives and integrals; use MIT OCW for its matching lectures and problem sets.',url:'https://openstax.org/books/calculus-volume-1/pages/index'},
        {icon:'▤',tag:'Statistics',name:'OpenIntro Statistics',desc:'Free statistics textbook and materials for probability, inference and data interpretation.',url:'https://www.openintro.org/book/os/'},
        {icon:'▤',tag:'Math for AI',name:'Mathematics for Machine Learning',desc:'A substantial mathematics reference for linear algebra, analytic geometry, matrix decompositions, calculus and probability.',url:'https://mml-book.github.io/'},
        {icon:'▤',tag:'Machine learning',name:'Dive into Deep Learning',desc:'An open, code-first textbook that teaches deep learning ideas alongside runnable examples.',url:'https://d2l.ai/'},
        {icon:'▤',tag:'Deep learning',name:'Deep Learning · Goodfellow, Bengio & Courville',desc:'The authors’ complete online textbook, available to read free; best used after calculus, linear algebra and basic ML.',url:'https://www.deeplearningbook.org/'},
        {icon:'▤',tag:'Data science',name:'Mining of Massive Datasets',desc:'Stanford’s free book on data mining, recommendation, graph mining and large-scale data systems.',url:'https://www.mmds.org/'},
        {icon:'▤',tag:'Databases',name:'Database System Concepts · companion site',desc:'Publisher-backed online chapters, practice material and SQL labs; use the Vardhaman library for full assigned editions.',url:'https://www.yale.db-book.com/'},
        {icon:'▤',tag:'Computer systems',name:'Operating Systems: Three Easy Pieces',desc:'A free online book on virtualization, concurrency and persistence from the authors’ university site.',url:'https://pages.cs.wisc.edu/~remzi/OSTEP/'},
        {icon:'▤',tag:'College & exams',name:'Vardhaman Central Library',desc:'Check the institution’s official library catalogue and access rules for books, course materials and subscriptions.',url:'https://vardhaman.org/library/'},
        {icon:'▤',tag:'GATE DA',name:'GATE 2027 official syllabus PDF',desc:'Anchor every book chapter to the revised official DA syllabus; do not treat any single book as the entire exam syllabus.',url:'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf'}
      ]
    },
    {
      category: 'Builder essentials · ship, test & contribute',
      resources: [
        {icon:'⌘',tag:'MIT · practical tools',name:'The Missing Semester of Your CS Education',desc:'Learn the shell, command-line workflows, Git, debugging, editors and automation—the tools that let you build and collaborate beyond an IDE.',url:'https://missing.csail.mit.edu/2026/'},
        {icon:'⌘',tag:'GitHub · open source',name:'Make your first open-source contribution',desc:'A guided workflow for reading project rules, finding a contribution, using a fork and branch, opening a pull request, and working with maintainers.',url:'https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-open-source'},
        {icon:'⌘',tag:'GitHub · team workflow',name:'Branches, forks, reviews and pull requests',desc:'Learn the everyday collaboration habits behind team coding: small changes, reviewable commits, feedback, checks and a clean merge.',url:'https://docs.github.com/en/pull-requests/concepts/writing-code-for-a-project'},
        {icon:'⚙',tag:'GitHub · automation',name:'GitHub Actions quickstart',desc:'Add an automated check to a repository so every change can be built or validated before it is merged.',url:'https://docs.github.com/en/actions/get-started/quickstart'},
        {icon:'✓',tag:'Python · testing',name:'pytest getting started',desc:'Practice small, readable tests and use failures to make code safer to change. Translate the same test-first habit to the language you are studying.',url:'https://docs.pytest.org/en/stable/getting-started.html'}
      ]
    },
    {
      category: 'Hackathon & founder craft · solve a real problem',
      resources: [
        {icon:'✦',tag:'Y Combinator · free course',name:'Startup School',desc:'A self-paced founder course for turning an idea into a startup: talk to users, build an MVP, measure progress and keep learning from evidence.',url:'https://www.startupschool.org/'},
        {icon:'✦',tag:'Product discovery',name:'Atlassian · discover the right problem',desc:'A practical guide to understanding users and checking value, usability and feasibility before a team spends a hackathon building the wrong feature.',url:'https://www.atlassian.com/agile/product-management/discovery/'},
        {icon:'✦',tag:'User research',name:'Collect and use customer feedback',desc:'Learn to capture interview notes and observations, spot recurring needs, and turn evidence into the next small experiment.',url:'https://www.atlassian.com/agile/product-management/customer-feedback'},
        {icon:'✦',tag:'Product decisions',name:'Check product-market fit assumptions',desc:'Use user feedback and measurable signals to test whether a solution is solving a problem people care about.',url:'https://www.atlassian.com/agile/product-management/product-market-fit'},
        {icon:'▶',tag:'Video · demo craft',name:'Hackathon pitch and product demo lectures',desc:'Search for short, practical demos on problem framing, a crisp live walkthrough, evidence, team roles and a confident final pitch.',url:'https://www.youtube.com/@Devfolio/playlists'}
      ]
    },
    {
      category: 'Production engineering · deploy, secure & measure',
      resources: [
        {icon:'☁',tag:'Google Cloud · deployment',name:'Deploy a website with Cloud Run',desc:'A hands-on path from a working local app to a deployed service. Useful after you can build and run a small web project.',url:'https://codelabs.developers.google.com/codelabs/cloud-run-deploy'},
        {icon:'✳',tag:'Google · production ML',name:'Test machine-learning systems before deployment',desc:'Learn to validate input data, features, model quality, serving infrastructure and pipeline integration—not only a model’s score in a notebook.',url:'https://developers.google.com/machine-learning/crash-course/production-ml-systems/deployment-testing'},
        {icon:'✳',tag:'Google · ML engineering',name:'Rules of Machine Learning',desc:'A field guide to dependable ML projects: start with a simple baseline, test infrastructure, watch leakage and keep the serving system aligned with training.',url:'https://developers.google.com/machine-learning/guides/rules-of-ml/'},
        {icon:'◈',tag:'Responsible AI',name:'Fairness and bias in machine learning',desc:'Check data representation and model quality across groups; learn to notice when a strong aggregate score hides unequal errors.',url:'https://developers.google.com/machine-learning/crash-course/fairness/identifying-bias'},
        {icon:'◈',tag:'Security · OWASP 2025',name:'OWASP Top 10 web application risks',desc:'Learn the current high-priority web risks, including access control, misconfiguration, supply-chain failures, injection and authentication failures.',url:'https://top10.owasp.org/2025/en/'},
        {icon:'◈',tag:'Security · verification',name:'OWASP Application Security Verification Standard',desc:'Go beyond an awareness list: use a testable control catalogue to review authentication, access control, data protection, API behavior and error handling before a public release.',url:'https://owasp.org/www-project-application-security-verification-standard/'},
        {icon:'◉',tag:'Inclusive engineering',name:'web.dev · Learn Accessibility',desc:'Build interfaces that more people can use. Cover semantic HTML, keyboard access, contrast, forms and accessible interaction patterns.',url:'https://web.dev/learn/accessibility/'},
        {icon:'◉',tag:'Accessibility · W3C',name:'WCAG 2.2 quick reference',desc:'Check the current web accessibility success criteria. For an app, pay special attention to keyboard operation, visible focus, labels, contrast and focus that sticky UI does not hide.',url:'https://www.w3.org/WAI/WCAG22/quickref/'},
        {icon:'✓',tag:'GitHub · continuous integration',name:'Build and test Node.js with GitHub Actions',desc:'Turn local checks into a repeatable CI workflow that runs on changes, catches regressions early and gives collaborators a shared green-or-red result.',url:'https://docs.github.com/en/actions/tutorials/build-and-test-code/nodejs'},
        {icon:'◌',tag:'PWA · offline behavior',name:'MDN · service workers and offline caching',desc:'Learn install, activation, cache versioning, stale assets and offline fallbacks. Use the lifecycle checklist when changing the app shell so people do not get stuck on an old cached build.',url:'https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers'}
      ]
    },
    {
      category: 'Communication & professional proof · make your work clear',
      resources: [
        {icon:'✎',tag:'Google · technical writing',name:'Technical Writing Courses for Engineers',desc:'Practice clearer explanations, useful headings, short accurate code examples, diagrams, audience awareness and technical documentation.',url:'https://developers.google.com/tech-writing'},
        {icon:'◌',tag:'GitHub · async teamwork',name:'Communicate through issues, pull requests and discussions',desc:'Learn to give useful context, ask focused questions and keep engineering decisions visible to teammates.',url:'https://docs.github.com/en/get-started/using-github/communicating-on-github'},
        {icon:'⌘',tag:'Portfolio · profile',name:'Make a GitHub profile README',desc:'Create a compact profile that points to your best projects, what you are learning, and how another student or recruiter can run your work.',url:'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme'},
        {icon:'⌘',tag:'Portfolio · publish',name:'Publish a project with GitHub Pages',desc:'Turn a finished static project into a link you can put in a resume, hackathon submission and portfolio.',url:'https://docs.github.com/en/pages/quickstart'},
        {icon:'▶',tag:'Video · presenting',name:'Technical presentation and communication lectures',desc:'Find lessons on concise storytelling, explaining diagrams, speaking with confidence, and answering judges’ questions.',url:'https://www.youtube.com/@TED/playlists'}
      ]
    },
    {
      category: '2030 skill horizon · research-backed signals',
      resources: [
        {icon:'◉',tag:'World Economic Forum · global outlook',name:'Future of Jobs Report 2025 · skills outlook',desc:'An employer survey projects rising demand through 2030 for AI and big data, cybersecurity, technological literacy, analytical and creative thinking, resilience, leadership and lifelong learning. Treat it as a planning signal, not a promise.',url:'https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/3-skills-outlook/'},
        {icon:'◉',tag:'World Economic Forum · India',name:'India’s jobs and skill outlook to 2030',desc:'The India profile highlights AI and big data, technological literacy and cybersecurity alongside demand for big-data, AI/ML and security roles; it also points to more skills-based hiring.',url:'https://www.weforum.org/publications/the-future-of-jobs-report-2025/in-full/5-region-economy-and-industry-insights/'},
        {icon:'◉',tag:'World Economic Forum · future roles',name:'Technology and the jobs of tomorrow',desc:'Explore how AI, networks, robotics and energy technologies may reshape work. Use this to choose projects with real applications, not to chase every new tool.',url:'https://www.weforum.org/publications/jobs-of-tomorrow-technology-and-the-future-of-the-worlds-largest-workforces/'}
      ]
    },
    {
      category: 'Deep AI paths · language, vision & agents',
      resources: [
        {icon:'▶',tag:'Stanford · advanced NLP · Python first',name:'CS224N · NLP with Deep Learning',desc:'A rigorous path through word vectors, neural networks, attention, transformers and LLMs, with slides, notes and assignments. Build Python, calculus, linear algebra and ML foundations first; the 2025 enrolled-student videos require Stanford login, while the course links public 2023 lectures.',url:'https://web.stanford.edu/class/archive/cs/cs224n/cs224n.1254/'},
        {icon:'▶',tag:'Stanford · advanced computer vision',name:'CS231n · Computer Vision assignments',desc:'Learn by implementing image classifiers, convolutional networks, transformers and modern vision approaches. Use the assignments to turn lecture concepts into a tested portfolio project.',url:'https://cs231n.stanford.edu/2025/assignments.html'},
        {icon:'▶',tag:'YouTube · Stanford · public lecture',name:'CS231n lecture · visual recognition',desc:'A public lecture from Stanford’s CS231n series. Pair it with the official assignment page and write a short note on how image representations are learned.',url:'https://www.youtube.com/watch?v=2fq9wYslV0A'},
        {icon:'◈',tag:'Hugging Face · intermediate · Python first',name:'Agents Course · tools, workflows and MCP',desc:'Study agent fundamentals, tool use, frameworks, use cases and evaluation through a practical open course. Learn basic Python and LLM prompting first; treat agents as software systems that need tests and safe permissions.',url:'https://huggingface.co/agents-course'},
        {icon:'◉',tag:'Google · refreshed interactive ML course',name:'Machine Learning Crash Course · LLM and production modules',desc:'A free sequence with interactive exercises covering ML foundations, neural networks, embeddings, introductory LLMs, production systems and fairness. Choose modules in order or jump to a gap you need to fill.',url:'https://developers.google.com/machine-learning/crash-course'}
      ]
    },
    {
      category: 'India AI fieldwork · datasets, benchmarks & open source',
      resources: [
        {icon:'◉',tag:'IndiaAI · national platform',name:'AIKosh · discover India-focused datasets and models',desc:'Explore Indian datasets, models, tools, use cases and development resources. A strong source for grounded student projects; inspect each dataset’s documentation, consent, provenance and license before using it.',url:'https://aikosh.indiaai.gov.in/home/about-us/'},
        {icon:'◉',tag:'IndiaAI · campus engagement',name:'AIKosh University Engagement Programme',desc:'Find university workshops and hands-on opportunities around IndiaAI datasets and models. Check the current workshop and challenge status with the platform before planning an event around it.',url:'https://aikosh.indiaai.gov.in/workshop'},
        {icon:'⌘',tag:'Open source · Indic AI',name:'AI4Bharat · language technology repositories',desc:'Explore open Indic-language data, models and tools from an Indian academic research group. Pick one repository, read its paper and license, reproduce a baseline, then document your changes.',url:'https://github.com/AI4Bharat'},
        {icon:'⌘',tag:'Advanced · Indic language datasets',name:'IndicLLMSuite · data and training pipelines',desc:'Study the data pipelines and resources behind Indic-language LLM research. Use this as an advanced reading and reproducibility project after learning Python, NLP and responsible data handling.',url:'https://github.com/AI4Bharat/IndicLLMSuite'},
        {icon:'⌘',tag:'Advanced · evaluation and research',name:'MILU · benchmark for Indic-language understanding',desc:'Read the benchmark paper and repository to understand how language models are evaluated across Indian languages and subjects. Try a small, clearly cited replication rather than claiming a benchmark result from a tiny sample.',url:'https://github.com/AI4Bharat/MILU'}
      ]
    },
    {
      category: 'Trustworthy AI · evaluate, secure & explain',
      resources: [
        {icon:'⚙',tag:'Google · applied ML systems',name:'Production ML systems and responsible engineering',desc:'Learn the full system around a model: data, evaluation, serving, monitoring, automation and fairness. Add a baseline, error analysis and failure notes to every AI project.',url:'https://developers.google.com/machine-learning/crash-course'},
        {icon:'◈',tag:'OWASP · GenAI security · current',name:'Current GenAI Top 10 risks',desc:'Understand prompt injection, sensitive-data disclosure, insecure outputs, excessive agency and other LLM-specific risks. Turn the list into a threat-model checklist before a hackathon demo or deployment.',url:'https://genai.owasp.org/llm-top-10/'},
        {icon:'◉',tag:'NIST · risk framework',name:'AI Risk Management Framework',desc:'Use a structured, voluntary framework to identify, assess and manage AI risks across design, development, evaluation and deployment. Helpful when explaining project limitations to judges or users.',url:'https://www.nist.gov/itl/ai-risk-management-framework'},
        {icon:'⌘',tag:'Google · course exercises',name:'ML evaluation and hands-on exercises',desc:'Work through short exercises on datasets, generalization, model metrics and model behavior. Record where the model fails, not just its best score.',url:'https://developers.google.com/machine-learning/crash-course/exercises'}
      ]
    },
    {
      category: 'India student founders · learn, mentor & compete',
      resources: [
        {icon:'✦',tag:'Startup India · free entrepreneurship course',name:'Startup India Learning Program',desc:'A four-week, founder-led introduction to entrepreneurship, with English and Hindi options. Learn customer discovery, business fundamentals and pitching; check current registration and certificate conditions on the official page.',url:'https://www.startupindia.gov.in/content/sih/en/learning-and-development_v2.html'},
        {icon:'✦',tag:'Startup India · course directory',name:'Startup India online courses',desc:'Browse courses listed for programming, security, analytics, AI, cloud, management and entrepreneurship. The catalogue can change and may require a registered account, so confirm availability before building a study plan around a course.',url:'https://www.startupindia.gov.in/content/sih/en/reources/online-courses.html'},
        {icon:'✦',tag:'Startup India × MY Bharat · opportunities',name:'Student mentorship, internships and incubator events',desc:'Explore youth-facing mentorship, internship and incubator/accelerator event opportunities listed through the Startup India and MY Bharat initiative. Listings and eligibility vary; check the live official page.',url:'https://www.startupindia.gov.in/content/sih/en/startupindia-mybharat.html'},
        {icon:'⚡',tag:'Government of India · student innovation',name:'Smart India Hackathon · official information',desc:'Use the Government of India’s official listing to reach Smart India Hackathon information. Participation typically flows through institutional teams; verify the latest edition, college nodal process, dates and problem statements with your institute and the organizer.',url:'https://www.india.gov.in/category/education-learning/subcategory/higher-education/details/website-of-smart-india-hackathon'}
      ]
    },
    {
      category: 'Codeathons & competitive coding · practice with a review loop',
      resources: [
        {icon:'⌘',tag:'Codeforces · problem-solving guide',name:'Train problem solving and contest speed separately',desc:'A detailed community guide hosted on Codeforces explains why untimed archive practice builds new problem-solving ideas while live and virtual contests build speed. Use it as one experienced contestant’s method, then adjust the weekly load around college.',url:'https://codeforces.com/blog/entry/116371'},
        {icon:'⌘',tag:'Official platform · live contests',name:'Codeforces contest calendar',desc:'Enter at your current level, keep a short error log, and upsolve one problem you missed after each contest. The official event page shows current rounds and rules; ratings apply only under the platform’s conditions.',url:'https://codeforces.com/contests'},
        {icon:'⌘',tag:'Official platform · structured DP set',name:'AtCoder Educational DP Contest',desc:'A progressive set of 26 tasks that builds dynamic programming from simple state design toward more advanced transitions. Attempt each problem before opening its editorial; track the topic and insight in your notes.',url:'https://atcoder.jp/contests/dp/tasks'},
        {icon:'▤',tag:'Free · competitive programming handbook',name:'The Competitive Programmer’s Handbook',desc:'Use the free book to learn contest-oriented algorithms and complexity. For each chapter, solve a few problems on an official judge and write down one failed approach before reading the editorial.',url:'https://cses.fi/book/index.php'},
        {icon:'⚡',tag:'ARISE contest ritual · 4 steps',name:'Learn → attempt → compete → upsolve',desc:'Choose one topic, try a problem without notes, enter a timed contest when ready, then revisit one unsolved task and rewrite its solution from memory. This builds understanding and speed without treating solved-count alone as progress.',url:'https://codeforces.com/problemset'}
      ]
    },
    {
      category: 'Hackathon essentials · build to the judging rubric',
      resources: [
        {icon:'✦',tag:'Devpost · organizer guidance',name:'How hackathon projects are commonly judged',desc:'Devpost describes common criteria such as technical execution, ease of use, impact, originality, design and demo quality. Every event can set its own rubric, so read its rules first and make a working demo that visibly answers each criterion.',url:'https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria'},
        {icon:'✦',tag:'Devpost · searchable live events',name:'Find an event, then audit the rules',desc:'Before committing, check who can join, team-size limits, required APIs, originality rules, deliverables, judging weights and the exact deadline. Save the event’s official page in your plan and build to its rubric.',url:'https://devpost.com/hackathons'},
        {icon:'◌',tag:'Google · reliability engineering',name:'Make your prototype reliable enough to demo',desc:'Learn how engineers reason about service reliability, monitoring and measurable objectives. For a hackathon, turn that into a quick demo checklist: clean start, working happy path, fallback state, test account and backup recording.',url:'https://sre.google/workbook/preface/'}
      ]
    },
    {
      category: 'Ship AI & data projects · APIs, reproducibility and deployment',
      resources: [
        {icon:'⚙',tag:'Official · Python API development',name:'FastAPI tutorial · turn a model into an API',desc:'A step-by-step official tutorial for building and running Python APIs, with interactive documentation generated for your endpoints. First know basic Python, functions and dictionaries; finish by wrapping a small model or data service.',url:'https://fastapi.tiangolo.com/tutorial/'},
        {icon:'⚙',tag:'Official · containers',name:'Docker Get Started · package a working project',desc:'Learn containers by building and sharing an application. Use this after your local app runs; the outcome is a repeatable setup a teammate or judge can launch without guessing your environment.',url:'https://docs.docker.com/get-started/'},
        {icon:'◉',tag:'Official · ML experiments and LLM evaluation',name:'MLflow quickstarts · track, compare and evaluate',desc:'Practice experiment tracking for classical ML, then explore tracing and evaluation for LLM apps. Keep the baseline, dataset version, metric and known failure cases beside every demo result.',url:'https://mlflow.org/docs/latest/getting-started/'},
        {icon:'▤',tag:'Official · data versioning',name:'DVC Get Started · keep experiments reproducible',desc:'Learn to version data and model artifacts alongside Git code, so a teammate can reproduce a result and understand what changed between experiments.',url:'https://dvc.org/doc/start'},
        {icon:'◉',tag:'Hugging Face · deploy a portfolio demo',name:'Spaces · publish an ML app for people to try',desc:'Host a small Gradio, Docker or static demo from a Git-backed project and show it in a portfolio. Review the current compute and visibility limits before choosing a Space type.',url:'https://huggingface.co/docs/hub/en/spaces-overview'},
        {icon:'◉',tag:'dbt · analytics engineering',name:'dbt Fundamentals · test and document data models',desc:'Learn how analytics teams transform raw tables into tested, documented data models. A useful next step after SQL basics: build a small project with clean staging models, tests and a readable lineage.',url:'https://learn.getdbt.com/learn/course/dbt-fundamentals/welcome-to-dbt-fundamentals-5min/welcome'}
      ]
    }
  ],
  gate: {
    syllabus: 'https://gate2027.iitm.ac.in/static/doc/GATE2027_Syllabus/DA_GATE2027_Syllabus.pdf',
    pattern: 'https://gate2027.iitm.ac.in/question_paper_pattern',
    portal: 'https://gate.nptel.ac.in/exam.html',
    papers: 'https://gate2026.iitg.ac.in/QPs-answer-keys.html',
    modules: [
      {id:'probability',title:'Probability & Statistics',icon:'∿',topics:'Counting, probability, random variables, common distributions, descriptive statistics, sampling, estimation and hypothesis testing.',notes:'https://www.openintro.org/book/os/',lecture:'GATE DA probability statistics NPTEL random variables distributions',practice:'https://gate.nptel.ac.in/'},
      {id:'linear-algebra',title:'Linear Algebra',icon:'▦',topics:'Vector spaces, linear dependence, matrices, rank, systems of equations, eigenvalues and eigenvectors.',notes:'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/',lecture:'MIT 18.06 Gilbert Strang linear algebra lecture playlist',practice:'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/pages/assignments/'},
      {id:'calculus',title:'Calculus & Optimization',icon:'⌁',topics:'Limits, continuity, differentiation, extrema, integration, partial derivatives and basic optimization.',notes:'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/',lecture:'MIT OCW single variable calculus lecture videos derivatives integration',practice:'https://ocw.mit.edu/courses/18-01sc-single-variable-calculus-fall-2010/pages/assignments/'},
      {id:'programming-dsa',title:'Programming, Data Structures & Algorithms',icon:'⌘',topics:'Python programming, stacks, queues, linked lists, trees, graphs, searching, sorting and algorithm analysis.',notes:'https://docs.python.org/3/tutorial/',lecture:'NPTEL IIT Delhi data structures algorithms lecture playlist',practice:'https://www.hackerrank.com/domains/algorithms'},
      {id:'dbms',title:'Database Management & Warehousing',icon:'▤',topics:'Relational model, SQL, relational algebra, normalization, indexing, transactions and warehouse concepts.',notes:'https://www.postgresql.org/docs/current/tutorial.html',lecture:'NPTEL database management systems DBMS lecture playlist',practice:'https://www.hackerrank.com/domains/sql'},
      {id:'machine-learning',title:'Machine Learning',icon:'✳',topics:'Regression, classification, model evaluation, regularization, clustering, dimensionality reduction and probabilistic models.',notes:'https://cs229.stanford.edu/materials.html-full',lecture:'Stanford CS229 machine learning lecture playlist',practice:'https://www.kaggle.com/learn'},
      {id:'artificial-intelligence',title:'Artificial Intelligence',icon:'◈',topics:'Search, constraint satisfaction, logic, reasoning, uncertainty and Bayesian networks.',notes:'https://inst.eecs.berkeley.edu/~cs188/fa25/',lecture:'Berkeley CS188 introduction artificial intelligence lecture playlist',practice:'https://inst.eecs.berkeley.edu/~cs188/fa25/projects/'},
      {id:'general-aptitude',title:'General Aptitude',icon:'✦',topics:'Verbal ability, quantitative aptitude, data interpretation and reasoning; this section is common to GATE papers.',notes:'https://gate2027.iitm.ac.in/question_paper_pattern',lecture:'GATE general aptitude verbal quantitative reasoning practice lectures',practice:'https://gate.nptel.ac.in/exam.html'}
    ]
  }
};
