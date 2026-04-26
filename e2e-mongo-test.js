/**
 * End-to-end MongoDB integration test.
 * Sends a real contact submission and verifies it was saved in the DB.
 * Run: node e2e-mongo-test.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const http     = require('http');
const Contact  = require('./models/Contact');

async function main() {
  console.log('\n══════════════════════════════════════════');
  console.log('  MongoDB Integration — E2E Test');
  console.log('══════════════════════════════════════════\n');

  // Connect directly to DB
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'portfolio' });
  console.log('✅ Direct DB connection established.\n');

  // Count documents before
  const before = await Contact.countDocuments();
  console.log(`📊 Documents in 'contacts' before submission: ${before}`);

  // Fire a submission at the running server
  const payload = JSON.stringify({
    name:    'E2E Test User',
    email:   'aggarwalagrim72@gmail.com',
    message: 'This is an automated end-to-end MongoDB integration test submission.',
  });

  const response = await new Promise((resolve, reject) => {
    const req = http.request('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) },
    }, (res) => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });

  console.log(`\n📨 API Response: ${response.status}`);
  console.log(`   success:   ${response.body.success}`);
  console.log(`   message:   ${response.body.message}`);
  console.log(`   requestId: ${response.body.requestId}`);

  // Small delay to ensure async DB write completes
  await new Promise(r => setTimeout(r, 1000));

  // Count documents after
  const after = await Contact.countDocuments();
  console.log(`\n📊 Documents in 'contacts' after submission: ${after}`);

  // Fetch the actual saved document
  const saved = await Contact.findOne({ requestId: response.body.requestId });
  if (saved) {
    console.log('\n✅ Document found in MongoDB:');
    console.log(`   _id:       ${saved._id}`);
    console.log(`   name:      ${saved.name}`);
    console.log(`   email:     ${saved.email}`);
    console.log(`   emailSent: ${saved.emailSent}`);
    console.log(`   createdAt: ${saved.createdAt}`);
  } else {
    console.log('\n❌ Document NOT found in MongoDB — check for errors.');
    process.exitCode = 1;
  }

  const newDocs = after - before;
  console.log(`\n${newDocs === 1 ? '✅' : '❌'} ${newDocs} new document written (expected 1)`);

  console.log('\n══════════════════════════════════════════\n');
  await mongoose.disconnect();
}

main().catch(err => {
  console.error('E2E test error:', err.message);
  process.exit(1);
});
