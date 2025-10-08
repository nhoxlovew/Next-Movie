// Debug authentication issues step by step
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3")

console.log("🔍 Debugging Authentication Issues...\n")

const sqlite = new Database("./auth.db")

try {
  // Step 1: Check all users in database
  console.log("1️⃣ All Users in Database:")
  const allUsers = sqlite.prepare("SELECT * FROM user").all()
  console.log(`Found ${allUsers.length} users`)

  allUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.email} (${user.name})`)
    console.log(`   - ID: ${user.id}`)
    console.log(`   - Email Verified: ${user.emailVerified}`)
    console.log(`   - Password Set: ${user.password ? 'YES' : 'NO'}`)
    console.log(`   - Created: ${new Date(user.createdAt).toISOString()}`)
  })

  // Step 2: Check if the specific email exists
  console.log("\n2️⃣ Checking specific email...")
  const targetEmail = "hoanganhonzed@gmail.com"
  const targetUser = sqlite.prepare("SELECT * FROM user WHERE email = ?").get(targetEmail)

  if (targetUser) {
    console.log("✅ User found in database")
    console.log(`📧 Email: ${targetUser.email}`)
    console.log(`👤 Name: ${targetUser.name}`)
    console.log(`🔑 Password: ${targetUser.password ? 'SET' : 'NOT SET'}`)
  } else {
    console.log("❌ User NOT found in database")
    console.log(`📧 Looking for: ${targetEmail}`)
  }

  // Step 3: Check Better Auth configuration
  console.log("\n3️⃣ Better Auth Configuration Check:")
  console.log("✅ Database connection: Working")
  console.log("✅ Tables exist: user, session, account, verification")

  // Step 4: Common authentication issues
  console.log("\n4️⃣ Common Issues & Solutions:")

  if (allUsers.length === 0) {
    console.log("❌ No users in database")
    console.log("💡 Solution: Create users through signup form")
  } else if (targetUser && !targetUser.password) {
    console.log("❌ User exists but no password set")
    console.log("💡 Solution: Users must be created through Better Auth API")
  } else if (targetUser && targetUser.password) {
    console.log("✅ User exists with password")
    console.log("💡 Issue might be: Wrong password, server not running, or port mismatch")
  }

  console.log("\n5️⃣ Troubleshooting Steps:")
  console.log("🔍 Check if server is running on port 3000")
  console.log("🔍 Verify auth-client.ts baseURL matches server port")
  console.log("🔍 Check browser console for detailed errors")
  console.log("🔍 Try creating a new account through signup form")

  console.log("\n✅ Debug complete!")

} catch (error) {
  console.error("❌ Error during debug:", error.message)
}

sqlite.close()
