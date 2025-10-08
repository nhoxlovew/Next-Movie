// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3")

// Clean up database - remove users without passwords
const sqlite = new Database("./auth.db")

console.log("🧹 Cleaning up database...")

try {
  // Delete users without passwords (Better Auth doesn't store password in user table)
  const deleteResult = sqlite.prepare("DELETE FROM user WHERE emailVerified = 0").run()
  console.log(`✅ Deleted ${deleteResult.changes} users without passwords`)

  // Show remaining users
  const remainingUsers = sqlite.prepare("SELECT * FROM user").all()
  console.log(`📊 Remaining users: ${remainingUsers.length}`)

  remainingUsers.forEach((user, index) => {
    console.log(`${index + 1}. ${user.email} (${user.name})`)
    console.log(`   - Password: ${user.password ? 'SET' : 'NOT SET'}`)
  })

  console.log("\n✅ Database cleanup complete!")

} catch (error) {
  console.error("❌ Error during cleanup:", error.message)
}

sqlite.close()
