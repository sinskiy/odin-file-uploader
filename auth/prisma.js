const { PrismaClient } = require("@prisma/client");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { MINUTE } = require("../helpers");

const prisma = new PrismaClient();
const prismaStore = new PrismaSessionStore(prisma, {
  checkPeriod: MINUTE * 2,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
});

module.exports = { prisma, prismaStore };
