import { ProjectCard, type Project } from './ProjectCard';

const DUMMY_IMAGE_1 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBHhQH9LT8SJAAFqrEqj1_yaYcUxUdcBZaCO-WabjNM22ebZqwvv0qXDt4LojyX_eBWblt0u7Is4IVOJK3W3wyfi-GeJWVK4QWv-Jq6NEHXmdJNw2URFgY1SBTtCOjjZbUa8T66UaVmrkIfbQlYGjOp2URb3FQLKDNj16zdgKjHcFuTMbo4FxpwAMmNsV3YklS3IvkicvMIg5SQnj1hYaXcQlXe3mrO4riLzlVXE9MgRubSGN1eQx5I6gGDctQ1BhzA1qPTQAKn-lc';
const DUMMY_IMAGE_2 =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDVX_Xh6NyQ-CfGE0JEyFTykT3WVgnE6Y7gtjUMxBz6LDDbAIyOQTT8fgUx2rJS72cdloTK0Xq9NOq-Z1lf8JDH4tCnK-alIvrLXunXo-PTH3Ii9sRT2RtN63QffOQ50H_RpsEE-1j_SC9Smb2m9esLdv8CKWgM_W96N5tlHAKrijQuUUa58A3-m0DnpsNPwOpdjb8rYTTpHBAUqZL1NHG2FYnASizuhagz2FQC2u08_nAjQ71KChsYDhITWYHrU5J4N3GhcxYgad0';

const projects: Project[] = [
  {
    title: 'Quick Toilet',
    date: '2025.3.14',
    subtitle: 'Webアプリ',
    description: 'ダミー説明文です。',
    image: DUMMY_IMAGE_1,
    demoUrl: 'https://quick-toilet.vercel.app/',
    githubUrl: 'https://github.com/koma104/quick-toilet',
    highlights: ['ダミー実装内容'],
    notes: 'ダミー工夫点です。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'ヘアサロンVDOサイト',
    date: '2025.2.1',
    subtitle: 'Webサイト',
    description: 'ダミー説明文です。',
    image: DUMMY_IMAGE_2,
    demoUrl: 'https://hairsalon-vdo-b.vercel.app/',
    githubUrl: 'https://github.com/koma104/hairsalon-vdo',
    highlights: ['ダミー実装内容'],
    notes: 'ダミー工夫点です。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'ユーザー管理アプリ',
    date: '2024.12.10',
    subtitle: 'Webアプリ',
    description: 'ダミー説明文です。',
    image: DUMMY_IMAGE_1,
    demoUrl: 'https://user-hub-app-eight.vercel.app/',
    githubUrl: 'https://github.com/koma104/UserHubApp',
    highlights: ['ダミー実装内容'],
    notes: 'ダミー工夫点です。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'A01',
    date: '2024.11.5',
    subtitle: 'Webアプリ',
    description: 'ダミー説明文です。',
    image: DUMMY_IMAGE_2,
    demoUrl: 'https://annnnnime01.vercel.app/',
    githubUrl: 'https://github.com/koma104/annnnnime01',
    highlights: ['ダミー実装内容'],
    notes: 'ダミー工夫点です。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'お問い合わせフォーム',
    date: '2024.10.20',
    subtitle: 'テンプレート',
    description: 'ダミー説明文です。',
    image: DUMMY_IMAGE_1,
    demoUrl: 'https://contact-form-template.vercel.app/',
    githubUrl: 'https://github.com/koma104/contact-form-template',
    highlights: ['ダミー実装内容'],
    notes: 'ダミー工夫点です。',
    tags: ['React', 'Next.js'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-[80px] mb-0 space-y-6 md:mb-40">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold">Projects</h2>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="space-y-24 md:space-y-40">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border-b border-gray-300 pb-6 last:border-b-0 md:border-b-0 md:pb-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
