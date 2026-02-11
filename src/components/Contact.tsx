'use client';

import { useState } from 'react';

// スパム対策: アドレスを分割し、表示・mailto 時に結合（HTML ソースに完全な文字列が載りにくくする）
const EMAIL_PARTS = ['miracle.komatsu', '+work', '@', 'gmail.com'] as const;
const getEmail = () => EMAIL_PARTS.join('');

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(getEmail()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <footer id="contact" className="scroll-mt-[80px] border-t border-gray-300 pt-24">
      <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
        <div>
          <h2 className="mb-4 text-4xl tracking-tight">Contact</h2>
          <p className="mb-8 text-base text-slate-600">
            新しい挑戦や、共同制作のお誘いをお待ちしています。
            <br />
            各種お問い合わせはメールより受け付けてます。
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={`mailto:${getEmail()}`}
              className="rounded-md bg-text-black px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-accent-blue"
            >
              Email Me
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="flex items-center justify-center gap-2 rounded-md border border-text-black px-8 py-4 text-sm font-bold uppercase tracking-wide transition-colors accent-hover"
            >
              <span>Copy Address</span>
              {copied && <span className="text-[10px] lowercase text-accent-blue">Copied!</span>}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
