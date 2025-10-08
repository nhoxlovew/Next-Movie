// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3")

// Create a test user in the database
const sqlite = new Database("./auth.db")

console.log("👤 Creating test user...")

try {
  // Insert a test user directly into the database
  const testUser = {
    id: "user-" + Date.now(),
    name: "Hoàng Anh",
    email: "hoanganhonzed@gmail.com",
    emailVerified: 0,
    image: null,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }

  const insertStmt = sqlite.prepare(`
    INSERT INTO user (id, name, email, emailVerified, image, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const result = insertStmt.run(
    testUser.id,
    testUser.name,
    testUser.email,
    testUser.emailVerified,
    testUser.image,
    testUser.createdAt,
    testUser.updatedAt
  )

  console.log("✅ Test user created successfully!")
  console.log("📧 Email: hoanganhonzed@gmail.com")
  console.log("👤 Name: Hoàng Anh")
  console.log("🆔 User ID:", testUser.id)

  // Verify the user was created
  const users = sqlite.prepare("SELECT * FROM user WHERE email = ?").all("hoanganhonzed@gmail.com")
  console.log("\n🔍 Verification - Users found:", users.length)
  users.forEach(user => {
    console.log("  - ID:", user.id)
    console.log("  - Email:", user.email)
    console.log("  - Name:", user.name)
  })

} catch (error) {
  console.error("❌ Error creating user:", error.message)
}

sqlite.close()
