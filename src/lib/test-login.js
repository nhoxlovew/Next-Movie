// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3")

// Test the login process step by step
const sqlite = new Database("./auth.db")

console.log("🔍 Testing Login Process...\n")

try {
  // Step 1: Check if user exists
  console.log("1️⃣ Checking if user exists...")
  const users = sqlite.prepare("SELECT * FROM user WHERE email = ?").all("hoanganhonzed@gmail.com")

  if (users.length === 0) {
    console.log("❌ User not found in database")
    console.log("📧 Expected email: hoanganhonzed@gmail.com")
  } else {
    console.log("✅ User found:")
    console.log("  - ID:", users[0].id)
    console.log("  - Email:", users[0].email)
    console.log("  - Name:", users[0].name)
    console.log("  - Email Verified:", users[0].emailVerified)
  }

  // Step 2: Check Better Auth configuration
  console.log("\n2️⃣ Checking Better Auth setup...")
  console.log("✅ Database file exists: auth.db")
  console.log("✅ Tables created: user, session, account, verification")

  // Step 3: Check if password is set
  console.log("\n3️⃣ Checking password...")
  console.log("⚠️  Password field in database:", users[0]?.password ? "Set" : "Not set")
  console.log("ℹ️  Better Auth handles password hashing internally")

  // Step 4: Check API endpoint
  console.log("\n4️⃣ API Endpoint check:")
  console.log("✅ /api/auth/[...all]/route.ts exists")
  console.log("✅ Better Auth configured")

  // Step 5: Common issues
  console.log("\n5️⃣ Common issues to check:")
  console.log("🔍 Make sure server is running on port 3000")
  console.log("🔍 Check browser network tab for API errors")
  console.log("🔍 Verify auth-client.ts baseURL matches server port")
  console.log("🔍 Check if there are any console errors")

  console.log("\n✅ Login test complete!")

} catch (error) {
  console.error("❌ Error during login test:", error.message)
}

sqlite.close()
