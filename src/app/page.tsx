import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="container px-4 mx-auto flex items-center justify-between h-14">
          <Link href="/" className="font-heading text-sm md:text-lg font-bold text-slate-900 shrink-0">
            <span className="hidden md:inline">DA入試シミュレーション</span>
            <span className="md:hidden">DA入試</span>
          </Link>
          <div className="flex gap-3 md:gap-4 text-xs md:text-sm">
            <Link href="/about-da" className="text-slate-600 hover:text-sky-700 transition-colors whitespace-nowrap">
              DAアルゴリズムとは
            </Link>
            <Link href="/simulation" className="text-slate-600 hover:text-sky-700 transition-colors whitespace-nowrap">
              シミュレーション
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-white py-16 md:py-24">
        <div className="container px-4 mx-auto text-center">
          <h1 className="font-heading mb-4 text-3xl md:text-5xl font-bold leading-tight">
            公立高校入試をより公平に
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-sky-200 mb-8">
            DAアルゴリズム（受け入れ保留アルゴリズム）を用いた併願制で、
            <br className="hidden md:block" />
            より公平で効率的な高校入試を実現
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/simulation" passHref>
              <Button variant="primary" size="lg" className="bg-sky-600 hover:bg-sky-500">
                シミュレーションを体験
              </Button>
            </Link>
            <Link href="/about-da" passHref>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                DAアルゴリズムを学ぶ
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-4 py-12 mx-auto">
        {/* Problem / Solution Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-l-red-500">
            <h2 className="font-heading mb-4 text-2xl font-bold text-slate-900">
              現在の単願制の問題点
            </h2>
            <ul className="ml-5 space-y-3 text-slate-700 list-disc">
              <li>
                <strong>経済格差による不公平:</strong> 家庭の経済力に不安がある生徒は、
                私立高校を選択肢に入れられないため、安全な公立高校を選ばざるを得ない
              </li>
              <li>
                <strong>情報格差による不公平:</strong> 塾に行けない生徒は、
                自分のレベルに合った高校を正確に把握できない
              </li>
              <li>
                <strong>チャレンジの機会損失:</strong> 落ちるリスクを考えて、
                本来の実力より低いレベルの高校を選ぶ生徒が多い
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md border-l-4 border-l-green-600">
            <h2 className="font-heading mb-4 text-2xl font-bold text-slate-900">
              DAアルゴリズムによる解決策
            </h2>
            <ul className="ml-5 space-y-3 text-slate-700 list-disc">
              <li>
                <strong>志望校を正直に並べるだけ:</strong> 戦略的な出願を考える必要がなく、
                純粋に行きたい高校を順番に並べればよい
              </li>
              <li>
                <strong>公平な機会:</strong> 経済状況に関わらず、
                全ての生徒が自分の実力に合った最良の高校に入学できる
              </li>
              <li>
                <strong>効率的な配分:</strong> 複数合格による空席や繰り上げ合格の混乱がなく、
                最適なマッチングが実現する
              </li>
              <li>
                <strong>実績あるシステム:</strong> ニューヨークの公立高校入試で成功し、
                ノーベル経済学賞の研究にも関連
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Sections */}
        <div className="flex flex-col gap-8 mt-12">
          <div className="max-w-3xl p-8 mx-auto bg-white rounded-lg shadow-md border border-slate-200">
            <h2 className="font-heading mb-4 text-2xl font-bold text-center text-slate-900">
              DAアルゴリズムとは？
            </h2>
            <p className="mb-6 text-center text-slate-600">
              受け入れ保留アルゴリズム（Deferred Acceptance Algorithm）の仕組みと
              公立高校入試への応用について詳しく学びましょう。
            </p>
            <div className="flex justify-center">
              <Link href="/about-da" passHref>
                <Button variant="outline" size="lg">
                  詳しく見る
                </Button>
              </Link>
            </div>
          </div>

          <div className="max-w-3xl p-8 mx-auto bg-gradient-to-r from-sky-700 to-sky-800 rounded-lg shadow-lg text-white">
            <h2 className="font-heading mb-4 text-2xl font-bold text-center">
              DAアルゴリズムを体験してみよう
            </h2>
            <p className="mb-6 text-center text-sky-100">
              あなたの立場でシミュレーションを行い、単願制とDA方式の違いを体験してください。
              わずか数分で、DAアルゴリズムのメリットを実感できます。
            </p>
            <div className="flex justify-center">
              <Link href="/simulation" passHref>
                <Button
                  variant="primary"
                  size="lg"
                  className="!bg-white !text-sky-800 !hover:bg-sky-50"
                >
                  シミュレーションを開始
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
          <p>
            &copy; 2025{' '}
            <a
              href="https://www.kirishikistudios.com/"
              className="text-sky-700 hover:underline"
            >
              Naoyuki Yamada (Kirishiki Studios)
            </a>
            {' • '}
            <a
              href="https://github.com/chokkoyamada/jpn-pub-hs-multi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
