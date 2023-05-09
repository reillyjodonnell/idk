const { User: UserType, Post: PostType } =
  require('@prisma/client').PrismaClient;
const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

const tags = [
  'javascript',
  'react',
  'typescript',
  'node',
  'next',
  'tailwind',
  'css',
  'apollo',
];

const users = [
  {
    name: 'John Smith',
    username: 'john',
    email: 'john@example.com',
    password: 'password1',
  },
  {
    name: 'Jane Doe',
    username: 'jane',
    email: 'jane@example.com',
    password: 'password2',
  },
  {
    name: 'Bob Johnson',
    username: 'bob',
    email: 'bob@example.com',
    password: 'password3',
  },
  {
    name: 'Alice Lee',
    username: 'alice',
    email: 'alice@example.com',
    password: 'password4',
  },
  {
    name: 'Sam Williams',
    username: 'sam',
    email: 'sam@example.com',
    password: 'password5',
  },
];

async function createTags() {
  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
  }
}

async function createUserWithPosts(user: UserCreateInput) {
  const createdUser = await prisma.user.create({ data: user });

  for (let i = 0; i < 6; i++) {
    await createPostWithComments(createdUser);
  }

  return createdUser;
}

async function createPostWithComments(author: typeof UserType) {
  const tag = tags[Math.floor(Math.random() * tags.length)];
  const title = `How do I use ${tag} to ${getRandomTask()}?`;
  const body = `I'm trying to ${getRandomTask()} using ${tag}, but I'm running into some issues. Can anyone help me figure out what's wrong?`;

  const createdPost = await prisma.post.create({
    data: {
      title,
      body,
      author: { connect: { id: author.id } },
      tags: { connect: { name: tag } },
      thumbsUp: Math.floor(Math.random() * 10),
      thumbsDown: Math.floor(Math.random() * 5),
      fire: Math.floor(Math.random() * 5),
      eyes: Math.floor(Math.random() * 5),
    },
  });

  const commentCount = Math.floor(Math.random() * 5);
  for (let j = 0; j < commentCount; j++) {
    await createComment(createdPost);
  }
}

async function createComment(post: typeof PostType) {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const createdUser = await prisma.user.findUnique({
    where: { email: randomUser.email },
  });

  if (createdUser) {
    return await prisma.comment.create({
      data: {
        body: getRandomComment(),
        author: { connect: { id: createdUser.id } },
        post: { connect: { id: post.id } },
        thumbsUp: Math.floor(Math.random() * 5),
        thumbsDown: Math.floor(Math.random() * 2),
        fire: Math.floor(Math.random() * 2),
        eyes: Math.floor(Math.random() * 2),
      },
    });
  }
}

type UserCreateInput = {
  name: string;
  username: string;
  email: string;
  password: string;
};

async function main() {
  // Create tags
  await createTags();

  // Create users with posts and comments
  for (const user of users) {
    await createUserWithPosts(user);
  }
}

function getRandomTask() {
  const tasks = ['build', 'implement', 'optimize', 'debug', 'refactor', 'test'];
  return tasks[Math.floor(Math.random() * tasks.length)];
}

function getRandomComment() {
  const comments = [
    'Thanks for the helpful post!',
    'This solved my problem, thanks!',
    "I'm having the same issue, did you figure it out?",
    "I tried your solution but it didn't work. Any other ideas?",
    'I think I found a bug in your code. Have you tried...',
    "This is really helpful! I've been struggling with this for days.",
    "I don't understand what you mean by...",
    'You should check out this library that could help with your problem.',
    'I had the same issue and solved it by...',
    "I'm not sure if this will help, but have you tried...",
  ];
  return comments[Math.floor(Math.random() * comments.length)];
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
