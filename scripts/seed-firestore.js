/* eslint-disable @typescript-eslint/no-require-imports */
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize with Application Default Credentials
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

const db = admin.firestore();
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'portfolio.json'), 'utf-8'));

async function seed() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   Seeding Firestore — 6 Project Schema   ║');
  console.log('╚══════════════════════════════════════════╝\n');

  // Profile
  await db.collection('portfolio').doc('profile').set(data.profile);
  console.log('✓ Profile — Nigam Prasad Sahoo');

  // Skills (4 categories)
  await db.collection('portfolio').doc('skills').set({ categories: data.skills });
  console.log(`✓ Skills — ${data.skills.length} categories`);

  // Projects (6 individual docs)
  for (const project of data.projects) {
    await db.collection('projects').doc(project.id).set(project);
    console.log(`✓ Project: ${project.title} [${project.type}]`);
  }

  // Experience
  await db.collection('portfolio').doc('experience').set({ items: data.experience });
  console.log(`✓ Experience — ${data.experience.length} entries`);

  console.log('\n✅ Seeding complete! All 6 projects + profile data pushed to Firestore.');
}

seed().catch(console.error);
