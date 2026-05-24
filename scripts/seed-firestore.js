/* eslint-disable @typescript-eslint/no-require-imports */
const admin = require('firebase-admin');

// IMPORTANT: Set GOOGLE_APPLICATION_CREDENTIALS in your environment to run this script

try {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
} catch (error) {
  console.log("Initialization error:", error.message);
}

const db = admin.firestore();

const profileData = {
  name: "Nigam Prasad Sahoo",
  title: "Android Developer & Backend Engineer",
  email: "nigam.nps@gmail.com",
  phone: "+91 9861703761",
  location: "Odisha, India",
  summary: "Android Developer (Kotlin, Jetpack Compose, Clean Architecture) with two shipped production-grade apps featuring post-quantum cryptography and offline-first architecture. Seeking a remote Android internship to contribute to product teams building real-world mobile applications.",
  socials: {
    github: "github.com/AsyncNigam",
    linkedin: "linkedin.com/in/nigam-prasad-sahoo"
  }
};

const skills = [
  { category: "Android", items: ["Kotlin", "Jetpack Compose", "MVVM", "Clean Architecture", "Hilt DI", "Coroutines", "WorkManager", "Room", "Retrofit"] },
  { category: "Security", items: ["AES-256-GCM", "SQLCipher", "Android Keystore TEE", "post-quantum key exchange (ML-KEM-768 via C++ JNI)"] },
  { category: "Backend", items: ["Node.js", "TypeScript", "Express.js", "WebSockets", "REST APIs", "Redis", "Firebase", "Supabase"] },
  { category: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Prisma ORM"] },
  { category: "Tools", items: ["Git", "Android Studio", "Docker", "GitHub Actions (CI/CD)", "Linux"] }
];

const projects = [
  {
    title: "Quantum Safe Messenger",
    type: "Android & Backend",
    description: "Quantum-encrypted Android messenger with Stateless Zero-Knowledge Relay Infrastructure.",
    techStack: ["Kotlin", "Jetpack Compose", "C++ JNI", "Node.js", "TypeScript", "Redis", "WebSockets"],
    details: [
      "Built a 3-layer Clean Architecture with Hilt Dependency Injection.",
      "Implemented a PQXDH hybrid key-exchange engine running ~10x faster than a JVM equivalent.",
      "Architected a stateless zero-knowledge relay server route encrypted WebSocket frames without ever touching plaintext.",
      "Designed the Silent FCM Push architecture: the server sends a zero-payload notification ping."
    ],
    github: "github.com/AsyncNigam/Quantum-safe-messenger"
  },
  {
    title: "Flight Booking Management System",
    type: "Backend",
    description: "High-Concurrency Microservices Backend",
    techStack: ["Node.js", "TypeScript", "RabbitMQ", "BullMQ", "Redis", "PostgreSQL", "Prisma ORM", "Docker Compose"],
    details: [
      "Designed a 4-service Microservices architecture with RabbitMQ handling async inter-service communication.",
      "Built an API Gateway with custom request-throttling middleware and rate-limiting logic, sustaining 1,000+ RPS.",
      "Engineered an async Notification Engine using BullMQ + Redis job queues.",
      "Containerized all four services with Docker Compose."
    ]
  },
  {
    title: "Nexus - AI-powered Android productivity app",
    type: "Android",
    description: "AI-powered Android productivity app (notes, tasks, journaling, AI chat)",
    techStack: ["Kotlin", "Clean Architecture", "Data Binding", "Gemini 2.0 Flash", "Firebase", "Room DB"],
    details: [
      "Migrated 40+ XML screens to Jetpack Compose with Two-Way Data Binding.",
      "Integrated Gemini 2.0 Flash for context-aware summarization and scheduling.",
      "Wired multi-service Firebase: Firestore for notes/todos (sub-200 ms latency), Realtime DB for books, Storage for images.",
      "Shipped offline-first architecture with Room DB caching and WorkManager sync queuing."
    ],
    github: "github.com/AsyncNigam/Nexus"
  }
];

async function seedDatabase() {
  console.log("Seeding database...");
  
  // Seed Profile
  await db.collection("portfolio").doc("profile").set(profileData);
  console.log("Profile seeded.");

  // Seed Skills
  const skillsRef = db.collection("portfolio").doc("skills");
  await skillsRef.set({ categories: skills });
  console.log("Skills seeded.");

  // Seed Projects
  const projectsCol = db.collection("projects");
  for (const project of projects) {
    const docRef = projectsCol.doc(project.title.toLowerCase().replace(/\s+/g, '-'));
    await docRef.set(project);
    console.log(`Seeded project: ${project.title}`);
  }

  console.log("Database seeded successfully!");
}

seedDatabase().catch(console.error);
