// backend/prisma/seed.js

// imports
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const { PrismaClient } = require("../generated/prisma");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seed() {
  // generate and hash random password for guest account
  const randomPassword = crypto.randomBytes(32).toString("hex");
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  // then create guest user
  const guestUser = await prisma.user.findFirst({
    where: { usernameNormalized: "guest" },
  });

  if (!guestUser) {
    await prisma.user.create({
      data: {
        username: "Guest",
        usernameNormalized: "guest",
        email: "madeupguestemail@email.com",
        password: hashedPassword,
        displayName: "Guest Account",
        bio: "This is a demo account for guest use, which cannot be edited. Please note that anyone is able to access this demo account.",
      },
    });
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
