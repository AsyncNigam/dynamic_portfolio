/* eslint-disable @typescript-eslint/no-require-imports */
const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize with ADC
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.applicationDefault() });
}

const db = admin.firestore();
const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'portfolio.json'), 'utf-8'));

async function seed() {
  console.log('Seeding Firestore...');
  
  // Profile
  await db.collection('portfolio').doc('profile').set(data.profile);
  console.log('✓ Profile');
  
  // Skills  
  await db.collection('portfolio').doc('skills').set({ categories: data.skills });
  console.log('✓ Skills');
  
  // Projects
  for (const project of data.projects) {
    await db.collection('projects').doc(project.id).set(project);
    console.log(`✓ Project: ${project.title}`);
  }
  
  // Experience
  await db.collection('portfolio').doc('experience').set({ items: data.experience });
  console.log('✓ Experience');
  
  console.log('\n✅ Seeding complete!');
}

seed().catch(console.error);
