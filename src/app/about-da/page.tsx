'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AboutDAPage() {
  // State for the interactive demo
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 4;

  // Function to handle next step in the demo
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };

  // Function to handle previous step in the demo
  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Function to reset the demo
  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container px-4 py-12 mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-blue-900">DAアルゴリズムとは？</h1>
          <p className="max-w-2xl mx-auto text-xl text-blue-700">
            受け入れ保留アルゴリズム（Deferred Acceptance
            Algorithm）の仕組みと公立高校入試への応用について
          </p>
        </header>

        {/* Basic Explanation Section */}
        <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">DAアルゴリズムの基本概念</h2>
          <p className="mb-4 text-gray-700">
            DAアルゴリズム（受け入れ保留アルゴリズム）は、1962年にデビッド・ゲール氏とロイド・シャプレー氏によって考案されたマッチング理論のアルゴリズムです。このアルゴリズムは2012年にノーベル経済学賞を受賞し、世界中の様々な割り当て問題（学校選択、研修医の病院配属など）に応用されています。
          </p>
          <p className="mb-4 text-gray-700">
            DAアルゴリズムの最大の特徴は、<strong>安定性</strong>と
            <strong>戦略的操作不可能性</strong>
            です。安定性とは、どの学生も自分より低い順位の学校に入学することがなく、どの学校も自分の定員内で最も成績の良い学生を受け入れることを意味します。戦略的操作不可能性とは、学生が自分の本当の志望順位を正直に申告することが最適な戦略となることを意味します。
          </p>
          <div className="p-4 mt-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="mb-2 text-lg font-semibold text-blue-800">単願制との主な違い</h3>
            <ul className="ml-5 space-y-2 text-blue-700 list-disc">
              <li>複数の学校に志望順位をつけて出願できる</li>
              <li>「受かりそうな学校」ではなく「行きたい学校」を選べる</li>
              <li>経済的背景に関わらず、全ての生徒が公平に挑戦できる</li>
              <li>複数合格による空席や繰り上げ合格の混乱がない</li>
            </ul>
          </div>
        </section>

        {/* Step by Step Explanation */}
        <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">アルゴリズムの動作プロセス</h2>

          <div className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">DAアルゴリズムのステップ</h3>
            <ol className="ml-5 space-y-4 text-gray-700 list-decimal">
              <li>
                <strong>準備段階:</strong> 各生徒は志望校を順位付けしたリストを提出します。
                各学校は定員と合格最低点（または選抜基準）を設定します。
              </li>
              <li>
                <strong>第1ラウンド:</strong> 各生徒は自分の第1志望校に出願します。
                各学校は出願してきた生徒を成績順に並べ、定員内であれば全員を「仮合格」とします。
                定員を超える場合は、成績上位から定員分だけを「仮合格」とし、残りは「不合格」とします。
              </li>
              <li>
                <strong>第2ラウンド以降:</strong> 「不合格」となった生徒は、次の志望校に出願します。
                各学校は前ラウンドで「仮合格」とした生徒と新たに出願してきた生徒を合わせて成績順に並べ、定員内であれば全員を「仮合格」とします。定員を超える場合は、成績上位から定員分だけを「仮合格」とし、
                残りは「不合格」とします。
              </li>
              <li>
                <strong>終了条件:</strong>{' '}
                全ての生徒が「仮合格」を得るか、志望校リストを使い果たすまで、上記のプロセスを繰り返します。最終的に「仮合格」となっている組み合わせが、最終的な割り当て結果となります。
              </li>
            </ol>
          </div>

          {/* Visual Explanation with SVG */}
          <div className="p-4 mb-6 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-center text-gray-800">視覚的な説明</h3>
            <div className="flex justify-center">
              <svg
                width="600"
                height="300"
                viewBox="0 0 600 300"
                className="border border-gray-300 rounded"
              >
                {/* Students */}
                <g>
                  <text x="50" y="30" className="text-sm font-medium">
                    生徒
                  </text>
                  <rect
                    x="30"
                    y="50"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="75" textAnchor="middle" className="text-sm">
                    生徒A
                  </text>

                  <rect
                    x="30"
                    y="100"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="125" textAnchor="middle" className="text-sm">
                    生徒B
                  </text>

                  <rect
                    x="30"
                    y="150"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="175" textAnchor="middle" className="text-sm">
                    生徒C
                  </text>

                  <rect
                    x="30"
                    y="200"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="225" textAnchor="middle" className="text-sm">
                    生徒D
                  </text>
                </g>

                {/* Preferences */}
                <g>
                  <text x="200" y="30" className="text-sm font-medium">
                    志望順位
                  </text>

                  {/* Student A preferences */}
                  <rect
                    x="130"
                    y="50"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                  />
                  <text x="160" y="75" textAnchor="middle" className="text-sm">
                    1. 東高校
                  </text>

                  <rect
                    x="195"
                    y="50"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.8"
                  />
                  <text x="225" y="75" textAnchor="middle" className="text-sm">
                    2. 西高校
                  </text>

                  <rect
                    x="260"
                    y="50"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.6"
                  />
                  <text x="290" y="75" textAnchor="middle" className="text-sm">
                    3. 南高校
                  </text>

                  {/* Student B preferences */}
                  <rect
                    x="130"
                    y="100"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                  />
                  <text x="160" y="125" textAnchor="middle" className="text-sm">
                    1. 東高校
                  </text>

                  <rect
                    x="195"
                    y="100"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.8"
                  />
                  <text x="225" y="125" textAnchor="middle" className="text-sm">
                    2. 南高校
                  </text>

                  <rect
                    x="260"
                    y="100"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.6"
                  />
                  <text x="290" y="125" textAnchor="middle" className="text-sm">
                    3. 西高校
                  </text>

                  {/* Student C preferences */}
                  <rect
                    x="130"
                    y="150"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                  />
                  <text x="160" y="175" textAnchor="middle" className="text-sm">
                    1. 西高校
                  </text>

                  <rect
                    x="195"
                    y="150"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.8"
                  />
                  <text x="225" y="175" textAnchor="middle" className="text-sm">
                    2. 東高校
                  </text>

                  <rect
                    x="260"
                    y="150"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.6"
                  />
                  <text x="290" y="175" textAnchor="middle" className="text-sm">
                    3. 南高校
                  </text>

                  {/* Student D preferences */}
                  <rect
                    x="130"
                    y="200"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                  />
                  <text x="160" y="225" textAnchor="middle" className="text-sm">
                    1. 南高校
                  </text>

                  <rect
                    x="195"
                    y="200"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.8"
                  />
                  <text x="225" y="225" textAnchor="middle" className="text-sm">
                    2. 東高校
                  </text>

                  <rect
                    x="260"
                    y="200"
                    width="60"
                    height="40"
                    rx="5"
                    fill="#F0FDF4"
                    stroke="#10B981"
                    opacity="0.6"
                  />
                  <text x="290" y="225" textAnchor="middle" className="text-sm">
                    3. 西高校
                  </text>
                </g>

                {/* Schools */}
                <g>
                  <text x="450" y="30" className="text-sm font-medium">
                    学校（定員）
                  </text>

                  <rect
                    x="400"
                    y="50"
                    width="150"
                    height="40"
                    rx="5"
                    fill="#FEF3F2"
                    stroke="#F43F5E"
                  />
                  <text x="475" y="75" textAnchor="middle" className="text-sm">
                    東高校（定員1名）
                  </text>

                  <rect
                    x="400"
                    y="100"
                    width="150"
                    height="40"
                    rx="5"
                    fill="#FEF3F2"
                    stroke="#F43F5E"
                  />
                  <text x="475" y="125" textAnchor="middle" className="text-sm">
                    西高校（定員1名）
                  </text>

                  <rect
                    x="400"
                    y="150"
                    width="150"
                    height="40"
                    rx="5"
                    fill="#FEF3F2"
                    stroke="#F43F5E"
                  />
                  <text x="475" y="175" textAnchor="middle" className="text-sm">
                    南高校（定員2名）
                  </text>
                </g>

                {/* Arrows based on current step */}
                <g>
                  {currentStep >= 1 && (
                    <>
                      {/* First round applications */}
                      <path
                        d="M110 70 L400 70"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 120 L400 70"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 170 L400 120"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 220 L400 170"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    </>
                  )}

                  {currentStep >= 2 && (
                    <>
                      {/* Rejections from first round */}
                      <path
                        d="M400 70 L110 120"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                      />
                      {/* Only Student B is rejected from East High School */}
                    </>
                  )}

                  {currentStep >= 3 && (
                    <>
                      {/* Second round applications */}
                      <path
                        d="M110 120 L400 170"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 220 L400 120"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    </>
                  )}

                  {currentStep >= 4 && (
                    <>
                      {/* Final matches */}
                      <path
                        d="M110 70 L400 70"
                        stroke="#10B981"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 170 L400 120"
                        stroke="#10B981"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 120 L400 170"
                        stroke="#10B981"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d="M110 220 L400 170"
                        stroke="#10B981"
                        strokeWidth="3"
                        markerEnd="url(#arrowhead)"
                      />
                    </>
                  )}
                </g>

                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="mt-4 text-center">
              <div className="mb-4 text-gray-700">
                {currentStep === 0 && (
                  <div>
                    <p className="font-semibold">初期状態:</p>
                    <ul className="mt-2 ml-5 list-disc">
                      <li>各生徒が志望校リストを提出します</li>
                      <li>各学校が定員を設定します</li>
                      <li>生徒A: 第1志望「東高校」、第2志望「西高校」、第3志望「南高校」</li>
                      <li>生徒B: 第1志望「東高校」、第2志望「南高校」、第3志望「西高校」</li>
                      <li>生徒C: 第1志望「西高校」、第2志望「東高校」、第3志望「南高校」</li>
                      <li>生徒D: 第1志望「南高校」、第2志望「東高校」、第3志望「西高校」</li>
                    </ul>
                  </div>
                )}
                {currentStep === 1 && (
                  <div>
                    <p className="font-semibold">第1ラウンド:</p>
                    <ul className="mt-2 ml-5 list-disc">
                      <li>各生徒が第1志望校に出願します</li>
                      <li>生徒A → 東高校（第1志望）</li>
                      <li>生徒B → 東高校（第1志望）</li>
                      <li>生徒C → 西高校（第1志望）</li>
                      <li>生徒D → 南高校（第1志望）</li>
                    </ul>
                  </div>
                )}
                {currentStep === 2 && (
                  <div>
                    <p className="font-semibold">仮合格と不合格:</p>
                    <ul className="mt-2 ml-5 list-disc">
                      <li>各学校が定員に基づいて仮合格者を決定します</li>
                      <li>東高校（定員1名）: 生徒Aが仮合格、生徒Bは不合格（成績で判断）</li>
                      <li>西高校（定員1名）: 生徒Cが仮合格</li>
                      <li>南高校（定員2名）: 生徒Dが仮合格</li>
                      <li>不合格となった生徒B → 次の志望校へ</li>
                    </ul>
                  </div>
                )}
                {currentStep === 3 && (
                  <div>
                    <p className="font-semibold">第2ラウンド:</p>
                    <ul className="mt-2 ml-5 list-disc">
                      <li>不合格となった生徒が次の志望校に出願します</li>
                      <li>生徒B → 南高校（第2志望）</li>
                      <li>東高校: 生徒Aが仮合格（変更なし）</li>
                      <li>西高校: 生徒Cが仮合格（変更なし）</li>
                      <li>南高校: 生徒Dと生徒Bが仮合格（定員2名以内）</li>
                    </ul>
                  </div>
                )}
                {currentStep === 4 && (
                  <div>
                    <p className="font-semibold">最終結果:</p>
                    <ul className="mt-2 ml-5 list-disc">
                      <li>全ての生徒が仮合格を得たので、アルゴリズムは終了します</li>
                      <li>生徒A → 東高校（第1志望）に合格</li>
                      <li>生徒B → 南高校（第2志望）に合格</li>
                      <li>生徒C → 西高校（第1志望）に合格</li>
                      <li>生徒D → 南高校（第1志望）に合格</li>
                      <li>全ての生徒が可能な限り高い志望順位の学校に入学できました</li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md ${
                    currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                >
                  前へ
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50"
                >
                  リセット
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStep === totalSteps - 1}
                  className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md ${
                    currentStep === totalSteps - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-blue-700'
                  }`}
                >
                  次へ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Final Results Visualization Section */}
        <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">最終結果の視覚化</h2>
          <p className="mb-6 text-gray-700">
            DAアルゴリズムの実行後、各生徒がどの高校に最終的に合格したかを視覚的に表現したものです。
            この結果は、各生徒の志望順位と各学校の定員を考慮した最適なマッチングとなっています。
          </p>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="mb-4 text-lg font-semibold text-center text-gray-800">最終合格結果</h3>
            <div className="flex justify-center">
              <svg
                width="600"
                height="300"
                viewBox="0 0 600 300"
                className="border border-gray-300 rounded"
              >
                {/* Students */}
                <g>
                  <text x="50" y="30" className="text-sm font-medium">
                    生徒
                  </text>
                  <rect
                    x="30"
                    y="50"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="75" textAnchor="middle" className="text-sm">
                    生徒A
                  </text>

                  <rect
                    x="30"
                    y="100"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="125" textAnchor="middle" className="text-sm">
                    生徒B
                  </text>

                  <rect
                    x="30"
                    y="150"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="175" textAnchor="middle" className="text-sm">
                    生徒C
                  </text>

                  <rect
                    x="30"
                    y="200"
                    width="80"
                    height="40"
                    rx="5"
                    fill="#EBF4FF"
                    stroke="#3B82F6"
                  />
                  <text x="70" y="225" textAnchor="middle" className="text-sm">
                    生徒D
                  </text>
                </g>

                {/* Schools */}
                <g>
                  <text x="450" y="30" className="text-sm font-medium">
                    学校（定員）
                  </text>

                  <rect
                    x="400"
                    y="50"
                    width="150"
                    height="40"
                    rx="5"
                    fill="#FEF3F2"
                    stroke="#F43F5E"
                  />
                  <text x="475" y="75" textAnchor="middle" className="text-sm">
                    東高校（定員1名）
                  </text>

                  <rect
                    x="400"
                    y="100"
                    width="150"
                    height="40"
                    rx="5"
                    fill="#FEF3F2"
                    stroke="#F43F5E"
                  />
                  <text x="475" y="125" textAnchor="middle" className="text-sm">
                    西高校（定員1名）
                  </text>

                  <rect
                    x="400"
                    y="150"
                    width="150"
                    height="40"
                    rx="5"
                    fill="#FEF3F2"
                    stroke="#F43F5E"
                  />
                  <text x="475" y="175" textAnchor="middle" className="text-sm">
                    南高校（定員2名）
                  </text>
                </g>

                {/* Final matches with preference indicators */}
                <g>
                  {/* Student A to East High (1st choice) */}
                  <path
                    d="M110 70 L400 70"
                    stroke="#10B981"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle cx="255" cy="70" r="12" fill="#10B981" />
                  <text
                    x="255"
                    y="74"
                    textAnchor="middle"
                    fill="white"
                    className="text-xs font-bold"
                  >
                    1
                  </text>

                  {/* Student B to South High (2nd choice) - Adjusted position and color */}
                  <path
                    d="M110 120 L400 170"
                    stroke="#FBBF24"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle cx="230" cy="155" r="12" fill="#FBBF24" />
                  <text
                    x="230"
                    y="159"
                    textAnchor="middle"
                    fill="white"
                    className="text-xs font-bold"
                  >
                    2
                  </text>

                  {/* Student C to West High (1st choice) - Adjusted position */}
                  <path
                    d="M110 170 L400 120"
                    stroke="#10B981"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle cx="280" cy="135" r="12" fill="#10B981" />
                  <text
                    x="280"
                    y="139"
                    textAnchor="middle"
                    fill="white"
                    className="text-xs font-bold"
                  >
                    1
                  </text>

                  {/* Student D to South High (1st choice) */}
                  <path
                    d="M110 220 L400 170"
                    stroke="#10B981"
                    strokeWidth="3"
                    markerEnd="url(#arrowhead)"
                  />
                  <circle cx="255" cy="195" r="12" fill="#10B981" />
                  <text
                    x="255"
                    y="199"
                    textAnchor="middle"
                    fill="white"
                    className="text-xs font-bold"
                  >
                    1
                  </text>
                </g>

                {/* Legend */}
                <g transform="translate(200, 240)">
                  <rect x="0" y="0" width="200" height="50" rx="5" fill="white" stroke="#E5E7EB" />
                  <text x="100" y="20" textAnchor="middle" className="text-sm font-medium">
                    志望順位
                  </text>

                  <circle cx="40" cy="35" r="10" fill="#10B981" />
                  <text
                    x="40"
                    y="39"
                    textAnchor="middle"
                    fill="white"
                    className="text-xs font-bold"
                  >
                    1
                  </text>
                  <text x="60" y="39" textAnchor="start" className="text-xs">
                    第1志望
                  </text>

                  <circle cx="120" cy="35" r="10" fill="#FBBF24" />
                  <text
                    x="120"
                    y="39"
                    textAnchor="middle"
                    fill="white"
                    className="text-xs font-bold"
                  >
                    2
                  </text>
                  <text x="140" y="39" textAnchor="start" className="text-xs">
                    第2志望
                  </text>
                </g>

                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" />
                  </marker>
                </defs>
              </svg>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="mb-2 text-md font-semibold text-green-800">第1志望に合格した生徒</h4>
                <ul className="ml-5 space-y-1 list-disc text-green-700">
                  <li>生徒A → 東高校（第1志望）</li>
                  <li>生徒C → 西高校（第1志望）</li>
                  <li>生徒D → 南高校（第1志望）</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="mb-2 text-md font-semibold text-yellow-800">
                  第2志望以下に合格した生徒
                </h4>
                <ul className="ml-5 space-y-1 list-disc text-yellow-700">
                  <li>生徒B → 南高校（第2志望）</li>
                </ul>
                <p className="mt-2 text-sm text-yellow-700">
                  ※生徒Bは東高校（第1志望）の定員の関係で合格できませんでした
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="mb-2 text-md font-semibold text-blue-800">各高校の合格者</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-2 bg-white border border-blue-100 rounded">
                  <p className="font-medium text-blue-800">東高校（定員1名）</p>
                  <ul className="ml-5 list-disc text-blue-700">
                    <li>生徒A</li>
                  </ul>
                </div>
                <div className="p-2 bg-white border border-blue-100 rounded">
                  <p className="font-medium text-blue-800">西高校（定員1名）</p>
                  <ul className="ml-5 list-disc text-blue-700">
                    <li>生徒C</li>
                  </ul>
                </div>
                <div className="p-2 bg-white border border-blue-100 rounded">
                  <p className="font-medium text-blue-800">南高校（定員2名）</p>
                  <ul className="ml-5 list-disc text-blue-700">
                    <li>生徒B</li>
                    <li>生徒D</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">DAアルゴリズムのメリット</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 border border-green-200 rounded-lg bg-green-50">
              <h3 className="mb-2 text-lg font-semibold text-green-800">公平性の向上</h3>
              <p className="text-green-700">
                経済状況に関わらず、全ての生徒が自分の実力に合った最良の高校に入学できる機会を得られます。私立高校を滑り止めにできない経済的に困窮している家庭の生徒でも、安心して難関校に挑戦することができます。
              </p>
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <h3 className="mb-2 text-lg font-semibold text-blue-800">戦略的操作の排除</h3>
              <p className="text-blue-700">
                生徒は「受かりそうな学校」ではなく「行きたい学校」を正直に順位付けするのが最適な戦略となります。複雑な受験戦略を考える必要がなくなり、本来の志望校に挑戦する機会が増えます。
              </p>
            </div>

            <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
              <h3 className="mb-2 text-lg font-semibold text-purple-800">効率的なマッチング</h3>
              <p className="text-purple-700">
                複数合格による空席や繰り上げ合格の混乱がなくなり、最適なマッチングが実現します。学校側も定員を効率的に埋めることができ、行政コストの削減にもつながります。
              </p>
            </div>

            <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
              <h3 className="mb-2 text-lg font-semibold text-orange-800">心理的負担の軽減</h3>
              <p className="text-orange-700">
                「落ちたらどうしよう」という不安を減らし、生徒と保護者の心理的負担を軽減します。志望校の合格最低点に達していれば、必ずその学校に入れることが保証されるため、安心して受験に臨むことができます。
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="p-6 mb-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">よくある質問</h2>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Q: DAアルゴリズムは本当に公平なのですか？
              </h3>
              <p className="text-gray-700">
                A:
                はい、DAアルゴリズムは数学的に証明された公平性を持っています。全ての生徒が自分の真の志望順位を申告することが最適な戦略となり、また全ての生徒が自分より低い順位の学校に入学することはありません。
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Q: 導入にはどのようなコストがかかりますか？
              </h3>
              <p className="text-gray-700">
                A:
                主なコストはシステム開発費用です。既存の入試システムをDAアルゴリズムに対応させるためのシステム改修が必要になりますが、長期的には繰り上げ合格などの手続きが不要になるため、行政コストの削減につながります。
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Q: 実際に導入している地域はありますか？
              </h3>
              <p className="text-gray-700">
                A:
                海外ではニューヨーク市やボストン市の公立高校入試、全米の研修医マッチングシステムなどで導入されています。日本国内では一部の私立大学のAO入試などで類似のシステムが採用されていますが、公立高校入試での本格的な導入はまだ進んでいません。
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="mb-2 text-lg font-semibold text-gray-800">
                Q: 志望校を何校まで書けるのですか？
              </h3>
              <p className="text-gray-700">
                A:
                理論上は無制限ですが、実際の運用では行政側が上限を設定することが多いです。例えばニューヨーク市では最大12校まで志望校を書くことができます。日本での導入を考える場合、各都道府県内の公立高校数や行政コストを考慮して適切な上限を設定することになるでしょう。
              </p>
            </div>
          </div>
        </section>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4">
          <Link href="/" passHref>
            <Button variant="outline">トップページに戻る</Button>
          </Link>
          <Link href="/simulation" passHref>
            <Button variant="primary">シミュレーションを試す</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
