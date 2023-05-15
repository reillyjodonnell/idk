const { User: UserType, Post: PostType } =
  require('@prisma/client').PrismaClient;
const Prisma = require('@prisma/client');
const prisma = new Prisma.PrismaClient();

const tags = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },

  { label: 'Angular', value: 'Angular' },
  { label: 'Node', value: 'Node' },
  { label: 'Java', value: 'Java' },
  { label: 'Spring', value: 'Spring' },
  { label: 'Python', value: 'Python' },
  { label: 'Django', value: 'Django' },
  { label: 'Flask', value: 'Flask' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'Symfony', value: 'Symfony' },
  { label: 'Ruby', value: 'Ruby' },
  { label: 'Rails', value: 'Rails' },
  { label: 'C#', value: 'C#' },
  { label: '.NET', value: '.NET' },
  { label: 'ASP.NET', value: 'ASP.NET' },
  { label: 'Swift', value: 'Swift' },
  { label: 'Qwik', value: 'Qwik' },
  { label: 'iOS', value: 'iOS' },
  { label: 'Android', value: 'Android' },
  { label: 'Kotlin', value: 'Kotlin' },
  { label: 'Go', value: 'Go' },
  { label: 'Rust', value: 'Rust' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Express', value: 'Express' },
  { label: 'Next', value: 'Next' },
  { label: 'Remix', value: 'Remix' },
  { label: 'Svelte', value: 'Svelte' },
  { label: 'Nuxt', value: 'Nuxt' },
  { label: 'Vue', value: 'Vue' },
  { label: 'Gatsby', value: 'Gatsby' },
  { label: 'Nest', value: 'Nest' },
  { label: 'React Native', value: 'React Native' },
  { label: 'Flutter', value: 'Flutter' },
  { label: 'Vue Native', value: 'Vue Native' },
  { label: 'Ionic', value: 'Ionic' },
  { label: 'Electron', value: 'Electron' },
  { label: 'jQuery', value: 'jQuery' },
  { label: 'Bootstrap', value: 'Bootstrap' },
  { label: 'Tailwind CSS', value: 'Tailwind CSS' },
  { label: 'Sass', value: 'Sass' },
  { label: 'Less', value: 'Less' },
  { label: 'PostgreSQL', value: 'PostgreSQL' },
  { label: 'MySQL', value: 'MySQL' },
  { label: 'MongoDB', value: 'MongoDB' },
  { label: 'Redis', value: 'Redis' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'Apollo', value: 'Apollo' },
  { label: 'REST API', value: 'REST API' },
  { label: 'WebSocket', value: 'WebSocket' },
  { label: 'Docker', value: 'Docker' },
  { label: 'Kubernetes', value: 'Kubernetes' },
  { label: 'CSS', value: 'CSS' },
  { label: 'Tailwind', value: 'Tailwind' },
  { label: 'HTML', value: 'HTML' },
  { label: 'Apollo', value: 'Apollo' },
  { label: 'Redux', value: 'Redux' },
  { label: 'Vue Router', value: 'Vue Router' },
  { label: 'Vuex', value: 'Vuex' },
  { label: 'Jest', value: 'Jest' },
  { label: 'Cypress', value: 'Cypress' },
  { label: 'Storybook', value: 'Storybook' },
  { label: 'Webpack', value: 'Webpack' },
  { label: 'Babel', value: 'Babel' },
  { label: 'Axios', value: 'Axios' },
  { label: 'Firebase', value: 'Firebase' },
  { label: 'AWS', value: 'AWS' },
  { label: 'Netlify', value: 'Netlify' },
  { label: 'Vercel', value: 'Vercel' },
  { label: 'Heroku', value: 'Heroku' },
  { label: 'DigitalOcean', value: 'DigitalOcean' },
  { label: 'Google Cloud', value: 'Google Cloud' },
  { label: 'Azure', value: 'Azure' },
  { label: 'Git', value: 'Git' },
  { label: 'GitHub', value: 'GitHub' },
  { label: 'Bun', value: 'Bun' },
  { label: 'Deno', value: 'Deno' },
  { label: 'SvelteKit', value: 'SvelteKit' },
  { label: 'Rollup', value: 'Rollup' },
  { label: 'Snowpack', value: 'Snowpack' },
  { label: 'Vite', value: 'Vite' },
  { label: 'ESLint', value: 'ESLint' },
  { label: 'Prettier', value: 'Prettier' },
  { label: 'Parcel', value: 'Parcel' },
];

function getRandomWord(): string {
  const words = [
    'javascript',
    'react',
    'angular',
    'vue',
    'nodejs',
    'java',
    'python',
    'django',
    'flask',
    'php',
    'laravel',
    'ruby',
    'rails',
    'csharp',
    'dotnet',
    'swift',
    'ios',
    'android',
    'kotlin',
    'go',
    'rust',
    'typescript',
    'express',
    'nextjs',
    'gatsby',
    'nestjs',
    'graphql',
    'docker',
    'kubernetes',
    'html',
    'css',
    'sass',
    'bootstrap',
    'mongodb',
    'mysql',
    'postgresql',
    'redis',
    'git',
    'github',
    'vscode',
    'webpack',
    'npm',
    'yarn',
    'jest',
    'eslint',
    'typescript',
    'redux',
    'mobx',
    'storybook',
    'aws',
  ];

  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

const sentenceVariations = [
  ['How do I use', 'to', 'with', 'in', 'for'],
  ['What is the best way to', 'using', 'implement', 'optimize', 'debug'],
  ['I need help with', 'and', 'on', 'understanding', 'working'],
  ['Can someone explain', 'to me', 'how to', 'about', 'regarding'],
  ['Any tips on', 'for', 'working with', 'getting started with', 'solving'],
  // ... add more variations as needed
  [
    'Where can I find',
    'to learn',
    'examples of',
    'tutorials for',
    'resources on',
  ],
  ['Is there a way to', 'besides', 'other than', 'instead of', 'without'],
  [
    'I want to know',
    'about',
    'more about',
    'the basics of',
    'advanced techniques for',
  ],
  [
    'Help needed for',
    'related to',
    'concerning',
    'dealing with',
    'troubleshooting',
  ],
  [
    'Looking for advice on',
    'regarding',
    'seeking help with',
    'suggestions for',
    'recommendations on',
  ],
  [
    'Tips and tricks for',
    'using',
    'working with',
    'mastering',
    'getting the most out of',
  ],
  [
    'What are the alternatives to',
    'instead of',
    'other options for',
    'comparing',
    'vs',
  ],
  [
    'Issues with',
    'problems in',
    'errors when',
    'troubles while',
    'challenges with',
  ],
  [
    'Exploring',
    'deep dive into',
    'understanding the',
    'uncovering',
    'examining',
  ],
  ['Best practices for', 'in', 'when using', 'to improve', 'to enhance'],
  [
    'Quick guide to',
    'step-by-step tutorial for',
    "beginner's guide to",
    'overview of',
    'getting started with',
  ],
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
  {
    name: 'Emily Davis',
    username: 'emily',
    email: 'emily@example.com',
    password: 'password6',
  },
  {
    name: 'Michael Johnson',
    username: 'michael',
    email: 'michael@example.com',
    password: 'password7',
  },
  {
    name: 'Sarah Wilson',
    username: 'sarah',
    email: 'sarah@example.com',
    password: 'password8',
  },
  {
    name: 'Daniel Thompson',
    username: 'daniel',
    email: 'daniel@example.com',
    password: 'password9',
  },
  {
    name: 'Olivia Anderson',
    username: 'olivia',
    email: 'olivia@example.com',
    password: 'password10',
  },
  {
    name: 'James Rodriguez',
    username: 'james',
    email: 'james@example.com',
    password: 'password11',
  },
  {
    name: 'Sophia Martinez',
    username: 'sophia',
    email: 'sophia@example.com',
    password: 'password12',
  },
  {
    name: 'Matthew Taylor',
    username: 'matthew',
    email: 'matthew@example.com',
    password: 'password13',
  },
  {
    name: 'Ava Brown',
    username: 'ava',
    email: 'ava@example.com',
    password: 'password14',
  },
  {
    name: 'William Clark',
    username: 'william',
    email: 'william@example.com',
    password: 'password15',
  },
  {
    name: 'Isabella Scott',
    username: 'isabella',
    email: 'isabella@example.com',
    password: 'password16',
  },
  {
    name: 'David Walker',
    username: 'david',
    email: 'david@example.com',
    password: 'password17',
  },
  {
    name: 'Mia Lewis',
    username: 'mia',
    email: 'mia@example.com',
    password: 'password18',
  },
  {
    name: 'Alexander Mitchell',
    username: 'alexander',
    email: 'alexander@example.com',
    password: 'password19',
  },
  {
    name: 'Charlotte Young',
    username: 'charlotte',
    email: 'charlotte@example.com',
    password: 'password20',
  },
];
const titleVariations = [
  ['How do I use', 'to', 'with', 'in', 'for'],
  ['What is the best way to', 'using', 'implement', 'optimize', 'debug'],
  ['I need help with', 'and', 'on', 'understanding', 'working'],
  ['Can someone explain', 'to me', 'how to', 'about', 'regarding'],
  ['Any tips on', 'for', 'working with', 'getting started with', 'solving'],
  [
    'Where can I find',
    'to learn',
    'examples of',
    'tutorials for',
    'resources on',
  ],
  ['Is there a way to', 'besides', 'other than', 'instead of', 'without'],
  [
    'I want to know',
    'about',
    'more about',
    'the basics of',
    'advanced techniques for',
  ],
  [
    'Help needed for',
    'related to',
    'concerning',
    'dealing with',
    'troubleshooting',
  ],
  [
    'Looking for advice on',
    'regarding',
    'seeking help with',
    'suggestions for',
    'recommendations on',
  ],
  [
    'Tips and tricks for',
    'using',
    'working with',
    'mastering',
    'getting the most out of',
  ],
  [
    'What are the alternatives to',
    'instead of',
    'other options for',
    'comparing',
    'vs',
  ],
  [
    'Issues with',
    'problems in',
    'errors when',
    'troubles while',
    'challenges with',
  ],
  [
    'Exploring',
    'deep dive into',
    'understanding the',
    'uncovering',
    'examining',
  ],
  ['Best practices for', 'in', 'when using', 'to improve', 'to enhance'],
  [
    'Quick guide to',
    'step-by-step tutorial for',
    "beginner's guide to",
    'overview of',
    'getting started with',
  ],
  // Add more variations as needed
];

const bodyVariations = [
  'I need help with something related to [TAG]. Can someone assist?',
  'Has anyone encountered issues when working with [TAG]? I could use some guidance.',
  'Looking for tips and best practices for using [TAG]. Any recommendations?',
  'I want to learn more about [TAG]. Where can I find resources?',
  'Experiencing challenges while using [TAG]. Any solutions or troubleshooting advice?',
  'Any suggestions on how to effectively utilize [TAG]?',
  'Seeking advice from experienced developers on [TAG].',
  'Need assistance with integrating [TAG] into my project.',
  'Curious about the advantages of using [TAG] over other frameworks.',
  'Struggling with [TAG]. Any tutorials or examples available?',
  'Exploring the possibilities of [TAG].',
  'Looking for alternatives to [TAG]. Open to suggestions!',
  'Encountered errors when implementing [TAG]. How can I resolve them?',
  'Sharing my experience with [TAG] and its benefits.',
  'In need of guidance on the syntax and usage of [TAG].',
  'Discussing the latest updates and features of [TAG].',
  'Looking for a comprehensive guide on [TAG].',
  'Sharing my thoughts on the performance of [TAG].',
  'Exploring real-world applications of [TAG].',
  'Any recommendations for optimizing [TAG] performance?',
  // Add more preset sentences as needed
];
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

async function seedTags() {
  try {
    for (const option of tags) {
      const { label, value } = option;
      const existingTag = await prisma.tag.findUnique({
        where: { name: value },
      });
      if (!existingTag) {
        await prisma.tag.create({ data: { name: value } });
        console.log(`Tag "${value}" created.`);
      } else {
        console.log(`Tag "${value}" already exists.`);
      }
    }
    console.log('Tag seeding completed.');
  } catch (error) {
    console.error('Error seeding tags:', error);
  } finally {
    await prisma.$disconnect();
  }
}

type UserCreateInput = {
  name: string;
  username: string;
  email: string;
  password: string;
};

function getRandomTask() {
  const tasks = ['build', 'implement', 'optimize', 'debug', 'refactor', 'test'];
  return tasks[Math.floor(Math.random() * tasks.length)];
}

function getRandomEmoji() {
  const emojis = ['thumbsUp', 'thumbsDown', 'fire', 'eyes'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

async function createReaction(comment: any, user: any) {
  await prisma.reaction.create({
    data: {
      emoji: getRandomEmoji(),
      author: { connect: { id: user.id } },
      comment: { connect: { id: comment.id } },
    },
  });
}

async function main() {
  // Create tags
  await seedTags();

  // Create users with posts and comments
  for (const user of users) {
    await createUserWithPosts(user);
  }
}
main();

async function createUserWithPosts(user: any) {
  const createdUser = await prisma.user.create({ data: user });

  // Create posts and comments
  for (let i = 0; i < 6; i++) {
    const createdPost = await createPostWithComments(createdUser);
    await createCommentsForPost(createdPost);
  }
}

async function createPostWithComments(author: any) {
  const tag = tags[Math.floor(Math.random() * tags.length)].value;
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

  return createdPost;
}

async function createCommentsForPost(post: any) {
  const commentCount = Math.floor(Math.random() * 5);
  for (let j = 0; j < commentCount; j++) {
    await createComment(post);
  }
}

async function createComment(post: any) {
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const createdUser = await prisma.user.findUnique({
    where: { email: randomUser.email },
  });

  if (createdUser) {
    const createdComment = await prisma.comment.create({
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
    await createReaction(createdComment, createdUser);
  }
}
