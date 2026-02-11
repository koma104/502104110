import { ProjectCard, type Project } from './ProjectCard';

const projects: Project[] = [
  {
    title: 'Quick Toilet',
    date: '2026.2.11',
    subtitle: 'Webアプリ',
    description: '現在地から最寄りのトイレを素早く検索できるナビアプリ',
    role: 'UI設計から位置情報取得・地図連携まで実装',
    image: '/images/thumb_qt.webp',
    demoUrl: 'https://quick-toilet.vercel.app/',
    githubUrl: 'https://github.com/koma104/quick-toilet',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Google Maps APIs', 'Leaflet', 'Affinity'],
    focus: '緊急時に最速でトイレにたどり着けるよう、操作数を最小化した設計を意識しました。起動直後に候補を表示し、迷わない導線構成にしています。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'A01',
    date: '2026.2.1',
    subtitle: 'Webサイト',
    description: 'p5.jsを用いたビジュアル表現とアニメーションの実験サイト',
    role: 'アニメーション設計と実装検証を中心に構築',
    image: '/images/thumb_a01.webp',
    demoUrl: 'https://annnnnime01.vercel.app/',
    githubUrl: 'https://github.com/koma104/annnnnime01',
    skills: ['React', 'TypeScript', 'Vite', 'React Router v6', 'Tailwind CSS', 'p5.js'],
    focus: 'p5.jsによる描画表現の理解を目的に制作しました。AI支援ツールも活用しながらコードを検証・調整し、動作原理の理解を深めています。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'ユーザー管理アプリ',
    date: '2026.1.30',
    subtitle: 'Webアプリ',
    description: 'ユーザー情報の一覧表示・編集・保存ができるユーザー管理アプリ',
    role: 'UI設計からCRUD機能の実装まで構築',
    image: '/images/thumb_userhubapp.webp',
    demoUrl: 'https://user-hub-app-eight.vercel.app/',
    githubUrl: 'https://github.com/koma104/UserHubApp',
    skills: ['React', 'TypeScript', 'Vite', 'React Router v6', 'Tailwind CSS', 'LocalStorage', 'JSONPlaceholder API'],
    focus: 'フォーム編集操作のわかりやすさを意識し、状態管理とバリデーションを整理しました。ローカルストレージ保存で更新内容を保持できるようにしています。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'お問い合わせフォーム',
    date: '2026.1.26',
    subtitle: 'テンプレート',
    description: 'JavaScriptで実装したバリデーション付きお問い合わせフォームのテンプレート',
    role: 'フォームUI設計からバリデーション実装まで構築',
    image: '/images/thumb_form.webp',
    demoUrl: 'https://contact-form-template.vercel.app/',
    githubUrl: 'https://github.com/koma104/contact-form-template',
    skills: ['HTML', 'CSS', 'JavaScript'],
    focus: '実務で再利用できることを想定し、入力チェックとエラー表示の分かりやすさを重視して設計しました。',
    tags: ['React', 'Next.js'],
  },
  {
    title: 'ヘアサロンVDOサイト',
    date: '2025.7.18',
    subtitle: 'Webサイト',
    description: 'サロンのブランドイメージと情報を視覚的に伝えるヘアサロン向けWebサイト',
    role: 'デザイン設計から実装まで担当',
    image: '/images/thumb_vdo.webp',
    demoUrl: 'https://hairsalon-vdo-b.vercel.app/',
    githubUrl: 'https://github.com/koma104/hairsalon-vdo',
    skills: ['React', 'Next.js', 'TypeScript', 'CSS Modules', 'GSAP', 'Lenis', 'Figma'],
    focus: 'サロンの雰囲気が伝わるビジュアル設計と、GSAPを用いたアニメーション演出で閲覧体験を向上させました。レスポンシブ表示にも対応しています。',
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
      <div className="space-y-16 md:space-y-40">
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
