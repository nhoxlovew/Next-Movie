// eslint-disable-next-line @typescript-eslint/no-require-imports
const Database = require("better-sqlite3")

// Check database contents
const sqlite = new Database("./auth.db")

console.log("🔍 Checking Database Contents...\n")

try {
  // Check all tables
  const tables = sqlite.pragma("table_list")
  console.log("📊 Available Tables:")
  tables.forEach(table => {
    console.log(`  - ${table.name}`)
  })

  console.log("\n👥 Users:")
  const users = sqlite.prepare("SELECT * FROM user").all()
  if (users.length === 0) {
    console.log("  (No users found)")
  } else {
    users.forEach(user => {
      console.log(`  - ID: ${user.id}`)
      console.log(`    Email: ${user.email}`)
      console.log(`    Name: ${user.name}`)
      console.log(`    Created: ${new Date(user.createdAt).toISOString()}`)
      console.log("")
    })
  }

  console.log("🔑 Sessions:")
  const sessions = sqlite.prepare("SELECT * FROM session").all()
  if (sessions.length === 0) {
    console.log("  (No sessions found)")
  } else {
    sessions.forEach(session => {
      console.log(`  - ID: ${session.id}`)
      console.log(`    User ID: ${session.userId}`)
      console.log(`    Expires: ${new Date(session.expiresAt).toISOString()}`)
      console.log("")
    })
  }

  console.log("🔐 Accounts (OAuth):")
  const accounts = sqlite.prepare("SELECT * FROM account").all()
  if (accounts.length === 0) {
    console.log("  (No OAuth accounts found)")
  } else {
    accounts.forEach(account => {
      console.log(`  - Provider: ${account.providerId}`)
      console.log(`    Account ID: ${account.accountId}`)
      console.log(`    User ID: ${account.userId}`)
      console.log("")
    })
  }

  console.log("✅ Database check complete!")

} catch (error) {
  console.error("❌ Error checking database:", error.message)
}

sqlite.close()
