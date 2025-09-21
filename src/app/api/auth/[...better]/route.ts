// import { BetterAuthHandler } from "better-auth";
// import { users } from "@/lib/users"; // Replace with your user DB

// export const { GET, POST } = BetterAuthHandler({
//   providers: [
//     {
//       type: "credentials",
//       authorize: async (credentials) => {
//         // Replace with your user lookup logic
//         const user = users.find(
//           (u) => u.email === credentials.email && u.password === credentials.password
//         );
//         if (user) return { id: user.id, email: user.email, name: user.name };
//         return null;
//       },
//     },
//   ],
// });