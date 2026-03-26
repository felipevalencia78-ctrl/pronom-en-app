import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpenText,
  CheckCircle2,
  RotateCcw,
  Trophy,
  XCircle,
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    prompt: 'Complétez avec le bon pronom : « Tu vas à la bibliothèque ? Oui, j’_____ vais. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: 'Le pronom « y » remplace un lieu introduit par « à » : à la bibliothèque → j’y vais.',
  },
  {
    id: 2,
    prompt: 'Complétez avec le bon pronom : « Tu reviens de la plage ? Oui, j’_____ reviens à l’instant. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: 'Le pronom « en » remplace un nom introduit par « de » : de la plage → j’en reviens.',
  },
  {
    id: 3,
    prompt: 'Complétez avec le bon pronom : « Nous habitons dans ce quartier et nous _____ sommes très bien. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace ici le lieu introduit par « dans » : dans ce quartier → nous y sommes bien.',
  },
  {
    id: 4,
    prompt: 'Complétez avec le bon pronom : « Vous sortez du supermarché ? Oui, vous _____ sortez maintenant. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: '« En » remplace un nom introduit par « de » : du supermarché → vous en sortez.',
  },
  {
    id: 5,
    prompt: 'Complétez avec le bon pronom : « Elle pense à son travail, elle _____ pense souvent. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace souvent un complément introduit par « à » : à son travail → elle y pense.',
  },
  {
    id: 6,
    prompt: 'Complétez avec le bon pronom : « Tu parles de ton projet ? Oui, tu _____ parles souvent. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: '« En » remplace un complément introduit par « de » : de ton projet → tu en parles.',
  },
  {
    id: 7,
    prompt: 'Complétez avec le bon pronom : « Mes parents entrent dans le musée, ils _____ entrent avec le guide. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace ici un lieu introduit par « dans » : dans le musée → ils y entrent.',
  },
  {
    id: 8,
    prompt: 'Complétez avec le bon pronom : « Tu reviens de chez le médecin ? Oui, j’_____ reviens. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: '« En » remplace un complément introduit par « de » : de chez le médecin → j’en reviens.',
  },
  {
    id: 9,
    prompt: 'Complétez avec le bon pronom : « Nous restons sur la terrasse, nous _____ restons pour discuter. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace un lieu introduit par « sur » : sur la terrasse → nous y restons.',
  },
  {
    id: 10,
    prompt: 'Complétez avec le bon pronom : « Il rêve de ses vacances et il _____ rêve chaque soir. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: '« En » remplace « de ses vacances » : il en rêve.',
  },
  {
    id: 11,
    prompt: 'Complétez avec le bon pronom : « Vous retournez à Edmonton demain ? Oui, nous _____ retournons demain. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace un lieu introduit par « à » : à Edmonton → nous y retournons.',
  },
  {
    id: 12,
    prompt: 'Complétez avec le bon pronom : « Tu as besoin de sucre ? Oui, j’_____ ai besoin. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: 'Avec l’expression « avoir besoin de », on remplace le complément par « en ».',
  },
  {
    id: 13,
    prompt: 'Complétez avec le bon pronom : « Ils réfléchissent à la solution ? Oui, ils _____ réfléchissent. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Réfléchir à » prend souvent le pronom « y » : à la solution → ils y réfléchissent.',
  },
  {
    id: 14,
    prompt: 'Complétez avec le bon pronom : « Elle s’occupe de son jardin ? Oui, elle s’_____ occupe tous les week-ends. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: 'Avec « s’occuper de », on emploie « en » et il se place après le pronom réfléchi : elle s’en occupe.'
  },
  {
    id: 15,
    prompt: 'Complétez avec le bon pronom : « Nous montons sur cette colline cet après-midi, nous _____ montons avec des amis. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace un lieu introduit par « sur » : sur cette colline → nous y montons.',
  },
  {
    id: 16,
    prompt: 'Complétez avec le bon pronom : « Tu te souviens de ce film ? Oui, je m’_____ souviens très bien. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: 'Avec « se souvenir de », on emploie « en » : de ce film → je m’en souviens.',
  },
  {
    id: 17,
    prompt: 'Complétez avec le bon pronom : « Vous participez à la réunion ? Oui, vous _____ participez activement. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: 'Avec « participer à », on emploie « y » : à la réunion → vous y participez.',
  },
  {
    id: 18,
    prompt: 'Complétez avec le bon pronom : « Il sort du restaurant ? Oui, il _____ sort à l’instant. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: '« En » remplace « du restaurant » : il en sort.',
  },
  {
    id: 19,
    prompt: 'Complétez avec le bon pronom : « Nous vivons dans cette ville depuis dix ans, nous _____ vivons très heureux. »',
    options: ['y', 'en'],
    answer: 'y',
    explanation: '« Y » remplace le lieu introduit par « dans » : dans cette ville → nous y vivons.',
  },
  {
    id: 20,
    prompt: 'Complétez avec le bon pronom : « Tu doutes de ta réponse ? Oui, j’_____ doute encore un peu. »',
    options: ['y', 'en'],
    answer: 'en',
    explanation: 'Avec « douter de », on emploie « en » : de ta réponse → j’en doute.',
  },
];

const REMINDERS = [
  {
    title: 'y',
    note: 'lieu / à + chose',
    example: 'Je vais à la bibliothèque. → J’y vais.',
  },
  {
    title: 'en',
    note: 'de + nom / quantité',
    example: 'Je veux du café. → J’en veux.',
  },
  {
    title: 'place',
    note: 'avant le verbe',
    example: 'J’y vais. / J’en prends. / Nous y pensons. / Il en parle.',
  },
  {
    title: 'question utile',
    note: 'comment choisir ?',
    example: 'À quoi / où ? → y | De quoi / combien ? → en',
  },
];

const DATA_TESTS = [
  QUESTIONS.length === 20,
  REMINDERS.length === 4,
  QUESTIONS.every((question) => Array.isArray(question.options) && question.options.includes(question.answer)),
  QUESTIONS.every((question) => typeof question.prompt === 'string' && question.prompt.length > 0),
  QUESTIONS.every((question) => question.options.length === 2),
];

if (typeof console !== 'undefined' && DATA_TESTS.some((value) => !value)) {
  console.warn('PronomsYEnApp data sanity checks failed.', DATA_TESTS);
}

function highlightPronouns(text) {
  const value = String(text ?? '');
  const parts = value.split(/(\by\b|\ben\b)/gi);

  return parts.map((part, index) => {
    const normalized = part.toLowerCase();
    if (normalized === 'y' || normalized === 'en') {
      return (
        <strong key={index} className="font-black text-slate-900">
          {part}
        </strong>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function buildFeedback(question, answer) {
  const correct = answer === question.answer;
  return {
    correct,
    message: correct
      ? question.explanation
      : `${question.explanation} Bonne réponse : « ${question.answer} ».`,
  };
}

function shuffleArray(items) {
  const array = [...items];
  for (let index = array.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
}

function shuffleQuestionsWithOptions(items) {
  return shuffleArray(items).map((question) => ({
    ...question,
    options: shuffleArray(question.options),
  }));
}

function Header({ started, score, currentIndex, total }) {
  const progress = started ? (currentIndex / total) * 100 : 0;

  return (
    <div className="rounded-[24px] border border-white/15 bg-gradient-to-r from-slate-950 via-blue-950 to-sky-900 px-3.5 py-2.5 shadow-xl backdrop-blur md:px-4 md:py-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-blue-700 text-white shadow-lg ring-1 ring-white/30 md:h-11 md:w-11">
            <BookOpenText className="h-4.5 w-4.5 md:h-5 md:w-5" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-black leading-tight tracking-tight text-white md:text-[28px]">
              Les pronoms y et en
            </h1>
            <p className="mt-1 max-w-2xl text-[10px] leading-relaxed text-white/80 md:text-[13px]">
              Objectif : choisir correctement <strong>y</strong> et <strong>en</strong> et bien les placer dans la phrase.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 self-start sm:flex sm:shrink-0 sm:items-start">
          <div className="min-w-[56px] rounded-xl border border-white/10 bg-white/10 px-2 py-1 text-center shadow-sm backdrop-blur-sm">
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/60">Score</p>
            <p className="mt-0.5 text-sm font-black leading-none text-white md:text-[15px]">{score}</p>
          </div>
          <div className="min-w-[66px] rounded-xl border border-white/10 bg-white/10 px-2 py-1 text-center shadow-sm backdrop-blur-sm">
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/60">Question</p>
            <p className="mt-0.5 text-sm font-black leading-none text-white md:text-[15px]">
              {started ? `${Math.min(currentIndex + 1, total)}/${total}` : `0/${total}`}
            </p>
          </div>
          <div className="min-w-[52px] rounded-xl border border-white/10 bg-white/10 px-2 py-1 text-center shadow-sm backdrop-blur-sm">
            <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/60">XP</p>
            <p className="mt-0.5 text-sm font-black leading-none text-white md:text-[15px]">{score * 10}</p>
          </div>
        </div>
      </div>

      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-700 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ModalShell({ open, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-2 py-3 sm:px-3 sm:py-4">
      <button
        type="button"
        aria-label="Fermer"
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[22px] border border-white/70 bg-white/96 shadow-2xl sm:rounded-[26px]">
        <div className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 px-3 py-2.5 text-white sm:px-4 sm:py-3 md:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <BookOpenText className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-base font-black md:text-lg">{title}</p>
                <p className="mt-0.5 text-xs text-white/85">{subtitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-white/15 px-3 py-1.5 text-xs font-black text-white transition hover:bg-white/20"
            >
              Fermer
            </button>
          </div>
        </div>

        <div className="max-h-[80dvh] overflow-y-auto p-3 sm:max-h-[72dvh] sm:p-4">{children}</div>
      </div>
    </div>
  );
}

function ReminderModal({ open, onClose }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Rappel"
      subtitle="Les règles essentielles pour comprendre et utiliser y et en."
    >
      <div className="grid gap-2.5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
          <p className="font-black text-slate-800">y</p>
          <p className="mt-0.5 text-[11px] font-semibold text-cyan-700">lieu / à + chose</p>
          <p className="mt-1 font-medium text-slate-700">{highlightPronouns('Je vais à la bibliothèque. → J’y vais.')}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
          <p className="font-black text-slate-800">en</p>
          <p className="mt-0.5 text-[11px] font-semibold text-cyan-700">de + nom / quantité</p>
          <p className="mt-1 font-medium text-slate-700">{highlightPronouns('Je veux du café. → J’en veux.')}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
          <p className="font-black text-slate-800">Place</p>
          <p className="mt-0.5 text-[11px] font-semibold text-cyan-700">avant le verbe</p>
          <p className="mt-1 font-medium text-slate-700">{highlightPronouns('J’y vais. / J’en prends. / Nous y pensons. / Il en parle.')}</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
        <p className="text-sm font-black text-slate-800 md:text-base">Comment choisir ?</p>
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-2.5">
            <p className="text-[11px] font-black text-slate-800 md:text-xs">On choisit y</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-700 md:text-[12px]">
              pour remplacer un <strong>lieu</strong> ou un complément introduit par <strong>à</strong>.
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-700 md:text-[12px]">
              <strong>Questions utiles :</strong> où ? à quoi ?
            </p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-2.5">
            <p className="text-[11px] font-black text-slate-800 md:text-xs">On choisit en</p>
            <p className="mt-1 text-[11px] leading-snug text-slate-700 md:text-[12px]">
              pour remplacer un complément introduit par <strong>de</strong> ou une <strong>quantité</strong>.
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-700 md:text-[12px]">
              <strong>Questions utiles :</strong> de quoi ? combien ?
            </p>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

function AnswersModal({ open, onClose, answers, questions }) {
  return (
    <ModalShell
      open={open}
      onClose={onClose}
      title="Voir les réponses"
      subtitle="Consulte les réponses données et les bonnes réponses pour chaque question."
    >
      <div className="mx-auto max-w-3xl space-y-2">
        {questions.map((question, index) => {
          const userAnswer = answers[question.id] ?? '—';
          const isCorrect = answers[question.id] === question.answer;

          return (
            <div key={question.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 shadow-sm">
              <p className="text-center text-[11px] font-black uppercase tracking-[0.16em] text-cyan-700">
                Question {index + 1}
              </p>
              <p className="mt-1 text-center text-sm font-black leading-snug text-slate-800">{question.prompt}</p>
              <div className="mx-auto mt-2 grid max-w-2xl gap-2 md:grid-cols-2">
                <div className={`rounded-xl border p-2 text-center ${isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'}`}>
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Ta réponse</p>
                  <p className={`mt-1 text-sm font-semibold ${isCorrect ? 'text-emerald-800' : 'text-rose-800'}`}>{userAnswer}</p>
                </div>
                <div className="rounded-xl border border-cyan-200 bg-cyan-50 p-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-wide text-slate-500">Bonne réponse</p>
                  <p className="mt-1 text-sm font-semibold text-cyan-900">{question.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ModalShell>
  );
}

function Home({ hasProgress, onStart, onResetProgress }) {
  return (
    <div className="rounded-[22px] border border-white/15 bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 p-2.5 text-white shadow-xl md:p-3">
      <div className="flex items-center gap-2">
        <BookOpenText className="h-5 w-5 text-cyan-300" />
        <h3 className="text-base font-black text-white md:text-lg">Fonctionnement</h3>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm md:p-3.5">
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
            <p className="text-[11px] font-black text-cyan-200 md:text-xs">Choisir y</p>
            <p className="mt-1 text-[11px] font-medium leading-snug text-white/90 md:text-[12px]">
              On utilise <strong className="text-white">y</strong> pour remplacer un <strong className="text-white">nom ou un lieu</strong> introduit par <strong className="text-white">à, sur, dans</strong>, etc.
            </p>
            <p className="mt-1 text-[11px] font-medium leading-snug text-white md:text-[12px]">
              <strong className="text-white">Exemple :</strong> Le climat est agréable sur cette île. → Oui, il y est agréable.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-2.5">
            <p className="text-[11px] font-black text-cyan-200 md:text-xs">Choisir en</p>
            <p className="mt-1 text-[11px] font-medium leading-snug text-white/90 md:text-[12px]">
              On utilise <strong className="text-white">en</strong> pour remplacer un <strong className="text-white">nom</strong> introduit par la préposition <strong className="text-white">de</strong>.
            </p>
            <p className="mt-1 text-[11px] font-medium leading-snug text-white md:text-[12px]">
              <strong className="text-white">Exemple :</strong> Tu reviens de la plage ? → Oui, j’en reviens à l’instant.
            </p>
          </div>
        </div>

        <div className="mt-2 rounded-xl border border-cyan-400/15 bg-cyan-400/10 p-1.5">
          <p className="text-[10px] font-black text-white">Place dans la phrase</p>
          <p className="mt-0.5 text-[10px] font-medium text-white/90">
            En général, <strong className="text-white">y</strong> et <strong className="text-white">en</strong>
            se placent <strong className="text-white">avant le verbe</strong> : j’y vais, j’en prends, nous y pensons, elle en parle.
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        <button
          type="button"
          onClick={onStart}
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-3.5 py-2 text-sm font-black text-white shadow-lg transition hover:scale-[1.01] sm:w-auto sm:py-1.5 md:text-[14px]"
        >
          {hasProgress ? 'Reprendre' : 'S’entraîner'}
          <ArrowRight className="h-4 w-4" />
        </button>

        {hasProgress ? (
          <button
            type="button"
            onClick={onResetProgress}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/10 px-3.5 py-2 text-sm font-black text-white shadow-lg transition hover:bg-white/15 sm:w-auto sm:py-1.5 md:text-[14px] backdrop-blur-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </button>
        ) : null}
      </div>
    </div>
  );
}

function QuestionCard({ question, currentIndex, total, selected, feedback, onSelect, onNext, onPrevious, onGoHome, onOpenReminder }) {
  return (
    <div className="rounded-[22px] border border-white/15 bg-gradient-to-br from-slate-950 via-blue-950 to-sky-900 p-3 shadow-xl md:p-3.5">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-black text-white transition hover:bg-white/15 backdrop-blur-sm"
        >
          Accueil
        </button>

        <button
          type="button"
          onClick={onOpenReminder}
          className="inline-flex items-center gap-1 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-black text-white transition hover:bg-white/15 backdrop-blur-sm"
        >
          <BookOpenText className="h-4 w-4" />
          Rappel
        </button>
      </div>

      <h3 className="mt-2.5 text-center text-base font-black leading-snug text-white md:text-lg">{question.prompt}</h3>

      <div className="mt-3 grid gap-2">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const showCorrect = Boolean(feedback) && option === question.answer;
          const showWrong = Boolean(feedback) && isSelected && option !== question.answer;

          let optionClassName = 'border-slate-200 bg-white text-slate-800 hover:-translate-y-0.5 hover:scale-[1.01] hover:border-cyan-300 hover:bg-slate-50';

          if (showCorrect) {
            optionClassName = 'border-emerald-300 bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md';
          } else if (showWrong) {
            optionClassName = 'border-rose-300 bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md';
          } else if (isSelected) {
            optionClassName = 'border-cyan-500 bg-white text-slate-800 ring-2 ring-cyan-400/40 hover:-translate-y-0.5 hover:scale-[1.01]';
          }

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              disabled={Boolean(feedback)}
              className={`mx-auto w-full max-w-xl transform rounded-2xl border px-2.5 py-2 text-sm font-semibold transition-all duration-200 md:text-[15px] ${optionClassName}`}
            >
              <div className="relative flex items-center justify-center gap-3">
                <span className="block text-center">{highlightPronouns(option)}</span>
                {showCorrect ? <CheckCircle2 className="absolute right-0 h-4 w-4 shrink-0" /> : null}
                {showWrong ? <XCircle className="absolute right-0 h-4 w-4 shrink-0" /> : null}
              </div>
            </button>
          );
        })}
      </div>

      {feedback ? (
        <div className={`mt-3 rounded-2xl border p-3 ${feedback.correct ? 'border-emerald-300 bg-gradient-to-r from-emerald-500 to-green-600' : 'border-rose-300 bg-gradient-to-r from-rose-500 to-red-600'}`}>
          <p className="flex items-center gap-2 text-sm font-black text-white">
            {feedback.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {feedback.correct ? 'Bravo !' : 'Attention !'}
          </p>
          <p className="mt-1 text-[13px] font-medium text-white md:text-[15px]">{highlightPronouns(feedback.message)}</p>
          <div className="mt-2.5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="rounded-xl bg-cyan-600 px-3.5 py-2 text-sm font-black text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 sm:py-1.5"
            >
              Question précédente
            </button>
            <button
              type="button"
              onClick={onNext}
              className="rounded-xl border border-white/20 bg-white/15 px-3.5 py-2 text-sm font-black text-white transition hover:bg-white/20 backdrop-blur-sm sm:py-1.5"
            >
              {currentIndex === total - 1 ? 'Voir le résultat' : 'Question suivante'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ResultScreen({ score, total, onGoHome, onOpenAnswers }) {
  const percent = Math.round((score / total) * 100);

  const message = useMemo(() => {
    if (percent === 100) return 'Excellent ! Tu maîtrises très bien les pronoms y et en.';
    if (percent >= 80) return 'Très bon travail ! Tu as bien compris comment choisir y et en.';
    if (percent >= 60) return 'Bon effort ! Continue à t’entraîner pour fixer les automatismes.';
    return 'Courage ! Refaire l’activité va t’aider à mieux mémoriser les règles.';
  }, [percent]);

  return (
    <div className="rounded-[20px] border border-white/70 bg-white/94 p-2.5 text-center shadow-xl md:p-3">
      <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg">
        <Trophy className="h-5 w-5" />
      </div>
      <h2 className="mt-1.5 text-xl font-black text-slate-800">Résultat</h2>
      <p className="mt-1 text-[13px] font-medium text-slate-700">{message}</p>

      <div className="mx-auto mt-2.5 max-w-md">
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="mx-auto mt-2.5 grid max-w-lg gap-1.5 sm:grid-cols-3">
        <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-2">
          <p className="text-[10px] font-black uppercase tracking-wide text-cyan-700">Bonnes réponses</p>
          <p className="mt-0.5 text-base font-black text-slate-800">{score}/{total}</p>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-2">
          <p className="text-[10px] font-black uppercase tracking-wide text-emerald-700">Pourcentage</p>
          <p className="mt-0.5 text-base font-black text-slate-800">{percent}%</p>
        </div>
        <div className="rounded-2xl border border-violet-100 bg-violet-50 p-2">
          <p className="text-[10px] font-black uppercase tracking-wide text-violet-700">XP gagné</p>
          <p className="mt-0.5 text-base font-black text-slate-800">{score * 10}</p>
        </div>
      </div>

      <div className="mt-3 flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
        <button
          type="button"
          onClick={onGoHome}
          className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800 md:text-[15px]"
        >
          Accueil
        </button>
        <button
          type="button"
          onClick={onOpenAnswers}
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-black text-white transition hover:scale-[1.01] md:text-[15px]"
        >
          Voir les réponses
        </button>
      </div>
    </div>
  );
}

export default function PronomsYEnApp() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState(() => shuffleQuestionsWithOptions(QUESTIONS));

  const hasProgress = Object.keys(answers).length > 0 || finished;
  const currentQuestion = shuffledQuestions[currentIndex];
  const selected = currentQuestion ? answers[currentQuestion.id] ?? null : null;

  const score = useMemo(() => {
    return shuffledQuestions.reduce((total, question) => (answers[question.id] === question.answer ? total + 1 : total), 0);
  }, [answers, shuffledQuestions]);

  const openQuestionAt = (index) => {
    const safeIndex = Math.max(0, Math.min(index, shuffledQuestions.length - 1));
    const question = shuffledQuestions[safeIndex];
    const existingAnswer = answers[question.id];

    setCurrentIndex(safeIndex);
    setStarted(true);
    setFinished(false);
    setShowAnswers(false);
    setFeedback(existingAnswer != null ? buildFeedback(question, existingAnswer) : null);
  };

  const startGame = () => {
    if (!hasProgress) {
      const newQuestions = shuffleQuestionsWithOptions(QUESTIONS);
      setShuffledQuestions(newQuestions);
      setStarted(true);
      setFinished(false);
      setCurrentIndex(0);
      setAnswers({});
      setFeedback(null);
      setShowAnswers(false);
      return;
    }

    if (finished) {
      const firstUnansweredIndex = shuffledQuestions.findIndex((question) => answers[question.id] == null);
      const resumeIndex = firstUnansweredIndex === -1 ? shuffledQuestions.length - 1 : firstUnansweredIndex;
      openQuestionAt(resumeIndex);
      return;
    }

    openQuestionAt(currentIndex);
  };

  const resetGame = () => {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers({});
    setFeedback(null);
    setFinished(false);
    setShowReminder(false);
    setShowAnswers(false);
    setShuffledQuestions(shuffleQuestionsWithOptions(QUESTIONS));
  };

  const goHome = () => {
    setStarted(false);
    setFeedback(null);
    setFinished(false);
    setShowReminder(false);
    setShowAnswers(false);
  };

  const handleSelect = (option) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
    setFeedback(buildFeedback(currentQuestion, option));
  };

  const handleNext = () => {
    if (currentIndex === shuffledQuestions.length - 1) {
      setStarted(false);
      setFinished(true);
      setFeedback(null);
      setShowReminder(false);
      return;
    }

    openQuestionAt(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex === 0) return;
    openQuestionAt(currentIndex - 1);
  };

  return (
    <div
      className="relative min-h-[100dvh] overflow-hidden bg-cover bg-center bg-fixed lg:h-screen"
      style={{
        backgroundImage:
          "linear-gradient(rgba(7, 18, 38, 0.42), rgba(7, 18, 38, 0.42)), url('https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-4xl grid-rows-[auto_1fr_auto] px-2 py-2 sm:px-3 md:px-4 md:py-2.5 lg:h-full">
        <Header started={started} score={score} currentIndex={currentIndex} total={shuffledQuestions.length} />

        <ReminderModal open={showReminder} onClose={() => setShowReminder(false)} />
        <AnswersModal open={showAnswers} onClose={() => setShowAnswers(false)} answers={answers} questions={shuffledQuestions} />

        <div className="mt-2 min-h-0 overflow-auto">
          {!started && !finished ? (
            <Home hasProgress={hasProgress} onStart={startGame} onResetProgress={resetGame} />
          ) : finished ? (
            <ResultScreen score={score} total={shuffledQuestions.length} onGoHome={goHome} onOpenAnswers={() => setShowAnswers(true)} />
          ) : (
            <QuestionCard
              question={currentQuestion}
              currentIndex={currentIndex}
              total={shuffledQuestions.length}
              selected={selected}
              feedback={feedback}
              onSelect={handleSelect}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onGoHome={goHome}
              onOpenReminder={() => setShowReminder(true)}
            />
          )}
        </div>

        <div className="mt-1.5 px-2 text-center text-[9px] font-semibold tracking-wide text-white/75 sm:text-[10px] md:text-[11px]">
          © Felipe VL - Produit Grammaire FLE
        </div>
      </div>
    </div>
  );
}
