// All static website content lives here. Text, links and image URLs are the
// ones from the original HTML. When data moves to Supabase later, replace
// the matching array with a call from src/services/api.js.

import ucLogo from "../assets/images/uc.png";
import chopLogo from "../assets/images/CHOP.png";
import dukeLogo from "../assets/images/duke.png";
import akuLogo from "../assets/images/aku.png";
import aimen from "../assets/images/team/Aiemen.jpeg";
import rameez from "../assets/images/team/rameez bhai.jpeg";
import tooba from "../assets/images/team/miss tooba.jpeg";
import faiza from "../assets/images/team/Faiza.jpeg";
import sirusman from "../assets/images/team/sir_usman.jpeg";
import misstaiyaba from "../assets/images/team/miss taiyaba.jpeg";
import ayesha from "../assets/images/team/ayesha.jpeg";
import muntaha from "../assets/images/team/muntaha.jpeg";
import ishaq from "../assets/images/team/ayesha_ishaq.jpeg";
import ayeshaazam from "../assets/images/team/ayeshaazam.jpeg";

import featured from "../assets/images/events/featured1.png";
import workshopImg from "../assets/images/events/workshop.jpg";
import ceremony from "../assets/images/events/ceremony-t.jpeg";
import ceremony_u from "../assets/images/events/ceremony-u.jpeg";
import event1 from "../assets/images/events/event1.jpg";
import event2 from "../assets/images/events/event2.jpg";
import event3 from "../assets/images/events/event3.jpg";
import all from "../assets/images/events/all.jpeg";
import group from "../assets/images/events/group.jpeg";
import sir from "../assets/images/events/u-1.jpg";

import grammer from "../assets/projects/grammer.mp4";

import naqshAi from "../assets/projects/NaqshAi.mp4";
import agri from "../assets/projects/agri.mp4";
import deepfakeguard from "../assets/projects/deepfake.mp4";
import kisaan from "../assets/projects/kisaangpt.mp4";
import steamx from "../assets/projects/steamx.mp4";
import steamx2 from "../assets/projects/steamx2.mp4";
import researchgpt from "../assets/projects/researchgpt.mp4";
import mediassist from "../assets/projects/MediAssist.mp4";
import meetmind from "../assets/projects/meetmind.mp4";
const U = (id, w) => `https://picsum.photos/seed/${id}/${w}/600`;

/* ── Navigation ── */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Research", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Events", href: "#events" },
  { label: "Collaborators", href: "#collaborators" },
];

export const socialLinks = [
  { label: "Twitter", icon: "fab fa-twitter", href: "#" },
  { label: "LinkedIn", icon: "fab fa-linkedin", href: "#" },
  { label: "GitHub", icon: "fab fa-github", href: "#" },
];

/* ── Hero ── */

// Two stat cells, two stats each (as in the original hero).
export const heroStats = [
  [
    { value: "6", label: "Years of Research" },
    { value: "25", label: "Active Projects" },
  ],
  [
    { value: "20", label: "Publications" },
    { value: "30", label: "Student Researchers" },
  ],
];

/* ── Features ── */
export const features = [
  {
    cls: "fi-1",
    icon: "fas fa-microscope",
    title: "Research",
    text: "Language models, computer vision, and emerging intelligent systems — studied rigorously from theory to experiment.", // Added Oxford comma
  },
  {
    cls: "fi-2",
    icon: "fas fa-lightbulb",
    title: "Innovation",
    text: "We turn research ideas into prototypes and test them against practical AI applications in the real world.",
  },
  {
    cls: "fi-3",
    icon: "fas fa-code",
    title: "Development",
    text: "Reliable AI-powered systems built through rigorous engineering and iterative testing methodologies.",
  },
  {
    cls: "fi-4",
    icon: "fas fa-handshake",
    title: "Collaboration",
    text: "Open partnerships with academia, industry, and the wider research community for maximum impact.", // Added Oxford comma
  },
];

/* ── About ── */

export const aboutImages = [
  {
    img: U("photo-1581091226825-a6a2a5aee158", 600),
    alt: "Lab",
    tall: true,
  },
  {
    img: U("photo-1677442135703-1787eea5ce01", 600),
    alt: "AI",
  },
  {
    img: U("photo-1451187580459-43490279c0fa", 600),
    alt: "Data",
  },
];

export const aboutChecklist = [
  {
    icon: "fas fa-history",
    title: "5+ Years Combined Experience", // Title Case
    text: "Decades of expertise in AI, machine learning, and deep learning research.", // Added Oxford comma
  },
  {
    icon: "fas fa-headset",
    title: "Continuous Student Support", // Title Case
    text: "Mentorship and collaboration for students at all levels of study.",
  },
  {
    icon: "fas fa-certificate",
    title: "Industry-Recognised Research", // Title Case
    text: "Published outputs and partnerships with leading global institutions.",
  },
];

/* ── Partners strip ── */
export const partners = [
  "OPENAI",
  "DEEPMIND",
  "MIT CSAIL",
  "IEEE",
  "HUGGING FACE",
  "STANFORD AI",
  "NVIDIA",
  "GOOGLE AI",
];

/* ── Research areas (services section) ── */
export const services = [
  {
    id: "agentic-ai",
    cls: "si-1",
    icon: "fa-solid fa-robot",
    title: "Agentic AI",
    text: "Autonomous AI agents that plan, reason and act across complex multi-step tasks.",
  },
  {
    id: "agriculture",
    cls: "si-2",
    icon: "fa-solid fa-seedling",
    title: "GenAI in Agriculture",
    text: "Intelligent systems for crop monitoring, yield prediction and precision farming.",
  },
  {
    id: "medical",
    cls: "si-3",
    icon: "fa-solid fa-heart-pulse",
    title: "GenAI in Medical",
    text: "Deep learning for diagnosis, medical imaging and clinical decision support.",
  },
  {
    id: "education",
    cls: "si-4",
    icon: "fa-solid fa-graduation-cap",
    title: "GenAI in Education",
    text: "Adaptive tutoring, personalised learning paths and intelligent assistants.",
  },
  {
    id: "bioinformatics",
    cls: "si-5",
    icon: "fa-solid fa-dna",
    title: "GenAI in Bioinformatics",
    text: "Machine learning applied to genomics, protein structure prediction and biological data.",
  },
  {
    id: "cyber-security",
    cls: "si-6",
    icon: "fa-solid fa-shield-halved",
    title: "GenAI in Cyber Security",
    text: "Anomaly detection, threat intelligence and automated defence systems.",
  },
];

export const servicesImage = U("photo-1677442135703-1787eea5ce01", 600);

/* ── Process ── */
export const processSteps = [
  {
    num: "01",
    icon: "fas fa-comments",
    title: "Discussion & Discovery", // Title Case
    text: "We collaborate with students, partners, and stakeholders to identify meaningful problems worth exploring with generative AI technologies.", // Added Oxford comma
  },
  {
    num: "02",
    icon: "fas fa-flask",
    title: "Research & Build", // Title Case
    text: "Rigorous experimentation, iterative development cycles, and peer review turn ideas into working, validated prototypes ready for evaluation.", // Added Oxford comma
  },
  {
    num: "03",
    icon: "fas fa-chart-line",
    title: "Deploy & Maintain", // Title Case
    text: "Tested, reliable AI-powered systems are deployed for real-world use, evaluated, and continuously improved over time.", // Added Oxford comma
  },
];
/* ── Publications ── */
export const papers = [
  {
    year: "2024/12",
    title:
      " PharmaLLM: A medicine prescriber chatbot exploiting open-source large language models",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sl4SctAAAAAJ&citation_for_view=sl4SctAAAAAJ:qxL8FJ1GzNcC",
  },
  {
    year: "2024/12/26",
    title:
      "CancerBot: A retrieval-augmented generation based cancer chatbot using large language models",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=sl4SctAAAAAJ&citation_for_view=sl4SctAAAAAJ:Wp0gIr-vW9MC",
  },
  {
    year: "2019/3/11",
    title: "ASoVS: abstractive summarization of video sequences",
    link: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=WM9A5m4AAAAJ&cstart=20&pagesize=80&citation_for_view=WM9A5m4AAAAJ:SAZ1SQo2q1kC",
  },
];

export const researchImage = U("photo-1581091226825-a6a2a5aee158", 700);

export const testimonial = {
  quote:
    "The GenAI Lab's research on RAG systems has significantly advanced our knowledge retrieval capabilities.",
  name: "Dr. R. Kumar",
  role: "Partner Institution",
  img: U("photo-1507003211169-0a1dd7228f2d", 100),
};

/* ── Solutions (key areas) ── */
export const areas = [
  {
    title: "Generative AI Models",
    text: "New models and methods for creative and generative tasks across text, image and audio modalities.",
    img: U("photo-1666875753105-c63a6f3bdc86", 600),
    alt: "Generative AI",
  },
  {
    title: "Natural Language Processing",
    text: "Understanding and generating human language with state-of-the-art transformer architectures.",
    img: U("photo-1558618666-fcd25c85cd64", 600),
    alt: "NLP",
  },
  {
    title: "Computer Vision",
    text: "Deep learning models for visual understanding, object detection and image generation.",
    img: U("photo-1535378917042-10a22c95931a", 600),
    alt: "Vision",
  },
  {
    title: "RAG Systems",
    text: "Combining external knowledge bases with generative models for accurate, domain-specific answers.",
    img: U("photo-1544197150-b99a580bb7a8", 600),
    alt: "RAG",
  },
  {
    title: "Intelligent Agents",
    text: "Autonomous AI systems capable of planning and executing complex multi-step tasks.",
    img: U("photo-1620712943543-bcc4688e7485", 600),
    alt: "Agents",
  },
  {
    title: "Multimodal Learning",
    text: "Training models that jointly understand and reason across text, vision and structured data.",
    img: U("photo-1451187580459-43490279c0fa", 600),
    alt: "Multimodal",
  },
];

/* ── Projects (cards on home page + detail page, one source of truth) ── */
/* — Projects — */
export const projects = [
  {
    id: "steamx",
    tag: "AI EdTech",
    title: "STEAMX",
    text: "An AI-powered educational platform empowering students in grades 9–12 with intelligent tutoring, personalized academic assistance, and interactive learning experiences.",
    img: steamx,
    detailVideo: steamx2,
    overview: [
      "STEAMX is an AI-powered educational platform designed to enhance the learning experience for students in grades 9 through 12.",
      "The platform features an intelligent AI assistant that helps students understand complex academic concepts, explore subject-related topics, and receive instant answers to educational questions.",
      "STEAMX aims to bridge the gap between traditional education and modern technology by making academic support more accessible, interactive, and personalized.",
    ],
    features: [
      {
        title: "AI-Powered Academic Assistant",
        desc: "Get instant, intelligent answers to complex academic questions and subject-related topics.",
      },
      {
        title: "Grade 9–12 Learning Support",
        desc: "Tailored specifically to support high school students across their current curriculum.",
      },
      {
        title: "Interactive AI Tutoring",
        desc: "Engage in dynamic, conversational learning sessions rather than static reading.",
      },
      {
        title: "Subject-Specific Question Answering",
        desc: "Receive accurate, context-aware responses grounded in specific educational domains.",
      },
      {
        title: "Personalized Learning Assistance",
        desc: "The AI adapts to individual learning paces and styles to provide customized help.",
      },
      {
        title: "Complex Concept Simplification",
        desc: "Breaks down difficult, abstract topics into easy-to-understand pieces for students.",
      },
      {
        title: "Natural Language Interaction",
        desc: "Ask questions naturally, just like you would to a human teacher or tutor.",
      },
      {
        title: "Student-Friendly Learning Experience",
        desc: "A clean, intuitive, and accessible interface designed specifically for student use.",
      },
    ],

    liveUrl: "https://www.steamx.pk/",
  },
  {
    id: "kisaangpt",
    tag: "Generative AI",
    title: "KisaanGPT",
    text: "An AI-powered Urdu agricultural assistant providing intelligent farming guidance and crop management recommendations.",
    img: kisaan,

    overview: [
      "KisaanGPT is an AI-powered agricultural advisory platform designed to make farming knowledge accessible to Urdu-speaking farmers.",
      "It provides intelligent guidance on crop management, agricultural practices, pest control, and farming-related queries through a user-friendly interface.",
    ],
    features: [
      {
        title: "Urdu Language Support",
        desc: "Provides agricultural guidance and assistance entirely in Urdu for local farmers.",
      },
      {
        title: "AI-Powered Farming Assistance",
        desc: "Leverages artificial intelligence to answer farming queries and offer expert advice.",
      },
      {
        title: "Crop Management Guidance",
        desc: "Delivers actionable recommendations for crop selection, care, and harvesting.",
      },
      {
        title: "Pest and Disease Information",
        desc: "Identifies common agricultural pests and offers strategies for disease prevention.",
      },
      {
        title: "Natural Language Interaction",
        desc: "Allows farmers to ask questions conversationally, just like talking to an expert.",
      },
    ],
  },
  {
    id: "researchgpt",
    tag: "Generative AI",
    title: "ResearchGPT",
    text: "An AI-powered research assistant that enables users to upload research papers, extract information through natural language queries, compare multiple studies, and identify research gaps.",
    img: researchgpt,
    stack: ["Python", "LLMs", "RAG", "NLP", "LangChain", "FastAPI", "React"],
    overview: [
      "ResearchGPT is an intelligent AI-powered research assistant designed to simplify academic research, literature analysis, and scientific document understanding.",
      "The platform allows researchers to upload academic papers and interact with their content through natural language queries, enabling quick extraction of relevant information without manually reviewing entire documents.",
      "It supports comparative analysis of multiple research papers, helping users identify similarities, differences, methodologies, findings, and limitations across studies.",
      "ResearchGPT also provides AI-driven research gap analysis, assisting researchers in identifying unexplored areas, existing limitations, and potential directions for future research.",
    ],
    features: [
      {
        title: "Research Paper Upload and Processing",
        desc: "Upload academic PDFs and let the system instantly parse and index the content for analysis.",
      },
      {
        title: "AI-Powered Document Question Answering",
        desc: "Ask natural language questions and receive accurate, context-aware answers extracted from the papers.",
      },
      {
        title: "Natural Language Information Extraction",
        desc: "Quickly pull out specific data points, definitions, and quotes without manually reading every page.",
      },
      {
        title: "Multi-Paper Comparative Analysis",
        desc: "Compare multiple documents side-by-side to identify similarities and differences in research.",
      },
      {
        title: "Automated Research Gap Identification",
        desc: "Let the AI highlight unexplored areas, limitations, and potential future research directions.",
      },
      {
        title: "Research Methodology Comparison",
        desc: "Analyze how different papers approach the same problem and compare their experimental setups.",
      },
      {
        title: "Key Findings and Limitations Extraction",
        desc: "Automatically summarize the main results and the constraints or limitations noted by the authors.",
      },
      {
        title: "AI-Generated Research Summaries",
        desc: "Generate concise, structured summaries of lengthy documents to save reading time.",
      },
      {
        title: "Literature Review Assistance",
        desc: "Compile key insights across a collection of papers to streamline the literature review process.",
      },
      {
        title: "Context-Aware Research Queries",
        desc: "The AI understands the academic context of your questions to deliver more relevant answers.",
      },
    ],
  },
  {
    id: "blackloaddictionary",
    tag: "NLP",
    title: "Black Load Dictionary",
    text: "An intelligent grammar correction tool that detects grammatical errors and provides accurate, well-structured sentences to improve writing quality.",
    img: grammer,

    overview: [
      "Black Load Dictionary is an intelligent grammar correction application designed to help users improve their writing accuracy and clarity.",
      "The platform analyzes user-provided text, identifies grammatical mistakes, and generates corrected sentences while preserving the original meaning.",
      "It simplifies proofreading by providing an accessible interface for checking and improving written content.",
    ],
    features: [
      {
        title: "Automatic Grammar Error Detection",
        desc: "Instantly identifies grammatical mistakes and structural errors within your text.",
      },
      {
        title: "AI-Powered Sentence Correction",
        desc: "Generates accurate, well-structured sentences while fully preserving your original meaning.",
      },
      {
        title: "Spelling and Punctuation Checking",
        desc: "Catches typos and ensures proper punctuation usage for clear, professional writing.",
      },
      {
        title: "Context-Aware Text Correction",
        desc: "Understands the context of your writing to suggest the most appropriate corrections.",
      },
      {
        title: "Sentence Structure Improvement",
        desc: "Enhances the flow and readability of your sentences for better clarity.",
      },
      {
        title: "Real-Time Grammar Suggestions",
        desc: "Provides immediate feedback and suggestions as you type, making proofreading effortless.",
      },
    ],
  },
  {
    id: "naqshai",
    tag: "Vision",
    title: "NaqshAI",
    text: "A semantic Urdu AI suite and intelligent tutoring assistant for Urdu literature, summaries, verse explanations, and automated exam preparation.",
    img: naqshAi,

    overview: [
      "NaqshAI is a specialized Urdu AI suite built on Retrieval-Augmented Generation (RAG) to provide accurate, context-aware academic and literary assistance in both Urdu script and Roman Urdu.",
      "Designed with dedicated Tutor and Paper modes, the platform helps students and educators generate lesson summaries (خلاصہ), central ideas (مرکزی خیال), poetry and verse explanations (تشریح), formal letters, stories, and practice MCQs.",
      "By combining semantic search with bilingual Urdu understanding, RAGix bridges the gap between modern generative AI and regional-language education.",
    ],
    features: [
      {
        title: "High-accuracy Urdu OCR",
        desc: "Specialized optical character recognition trained specifically to handle the complex cursive nature of Urdu script.",
      },
      {
        title: "Document Digitization",
        desc: "Seamlessly convert physical Urdu documents, books, and archives into editable, searchable digital text.",
      },
      {
        title: "Context-aware text extraction",
        desc: "Intelligently analyzes contextual letterforms to ensure accurate character recognition and word formation.",
      },
      {
        title: "API Integration",
        desc: "Easily integrate our powerful Urdu OCR capabilities into your own applications via a developer-friendly API.",
      },
    ],
  },
  {
    id: "deepfakeguard",
    tag: "Computer Vision",
    title: "Deep Fake Guard",
    text: "An AI-powered platform for analyzing deepfake videos and identifying potentially manipulated digital content.",
    img: deepfakeguard,

    overview: [
      "Deep Fake Guard explores the application of artificial intelligence in deepfake video generation and detection.",
      "The platform focuses on analyzing digital media to identify potential manipulation and distinguish authentic videos from AI-generated content.",
    ],
    features: [
      {
        title: "Deepfake Video Detection",
        desc: "Advanced AI models analyze video footage to identify signs of deepfake generation and manipulation.",
      },
      {
        title: "AI-Generated Content Analysis",
        desc: "Detects subtle artifacts and inconsistencies left behind by generative AI models.",
      },
      {
        title: "Video Frame Processing",
        desc: "Processes videos frame-by-frame to ensure no manipulated segment goes unnoticed.",
      },
      {
        title: "Digital Media Authentication",
        desc: "Verifies the authenticity and origin of digital media to prevent the spread of misinformation.",
      },
      {
        title: "Manipulation Detection",
        desc: "Flags specific areas of a video where visual or audio tampering has likely occurred.",
      },
    ],
  },
  {
    id: "agrivoice",
    tag: "Voice AI",
    title: "AgriVoice",
    text: "An AI-powered voice assistant that helps farmers get answers to agriculture-related questions through natural language interaction, making farming knowledge more accessible.",
    img: agri,
    overview: [
      "AgriVoice is an AI-powered agricultural assistant designed to provide farmers with accessible and intelligent farming guidance.",
      "The platform allows users to ask agriculture-related questions and receive informative responses, simplifying access to farming knowledge through natural language interaction.",
      "By combining artificial intelligence with voice-based communication, AgriVoice aims to help farmers overcome literacy and technology barriers while supporting informed agricultural decisions.",
    ],
    features: [
      {
        title: "AI-Powered Agricultural Assistant",
        desc: "A smart virtual helper designed to answer farming questions and provide expert agricultural advice.",
      },
      {
        title: "Voice-Based Question Answering",
        desc: "Allows farmers to simply speak their questions and receive instant, spoken responses.",
      },
      {
        title: "Speech-to-Text Processing",
        desc: "Accurately transcribes spoken language into text to understand user queries in real-time.",
      },
      {
        title: "Natural Language Understanding",
        desc: "Comprehends complex, conversational farming queries just like a human expert would.",
      },
      {
        title: "Crop Management Guidance",
        desc: "Provides actionable recommendations for planting, growing, and harvesting crops.",
      },
      {
        title: "Pest and Disease Information",
        desc: "Offers detailed information on identifying and managing common agricultural pests and diseases.",
      },
      {
        title: "Farming Recommendations",
        desc: "Delivers tailored suggestions for improving yield, soil health, and overall farm productivity.",
      },
      {
        title: "Interactive Voice Assistance",
        desc: "Engages in dynamic, back-and-forth voice conversations for a seamless user experience.",
      },
    ],
  },
  {
    id: "mediassist",
    tag: "Healthcare AI",
    title: "MediAssist",
    text: "An AI-powered voice healthcare assistant that allows users to ask health-related questions, interact with specialized virtual doctor agents, and receive personalized medical guidance.",
    img: mediassist,

    overview: [
      "MediAssist is an intelligent AI-powered healthcare assistant designed to make general medical information and guidance more accessible through natural language and voice-based interactions.",
      "The platform allows users to describe their health concerns using voice or text and receive AI-generated responses tailored to their queries.",
      "MediAssist features multiple specialized virtual doctor agents, including general physicians, cardiologists, dermatologists, and pediatricians, enabling users to explore health information relevant to different medical specialties.",
      "By combining conversational AI with a multi-agent healthcare interface, MediAssist provides an interactive platform for preliminary health guidance and educational support.",
    ],
    features: [
      {
        title: "AI-Powered Voice Health Assistant",
        desc: "Interact with an intelligent medical assistant using natural voice commands for accessible healthcare guidance.",
      },
      {
        title: "Voice and Text-Based Medical Queries",
        desc: "Ask health-related questions either by typing or speaking, offering flexibility for all users.",
      },
      {
        title: "Multi-Agent Healthcare System",
        desc: "A collaborative network of specialized AI agents working together to provide comprehensive medical information.",
      },
      {
        title: "Specialized Virtual Doctor Agents",
        desc: "Consult with dedicated AI personas representing different medical fields for targeted advice.",
      },
      {
        title: "General Physician AI Assistant",
        desc: "Receive preliminary health assessments and general medical guidance from a virtual GP.",
      },
      {
        title: "Cardiology and Heart Health Guidance",
        desc: "Get specialized information and insights regarding cardiovascular health and related conditions.",
      },
      {
        title: "Dermatology and Skin Health Assistance",
        desc: "Explore information about skin conditions, treatments, and dermatological care.",
      },
      {
        title: "Pediatric Health Information",
        desc: "Access tailored medical guidance and health information specifically for children and infants.",
      },
      {
        title: "Natural Language Medical Conversations",
        desc: "Engage in fluid, context-aware dialogues that feel like a natural conversation with a healthcare professional.",
      },
      {
        title: "Interactive Healthcare Interface",
        desc: "A user-friendly, intuitive platform designed to make navigating medical information simple and stress-free.",
      },
    ],
  },
  {
    id: "meetmind",
    tag: "AI Automation",
    title: "MeetMind",
    text: "An AI-powered meeting intelligence platform that transforms meeting recordings into searchable transcripts, intelligent summaries, and actionable tasks with multilingual speech recognition.",
    img: meetmind,

    overview: [
      "MeetMind is an AI-powered meeting intelligence platform designed to transform conversations into structured, actionable insights and improve team productivity.",
      "The platform captures meeting audio from Google Meet, Zoom, and uploaded recordings, automatically converting spoken conversations into searchable text using advanced speech recognition.",
      "It leverages artificial intelligence to generate executive summaries, extract important discussion points, identify action items, and organize meeting outcomes for effective team collaboration.",
      "MeetMind supports bilingual Urdu and English transcription with speaker diarization, enabling accurate identification of different speakers throughout conversations.",
      "Through semantic search and vector-based transcript retrieval, users can quickly locate important information from previous meetings without manually reviewing lengthy recordings.",
    ],
    features: [
      {
        title: "Google Meet and Zoom Audio Capture",
        desc: "Seamlessly records meeting audio directly from Google Meet, Zoom, or uploaded files.",
      },
      {
        title: "AI-Powered Meeting Transcription",
        desc: "Automatically converts spoken conversations into highly accurate, searchable text.",
      },
      {
        title: "Bilingual Urdu and English Speech Recognition",
        desc: "Supports mixed-language conversations, accurately transcribing both Urdu and English.",
      },
      {
        title: "Speaker Diarization and Identification",
        desc: "Separates and identifies different speakers, making transcripts easy to follow and attribute.",
      },
      {
        title: "Automated Executive Meeting Summaries",
        desc: "Generates concise, structured summaries of key discussion points and decisions.",
      },
      {
        title: "AI-Generated Action Items",
        desc: "Extracts actionable tasks and assignments from the meeting automatically.",
      },
      {
        title: "Task Assignment and Tracking",
        desc: "Assigns tasks to specific team members and tracks progress directly from the meeting outcomes.",
      },
      {
        title: "Semantic Search Across Meeting Transcripts",
        desc: "Find relevant information across all past meetings using natural language search.",
      },
      {
        title: "Vector-Based Information Retrieval",
        desc: "Uses advanced vector search to quickly locate specific moments and topics within transcripts.",
      },
      {
        title: "Meeting Audio Upload and Processing",
        desc: "Upload pre-recorded audio files for batch transcription and analysis.",
      },
      {
        title: "Intelligent Meeting Insights",
        desc: "Gain deeper insights into team dynamics, recurring topics, and meeting efficiency.",
      },
      {
        title: "Enterprise-Focused Data Privacy",
        desc: "Built with robust security and privacy measures to protect sensitive corporate data.",
      },
    ],
  },
];
/* — Events — */
export const featuredEvent = {
  badge: "Seminar",
  title: "GenAI Research & Learning Sessions",
  text: "14 May 2025 ·  Interactive sessions, hands-on learning and research discussions with experts in the field of Generative AI.",
  img: featured, // placeholder until real image is added
  alt: "Seminar",
};

export const sideEvents = [
  {
    type: "Workshop · 22 Apr 2026",
    title: "Guest Lectures & Workshops",
    text: "Industry experts and academic speakers shared insights on the latest trends in Generative AI and its applications.",
    img: workshopImg, // Uses your real image
    alt: "Workshop",
  },
  {
    type: "Ceremony · 10 Mar 2026",
    title: "Certificate Ceremony",
    text: " Recognizing the hard work and achievements of our students and contributors.",
    img: ceremony, // placeholder until real image is added
    alt: "Ceremony",
  },
];

// The 6 images for the bottom grid
export const eventGallery = [ceremony_u, all, group, event1, event2, event3];

/* ── Team ── */
export const team = [
  {
    id: 1,
    name: "Dr Usman Ghani",
    role: "Founder",
    img: sirusman,
  },
  {
    id: 7,
    name: "Ayesha Azam",
    role: "AI Engineer",
    img: ayeshaazam,
  },
  {
    id: 2,
    name: "Tooba Pervaiz",
    role: "Team Lead",
    img: tooba, // ← use imported local file
  },
  {
    id: 3,
    name: "Taiyaba Sanaullah",
    role: "AR VR Specialist",
    img: misstaiyaba,
  },
  {
    id: 4,
    name: "Ayesha Ishaq",
    role: "Researcher",
    img: ishaq,
  },
  {
    id: 5,
    name: "Aiemen Altaf",
    role: "Full Stack Engineer",
    img: aimen,
  },
  {
    id: 6,
    name: "Rameez Qadeer",
    role: "AI ML Engineer",
    img: rameez,
  },
  {
    id: 8,
    name: "Khair Ul Wara",
    role: "Developer and Researcher",
    img: U("photo-1519085360753-af0119f7cbe7", 400),
  },
  {
    id: 9,
    name: "Faiza Kiran Safdar",
    role: "Developer and Researcher",
    img: faiza,
  },
  {
    id: 10,
    name: "Ayesha Saddiqa",
    role: "Web Developer",
    img: ayesha,
  },
  {
    id: 11,
    name: "Muntaha Fatima",
    role: "Developer and Researcher",
    img: muntaha,
  },
];
/* ── Collaborators + success stories ── */
export const collaborators = [
  {
    name: "University of California",
    logo: ucLogo,
  },
  {
    name: "Duke University",
    logo: dukeLogo,
  },
  {
    name: "Children's Hospital",
    logo: chopLogo,
  },
  {
    name: "Agha Khan University",
    logo: akuLogo,
  },
];

export const stories = [
  {
    partner: "Helix Labs",
    icon: "fas fa-building",
    iconCls: "",
    chip: "RAG Systems",
    title: "Enterprise search made 62% faster",
    text: "A retrieval-augmented system that answers questions across thousands of internal documents.",
    stat: "62%",
    statLabel: "Faster retrieval",
    href: "project.html?id=rag-knowledge-system",
  },
  {
    partner: "Open Learning",
    icon: "fas fa-graduation-cap",
    iconCls: "sp-green",
    chip: "EdTech AI",
    title: "Adaptive learning in 40 classrooms",
    text: "An AI assistant that personalises practice and reduces teacher preparation time.",
    stat: "+28%",
    statLabel: "Assessment scores",
    href: "project.html?id=edu-assistant",
  },
  {
    partner: "Northbridge",
    icon: "fas fa-university",
    iconCls: "sp-purple",
    chip: "LLM Research",
    title: "LLM training at a fraction of the cost",
    text: "Joint work on parameter-efficient methods, now used in both labs' pipelines.",
    stat: "-45%",
    statLabel: "Training cost",
    href: "#",
  },
];

/* ── Footer ── */
export const footer = {
  about:
    "Research in generative artificial intelligence. Connecting intelligent models with real-world problems across academia and industry worldwide.",
  social: [
    {
      label: "LinkedIn",
      icon: "fab fa-linkedin",
      href: "https://www.linkedin.com/company/generative-ai-research-lab/?viewAsMember=true",
    },
  ],
  navigation: [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#about" },
    { label: "Research", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Events", href: "#events" },
    { label: "Team", href: "#team" },
    { label: "Collaborators", href: "#collaborators" },
  ],
  areas: [
    "Generative AI",
    "Language Models",
    "Computer Vision",
    "NLP",
    "RAG Systems",
    "Intelligent Agents",
  ],
  contact: [
    {
      icon: "fas fa-envelope",
      text: "airl@kics.edu.pk",
      href: "mailto:airl@kics.edu.pk",
    },

    { icon: "fas fa-map-marker-alt", text: "Research Center" },
    { icon: "fas fa-clock", text: "Mon–Fri, 09:00AM–5:00PM" },
  ],
};
