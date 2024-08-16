import {Prisma, PrismaClient} from '@prisma/client';
import QueryEvent = Prisma.QueryEvent;

let prisma: PrismaClient;
declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient({
      log: ['query'],
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.__db.$on<QueryEvent>('query', (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Query: ' + e.query);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Params: ' + e.params);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.log('Duration: ' + e.duration + 'ms');
    });

    global.__db.$connect();
  }
  prisma = global.__db;
}

export {prisma};
