// 말이 섞임 (창 11:7 "그들의 언어를 혼잡케 하여"). 무대 위로 사람들이 하던 말이 떠오르다가,
// 글자가 하나씩 낯선 글자로 바뀌며 흩어진다. 같은 말을 하던 입에서 서로 못 알아듣는 말이 나온다.
import gsap from 'gsap';
import { reducedMotion } from '../engine/settings';

const WORDS = ['벽돌 이리 줘', '역청!', '위로 올려', '조금만 더', '우리 이름을', '하늘까지', '자, 쌓자', '여기 받쳐', '뭐라고?', '천천히'];
// 시스템 글꼴에 대개 있는 문자들 (히브리·그리스·아랍·키릴·라틴 + 뒤섞인 한글)
const GLYPHS = [
  ...'אבגדהוזחטיכלמנסעפצקרשת',
  ...'αβγδεζηθικλμνξπρστυφχψω',
  ...'ابتثجحخدذرزسشصضطظعغفقكلمنهوي',
  ...'бвгджзклмнпрстфцчшщыэюя',
  ...'ŋðþæøåœß',
  ...'뷁똠쀍햏귂믜뜷섥퀑',
];

/** 무대(.scene) 위에 뒤섞이는 말들을 띄운다. 몇 초 뒤 저절로 사라진다 */
export function babble(scene: HTMLElement): void {
  const box = document.createElement('div');
  box.className = 'babble';
  box.setAttribute('aria-hidden', 'true');
  scene.append(box);
  const rm = reducedMotion();
  const n = rm ? 6 : 14;
  const pick = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
  const tl = gsap.timeline({ onComplete: () => box.remove() });
  for (let i = 0; i < n; i++) {
    const word = WORDS[i % WORDS.length];
    const span = document.createElement('span');
    span.textContent = word;
    box.append(span);
    const x = 14 + ((i * 37) % 72);
    const y = 14 + ((i * 23) % 36);
    gsap.set(span, { left: `${x}%`, top: `${y}%`, xPercent: -50, opacity: 0 });
    const at = i * (rm ? 0.2 : 0.22);
    const chars = [...word];
    const mix = { k: 0 };
    tl.to(span, { opacity: 1, duration: 0.4 }, at);
    // 한 글자씩 낯선 글자로 바뀐다
    tl.to(mix, {
      k: chars.length,
      duration: rm ? 0.4 : 1.4,
      ease: 'none',
      onUpdate: () => {
        const k = Math.floor(mix.k);
        span.textContent = chars.map((c, j) => (j < k && c !== ' ' ? pick() : c)).join('');
      },
    }, at + 0.5);
    if (!rm) tl.to(span, { x: (i % 2 ? 1 : -1) * (40 + ((i * 29) % 80)), y: -30 - ((i * 17) % 40), rotation: (i % 3) - 1, duration: 3.2, ease: 'power1.out' }, at);
    tl.to(span, { opacity: 0, duration: 1, ease: 'power1.in' }, at + (rm ? 1.6 : 2.6));
  }
}
