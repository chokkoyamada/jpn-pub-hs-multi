import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 py-12 mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-900">
            公立高校入試をより公平に
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-blue-700">
            DAアルゴリズム（受け入れ保留アルゴリズム）を用いた併願制で、
            より公平で効率的な高校入試を実現
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">現在の単願制の問題点</h2>
            <ul className="ml-5 space-y-3 text-gray-700 list-disc">
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

          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">DAアルゴリズムによる解決策</h2>
            <ul className="ml-5 space-y-3 text-gray-700 list-disc">
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

        <div className="flex flex-col gap-8 mt-8">
          <div className="max-w-3xl p-6 mx-auto bg-blue-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-center text-blue-800">
              DAアルゴリズムとは？
            </h2>
            <p className="mb-6 text-center text-blue-700">
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

          <div className="max-w-3xl p-6 mx-auto bg-blue-100 rounded-lg shadow-md">
            <h2 className="mb-4 text-2xl font-bold text-center text-blue-800">
              DAアルゴリズムを体験してみよう
            </h2>
            <p className="mb-6 text-center text-blue-700">
              あなたの立場でシミュレーションを行い、単願制とDA方式の違いを体験してください。
              わずか数分で、DAアルゴリズムのメリットを実感できます。
            </p>
            <div className="flex justify-center">
              <Link href="/simulation" passHref>
                <Button variant="primary" size="lg">
                  シミュレーションを開始
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-600">
          <p>
            © 2025 Naoyuki Yamada <a href="https://www.kirishikistudios.com/">Kirishiki Studios</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
