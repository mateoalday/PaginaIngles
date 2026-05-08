const QUESTIONS = [
  {id:1,cat:"behavioral",text:"Tell me about yourself and your professional background."},
  {id:2,cat:"behavioral",text:"Describe a time you had a conflict with a coworker. How did you resolve it?"},
  {id:3,cat:"behavioral",text:"Tell me about a time you had to meet a tight deadline under pressure."},
  {id:4,cat:"behavioral",text:"Give an example of a time you went above and beyond your job responsibilities."},
  {id:5,cat:"behavioral",text:"Tell me about a time you made a mistake at work. How did you handle it?"},
  {id:6,cat:"behavioral",text:"Describe a situation where you had to persuade someone to see your point of view."},
  {id:7,cat:"behavioral",text:"Tell me about a time you worked on a team project. What was your role?"},
  {id:8,cat:"behavioral",text:"Give me an example of a goal you set and how you achieved it."},
  {id:9,cat:"behavioral",text:"Describe a time when you had to adapt to a significant change at work."},
  {id:10,cat:"behavioral",text:"Tell me about a time you demonstrated leadership skills."},
  {id:11,cat:"behavioral",text:"Describe a situation where you had to manage multiple priorities simultaneously."},
  {id:12,cat:"behavioral",text:"Tell me about a time you received critical feedback. How did you respond?"},
  {id:13,cat:"behavioral",text:"Give an example of when you showed initiative without being asked."},
  {id:14,cat:"behavioral",text:"Describe a time you had to learn a new skill quickly to complete a task."},
  {id:15,cat:"behavioral",text:"Tell me about your greatest professional achievement so far."},
  {id:16,cat:"behavioral",text:"Describe a time you failed to meet expectations. What did you learn?"},
  {id:17,cat:"behavioral",text:"Tell me about a time you mentored or helped a colleague grow."},
  {id:18,cat:"behavioral",text:"Give an example of when you had to make a difficult decision with limited information."},
  {id:19,cat:"behavioral",text:"Describe a time you successfully managed a difficult client or stakeholder."},
  {id:20,cat:"behavioral",text:"Tell me about a project you're most proud of and why."},
  {id:21,cat:"situational",text:"If you were assigned a task you didn't know how to complete, what steps would you take?"},
  {id:22,cat:"situational",text:"How would you handle a situation where you disagreed with your manager's decision?"},
  {id:23,cat:"situational",text:"If you noticed a project was falling behind schedule, what would you do?"},
  {id:24,cat:"situational",text:"What would you do if you discovered a colleague was taking credit for your work?"},
  {id:25,cat:"situational",text:"How would you handle two urgent tasks with the same deadline?"},
  {id:26,cat:"situational",text:"If a client is unhappy with your work, how would you approach the conversation?"},
  {id:27,cat:"situational",text:"What would you do if you realized mid-project that your approach was wrong?"},
  {id:28,cat:"situational",text:"How would you onboard yourself in a new team with no formal training provided?"},
  {id:29,cat:"situational",text:"What would you do if you were asked to do something unethical by a superior?"},
  {id:30,cat:"situational",text:"If budget cuts required you to reduce your team's output, how would you prioritize?"},
  {id:31,cat:"situational",text:"How would you motivate a teammate who seems disengaged from the project?"},
  {id:32,cat:"situational",text:"What would you do if you strongly disagreed with a team consensus decision?"},
  {id:33,cat:"situational",text:"How would you handle giving negative performance feedback to a peer?"},
  {id:34,cat:"situational",text:"If you had to present a complex idea to a non-technical audience, how would you do it?"},
  {id:35,cat:"situational",text:"What would you do if you realized you made a serious error that affects the company?"},
  {id:36,cat:"technical",text:"How do you stay current with trends and new developments in your field?"},
  {id:37,cat:"technical",text:"Walk me through your typical workflow when starting a new project."},
  {id:38,cat:"technical",text:"How do you approach debugging a complex problem you've never seen before?"},
  {id:39,cat:"technical",text:"What tools do you use to stay organized and manage your workload?"},
  {id:40,cat:"technical",text:"How do you balance code quality versus speed to market?"},
  {id:41,cat:"technical",text:"Describe how you ensure your work meets quality standards."},
  {id:42,cat:"technical",text:"How do you handle technical debt in a fast-paced environment?"},
  {id:43,cat:"technical",text:"What is your experience with Agile or Scrum methodologies?"},
  {id:44,cat:"technical",text:"How do you approach working with legacy systems or codebases?"},
  {id:45,cat:"technical",text:"Describe a technical challenge you solved that you're particularly proud of."},
  {id:46,cat:"technical",text:"How do you ensure security best practices in your work?"},
  {id:47,cat:"technical",text:"What is your approach to writing documentation?"},
  {id:48,cat:"technical",text:"How do you handle performance optimization in your projects?"},
  {id:49,cat:"technical",text:"Describe your experience working with cross-functional teams."},
  {id:50,cat:"technical",text:"How do you approach estimating the time needed for a task or project?"},
  {id:51,cat:"strength",text:"What are your three greatest professional strengths?"},
  {id:52,cat:"strength",text:"What is your biggest weakness, and what are you doing to improve it?"},
  {id:53,cat:"strength",text:"How would your previous manager describe your work style?"},
  {id:54,cat:"strength",text:"What skills do you bring that make you unique for this role?"},
  {id:55,cat:"strength",text:"How do you handle stress and working under pressure?"},
  {id:56,cat:"strength",text:"What motivates you to do your best work?"},
  {id:57,cat:"strength",text:"What do you consider your most significant professional development area?"},
  {id:58,cat:"strength",text:"How would you describe your communication style?"},
  {id:59,cat:"strength",text:"Are you more of a leader or a follower? Give an example."},
  {id:60,cat:"strength",text:"What's the constructive criticism you hear most often about yourself?"},
  {id:61,cat:"culture",text:"Why do you want to work for this company specifically?"},
  {id:62,cat:"culture",text:"Where do you see yourself in five years?"},
  {id:63,cat:"culture",text:"What type of work environment do you thrive in?"},
  {id:64,cat:"culture",text:"How do you define success in your career?"},
  {id:65,cat:"culture",text:"What are you looking for in your next role that your current position doesn't offer?"},
  {id:66,cat:"culture",text:"How do you handle work-life balance?"},
  {id:67,cat:"culture",text:"What are your long-term career goals?"},
  {id:68,cat:"culture",text:"How important is team culture to you, and what does your ideal team look like?"},
  {id:69,cat:"culture",text:"What do you do outside of work to grow professionally?"},
  {id:70,cat:"culture",text:"What questions do you have for us?"},
  {id:71,cat:"behavioral",text:"Tell me about a time you had to deal with a difficult team member."},
  {id:72,cat:"behavioral",text:"Describe a situation where you had to deliver bad news to a client or team."},
  {id:73,cat:"behavioral",text:"Give an example of a creative solution you developed for a challenging problem."},
  {id:74,cat:"behavioral",text:"Tell me about a time you improved a process at your workplace."},
  {id:75,cat:"behavioral",text:"Describe when you had to collaborate with someone whose work style was very different from yours."},
  {id:76,cat:"situational",text:"How would you approach building relationships in a fully remote team?"},
  {id:77,cat:"situational",text:"If your project suddenly lost half its budget, what would you do?"},
  {id:78,cat:"situational",text:"How would you handle a team member who consistently misses deadlines?"},
  {id:79,cat:"situational",text:"What would you do if your manager gave you unclear or contradictory instructions?"},
  {id:80,cat:"situational",text:"How would you approach taking over a project that's already in crisis?"},
  {id:81,cat:"technical",text:"How do you approach giving and receiving code reviews?"},
  {id:82,cat:"technical",text:"What is your strategy for testing and validating your work?"},
  {id:83,cat:"technical",text:"How do you handle disagreements about technical approaches with teammates?"},
  {id:84,cat:"technical",text:"Describe your experience with data analysis or metrics-driven decision making."},
  {id:85,cat:"technical",text:"What is the most complex technical system you have worked with?"},
  {id:86,cat:"culture",text:"What values are most important to you in a workplace?"},
  {id:87,cat:"culture",text:"How do you prefer to receive feedback from your manager?"},
  {id:88,cat:"culture",text:"Describe your ideal manager or leadership style."},
  {id:89,cat:"culture",text:"What would make you leave a job within the first six months?"},
  {id:90,cat:"culture",text:"How do you contribute to a positive team culture?"},
  {id:91,cat:"strength",text:"How do you prioritize tasks when everything seems equally urgent?"},
  {id:92,cat:"strength",text:"What's the hardest professional skill you've had to develop?"},
  {id:93,cat:"strength",text:"How do you stay focused and productive when working independently?"},
  {id:94,cat:"strength",text:"What do you do when you feel overwhelmed at work?"},
  {id:95,cat:"strength",text:"How do you build trust with new colleagues quickly?"},
  {id:96,cat:"behavioral",text:"Tell me about a time you had to influence a decision without having authority."},
  {id:97,cat:"situational",text:"What would you do if you were asked to complete a task outside your job description?"},
  {id:98,cat:"technical",text:"How do you approach learning a new programming language or tool?"},
  {id:99,cat:"culture",text:"What does your ideal first 90 days at a new job look like?"},
  {id:100,cat:"strength",text:"If you could improve one thing about your professional self right now, what would it be?"}
];

const QUIZZES = {
  vocabulary:{title:"Vocabulary Quiz",desc:"Professional English vocabulary used in job interviews.",questions:[{q:"What does 'leverage' mean in a professional context?",opts:["To use something to maximum advantage","To lift heavy objects","To negotiate salary","To manage time"],ans:0,exp:"'Leverage' means using a resource, skill, or advantage strategically. E.g., 'I leveraged my data skills to improve the dashboard.'"},{q:"Which word best completes: 'I am __ to taking on new responsibilities.'",opts:["reluctant","amendable","amenable","unamenable"],ans:2,exp:"'Amenable' means open or agreeable to. Key word showing flexibility and growth mindset."},{q:"What does 'initiative' mean in the context of 'taking initiative'?",opts:["Starting something on your own without being told","Waiting for instructions","Asking for help","Following company policy"],ans:0,exp:"Taking initiative means proactively acting without needing to be prompted — highly valued in interviews."},{q:"'I exceeded my __ by 30% last quarter.' Which word fits?",opts:["quotas","queries","qualms","quests"],ans:0,exp:"'Quotas' are targets or goals assigned to employees, especially in sales or performance contexts."},{q:"What does 'stakeholder' mean?",opts:["A person who owns physical stakes","Anyone with an interest in a project's outcome","A financial investor only","A company shareholder"],ans:1,exp:"Stakeholders include anyone affected by or interested in a project: clients, managers, teams, or users."},{q:"Which phrase shows you are a good team player?",opts:["I prefer to work completely alone","I collaborated cross-functionally to deliver results","I avoid group projects","I delegate everything"],ans:1,exp:"'Cross-functional collaboration' signals teamwork across departments — a key interview plus."},{q:"'We __ the launch date after receiving client feedback.' Which verb fits?",opts:["expedited","extrapolated","extinguished","exacerbated"],ans:0,exp:"'Expedited' means to speed something up. Adapting timelines is a strong professional trait."},{q:"What does 'scalable' mean in a business context?",opts:["Easy to weigh","Able to grow without proportional cost increase","Difficult to change","Related to fish"],ans:1,exp:"A scalable solution can handle growth efficiently. Common word in tech interviews."},{q:"'I __ the project by identifying a more efficient process.' Best word?",opts:["streamlined","stagnated","saturated","simulated"],ans:0,exp:"'Streamlined' means made more efficient by removing unnecessary steps — powerful in interviews."},{q:"What does 'KPI' stand for?",opts:["Key Performance Indicator","Key Profit Index","Known Process Integration","Key Productivity Item"],ans:0,exp:"KPIs are measurable values demonstrating how effectively a company or employee achieves objectives."}]},
  grammar:{title:"Grammar Quiz",desc:"Test your grammar for formal, professional English answers.",questions:[{q:"Which sentence is grammatically correct for a job interview?",opts:["I have managed teams since five years.","I have been managing teams for five years.","I am managing teams since five years.","I managed teams since five years."],ans:1,exp:"Use 'have been + -ing + for' for actions that started in the past and continue now."},{q:"Which uses the STAR method correctly?",opts:["In my last job I did many things well.","At my previous company, I led a team of 5 to deliver a product 2 weeks ahead of schedule, resulting in a 15% cost saving.","I am good at teamwork and communication.","My previous role was very challenging."],ans:1,exp:"STAR method: Situation + Task + Action + Result. Always include specific, measurable outcomes."},{q:"Complete: 'If I __ offered the position, I would start immediately.'",opts:["am","was","were","will be"],ans:2,exp:"Use the subjunctive 'were' for hypothetical situations in formal English: 'If I were...'"},{q:"Which is the most professional way to say you're good at problem-solving?",opts:["I'm like really good at fixing stuff.","I excel at analyzing complex challenges and developing effective solutions.","Problems don't scare me.","I can solve problems pretty well."],ans:1,exp:"Formal interviews require precise, confident language. Avoid fillers and vague terms."},{q:"'I look forward to __ from you.' Correct ending?",opts:["hear","hearing","heard","to hear"],ans:1,exp:"'Look forward to' is followed by a gerund (-ing form): 'I look forward to hearing from you.'"},{q:"Which sentence correctly uses past perfect?",opts:["Before I joined the team, we already missed the deadline.","Before I joined the team, the deadline had already been missed.","Before joining, the deadline was already missing.","The team missed the deadline before I joined."],ans:1,exp:"Past perfect (had + past participle) describes an action completed before another past event."},{q:"'My greatest strength __ my ability to adapt quickly.' Correct verb?",opts:["are","is","am","were"],ans:1,exp:"'My greatest strength' is singular, so it takes the singular verb 'is'."},{q:"Which phrase correctly describes an ongoing achievement?",opts:["I have increased sales by 20%.","I increased sales by 20% until now.","I am increasing sales by 20% since last year.","I had been increasing sales by 20%."],ans:0,exp:"Present perfect 'have + past participle' describes an achievement with relevance to the present."},{q:"'I am able to __ under pressure.' Which verb form is correct?",opts:["working","worked","work","to work"],ans:2,exp:"After 'to be able to', always use the base form: 'able to work', 'able to lead'."},{q:"Which question ending is correct in an interview?",opts:["Could you tell me what does the role involve?","Could you tell me what the role involves?","Could you tell me what is the role involving?","Could you tell me what the role is involving?"],ans:1,exp:"In embedded questions, use statement word order: subject + verb, NOT question word order."}]},
  phrases:{title:"Phrases in Context",desc:"Choose the best phrase for each interview situation.",questions:[{q:"The interviewer asks something you didn't understand. You say:",opts:["What? Say that again.","Could you please clarify what you mean by that?","I don't get it.","Repeat the question please."],ans:1,exp:"Politely asking for clarification shows professionalism. 'Could you please clarify...' is ideal."},{q:"You want to start your answer to 'Tell me about yourself.' Best opening:",opts:["So, um, I guess I'll start by saying...","Well, basically I've done a lot of things.","I'd describe myself as a results-driven professional with 5 years of experience in...","My name is Alex and I like my job."],ans:2,exp:"Start with a confident, concise statement. Mention your identity, experience level, and expertise."},{q:"You need more time to think. You say:",opts:["Uh... I don't know...","That's a great question. Let me take a moment to think about that.","Pass.","I'm not sure about that one."],ans:1,exp:"Buying time professionally shows thoughtfulness. Never say 'pass' — always engage."},{q:"You want to express enthusiasm for the role. Best phrase:",opts:["This job seems okay I guess.","I am genuinely excited about this opportunity because it aligns with my passion for...","I need this job.","It looks like a decent position."],ans:1,exp:"Show specific, genuine enthusiasm tied to your skills or values — not just general interest."},{q:"The interview asks about a weakness. Best approach:",opts:["I don't really have any weaknesses.","I sometimes work too hard, which is actually a strength.","I tend to be overly detail-oriented, but I've been actively managing this by using time-boxing techniques.","I'm bad at mornings."],ans:2,exp:"Strong weakness answer: real flaw + self-awareness + concrete steps to improve."},{q:"You want to ask about next steps at the end. You say:",opts:["So, am I hired?","What does the timeline look like for the hiring decision?","When will you call me?","How many candidates do you have?"],ans:1,exp:"Asking about the timeline is professional and shows genuine interest without being presumptuous."},{q:"You're describing a team achievement and want to highlight your role. You say:",opts:["We did everything together equally.","The team succeeded, but I honestly did most of the work.","While the team collaborated on strategy, I specifically led the data analysis, which drove our 20% efficiency gain.","It was a team effort."],ans:2,exp:"Use 'while we..., I specifically...' to acknowledge the team while clearly stating your contribution."},{q:"You want to connect your past experience to the job requirements. You say:",opts:["I think I can do this job.","In my previous role I did something similar.","My background in [X] directly translates to this role because I have [specific skill] which would allow me to [specific outcome].","I've done lots of different things."],ans:2,exp:"Always bridge past experience to future value: how your background benefits this company."},{q:"The interviewer asks why you're leaving your current job. Professional answer:",opts:["My boss is terrible.","I'm looking for a higher salary.","I'm seeking a role that offers greater opportunities for growth and aligns more closely with my long-term career goals.","I'm bored at my current job."],ans:2,exp:"Always frame leaving in terms of what you're moving toward, not what you're running from."},{q:"You want to close the interview strongly. Best final statement:",opts:["I think that's everything.","Okay, bye.","Thank you so much for your time. I'm very enthusiastic about this role and I'm confident I can contribute significantly to your team.","Hope to hear from you."],ans:2,exp:"End with gratitude, enthusiasm, and confidence — the last impression is as important as the first."}]}
};

const PHRASES = [
  {cat:"opening",front:"How to start 'Tell me about yourself'",back:"I'd describe myself as a [role] professional with [X] years of experience in [field], focused on [key strength].",example:"I'd describe myself as a data-driven marketing professional with 4 years of experience, focused on growth strategy."},
  {cat:"opening",front:"Expressing enthusiasm for the role",back:"I'm genuinely excited about this opportunity because it aligns perfectly with my background in [X] and my passion for [Y].",example:"I'm genuinely excited because this role aligns with my passion for building user-centered products."},
  {cat:"opening",front:"Starting a behavioral answer (STAR)",back:"Certainly. In my previous role at [Company], I was faced with [situation]. My task was to [goal]...",example:"Certainly. At Acme Corp, I was faced with a 30% drop in client retention. My task was to reverse that trend..."},
  {cat:"strength",front:"Talking about a strength confidently",back:"One of my key strengths is [strength]. For example, I [specific achievement that proves it].",example:"One of my key strengths is analytical thinking. I redesigned our reporting system, reducing decision time by 40%."},
  {cat:"strength",front:"Addressing a weakness professionally",back:"I tend to [weakness], but I've been actively working on this by [specific action], and I've already seen [improvement].",example:"I tend to over-prepare, but I've learned to set time limits using time-boxing, which has improved my efficiency."},
  {cat:"clarify",front:"Asking for clarification politely",back:"Could you clarify what you mean by [term]? I want to make sure I address your question fully.",example:"Could you clarify what you mean by 'fast-paced'? I want to make sure I address that accurately."},
  {cat:"clarify",front:"Buying time to think",back:"That's a thoughtful question. Let me take a moment to consider the best example.",example:"That's a thoughtful question. Let me take a moment — I want to give you the most relevant example."},
  {cat:"clarify",front:"Asking the interviewer to repeat",back:"I'm sorry, I didn't quite catch that. Could you repeat the question, please?",example:"I'm sorry, the connection cut out for a second. Could you repeat the question, please?"},
  {cat:"difficult",front:"Why are you leaving your job?",back:"I'm looking for a role that offers [growth/challenge/alignment] that I feel my current position no longer provides.",example:"I'm looking for a role that offers more strategic responsibility, which my current position no longer provides."},
  {cat:"difficult",front:"Discussing a failure",back:"In [situation], I made the mistake of [error]. I learned [lesson] and since then I've [changed behavior].",example:"In my first project lead role, I underestimated dependencies. I learned to always map risks first."},
  {cat:"difficult",front:"Salary expectations",back:"Based on my research and experience, I'm targeting a range of [X–Y], though I'm open to discussing the full compensation package.",example:"Based on my research, I'm targeting $70–80K, though I'm happy to discuss the full package."},
  {cat:"difficult",front:"'Where do you see yourself in 5 years?'",back:"I see myself having grown into a [senior role] where I can [specific contribution], ideally within a company like this one.",example:"I see myself in a senior product role where I contribute to shaping strategy, ideally here long-term."},
  {cat:"closing",front:"Asking about next steps",back:"What does the timeline look like for the hiring process, and when can I expect to hear back?",example:"What does the timeline look like from here, and is there anything else you need from me?"},
  {cat:"closing",front:"Closing the interview confidently",back:"Thank you so much for your time. I'm very excited about this role and confident I can add real value to your team.",example:"Thank you for this conversation — I'm very excited and I believe my background is a strong fit."},
  {cat:"closing",front:"Following up after the interview",back:"Thank you for the opportunity to interview for [role]. I remain very interested and look forward to hearing about next steps.",example:"Thank you for the opportunity to interview for the UX Lead role. I'm very enthusiastic and look forward to next steps."},
  {cat:"opening",front:"Connecting past experience to the role",back:"My background in [X] directly translates here because I've [achievement], which would allow me to [benefit for company].",example:"My background in SaaS sales translates here because I've grown accounts 3x, which would help scale your enterprise pipeline."},
  {cat:"strength",front:"Showing you're a team player",back:"I believe great results come from collaboration. In my last role, I worked cross-functionally with [teams] to [outcome].",example:"I worked cross-functionally with engineering, design, and sales to launch a product that exceeded targets by 25%."},
  {cat:"clarify",front:"Redirecting if you lose your train of thought",back:"Let me refocus — the core point I want to make is [key message].",example:"Let me refocus — the key takeaway is that we delivered the project on time despite losing two team members."},
  {cat:"difficult",front:"Handling 'Why should we hire you?'",back:"Because I bring [skill 1], [skill 2], and a proven track record of [achievement], which directly addresses your need for [role goal].",example:"I bring UX research expertise, rapid prototyping skills, and a track record of reducing churn — exactly what this role requires."},
  {cat:"closing",front:"Expressing continued interest",back:"This conversation has made me even more excited about the role. I'm confident this would be a great mutual fit.",example:"Hearing about your roadmap has made me even more enthusiastic — I'm confident this would be a great fit for both of us."}
];

// ── PRONUNCIATION GUIDE ───────────────────────
const PRONUNCIATION = [
  {word:"strength",phonetic:"/streŋkθ/",tip:"Don't drop the 'ng'. Say 'streng-th', not 'stren-th'. Practice slowly first.",example:"My greatest strength is analytical thinking.",level:"medium",syllables:"STRENGTH"},
  {word:"collaborate",phonetic:"/kəˈlæbəreɪt/",tip:"Stress on the 2nd syllable: 'col-LAB-o-rate'.",example:"I love to collaborate with cross-functional teams.",level:"medium",syllables:"col-LAB-o-rate"},
  {word:"entrepreneur",phonetic:"/ˌɒntrəprəˈnɜːr/",tip:"Borrowed from French. Say 'on-truh-pruh-NUR'. Final 'r' is pronounced.",example:"I have an entrepreneurial mindset.",level:"hard",syllables:"on-truh-pruh-NUR"},
  {word:"articulate",phonetic:"/ɑːrˈtɪkjʊlɪt/",tip:"Adjective: 'ar-TIK-yoo-lit'. Verb: 'ar-TIK-yoo-late'. Stress 2nd syllable.",example:"I can articulate complex ideas clearly.",level:"medium",syllables:"ar-TIK-yoo-late"},
  {word:"initiative",phonetic:"/ɪˈnɪʃɪətɪv/",tip:"Stress on 2nd syllable: 'i-NISH-ee-a-tiv'. Common mistake: 'in-i-TI-a-tive'.",example:"I take initiative when I see opportunities.",level:"medium",syllables:"i-NISH-ee-a-tiv"},
  {word:"leverage",phonetic:"/ˈlevərɪdʒ/",tip:"American: 'LEV-er-ij'. Don't stress the last syllable.",example:"I leveraged my skills to drive results.",level:"easy",syllables:"LEV-er-ij"},
  {word:"colleague",phonetic:"/ˈkɒliːɡ/",tip:"Say 'KOL-eeg', not 'col-LEAG'. The 'ue' is silent.",example:"I worked closely with my colleagues.",level:"easy",syllables:"KOL-eeg"},
  {word:"proactive",phonetic:"/prəʊˈæktɪv/",tip:"Say 'pro-AK-tiv'. Stress on 2nd syllable.",example:"I'm proactive about identifying problems.",level:"easy",syllables:"pro-AK-tiv"},
  {word:"prioritize",phonetic:"/praɪˈɒrɪtaɪz/",tip:"Say 'pry-OR-i-tize'. 5 syllables total.",example:"I prioritize tasks by impact and urgency.",level:"medium",syllables:"pry-OR-i-tize"},
  {word:"enthusiasm",phonetic:"/ɪnˈθjuːzɪæzəm/",tip:"Say 'en-THYOO-zee-az-um'. The 'th' is important — don't say 'en-too'.",example:"I bring enthusiasm to every project.",level:"hard",syllables:"en-THYOO-zee-az-um"},
  {word:"achievement",phonetic:"/əˈtʃiːvmənt/",tip:"Say 'a-CHEEV-ment'. The 'ch' sounds like in 'cheese'.",example:"My greatest achievement was leading a product launch.",level:"easy",syllables:"a-CHEEV-ment"},
  {word:"efficiently",phonetic:"/ɪˈfɪʃəntlɪ/",tip:"Say 'e-FISH-ent-lee'. Don't skip the middle sounds.",example:"I work efficiently under tight deadlines.",level:"medium",syllables:"e-FISH-ent-lee"}
];

// ── BUSINESS IDIOMS ───────────────────────────
const IDIOMS = [
  {idiom:"Hit the ground running",meaning:"To start a new job or project with great energy and enthusiasm immediately.",example:"I'm ready to hit the ground running in this role.",usage:"Use when discussing how you'd start a new job.",level:"common"},
  {idiom:"Go the extra mile",meaning:"To do more than what is expected or required.",example:"I always go the extra mile to ensure client satisfaction.",usage:"Use when describing your work ethic.",level:"common"},
  {idiom:"Think outside the box",meaning:"To think creatively and come up with unconventional solutions.",example:"I like to think outside the box when solving complex problems.",usage:"Use when describing problem-solving skills.",level:"common"},
  {idiom:"Touch base",meaning:"To briefly contact or meet with someone to exchange information.",example:"Let's touch base next week to review progress.",usage:"Use when discussing communication habits.",level:"common"},
  {idiom:"On the same page",meaning:"When everyone understands and agrees on a situation or plan.",example:"I always make sure the team is on the same page before starting.",usage:"Use when discussing teamwork and alignment.",level:"common"},
  {idiom:"Move the needle",meaning:"To make a meaningful difference or progress on something important.",example:"I focus on actions that actually move the needle on key metrics.",usage:"Use when discussing impact and results.",level:"intermediate"},
  {idiom:"Circle back",meaning:"To return to a topic or discussion at a later time.",example:"Let me circle back to your question after I gather more data.",usage:"Use in meetings or when you need more time to answer.",level:"intermediate"},
  {idiom:"Bandwidth",meaning:"In business: the time or capacity a person has to take on new tasks.",example:"I currently have the bandwidth to take on this additional responsibility.",usage:"Use when discussing workload and capacity.",level:"intermediate"},
  {idiom:"Low-hanging fruit",meaning:"The easiest tasks or opportunities that can be addressed first for quick wins.",example:"We focused on the low-hanging fruit first to show early results.",usage:"Use when discussing strategy and prioritization.",level:"intermediate"},
  {idiom:"Drop the ball",meaning:"To make a mistake or fail to fulfill a responsibility.",example:"I make sure no one drops the ball by setting clear expectations.",usage:"Use when discussing accountability and follow-through.",level:"common"},
  {idiom:"Synergy",meaning:"When the combined effect of a team is greater than individual efforts.",example:"Our team created real synergy that accelerated the project.",usage:"Use when discussing team effectiveness.",level:"intermediate"},
  {idiom:"Deliverables",meaning:"The specific outcomes or items that must be completed for a project.",example:"I always define clear deliverables at the start of any project.",usage:"Use when discussing project management.",level:"common"}
];

// ── WRITING TEMPLATES ─────────────────────────
const WRITING_TEMPLATES = [
  {
    type:"cover_letter",title:"Cover Letter",icon:"📄",
    desc:"A professional cover letter for any job application.",
    template:`Dear [Hiring Manager's Name],

I am writing to express my strong interest in the [Job Title] position at [Company Name]. With [X years] of experience in [your field], and a proven track record of [key achievement], I am confident that I would be a valuable addition to your team.

In my previous role at [Previous Company], I [specific achievement with metrics]. This experience, combined with my expertise in [relevant skill 1] and [relevant skill 2], has prepared me well to [what you'd do in the new role].

What excites me most about [Company Name] is [specific reason — mention their product, mission, or culture]. I believe my background in [relevant area] directly aligns with your need for someone who can [role requirement].

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to [Company Name]'s continued success.

Thank you for your time and consideration. I look forward to speaking with you.

Sincerely,
[Your Name]
[Phone Number] | [Email] | [LinkedIn]`
  },
  {
    type:"thank_you",title:"Thank You Email",icon:"💌",
    desc:"Send this within 24 hours of your interview.",
    template:`Subject: Thank You – [Job Title] Interview

Dear [Interviewer's Name],

Thank you so much for taking the time to speak with me today about the [Job Title] position. I truly enjoyed learning more about [Company Name] and the exciting work your team is doing with [specific project or initiative mentioned].

Our conversation about [specific topic you discussed] particularly resonated with me and reinforced my enthusiasm for this opportunity. I'm confident that my experience in [relevant skill] and my passion for [relevant area] would allow me to make a meaningful contribution to your team.

Please let me know if you need any additional information. I look forward to hearing about the next steps in the process.

Best regards,
[Your Name]
[Phone] | [Email]`
  },
  {
    type:"linkedin",title:"LinkedIn Connection",icon:"💼",
    desc:"Connect professionally with interviewers or recruiters.",
    template:`Hi [Name],

Thank you for the opportunity to interview for the [Job Title] role at [Company]. I really enjoyed our conversation about [specific topic] and came away even more excited about the team's work.

I'd love to stay connected regardless of the outcome — your insights on [topic] were genuinely valuable to me.

Looking forward to keeping in touch!

Best,
[Your Name]`
  },
  {
    type:"follow_up",title:"Follow-Up Email",icon:"📬",
    desc:"Send this if you haven't heard back after 1 week.",
    template:`Subject: Follow-Up – [Job Title] Application

Dear [Hiring Manager's Name],

I hope you're doing well. I wanted to follow up on my interview for the [Job Title] position on [interview date].

I remain very enthusiastic about the opportunity to join [Company Name] and contribute to [specific goal or project]. I'd love to hear if there are any updates on the timeline or if there's any additional information I can provide.

Thank you again for your time and consideration.

Best regards,
[Your Name]
[Phone] | [Email]`
  }
];

// ── LISTENING EXERCISES ───────────────────────
const LISTENING_SCRIPTS = [
  {
    id:1,title:"Tell Me About Yourself — Expert Answer",level:"beginner",
    topic:"Self Introduction",duration:"~45 seconds",
    text:`I'm a marketing professional with five years of experience specializing in digital growth strategies. In my most recent role at a mid-sized SaaS company, I led a campaign that increased our monthly active users by thirty percent in just six months. I'm particularly passionate about data-driven decision making and building campaigns that balance creativity with measurable results. I'm now looking for an opportunity where I can bring that expertise to a larger scale and contribute to a company with a strong product vision — which is exactly why I'm excited about this role.`,
    questions:[
      {q:"How many years of experience does the speaker have?",opts:["3 years","5 years","7 years","10 years"],ans:1},
      {q:"What did the speaker achieve in their most recent role?",opts:["Reduced costs by 30%","Increased users by 30%","Launched a new product","Managed a team of 30"],ans:1},
      {q:"What is the speaker passionate about?",opts:["Creative writing","Data-driven decision making","Project management","Customer service"],ans:1}
    ]
  },
  {
    id:2,title:"Handling a Difficult Question — Weakness",level:"intermediate",
    topic:"Weakness Question",duration:"~40 seconds",
    text:`One area I've been actively working on is public speaking. Early in my career, I found presenting to large groups quite nerve-wracking. I recognized this as a limitation and took deliberate steps to improve — I joined a local Toastmasters chapter, volunteered to present at team meetings, and gradually took on larger presentations. Today, I'm comfortable presenting to groups of up to fifty people, and I've received positive feedback on my clarity and preparation. It's still an area I continue to refine, but I've made significant progress.`,
    questions:[
      {q:"What weakness does the speaker mention?",opts:["Time management","Public speaking","Writing reports","Working with data"],ans:1},
      {q:"What did the speaker do to improve?",opts:["Took an online course","Joined Toastmasters","Hired a coach","Avoided presentations"],ans:1},
      {q:"How large a group can the speaker now present to comfortably?",opts:["10 people","50 people","100 people","200 people"],ans:1}
    ]
  },
  {
    id:3,title:"STAR Method — Strong Behavioral Answer",level:"advanced",
    topic:"Leadership & Results",duration:"~55 seconds",
    text:`In my previous role, our team was facing a critical deadline — we needed to deliver a product update in eight weeks that had originally been scoped for twelve. As the project lead, my task was to ensure delivery without compromising quality. I immediately reorganized the sprint structure, identified non-essential features we could defer to a later release, and held daily fifteen-minute stand-ups to catch blockers early. I also negotiated with our QA team to run parallel testing tracks, which saved us nearly a week. As a result, we launched on time, received zero critical bug reports in the first two weeks post-launch, and the client extended our contract by another year, citing our reliability and communication.`,
    questions:[
      {q:"What was the original timeline for the project?",opts:["8 weeks","10 weeks","12 weeks","16 weeks"],ans:2},
      {q:"What technique did the speaker use to catch issues early?",opts:["Weekly reports","Daily stand-ups","Email updates","Client calls"],ans:1},
      {q:"What was the outcome for the client relationship?",opts:["Contract was canceled","Contract was reduced","Contract was extended","No change"],ans:2}
    ]
  }
];

// ── SPEAKING CHALLENGES ───────────────────────
const SPEAKING_CHALLENGES = [
  {
    id:1,title:"30-Second Elevator Pitch",timeSeconds:30,icon:"⚡",
    prompt:"Introduce yourself professionally in exactly 30 seconds. Include: your name, your role, your top skill, and why you're excited about this opportunity.",
    tips:["Speak at a natural pace — not too fast or slow","Aim for 70–80 words in 30 seconds","Practice until it feels natural, not memorized","End with energy, not trailing off"],
    sampleAnswer:"I'm a software engineer with 4 years of experience building scalable APIs. I specialize in Python and cloud infrastructure, and I've helped reduce system downtime by 60% at my current company. I'm passionate about writing clean, maintainable code and I'm excited about this role because of your team's focus on developer experience."
  },
  {
    id:2,title:"2-Minute STAR Story",timeSeconds:120,icon:"⭐",
    prompt:"Tell a behavioral story using the STAR method in 2 minutes. Choose a time you solved a difficult problem at work.",
    tips:["S: Set the scene quickly (15 seconds)","T: Explain your specific task (15 seconds)","A: Focus most time here — what YOU did (60 seconds)","R: End with specific, quantified results (30 seconds)"],
    sampleAnswer:"At my previous job, our data pipeline was failing every week, causing 4-hour delays. As the senior engineer, my task was to fix this permanently. I analyzed the root cause — an unoptimized SQL query — rewrote it with indexed joins and added monitoring alerts. Result: zero failures in 8 months and processing time dropped from 4 hours to 20 minutes."
  },
  {
    id:3,title:"Explain a Weakness (60 Seconds)",timeSeconds:60,icon:"💪",
    prompt:"Describe a real professional weakness and what you're doing to improve it. Be honest and structured.",
    tips:["Choose a real weakness — interviewers know fake ones","Show self-awareness: how did you recognize it?","Describe concrete steps you've taken to improve","End with progress made, not just future plans"],
    sampleAnswer:"Early in my career, I struggled with delegating tasks — I wanted to control every detail. I recognized this when a manager pointed out I was becoming a bottleneck. Since then, I've been using a clear handoff process with written briefs, and I check in at milestones rather than micromanaging. My team's output has actually improved because they have more ownership."
  }
];
