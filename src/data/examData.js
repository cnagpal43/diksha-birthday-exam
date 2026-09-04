export const CANDIDATE_PROFILES = {
  "061023": {
    name: "Dr. Diksha Gurnani",
    rollNumber: "061023",
    applicationNo: "NBE-PG-2026-AIR1",
    centerName: "Chirag's Heart Institute of Medical Sciences (CHIMS), Central Love Campus",
    centerCode: "CHIMS-007",
    examDate: "Birthday Special Edition 2026",
    seatAllotment: "MD General Medicine - Chirag's Heart (Unconditional 100% Reserved Lifetime Seat)",
    category: "General (True Partner Quota - Permanent All India Rank 1)",
    qualifyingStatus: "QUALIFIED WITH ALL INDIA RANK 1",
    percentile: "99.999%",
    remarks: "Selected for MD General Medicine in Chirag's Heart. Demonstrates flawless diagnostic precision, the cutest pout in modern medicine, and holds the permanent All India Rank #1 seat in Chirag's life."
  },
  "080701": {
    name: "Dr. Chirag Nagpal (Test Candidate)",
    rollNumber: "080701",
    applicationNo: "NBE-PG-2026-TEST-002",
    centerName: "Chirag's Heart Institute of Medical Sciences (CHIMS), Testing Wing",
    centerCode: "CHIMS-007",
    examDate: "Birthday Special Edition 2026",
    seatAllotment: "MD Cardiology - Diksha's Heart (Experimental Examiner Seat)",
    category: "Exam Controller & Testing Quota",
    qualifyingStatus: "QUALIFIED (PARTNER TESTING RUN)",
    percentile: "99.999%",
    remarks: "Testing run completed. Verified all 30 questions, scoring logic, and confirmed that Dr. Diksha is 100% destined for AIR 1!"
  }
};

export const DEFAULT_ROLL_NUMBER = "061023";
export const TEST_ROLL_NUMBER = "080701";
export const CANDIDATE_INFO = CANDIDATE_PROFILES[DEFAULT_ROLL_NUMBER];

export const INSTRUCTIONS = [
  "This examination is conducted strictly for Dr. Diksha Gurnani on her special birthday.",
  "Total Questions: 30 Questions across 6 Clinical Sections. Total Marks: 120.00.",
  "Official Examination Scoring Scheme:",
  "• +4.00 Marks for each correct answer.",
  "• -1.33 Marks penalty (-1/3 negative marking) for each incorrect answer.",
  "• 0.00 Marks for unattempted questions.",
  "Untimed Mode: Take all the time you need. Your elapsed time will be recorded.",
  "Session Auto-Save: Your responses and active question position are automatically preserved in the browser. You can safely refresh, exit, or return anytime!",
  "Biometric Pout Requirement: Per Section 143, candidate MUST take and approve a pout picture to obtain an examination ticket.",
  "Question Palette color codes:",
  "• Green: Question answered and saved.",
  "• Red: Visited but not answered.",
  "• Purple: Marked for review without answering.",
  "• Purple with Green indicator: Answered AND marked for review (evaluated for score).",
  "• Grey: Not visited yet.",
  "No clinical explanations are revealed during the active test.",
  "Upon submission, your All India Rank will be computed and you can review any incorrect questions, reveal correct keys, and read the clinical explanations with audio feedback!"
];

export const SECTIONS = [
  { id: 1, name: "Section I: Forensic Chronology & Early Pediatric History", range: [1, 4] },
  { id: 2, name: "Section II: High-Precision Timestamps & First Encounters", range: [5, 9] },
  { id: 3, name: "Section III: Deep Anatomy & Physical Milestones", range: [10, 13] },
  { id: 4, name: "Section IV: Psychometric Profiling & Quirks", range: [14, 18] },
  { id: 5, name: "Section V: Jodhpur Field Trials & Regional Cartography", range: [19, 23] },
  { id: 6, name: "Section VI: Diagnostic Scenarios & Career Milestones", range: [24, 30] },
];

export const QUESTIONS = [
  {
    id: 1,
    section: "Section I: Forensic Chronology & Early Pediatric History",
    subject: "Clinical History Verification",
    question: "A retrospective audit of academic records from 'Adarsh Vidya Mandir' revealed an anomaly in Class 1 where Subject D secured Rank 2. When Chirag was called to receive the first-place prize on stage, which of the following secondary emotional observations is TRUE regarding Patient D’s reaction?",
    options: [
      { id: "A", text: "She remained seated in her row while stoically refusing to join the applause" },
      { id: "B", text: "She filed an immediate verbal re-evaluation petition with the primary class teacher" },
      { id: "C", text: "She broke into tears and ran toward the back rows to find her family" },
      { id: "D", text: "She quietly exited the main hall and waited near the school gate" }
    ],
    correct: "C",
    rationale: "In Class 1, Chirag took Rank 1 while Diksha stood second. Overcome with tears, she ran all the way to the back of the auditorium to her family while Chirag was awarded the prize."
  },
  {
    id: 2,
    section: "Section I: Forensic Chronology & Early Pediatric History",
    subject: "Spatial Surveillance & Optic Field Tracking",
    question: "Following the Class 8 academic bifurcation, Subject C conducted observational monitoring during recess. What was the exact epidemiological objective under surveillance?",
    options: [
      { id: "A", text: "Monitoring the central school gate during morning arrival to verify punctuality" },
      { id: "B", text: "Stationing at a fixed transit point during recess specifically to catch a fleeting glimpse of her walking back home" },
      { id: "C", text: "Tracking her after-school coaching transit on a bicycle route" },
      { id: "D", text: "Standing outside an afternoon tuition corridor pretending to review notes" }
    ],
    correct: "B",
    rationale: "After changing schools in Class 8, Chirag would stand at a specific spot every single day during recess just to catch a glimpse of Diksha walking home."
  },
  {
    id: 3,
    section: "Section I: Forensic Chronology & Early Pediatric History",
    subject: "Social Psychology & The 'Class 4 Incident'",
    question: "In developmental psychology, the 'Adarsh Vidya Mandir Incident' in Class 4 led to an abrupt communicative blackout between cohorts. Which of the following describes the nature of this communicative barrier?",
    options: [
      { id: "A", text: "A formal written decree issued by school administration mandating gender-separated seating" },
      { id: "B", text: "An unspoken, cohort-wide silent embargo initiated by the girls that persisted until Class 8" },
      { id: "C", text: "Chirag being specifically singled out and barred from speaking to her desk row" },
      { id: "D", text: "A mutual pact between both student cohorts to suspend conversation until Class 10 boards" }
    ],
    correct: "B",
    rationale: "Up until Class 4, boys and girls spoke freely. After an incident in Class 4, the girls stopped talking to the boys altogether—a silence that lasted until Class 8."
  },
  {
    id: 4,
    section: "Section I: Forensic Chronology & Early Pediatric History",
    subject: "Digital Pathology & Pre-Med Footprints",
    question: "A web search conducted prior to direct contact yielded the earliest digital image of Candidate D during her entrance examination preparation. What was the exact visual presentation in Exhibit A?",
    options: [
      { id: "A", text: "An Allen career institute merit list portrait wearing a collared green polo" },
      { id: "B", text: "A candid group photograph at a medical entrance test center" },
      { id: "C", text: "A profile picture hosted on the Resonance coaching portal wearing a red t-shirt" },
      { id: "D", text: "An official state merit list PDF displaying her high school registration portrait" }
    ],
    correct: "C",
    rationale: "The very first photograph Chirag discovered of Diksha online was on the Resonance coaching website, where she was wearing a red t-shirt."
  },
  {
    id: 5,
    section: "Section II: High-Precision Timestamps & First Encounters",
    subject: "Forensic Telecommunications",
    question: "Forensic logs confirm that the first-ever WhatsApp message initiated by Chirag to Dr. Diksha in Jodhpur occurred in the year 2023. What was the precise date of this inaugural text transmission?",
    options: [
      { id: "A", text: "15th August 2023" },
      { id: "B", text: "2nd September 2023" },
      { id: "C", text: "9th September 2023" },
      { id: "D", text: "6th October 2023" }
    ],
    correct: "C",
    rationale: "The first WhatsApp message from Chirag was sent on 9th September 2023 during her first year of MBBS."
  },
  {
    id: 6,
    section: "Section II: High-Precision Timestamps & First Encounters",
    subject: "Chronological Intervals",
    question: "Calculate the exact incubation window elapsed between the initial WhatsApp transmission and the inaugural face-to-face consultation at Flamingo:",
    options: [
      { id: "A", text: "14 days" },
      { id: "B", text: "21 days" },
      { id: "C", text: "27 days" },
      { id: "D", text: "33 days" }
    ],
    correct: "C",
    rationale: "Exactly 27 days elapsed between 9th September 2023 (first text) and 6th October 2023 (first meetup at Flamingo)."
  },
  {
    id: 7,
    section: "Section II: High-Precision Timestamps & First Encounters",
    subject: "Sartorial Pathology - Maiden Consultation at Flamingo",
    question: "A physical inspection of both subjects during their maiden consultation on 6th October 2023 at Flamingo reveals which paired forensic combination of attire?",
    options: [
      { id: "A", text: "Diksha: Black printed dress; Chirag: Blue denim jacket with black chinos" },
      { id: "B", text: "Diksha: Pink printed top with black jeans; Chirag: Blue shirt with white jeans" },
      { id: "C", text: "Diksha: White graphic tee with black trousers; Chirag: Black button-down with grey denim" },
      { id: "D", text: "Diksha: Pink printed kurta with leggings; Chirag: White shirt with blue denim" }
    ],
    correct: "B",
    rationale: "Diksha wore a pink printed top paired with black jeans, while Chirag wore a classic blue shirt with white jeans."
  },
  {
    id: 8,
    section: "Section II: High-Precision Timestamps & First Encounters",
    subject: "Cardiovascular Diagnostics & Vital Signs",
    question: "Upon returning to his quarters post-Flamingo, Subject C experienced an acute, non-exertional cardiac phenomenon. What was the documented observation recorded by his roommate?",
    options: [
      { id: "A", text: "Bilateral bounding radial pulses with a regular sinus rhythm at 78 bpm" },
      { id: "B", text: "Subject collapsed on his mattress with palpitations so violent his roommate called out to physically check the rate" },
      { id: "C", text: "Symptomatic vasovagal presyncope requiring immediate leg elevation" },
      { id: "D", text: "Mild compensatory bradycardia secondary to emotional relief" }
    ],
    correct: "B",
    rationale: "Chirag collapsed straight onto his mattress with his heart pounding so hard that his roommate told him to check his pulse rate."
  },
  {
    id: 9,
    section: "Section II: High-Precision Timestamps & First Encounters",
    subject: "Respiratory Medicine - Dietary Provocation Test",
    question: "During the consultation at Flamingo, Patient D developed acute clear rhinorrhea and nasal mucosa hypersensitivity. Which specific clinical mechanism and beverage exposure triggered this presentation?",
    options: [
      { id: "A", text: "Inhalation of crushed aerosolized menthol from an iced virgin mojito provoking cholinergic rhinitis" },
      { id: "B", text: "Transient ciliary paralysis of the respiratory mucosa secondary to rapid chilled mocktail ingestion" },
      { id: "C", text: "Gustatory and thermal rhinorrhea precipitated by the consumption of chilled mocktail" },
      { id: "D", text: "Acute IgE-mediated hypersensitivity reaction to concentrated citrus syrup in an artisanal beverage" }
    ],
    correct: "C",
    rationale: "The rapid intake of chilled mocktail dropped the oral and mucosal temperature, inducing cold/gustatory rhinorrhea and a runny nose."
  },
  {
    id: 10,
    section: "Section III: Deep Anatomy & Physical Milestones",
    subject: "Cardiac Morphology - The Gazebo Plate Experiment",
    question: "At the Gazebo rooftop, an organic sketch was executed on a porcelain dinner plate. When comparing the two specimen drawings, which morphological classification is accurate?",
    options: [
      { id: "A", text: "Both candidates independently sketched simplified, symmetrical Valentine hearts" },
      { id: "B", text: "Chirag drew a classic romantic heart, while Dr. Diksha sketched an anatomically differentiated medical cardiac silhouette" },
      { id: "C", text: "Diksha drew an ECG rhythm strip, while Chirag sketched a four-chambered myocardium" },
      { id: "D", text: "Chirag attempted an anatomical drawing with coronary vessels but abandoned it" }
    ],
    correct: "B",
    rationale: "While dining at Gazebo, they sketched hearts on a plate—Diksha drew a real anatomical/medical heart, and Chirag drew a classic romantic heart."
  },
  {
    id: 11,
    section: "Section III: Deep Anatomy & Physical Milestones",
    subject: "Biomechanics - Landmark First Physical Contact",
    question: "The historic 'First Side-Hug' maneuver was executed under specific urban field conditions. What was the exact geographic landmark of this event?",
    options: [
      { id: "A", text: "Outside the main billing counter of Flamingo Restaurant" },
      { id: "B", text: "At the central parking bay of Toorji Ka Jhalra" },
      { id: "C", text: "Near the checkpoint known as 'Khatarnak Puliya' while dropping her back" },
      { id: "D", text: "On the pedestrian steps leading down from Masuria Mountain" }
    ],
    correct: "C",
    rationale: "Chirag dropped Diksha home after their Gazebo rooftop date, and their very first side-hug took place right near Khatarnak Puliya in Jodhpur."
  },
  {
    id: 12,
    section: "Section III: Deep Anatomy & Physical Milestones",
    subject: "Vestibular Stimulation - First Interlocking of Digits",
    question: "Tactile mechanoreceptors (holding hands) were first engaged during an episode of rotational acceleration and vertical displacement. Where did this landmark procedure take place?",
    options: [
      { id: "A", text: "Inside a dimly lit cinema hall during the film interval" },
      { id: "B", text: "On a rotating fairground Jhula at Ravan Ka Chabutra" },
      { id: "C", text: "While traversing a suspension bridge during the zip-line approach" },
      { id: "D", text: "Near the approach lane of the bowling alley at Masti Zone" }
    ],
    correct: "B",
    rationale: "The very first time they held hands was while riding a giant jhula during a fair at Ravan Ka Chabutra."
  },
  {
    id: 13,
    section: "Section III: Deep Anatomy & Physical Milestones",
    subject: "Ergonomics & Neural Decompression at Frespresso",
    question: "In an observational study conducted at Cafe Frespresso, what specific anatomical maneuver produced an immediate state of decompression in Subject C?",
    options: [
      { id: "A", text: "Consuming a double-shot espresso while seated directly opposite each other" },
      { id: "B", text: "Chirag resting his head flat in Dr. Diksha's lap" },
      { id: "C", text: "Sharing a single pastry while reviewing clinical pharmacology notes" },
      { id: "D", text: "Sitting in a quiet corner booth to block out ambient cafe noise" }
    ],
    correct: "B",
    rationale: "A standout memory at Cafe Frespresso was Chirag lying down with his head resting comfortably in Diksha's lap."
  },
  {
    id: 14,
    section: "Section IV: Psychometric Profiling & Quirks",
    subject: "Cranial Nerve VII Pathology - The Feline Reflex",
    question: "The diagnostic sign known colloquially as 'Billi Sign' is elicited when Dr. Diksha is teased. What are the pathognomonic physical features of this sign?",
    options: [
      { id: "A", text: "Rapid bilateral eyelid flutter accompanied by upward gaze" },
      { id: "B", text: "Contraction of the facial muscles, producing distinct nasal crinkling and midface tension lines" },
      { id: "C", text: "Complete poker-faced silence paired with crossed arms" },
      { id: "D", text: "Bilateral cheek puffing with forced oral air retention" }
    ],
    correct: "B",
    rationale: "Diksha scrunches up her nose, creating lines across her midface, which affectionately earned her the nickname \"Billi.\""
  },
  {
    id: 15,
    section: "Section IV: Psychometric Profiling & Quirks",
    subject: "Pharmacological Addiction - The Dopamine Substrate",
    question: "Subject D exhibits profound neurological reinforcement when presented with a specific therapeutic gift. What is the qualifying criterion for this item to induce instant happiness?",
    options: [
      { id: "A", text: "It must be an imported luxury metal-body pen with archival ink" },
      { id: "B", text: "It can be literally any functional pen—even an ordinary, pre-tested, or used pen" },
      { id: "C", text: "It must be accompanied by a hardbound clinical diagnostic notebook" },
      { id: "D", text: "It must have her name custom-engraved alongside 'Dr. Diksha'" }
    ],
    correct: "B",
    rationale: "Diksha has an undeniable love for pens. Even if Chirag gifts her a simple, everyday, or used pen, it brings a massive smile to her face."
  },
  {
    id: 16,
    section: "Section IV: Psychometric Profiling & Quirks",
    subject: "Psychiatry - Compulsive Nocturnal Termination Protocol",
    question: "According to standard operating procedures governing nocturnal WhatsApp transmissions, when is a chat session legally classified as 'Open / Unresolved'?",
    options: [
      { id: "A", text: "If the final message is sent past 1:30 AM without a timestamped reply" },
      { id: "B", text: "If one party fails to place a Heart Reaction on the other person's final closing message" },
      { id: "C", text: "If the word 'Bye' is substituted for 'Goodnight'" },
      { id: "D", text: "If consecutive blue ticks appear without immediate real-time typing" }
    ],
    correct: "B",
    rationale: "Their established tradition requires one of them to put a heart reaction on the other person's last text. Without that heart, the chat cannot be closed."
  },
  {
    id: 17,
    section: "Section IV: Psychometric Profiling & Quirks",
    subject: "Sociopolitical Endocrinology - The Recurring Debate",
    question: "A recurring intellectual debate emerges between the two parties requiring a definitive 'sit-down summit'. What is the clinical topic under dispute?",
    options: [
      { id: "A", text: "Whether private clinical practice is superior to institutional academic medicine" },
      { id: "B", text: "Chirag’s contention that Diksha’s feminist perspectives occasionally lean too extreme" },
      { id: "C", text: "The optimal financial roadmap for launching a dedicated diagnostic clinic" },
      { id: "D", text: "Who possesses superior geographical navigation skills across Rajasthan" }
    ],
    correct: "B",
    rationale: "The one playful debate they frequently have—and plan to sit down and settle once and for all—is Chirag feeling Diksha's feminism can sometimes be a bit over the top."
  },
  {
    id: 18,
    section: "Section IV: Psychometric Profiling & Quirks",
    subject: "Forensic Auditory Analysis - The First Story",
    question: "The first Instagram story uploaded by Diksha that Chirag viewed carried an underlying acoustic message. What was the exact lyric hook playing in the background?",
    options: [
      { id: "A", text: "“Kehndi hundi si chan tak raah bana de”" },
      { id: "B", text: "“Main chheti chheti lawaan tere naal leniyan”" },
      { id: "C", text: "“Tere naal jeena tere naal marna”" },
      { id: "D", text: "“Kinna chir tainu main takkda ravaan”" }
    ],
    correct: "B",
    rationale: "The very first Instagram story of hers that Chirag watched was set to the Punjabi track \"Valiyan\" featuring that exact lyric."
  },
  {
    id: 19,
    section: "Section V: Jodhpur Field Trials & Regional Cartography",
    subject: "Trauma & Dynamic Mechanics - Maut Ka Kuan",
    question: "During a visit to 'Maut Ka Kuan' (Well of Death), Patient D exhibited intense facial joy while participating in an interactive stunt transaction. What were the specific operational parameters?",
    options: [
      { id: "A", text: "Leaning over the lower wooden barricade to hand a 20 Rupee coin to a four-wheel stunt driver" },
      { id: "B", text: "Chirag providing a 10 Rupee banknote, which she extended outward to a speeding driver mid-circuit" },
      { id: "C", text: "Extending a 50 Rupee note toward a moving stunt car before pulling her hand back in fright" },
      { id: "D", text: "Tossing a 10 Rupee note directly onto the floor of the wooden barrel while the riders orbited" }
    ],
    correct: "B",
    rationale: "At Maut Ka Kuan, Chirag handed Diksha a 10 Rupee note, which she held out to the rider mid-stunt, followed by her brightest smile."
  },
  {
    id: 20,
    section: "Section V: Jodhpur Field Trials & Regional Cartography",
    subject: "Community Medicine - Geographic Audit",
    question: "True or False: The couple has visited both Jaswant Thada and Baiji Ka Talab, but has NEVER explored both Kailana Lake and Mandore Gardens together.",
    options: [
      { id: "A", text: "True" },
      { id: "B", text: "False" }
    ],
    correct: "B",
    rationale: "False. They have explored all four of these iconic Jodhpur landmarks together."
  },
  {
    id: 21,
    section: "Section V: Jodhpur Field Trials & Regional Cartography",
    subject: "Caffeine Pharmacology - Establishment Verification",
    question: "Which of the following represents a verified subset of coffee and culinary venues audited by the couple in Jodhpur?",
    options: [
      { id: "A", text: "Blue Tokai, Third Wave Coffee, Costa Coffee, Starbucks" },
      { id: "B", text: "Nothing Before Coffee, Red's Coffee House, Frespresso, Crazy Coffee" },
      { id: "C", text: "Indian Coffee House, Stepwell Cafe, Dylan's Cafe, Cafe Mehran" },
      { id: "D", text: "CCD, Roastery Coffee House, Barista, The Belgian Waffle Co." }
    ],
    correct: "B",
    rationale: "While they visited many spots, NBC, Red's Coffee House, Frespresso, and Crazy Coffee were all confirmed stops on their coffee trail."
  },
  {
    id: 22,
    section: "Section V: Jodhpur Field Trials & Regional Cartography",
    subject: "Kinetic Biomechanics - Sports Medicine",
    question: "During their friendly athletic rivalry at 'Masti Zone', which upper-extremity kinetic activity was officially tested between the two subjects?",
    options: [
      { id: "A", text: "Laser Tag tactical combat" },
      { id: "B", text: "Ten-Pin Bowling" },
      { id: "C", text: "Virtual Reality Rollercoaster" },
      { id: "D", text: "Air Hockey Championship" }
    ],
    correct: "B",
    rationale: "Masti Zone was the arena where they bowled together for the very first time."
  },
  {
    id: 23,
    section: "Section V: Jodhpur Field Trials & Regional Cartography",
    subject: "High-Altitude Vestibular Endurance",
    question: "Which of the following high-adrenaline activities has NOT yet been experienced by the couple during their various dates and outings?",
    options: [
      { id: "A", text: "Outdoor aerial ziplining" },
      { id: "B", text: "Navigating a walk-through Haunted House" },
      { id: "C", text: "Platform Bungee Jumping" },
      { id: "D", text: "Trampoline kinetic maneuvers" }
    ],
    correct: "C",
    rationale: "They have conquered the haunted house, ziplining, giant jhulas, and trampolines, but bungee jumping has not been attempted yet."
  },
  {
    id: 24,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "Career Pathology & Specialization Triage",
    question: "Dr. Diksha Gurnani is finalizing her post-MBBS roadmap. If an algorithm attempts to allocate her to surgical disciplines, why does this create an administrative mismatch?",
    options: [
      { id: "A", text: "Her clinical preferences lean strictly toward non-clinical paraclinical departments" },
      { id: "B", text: "Her definitive, non-negotiable career goal is dedicated to MD General Medicine" },
      { id: "C", text: "Hospital surgical theater schedules conflict with her preferred study hours" },
      { id: "D", text: "She plans to transition into healthcare hospital administration" }
    ],
    correct: "B",
    rationale: "Her dream specialty is unambiguously MD General Medicine."
  },
  {
    id: 25,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "Tropical Medicine & Future Travel Prescriptions",
    question: "Upon securing her postgraduate residency seat, which international territory represents the mandatory first-line holiday destination on her prescription?",
    options: [
      { id: "A", text: "Switzerland" },
      { id: "B", text: "Indonesia (Bali)" },
      { id: "C", text: "Thailand" },
      { id: "D", text: "United Kingdom" }
    ],
    correct: "C",
    rationale: "When asked about her ultimate bucket-list getaway without exam stress, Thailand is her dream international destination."
  },
  {
    id: 26,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "Psychological Insight - The 6th October Date Definition",
    question: "On 6th October 2023, while both individuals outwardly treated the Flamingo meetup as an informal reunion of old school friends, what was Chirag's internal diagnosis from minute one?",
    options: [
      { id: "A", text: "An informal networking conversation between childhood acquaintances" },
      { id: "B", text: "Unequivocally and 100% an official first date" },
      { id: "C", text: "A casual session to help her get familiar with Jodhpur cafes" },
      { id: "D", text: "A brief 20-minute coffee meeting before running errands" }
    ],
    correct: "B",
    rationale: "Regardless of how casual or nervous the meetup seemed on the outside, in Chirag’s mind, it was undeniably a date from the second they met."
  },
  {
    id: 27,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "Cardiovascular Telemetry & Daily Communication",
    question: "A retrospective review of telecommunication records indicates a consistent communication pattern during intensive study cycles. What constitutes the primary clinical support protocol?",
    options: [
      { id: "A", text: "Sending weekly multi-page motivational letters via courier" },
      { id: "B", text: "Daily phone calls that reliably act as anxiolytic therapy to reset stress levels" },
      { id: "C", text: "Completely turning off phone lines for weeks to prevent distractions" },
      { id: "D", text: "Conducting impromptu mock viva voce exams over video call" }
    ],
    correct: "B",
    rationale: "Chirag's daily calls serve as the ultimate grounding mechanism and stress-reliever during her intense study days."
  },
  {
    id: 28,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "Forensic Itinerary Verification",
    question: "True or False: On the day they enjoyed their Gazebo rooftop date, visited the gaming zone, and drew hearts on the plate, they also completed an hour of trampoline jumping.",
    options: [
      { id: "A", text: "True" },
      { id: "B", text: "False" }
    ],
    correct: "B",
    rationale: "False. While they spent that whole day together and went to the gaming zone, they explicitly did not go to the trampoline on that specific date."
  },
  {
    id: 29,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "Postgraduate Seat Allocation Matrix",
    question: "Under the Central Relationship Counseling Board (CRCB) guidelines, which institutional seat has been permanently awarded to Dr. Diksha Gurnani?",
    options: [
      { id: "A", text: "Provisional Waiting List Candidate for General Surgery" },
      { id: "B", text: "Unconditional, Permanent All India Rank #1 in Chirag's Heart" },
      { id: "C", text: "Merit Rank 2 behind Chirag's Class 1 record" },
      { id: "D", text: "Honorary State-Quota Candidate for Jodhpur Division" }
    ],
    correct: "B",
    rationale: "No matter the entrance results or cutoffs, she permanently holds the All India Rank #1 seat in Chirag's life."
  },
  {
    id: 30,
    section: "Section VI: Diagnostic Scenarios & Career Milestones",
    subject: "The Birthday Prognosis",
    question: "A comprehensive clinical evaluation concludes that Dr. Diksha Gurnani is celebrating her birthday today. What is the evidence-based consensus prognosis for her upcoming year?",
    options: [
      { id: "A", text: "High clinical stress, ongoing uncertainty, and endless textbook revision loops" },
      { id: "B", text: "Crushing NEET PG, matching into MD General Medicine, and being celebrated unconditionally by Chirag" },
      { id: "C", text: "Moderate academic fatigue requiring complete digital isolation" },
      { id: "D", text: "Indeterminate clinical prognosis pending external university review" }
    ],
    correct: "B",
    rationale: "The definitive outcome: clearing NEET PG with flying colors, matching into her dream specialty of General Medicine, and starting an incredible new chapter together."
  }
];

export const BIRTHDAY_LETTER = {
  title: "A Very Special Birthday Note for Dr. Diksha",
  subtitle: "From Chirag, with all my love, admiration & pride ❤️",
  paragraphs: [
    "Happy Birthday, my brilliant doctor! 🎉✨",
    "From running to the back row in Class 1 to standing on the threshold of MD General Medicine today, watching you grow into this extraordinary, sharp, and compassionate physician is the greatest privilege of my life.",
    "I know the sheer intensity and exhaustion of NEET PG prep—the endless cycles of Marrow, the daily revisions, the pressure, and the late-night stress. But never forget that behind those stethoscope skills is an unstoppable mind and the warmest heart. You are born to heal, and you are going to conquer this exam with flying colors.",
    "Whether it's sharing iced mocktails at Flamingo, our first side-hug at Khatarnak Puliya, hand-in-hand on the Ravan Ka Chabutra jhula, coffee stops across Jodhpur, or our playful debates about feminism—every single chapter with you is my absolute favorite memory.",
    "On your birthday, I wish you endless happiness, boundless peace, Thailand beach dreams, and a lifetime of effortless smiles. Thank you for filling my life with so much light, warmth, and laughter.",
    "Forever your #1 supporter, your daily anxiolytic call, and your unconditional partner. Happy Birthday, Diksha! 🩺🎂💖"
  ]
};
