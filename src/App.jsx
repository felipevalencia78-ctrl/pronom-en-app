import React, { useMemo, useState } from 'react';

const BASE_QUESTIONS = [
  {
    prompt: 'Nous voulons du fromage pour l’entrée ?',
    options: ['Oui, nous en voulons.', 'Oui, nous voulons en.', 'Oui, nous y voulons.'],
    answer: 0,
    explanation: 'EN remplace « du fromage » avec le sujet nous.'
  },
  {
    prompt: 'Vous avez commandé une soupe ce soir ?',
    options: ['Oui, vous en avez commandé une.', 'Oui, vous avez en commandé une.', 'Oui, vous la avez commandé une.'],
    answer: 0,
    explanation: 'Au passé composé, EN se place avant l’auxiliaire avec le sujet vous.'
  },
  {
    prompt: 'Tu veux du fromage ?',
    options: ['Oui, j’en veux.', 'Oui, je veux en.', 'Oui, j’y veux.'],
    answer: 0,
    explanation: 'À la forme affirmative, EN remplace « du fromage ».'
  },
  {
    prompt: 'Tu bois du café au restaurant ?',
    options: ['Non, je n’en bois pas.', 'Non, je ne bois en pas.', 'Non, je n’y bois pas.'],
    answer: 0,
    explanation: 'À la forme négative, EN se place entre ne/n’ et le verbe : « je n’en bois pas ».'
  },
  {
    prompt: 'Tu as commandé une soupe ?',
    options: ['Oui, j’en ai commandé une.', 'Oui, j’ai en commandé une.', 'Oui, je l’ai commandé une.'],
    answer: 0,
    explanation: 'Au passé composé, EN se place avant l’auxiliaire : « j’en ai commandé une ».'
  },
  {
    prompt: 'Tu as acheté des fraises ?',
    options: ['Non, je n’en ai pas acheté.', 'Non, je n’ai acheté en pas.', 'Non, je ne les ai pas acheté des.'],
    answer: 0,
    explanation: 'Au passé composé négatif, EN se place entre ne/n’ et l’auxiliaire : « je n’en ai pas acheté ».'
  },
  {
    prompt: 'Tu prends une salade ?',
    options: ['Oui, j’en prends une.', 'Oui, je prends en une.', 'Oui, j’y prends une.'],
    answer: 0,
    explanation: 'EN remplace un nom introduit par un article indéfini : « une salade ».'
  },
  {
    prompt: 'Tu veux des olives avec l’apéritif ?',
    options: ['Non, je n’en veux pas.', 'Non, je ne veux en pas.', 'Non, je n’y veux pas.'],
    answer: 0,
    explanation: 'EN remplace « des olives » à la forme négative.'
  },
  {
    prompt: 'Le serveur a apporté du pain ?',
    options: ['Oui, il en a apporté.', 'Oui, il a en apporté.', 'Oui, il y a apporté.'],
    answer: 0,
    explanation: 'Au passé composé, EN remplace « du pain » et se place avant l’auxiliaire.'
  },
  {
    prompt: 'Le restaurant a proposé des desserts ?',
    options: ['Non, il n’en a pas proposé.', 'Non, il n’a proposé en pas.', 'Non, il ne les a pas proposé des.'],
    answer: 0,
    explanation: 'EN remplace « des desserts » au passé composé négatif.'
  },
  {
    prompt: 'Vous servez beaucoup de vin ici ?',
    options: ['Oui, nous en servons beaucoup.', 'Oui, nous servons en beaucoup.', 'Oui, nous y servons beaucoup.'],
    answer: 0,
    explanation: 'EN remplace une quantité imprécise : « beaucoup de vin ».'
  },
  {
    prompt: 'Vous avez servi beaucoup de café ?',
    options: ['Oui, nous en avons servi beaucoup.', 'Oui, nous avons servi en beaucoup.', 'Oui, nous y avons servi beaucoup.'],
    answer: 0,
    explanation: 'Au passé composé, EN remplace « beaucoup de café ».'
  },
  {
    prompt: 'Tu achètes deux kilos de pommes ?',
    options: ['Oui, j’en achète deux.', 'Oui, je les achète deux.', 'Oui, j’y achète deux.'],
    answer: 0,
    explanation: 'EN remplace le complément après la quantité : « de pommes ».'
  },
  {
    prompt: 'Tu as acheté trois bouteilles d’eau ?',
    options: ['Non, je n’en ai pas acheté trois.', 'Non, je n’ai acheté en pas trois.', 'Non, je ne les ai pas acheté trois d’eau.'],
    answer: 0,
    explanation: 'Au passé composé négatif, EN remplace « d’eau » dans une quantité précise.'
  },
  {
    prompt: 'Elle boit beaucoup d’eau ?',
    options: ['Oui, elle en boit beaucoup.', 'Oui, elle la boit beaucoup.', 'Oui, elle y boit beaucoup.'],
    answer: 0,
    explanation: 'EN remplace « beaucoup d’eau ».'
  },
  {
    prompt: 'Elle a bu trop de soda ?',
    options: ['Non, elle n’en a pas bu trop.', 'Non, elle n’a bu en pas trop.', 'Non, elle ne l’a pas bu trop de.'],
    answer: 0,
    explanation: 'EN remplace « de soda » au passé composé négatif.'
  },
  {
    prompt: 'Tu prends du dessert ?',
    options: ['Oui, j’en prends.', 'Oui, je prends en.', 'Oui, j’y prends.'],
    answer: 0,
    explanation: 'EN remplace « du dessert ».'
  },
  {
    prompt: 'Tu as pris du dessert ?',
    options: ['Oui, j’en ai pris.', 'Oui, j’ai pris en.', 'Oui, je l’ai pris du.'],
    answer: 0,
    explanation: 'Au passé composé, EN remplace « du dessert ».'
  },
  {
    prompt: 'Le chef utilise beaucoup d’herbes ?',
    options: ['Oui, il en utilise beaucoup.', 'Oui, il les utilise beaucoup d’.', 'Oui, il y utilise beaucoup.'],
    answer: 0,
    explanation: 'EN remplace « beaucoup d’herbes ».'
  },
  {
    prompt: 'Le chef a utilisé beaucoup d’ail ?',
    options: ['Non, il n’en a pas utilisé beaucoup.', 'Non, il n’a utilisé en pas beaucoup.', 'Non, il ne l’a pas utilisé beaucoup d’.'],
    answer: 0,
    explanation: 'EN remplace « beaucoup d’ail » au passé composé négatif.'
  },
  {
    prompt: 'Tu prends un café après le repas ?',
    options: ['Oui, j’en prends un.', 'Oui, je le prends un.', 'Oui, j’y prends un.'],
    answer: 0,
    explanation: 'EN remplace « un café ».'
  },
  {
    prompt: 'Tu as pris une tisane après le dîner ?',
    options: ['Oui, j’en ai pris une.', 'Oui, j’ai pris en une.', 'Oui, je l’ai pris une.'],
    answer: 0,
    explanation: 'Au passé composé, EN remplace « une tisane ».'
  }
];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function buildQuestions(total = 20) {
  const pool = shuffleArray(BASE_QUESTIONS);
  const questions = [];

  for (let i = 0; i < total; i += 1) {
    const base = pool[i % pool.length];
    const correctText = base.options[0];
    const shuffledOptions = shuffleArray(base.options);
    const newAnswerIndex = shuffledOptions.indexOf(correctText);

    questions.push({
      ...base,
      id: i + 1,
      options: shuffledOptions,
      answer: newAnswerIndex
    });
  }

  return questions;
}

function computeScore(answers, questions) {
  return answers.reduce((acc, value, index) => {
    if (value === questions[index].answer) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

function RuleCard({ title, text, example }) {
  return (
    <div className="rounded-[16px] border border-slate-700 bg-gradient-to-br from-sky-800 to-indigo-900 p-3 text-center text-white shadow-sm">
      <p className="mb-1 text-sm font-black leading-tight">{title}</p>
      <p className="mb-2 text-sm leading-relaxed text-sky-100">{text}</p>
      <p className="text-xs italic leading-relaxed text-sky-200">{example}</p>
    </div>
  );
}

export default function PronounEnApp() {
  const questions = useMemo(() => buildQuestions(20), []);
  const totalQuestions = questions.length;

  const [screen, setScreen] = useState('home');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(totalQuestions).fill(null));
  const [showFeedback, setShowFeedback] = useState(false);
  const [showRappel, setShowRappel] = useState(false);
  const [showAnswersModal, setShowAnswersModal] = useState(false);

  const currentQuestion = questions[current];
  const selected = answers[current];
  const selectedIsCorrect = currentQuestion ? selected === currentQuestion.answer : false;
  const isLastQuestion = current === totalQuestions - 1;

  const score = useMemo(() => computeScore(answers, questions), [answers, questions]);
  const progress = useMemo(() => {
    const answered = answers.filter((answer) => answer !== null).length;
    return (answered / totalQuestions) * 100;
  }, [answers, totalQuestions]);

  const rules = [
    {
      title: 'EN remplace : de / du / de la / des',
      text: 'Le pronom EN remplace un mot introduit par de, du, de la, de l’ ou des.',
      example: 'Tu manges de la viande ? → Non, je n’en mange pas.'
    },
    {
      title: 'EN remplace : un / une / des',
      text: 'EN remplace aussi un nom introduit par un article indéfini.',
      example: 'Tu as une grande poêle ? → Oui, j’en ai une.'
    },
    {
      title: 'EN remplace une quantité',
      text: 'EN remplace une quantité précise ou imprécise : trois, beaucoup, peu, assez…',
      example: 'Vous proposez trois plats ? → Non, je n’en propose pas trois.'
    }
  ];

  function startTraining() {
    setScreen('quiz');
    setCurrent(0);
    setShowFeedback(answers[0] !== null);
    setShowRappel(false);
    setShowAnswersModal(false);
  }

  function resumeTraining() {
    setScreen('quiz');
    setShowFeedback(answers[current] !== null);
    setShowRappel(false);
    setShowAnswersModal(false);
  }

  function handleSelect(index) {
    if (answers[current] !== null) return;
    const nextAnswers = [...answers];
    nextAnswers[current] = index;
    setAnswers(nextAnswers);
    setShowFeedback(true);
  }

  function nextQuestion() {
    if (isLastQuestion) {
      setScreen('result');
      setShowFeedback(false);
      setShowAnswersModal(false);
      return;
    }
    const nextIndex = current + 1;
    setCurrent(nextIndex);
    setShowFeedback(answers[nextIndex] !== null);
    setShowRappel(false);
  }

  function previousQuestion() {
    if (current === 0) return;
    const previousIndex = current - 1;
    setCurrent(previousIndex);
    setShowFeedback(answers[previousIndex] !== null);
    setShowRappel(false);
  }

  function goHome() {
    setScreen('home');
    setShowFeedback(false);
    setShowRappel(false);
    setShowAnswersModal(false);
  }

  function restartQuiz() {
    setAnswers(Array(totalQuestions).fill(null));
    setCurrent(0);
    setShowFeedback(false);
    setShowRappel(false);
    setShowAnswersModal(false);
    setScreen('home');
  }

  return (
    <div className="min-h-screen bg-slate-300 p-2 md:p-6">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-[36px] border border-slate-200 bg-slate-100 shadow-xl">
        <div className="bg-sky-700 px-6 py-5 text-white">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black">📚 Le pronom EN</h1>
              <p className="mt-2 text-lg text-sky-100">Entraînement interactif</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
              <span className="rounded-full bg-white/15 px-4 py-2">XP : {score}</span>
              <span className="rounded-full bg-white/15 px-4 py-2">
                Question : {screen === 'quiz' ? current + 1 : 0}/{totalQuestions}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-1 flex items-center justify-between text-sm text-sky-100">
              <span>Progression</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-slate-200 transition-all duration-300"
                style={{ width: `${Math.max(progress, 5)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10">
          {screen === 'home' && (
            <div>
              <div className="mb-8 rounded-[28px] border border-slate-700 bg-gradient-to-br from-sky-800 to-indigo-900 p-6 text-center text-white shadow-sm">
                <h2 className="text-lg font-black">Fonctionnement</h2>
              </div>

              <div className="mb-8 grid gap-6 md:grid-cols-3">
                {rules.map((rule, index) => (
                  <RuleCard key={index} {...rule} />
                ))}
              </div>

              <div className="mx-auto max-w-3xl rounded-[24px] border border-slate-700 bg-gradient-to-br from-sky-800 to-indigo-900 p-4 text-center text-white shadow-sm">
                <p className="mb-2 text-sm font-black">Remarques</p>
                <p className="mb-3 text-sm leading-relaxed text-sky-100">
                  À la forme affirmative, on place le pronom <b>en</b> avant le verbe.
                </p>
                <p className="mb-3 text-xs italic leading-relaxed text-sky-200">J’en mange. / J’en ai mangé.</p>
                <p className="mb-3 text-sm leading-relaxed text-sky-100">
                  À la forme négative, on place le pronom <b>en</b> entre <b>ne/n’</b> et le verbe.
                </p>
                <p className="text-xs italic leading-relaxed text-sky-200">Je n’en mange pas. / Je n’en ai pas mangé.</p>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 md:flex-row">
                {answers.some((answer) => answer !== null) ? (
                  <>
                    <button
                      onClick={resumeTraining}
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-10 py-4 text-lg font-bold text-white shadow-md transition hover:from-emerald-600 hover:to-green-700"
                    >
                      Reprendre
                    </button>
                    <button
                      onClick={restartQuiz}
                      className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-10 py-4 text-lg font-bold text-white shadow-md transition hover:from-orange-600 hover:to-amber-600"
                    >
                      Réinitialiser
                    </button>
                  </>
                ) : (
                  <button
                    onClick={startTraining}
                    className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-10 py-4 text-lg font-bold text-white shadow-md transition hover:from-emerald-600 hover:to-green-700"
                  >
                    S'entraîner
                  </button>
                )}
              </div>
            </div>
          )}

          {screen === 'quiz' && currentQuestion && (
            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex justify-between">
                <button
                  onClick={goHome}
                  className="rounded-lg bg-gradient-to-r from-sky-800 to-indigo-900 px-4 py-2 text-white shadow transition hover:from-sky-900 hover:to-indigo-950"
                >
                  Home
                </button>

                <button
                  onClick={() => setShowRappel(true)}
                  className="rounded-lg bg-gradient-to-r from-sky-800 to-indigo-900 px-4 py-2 text-white shadow transition hover:from-sky-900 hover:to-indigo-950"
                >
                  Rappel
                </button>
              </div>

              <div className="mb-8 rounded-[28px] border border-slate-700 bg-gradient-to-br from-sky-800 to-indigo-900 p-6 text-center text-white shadow-sm">
                <h2 className="text-lg font-black leading-tight">{currentQuestion.prompt}</h2>
              </div>

              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  let style =
                    'border-slate-500 bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900 font-bold transition transform hover:from-slate-400 hover:to-slate-500 hover:scale-[1.02] hover:shadow-lg';

                  if (selected !== null) {
                    if (index === currentQuestion.answer) {
                      style = 'border-green-600 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-bold';
                    } else if (index === selected) {
                      style = 'border-red-600 bg-gradient-to-r from-red-600 to-red-400 text-white font-bold';
                    }
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(index)}
                      disabled={selected !== null}
                      className={`mx-auto flex h-16 w-full max-w-3xl items-center justify-center rounded-xl border px-4 py-3 text-center text-lg ${style} ${selected !== null ? 'cursor-default' : ''}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={`mt-8 rounded-xl border p-6 text-center ${selectedIsCorrect ? 'border-green-300 bg-green-50' : 'border-amber-300 bg-amber-50'}`}
                >
                  <p className="mb-2 text-lg font-black">{selectedIsCorrect ? 'Bravo !' : 'Attention !'}</p>
                  <p className="mb-6 text-lg font-bold">{currentQuestion.explanation}</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {current > 0 && (
                      <button
                        onClick={previousQuestion}
                        className="rounded-xl bg-gradient-to-r from-sky-700 to-indigo-800 px-6 py-3 text-lg font-bold text-white shadow-md transition hover:from-sky-800 hover:to-indigo-900"
                      >
                        Question précédente
                      </button>
                    )}
                    <button
                      onClick={nextQuestion}
                      className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-lg font-bold text-white shadow-md transition hover:from-emerald-600 hover:to-green-700"
                    >
                      {isLastQuestion ? 'Voir le résultat' : 'Question suivante'}
                    </button>
                  </div>
                </div>
              )}

              {showRappel && (
                <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-6">
                  <div className="w-full max-w-xl rounded-xl bg-white p-3 shadow-xl">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h3 className="text-sm font-black">Rappel</h3>
                      <button
                        onClick={() => setShowRappel(false)}
                        className="rounded-lg bg-gradient-to-r from-sky-800 to-indigo-900 px-3 py-1 text-white shadow transition hover:from-sky-900 hover:to-indigo-950"
                      >
                        Fermer
                      </button>
                    </div>

                    <div className="mb-3 grid gap-3">
                      {rules.map((rule, index) => (
                        <RuleCard key={index} {...rule} />
                      ))}
                    </div>

                    <div className="mx-auto max-w-lg rounded-[18px] border border-slate-700 bg-gradient-to-br from-sky-800 to-indigo-900 p-3 text-center text-white shadow-sm">
                      <p className="mb-2 text-sm font-black">Remarques</p>
                      <p className="mb-3 text-sm leading-relaxed text-sky-100">
                        À la forme affirmative, on place le pronom <b>en</b> avant le verbe.
                      </p>
                      <p className="mb-3 text-xs italic leading-relaxed text-sky-200">J’en mange. / J’en ai mangé.</p>
                      <p className="mb-3 text-sm leading-relaxed text-sky-100">
                        À la forme négative, on place le pronom <b>en</b> entre <b>ne/n’</b> et le verbe.
                      </p>
                      <p className="text-xs italic leading-relaxed text-sky-200">Je n’en mange pas. / Je n’en ai pas mangé.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {screen === 'result' && (
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-black">Résultat</h2>
              <p className="mb-3 text-lg">Score : {score} / {totalQuestions}</p>
              <p className="mb-8 text-lg font-bold">XP : {score}</p>
              <div className="flex flex-col justify-center gap-4 md:flex-row">
                <button
                  onClick={() => setShowAnswersModal(true)}
                  className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-8 py-3 text-lg font-bold text-white shadow-md transition hover:from-orange-600 hover:to-amber-600"
                >
                  Voir les réponses
                </button>
                <button
                  onClick={goHome}
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-3 text-lg font-bold text-white shadow-md transition hover:from-emerald-600 hover:to-green-700"
                >
                  Retour au home
                </button>
              </div>

              {showAnswersModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                  <div className="max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-4 shadow-xl">
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h3 className="text-sm font-black">Réponses</h3>
                      <button
                        onClick={() => setShowAnswersModal(false)}
                        className="rounded-lg bg-gradient-to-r from-sky-800 to-indigo-900 px-3 py-1 text-white shadow transition hover:from-sky-900 hover:to-indigo-950"
                      >
                        Fermer
                      </button>
                    </div>
                    <div className="space-y-3 text-left text-sm">
                      {questions.map((question, index) => {
                        const userAnswer = answers[index];
                        const isCorrect = userAnswer === question.answer;
                        return (
                          <div
                            key={question.id}
                            className={`rounded-lg border p-3 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}
                          >
                            <p className="mb-2 font-bold">{index + 1}. {question.prompt}</p>
                            <p className="mb-1 text-sm">
                              <span className="font-semibold">Bonne réponse :</span> {question.options[question.answer]}
                            </p>
                            <p className="mb-1 text-sm">
                              <span className="font-semibold">Ta réponse :</span> {userAnswer !== null ? question.options[userAnswer] : 'Sans réponse'}
                            </p>
                            <p className="text-sm text-slate-600">{question.explanation}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-8 text-center text-xs font-semibold text-slate-500">
            © Felipe VL - Produit Grammaire FLE
          </div>
        </div>
      </div>
    </div>
  );
}

if (typeof window === 'undefined') {
  const testQuestions = buildQuestions(20);
  const testAnswers = Array(20).fill(null);
  testAnswers[0] = testQuestions[0].answer;
  testAnswers[1] = 99;

  if (testQuestions.length !== 20) {
    throw new Error('buildQuestions should create 20 questions');
  }

  if (computeScore(testAnswers, testQuestions) !== 1) {
    throw new Error('computeScore should count only correct answers');
  }
}
