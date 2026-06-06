import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const primaryTextColor = '#E1E0CC';
const ease = [0.16, 1, 0.3, 1] as const;
const cardEase = [0.22, 1, 0.36, 1] as const;

type WordsPullUpProps = {
  text: string;
  className?: string;
  showAsterisk?: boolean;
};

type StyledSegment = {
  text: string;
  className?: string;
};

type WordsPullUpMultiStyleProps = {
  segments: StyledSegment[];
  className?: string;
};

type FeatureCardProps = {
  index: number;
  number: string;
  title: string;
  iconUrl: string;
  items: string[];
};

const navItems = ['Storia', 'Collettivo', 'Workshop', 'Programmi', 'Contatti'];

const featureCards = [
  {
    number: '01',
    title: 'Visione.',
    iconUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85',
    items: [
      'Definiamo il mondo visivo del progetto.',
      'Raccogliamo riferimenti, tono e atmosfera.',
      'Trasformiamo l’idea in una direzione concreta.',
      'Costruiamo una base solida prima della produzione.',
    ],
  },
  {
    number: '02',
    title: 'Ripresa.',
    iconUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85',
    items: [
      'Disegniamo luce, movimento e composizione.',
      'Lavoriamo sul set con un approccio essenziale.',
      'Ogni inquadratura ha una funzione narrativa.',
      'L’immagine nasce già pensando alla post.',
    ],
  },
  {
    number: '03',
    title: 'Post-produzione.',
    iconUrl:
      'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85',
    items: [
      'Rifiniamo ritmo, colore e materia visiva.',
      'Integriamo VFX, motion e compositing.',
      'Puliamo, costruiamo e trasformiamo il frame.',
      'Portiamo il progetto alla sua forma finale.',
    ],
  },
];

function WordsPullUp({ text, className = '', showAsterisk = false }: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;

        return (
          <span key={`${word}-${index}`} className="overflow-hidden">
            <motion.span
              className="relative inline-block"
              initial={{ y: 20 }}
              animate={isInView ? { y: 0 } : { y: 20 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease }}
            >
              {word}
              {showAsterisk && isLastWord ? (
                <span className="absolute -right-[0.3em] top-[0.65em] text-[0.31em]">*</span>
              ) : null}
              {index < words.length - 1 ? '\u00A0' : null}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

function WordsPullUpMultiStyle({ segments, className = '' }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = segments.flatMap((segment, segmentIndex) =>
    segment.text.split(' ').map((word) => ({
      word,
      className: segment.className,
      segmentIndex,
    })),
  );

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {words.map(({ word, className: wordClassName, segmentIndex }, index) => (
        <span key={`${word}-${segmentIndex}-${index}`} className="overflow-hidden">
          <motion.span
            className={`inline-block ${wordClassName ?? ''}`}
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.8, delay: index * 0.08, ease }}
          >
            {word}
            {index < words.length - 1 ? '\u00A0' : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function AnimatedLetter({
  character,
  progress,
  index,
  total,
}: {
  character: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  index: number;
  total: number;
}) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} aria-hidden="true">
      {character}
    </motion.span>
  );
}

function Hero() {
  return (
    <section className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_055001_8e16d972-3b2b-441c-86ad-2901a54682f9.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 bg-black px-4 py-2 rounded-b-2xl md:px-8 md:rounded-b-3xl">
          <ul className="flex items-center gap-3 whitespace-nowrap sm:gap-6 md:gap-12 lg:gap-14">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="text-[10px] transition-colors sm:text-xs md:text-sm"
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.color = primaryTextColor;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.color = 'rgba(225, 224, 204, 0.8)';
                  }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12">
            <h1 className="lg:col-span-8" style={{ color: primaryTextColor }}>
              <WordsPullUp
                text="Prisma"
                showAsterisk
                className="text-[26vw] font-medium leading-[0.85] tracking-[-0.07em] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw]"
              />
            </h1>

            <div className="max-w-md pb-4 lg:col-span-4 lg:pb-10">
              <motion.p
                className="text-xs leading-[1.2] text-primary/90 sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                Prisma è una rete internazionale di artisti, filmmaker e storyteller uniti non
                da confini, ruoli o etichette, ma dalla stessa urgenza di trasformare prospettive
                uniche in opere capaci di lasciare il segno.
              </motion.p>
              <motion.a
                href="#"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary py-1 pl-5 pr-1 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                Entra nel laboratorio
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                  <ArrowRight className="h-4 w-4 text-primary" />
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const textRef = useRef<HTMLParagraphElement>(null);
  const bodyText =
    'Negli ultimi sette anni ho collaborato con Parallax, casa di produzione berlinese attiva tra cinema e serie, e con Noir Studio a Parigi. Insieme abbiamo firmato lavori selezionati e premiati in diversi festival internazionali.';
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  return (
    <section className="bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl bg-[#101010] px-5 py-16 text-center sm:px-8 md:py-24">
        <p className="mb-8 text-[10px] text-primary sm:text-xs">Chi sono</p>
        <h2
          className="mx-auto max-w-3xl text-3xl font-normal leading-[0.95] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
          style={{ color: primaryTextColor }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Sono Marco Rinaldi,' },
              { text: 'regista autodidatta.', className: 'font-serif italic' },
              { text: 'Mi occupo di color grading, effetti visivi e progettazione narrativa.' },
            ]}
          />
        </h2>
        <p ref={textRef} className="mx-auto mt-10 max-w-2xl text-xs leading-relaxed text-[#DEDBC8] sm:text-sm md:text-base">
          <span className="sr-only">{bodyText}</span>
          {bodyText.split('').map((character, index) => (
            <AnimatedLetter
              key={`${character}-${index}`}
              character={character}
              progress={scrollYProgress}
              index={index}
              total={bodyText.length}
            />
          ))}
        </p>
      </div>
    </section>
  );
}

function VideoFeatureCard() {
  return (
    <motion.article
      className="relative min-h-[360px] overflow-hidden bg-[#212121] lg:h-[480px]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: 0, ease: cardEase }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260422_112520_ee819691-f2e8-4c54-bb77-3fb72c84eaa5.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
      <p className="absolute bottom-5 left-5 text-lg font-normal" style={{ color: primaryTextColor }}>
        Dal concept al frame finale.
      </p>
    </motion.article>
  );
}

function FeatureCard({ index, number, title, iconUrl, items }: FeatureCardProps) {
  return (
    <motion.article
      className="flex min-h-[360px] flex-col bg-[#212121] p-5 sm:p-6 lg:h-[480px]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: cardEase }}
    >
      <img src={iconUrl} alt="" className="h-10 w-10 rounded object-cover sm:h-12 sm:w-12" />
      <div className="mt-8 flex items-start justify-between gap-4">
        <h3 className="text-xl font-normal text-primary">{title}</h3>
        <span className="text-sm text-gray-500">{number}</span>
      </div>
      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm text-gray-400">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <a href="#" className="mt-auto inline-flex items-center gap-2 pt-10 text-sm text-primary">
        Guarda cosa facciamo
        <ArrowRight className="h-4 w-4 -rotate-45" />
      </a>
    </motion.article>
  );
}

function Features() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black px-4 py-20 sm:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <h2
          className="mx-auto max-w-4xl text-center text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl"
          style={{ color: primaryTextColor }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Dove le idee diventano immagini.' },
              { text: "Dal set alla post-produzione. Alimentati dall'arte.", className: 'text-gray-500' },
            ]}
          />
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-3 sm:gap-2 md:grid-cols-2 md:gap-1 lg:grid-cols-4 lg:h-[480px]">
          <VideoFeatureCard />
          {featureCards.map((card, index) => (
            <FeatureCard key={card.number} {...card} index={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <main className="bg-black">
      <Hero />
      <About />
      <Features />
    </main>
  );
}
