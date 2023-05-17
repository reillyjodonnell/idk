const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

// have to give unique names bc of obscure ts error where it thinks this is the same file as seed.ts

const tagsProd = [
  { label: 'JavaScript', value: 'JavaScript' },
  { label: 'React', value: 'React' },
  { label: 'Angular', value: 'Angular' },
  { label: 'Node', value: 'Node' },
  { label: 'Prisma', value: 'Prisma' },
  { label: 'Java', value: 'Java' },
  { label: 'Spring', value: 'Spring' },
  { label: 'Python', value: 'Python' },
  { label: 'Django', value: 'Django' },
  { label: 'Flask', value: 'Flask' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Laravel', value: 'Laravel' },
  { label: 'Symfony', value: 'Symfony' },
  { label: 'R', value: 'R' },
  { label: 'Ruby', value: 'Ruby' },
  { label: 'Yaml', value: 'Yaml' },
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
  { label: 'Bash', value: 'Bash' },
  { label: 'Shell', value: 'Shell' },
  { label: 'Less', value: 'Less' },
  { label: 'SCSS', value: 'SCSS' },
  { label: 'WASM', value: 'WASM' },
  { label: 'SQL', value: 'SQL' },
  { label: 'Arduino', value: 'Arduino' },
  { label: 'Perl', value: 'Perl' },
  { label: 'XML', value: 'XML' },
];

async function seedTagsProd() {
  try {
    for (const option of tagsProd) {
      const { label, value } = option;
      const existingTag = await db.tag.findUnique({
        where: { name: value },
      });
      if (!existingTag) {
        await db.tag.create({ data: { name: value } });
        console.log(`Tag "${value}" created.`);
      } else {
        console.log(`Tag "${value}" already exists.`);
      }
    }
    console.log('Tag seeding completed.');
  } catch (error) {
    console.error('Error seeding tags:', error);
  } finally {
    await db.$disconnect();
  }
}

async function mainProd() {
  // Create tags
  await seedTagsProd();
}
mainProd();
