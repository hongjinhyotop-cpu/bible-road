// 위임식과 하늘에서 내린 불 (레 8–9, A급 lev-8-9-fire 「하늘에서 내린 불」). 같은 종이 오려낸 그림자극 말투.
// 배경 그림 (engine/moods.ts의 mood 이름 → art 이름):
//  - ord-court : 회막 문 앞, 정면. 세마포 뜰 울타리와 청·자·홍색 뜰 문, 그 너머 성막 장막 지붕과 위에 선 구름 기둥,
//                앞에 네 뿔 달린 놋 번제단(아직 불 없음)과 오른쪽 물두멍 (레 8:3-4 "회중이 회막 문에 모인지라")
//  - ord-altar : 같은 뜰, 제단 위에 제물이 타고 연기가 오른다 (레 8:16-28, 9:8-21)
//  - ord-blaze : 하늘에서 내린 불이 지나간 뒤. 제단 위에 큰 금빛 불, 뜰 전체가 금빛으로 물들고 구름 기둥 속이 빛난다 (레 9:24)
// 효과 fx "fire-fall" (playFireFall): 구름 기둥 아래 성막 쪽이 밝아지고, 거기서 금빛 불줄기가 제단으로 내리꽂혀
// 번쩍 → 불티가 솟고 무대 전체가 금빛으로 물들었다 천천히 가라앉는다 (약 9초, 레 9:24 "불이 여호와 앞에서 나와").
// 하나님은 그리지 않는다 — 구름·빛·불로만 (CLAUDE.md 8-1).
// 폰(세로 화면)에서는 x 100~300만 보인다 → 성막·제단(200)은 가운데, 물두멍은 그 안 오른쪽.
import gsap from 'gsap';
import { W, H, rng, tent } from './backdrop';

export type OrdState = 'court' | 'altar' | 'blaze';

const f = (n: number) => n.toFixed(1);
const CX = 200;
/** 제단이 선 땅 */
const AG = 246;
/** 뜰 울타리 위·아래 */
const FT = 204;
const FB = 232;

/** 구름 기둥: 성막 위에 선 흰 구름 (출 40:34-38). blaze면 속이 금빛으로 빛난다 */
function cloudPillar(state: OrdState): string {
  const r = rng(8101);
  const puffs: string[] = [];
  for (let i = 0; i < 16; i++) {
    const t = i / 15;
    const y = 150 - t * 140 + (r() - 0.5) * 6;
    const w = 15 + Math.sin(t * Math.PI) * 9 + r() * 6;
    puffs.push(`<ellipse class="od-cloud__puff" style="--d:${f(r() * 6)}s" cx="${f(CX + (r() - 0.5) * 10)}" cy="${f(y)}" rx="${f(w)}" ry="${f(w * 0.62)}"/>`);
  }
  return `<g class="od-cloud${state === 'blaze' ? ' is-lit' : ''}">
    <ellipse class="od-cloud__glow" cx="${CX}" cy="96" rx="64" ry="120"/>
    ${puffs.join('')}
  </g>`;
}

/** 성막 장막: 뜰 울타리 너머로 보이는 지붕(해달 가죽 덮개)과 앞 기둥 다섯, 그 사이 문 휘장 */
function tabernacle(): string {
  const pillars = [0, 1, 2, 3, 4].map((i) => {
    const x = 164 + i * 18;
    return `<rect class="od-tent__post" x="${x - 1.4}" y="160" width="2.8" height="${FT - 160}"/><rect class="od-tent__cap" x="${x - 2.2}" y="158.5" width="4.4" height="2.4"/>`;
  }).join('');
  const screen = ['od-blue', 'od-purple', 'od-scarlet', 'od-linen', 'od-blue', 'od-purple', 'od-scarlet'].map((c, i) =>
    `<rect class="${c}" x="166" y="${f(162 + i * 6)}" width="68" height="6.2"/>`).join('');
  return `<g class="od-tent">
    <path class="od-tent__roof" d="M146 ${FT} L150 160 C170 154 230 154 250 160 L254 ${FT} Z"/>
    <path class="od-tent__drape" d="M150 160 C170 154 230 154 250 160 L250 166 C230 161 170 161 150 166 Z"/>
    <g class="od-tent__screen">${screen}</g>
    ${pillars}
    <ellipse class="od-tent__shine" cx="${CX}" cy="182" rx="38" ry="24"/>
  </g>`;
}

/** 뜰 울타리: 세마포 포장, 기둥, 은 갈고리. 가운데 뜰 문(청·자·홍색 수놓은 장) */
function fence(): string {
  const posts: string[] = [];
  for (let x = -400; x <= 800; x += 15) {
    if (x > 168 && x < 232) continue;
    posts.push(`<rect x="${x - 1}" y="${FT - 2}" width="2" height="${FB - FT + 2}"/><rect class="od-silver" x="${x - 1.6}" y="${FT - 3}" width="3.2" height="1.8"/>`);
  }
  const gate = ['od-blue', 'od-linen', 'od-purple', 'od-linen', 'od-scarlet'].map((c, i) =>
    `<rect class="${c}" x="172" y="${f(FT + 2 + i * 5.6)}" width="56" height="5.8"/>`).join('');
  const gatePosts = [172, 186, 200, 214, 228].map((x) => `<rect class="od-fence__post" x="${x - 1}" y="${FT - 2}" width="2" height="${FB - FT + 2}"/>`).join('');
  return `<g class="od-fence">
    <path class="od-linen od-fence__cloth" d="M-400 ${FT} L168 ${FT} L168 ${FB} L-400 ${FB} Z M232 ${FT} L800 ${FT} L800 ${FB} L232 ${FB} Z"/>
    <path class="od-fence__fold" d="${Array.from({ length: 80 }, (_, i) => `M${-400 + i * 15 + 7} ${FT + 2} L${-400 + i * 15 + 7} ${FB - 1}`).join(' ')}"/>
    <g class="od-fence__post">${posts.join('')}</g>
    <g class="od-gate">${gate}</g>
    ${gatePosts}
  </g>`;
}

/** 놋 번제단: 네 모퉁이에 뿔, 가운데 그물 띠, 채 고리 (출 27:1-8) */
function altar(state: OrdState): string {
  const top = AG - 22;
  const horn = (x: number) => `<path d="M${x - 3} ${top} L${x - 2} ${top - 5} Q${x} ${top - 8} ${x + 2} ${top - 5} L${x + 3} ${top} Z"/>`;
  const net = Array.from({ length: 9 }, (_, i) => `M${CX - 20 + i * 5} ${top + 8} L${CX - 18 + i * 5} ${top + 13}`).join(' ');
  const r = rng(8201);
  const burning = state !== 'court';
  // 제물: 제단 위에 얹은 덩이들 (실루엣)
  const pieces = burning ? `<g class="od-pieces"><path d="M${CX - 15} ${top} Q${CX - 10} ${top - 6} ${CX - 2} ${top - 4} Q${CX + 6} ${top - 8} ${CX + 14} ${top - 2} L${CX + 15} ${top} Z"/></g>` : '';
  const smoke = burning ? `<g class="od-smoke">${Array.from({ length: state === 'blaze' ? 4 : 8 }, (_, i) =>
    `<circle class="od-smoke__puff" style="--d:${f(i * 0.9 + r())}s; --dx:${f((r() - 0.5) * 26)}px" cx="${CX}" cy="${top - 6}" r="${f(4 + r() * 2.5)}"/>`).join('')}</g>` : '';
  const embers = burning ? `<g class="od-embers">${Array.from({ length: 5 }, (_, i) => flame(CX - 12 + i * 6, top - 1, 6 + ((i * 5) % 6), 1, i * 0.4)).join('')}</g>` : '';
  const blaze = state === 'blaze' ? bigFire(top) : '';
  return `<g class="od-altar">
    ${smoke}
    <circle class="od-altar__light" cx="${CX}" cy="${top - 10}" r="${state === 'blaze' ? 90 : 40}"/>
    <g class="od-bronze">
      <rect x="${CX - 22}" y="${top}" width="44" height="22" rx="1"/>
      ${horn(CX - 20)}${horn(CX + 20)}
    </g>
    <path class="od-bronze__hi" d="M${CX - 21} ${top + 1} L${CX + 21} ${top + 1}"/>
    <path class="od-net" d="${net}"/>
    <path class="od-net od-net--band" d="M${CX - 22} ${top + 8} L${CX + 22} ${top + 8} M${CX - 22} ${top + 13} L${CX + 22} ${top + 13}"/>
    <circle class="od-ring" cx="${CX - 16}" cy="${top + 10.5}" r="1.4"/><circle class="od-ring" cx="${CX + 16}" cy="${top + 10.5}" r="1.4"/>
    ${pieces}${embers}${blaze}
    <rect class="od-altar__top" x="${CX - 20}" y="${top - 2}" width="40" height="2" opacity="0"/>
  </g>`;
}

/** 물두멍: 놋 받침 위의 둥근 대야 (출 30:18) */
function laver(): string {
  const x = 266;
  return `<g class="od-laver">
    <path class="od-bronze" d="M${x - 4} ${AG} L${x - 2} ${AG - 10} L${x + 2} ${AG - 10} L${x + 4} ${AG} Z"/>
    <path class="od-bronze" d="M${x - 12} ${AG - 16} Q${x} ${AG - 6} ${x + 12} ${AG - 16} Z"/>
    <ellipse class="od-water" cx="${x}" cy="${AG - 16}" rx="12" ry="1.8"/>
  </g>`;
}

/** 불꽃 하나 (x, 바닥 y, 높이 h, 너비 w, 지연) — 바깥 g는 위치, 안쪽 g는 일렁임 */
function flame(x: number, y: number, h: number, w: number, d: number): string {
  return `<g transform="translate(${f(x)} ${f(y)})"><g class="od-flame" style="--d:${f(d)}s; --t:${f(1 + (h % 7) * 0.12)}s">
    <path class="od-flame__out" d="M${f(-w * 2.4)} 0 Q${f(-w * 3)} ${f(-h * 0.5)} 0 ${f(-h)} Q${f(w * 3)} ${f(-h * 0.5)} ${f(w * 2.4)} 0 Z"/>
    <path class="od-flame__in" d="M${f(-w)} 0 Q${f(-w * 1.2)} ${f(-h * 0.35)} 0 ${f(-h * 0.6)} Q${f(w * 1.2)} ${f(-h * 0.35)} ${f(w)} 0 Z"/>
  </g></g>`;
}

/** 하늘에서 내린 불이 제단 위에 남은 모습: 높은 금빛 불길, 위로 솟는 불티 (레 9:24 "단 위의 번제물과 기름을 사른지라") */
function bigFire(top: number): string {
  const r = rng(8301);
  const tongues = (n: number, spread: number, hMax: number, back: boolean) => Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1) - 0.5;
    const h = hMax * (1 - Math.abs(t) * 1.4) * (0.65 + r() * 0.45);
    return flame(CX + t * spread + (r() - 0.5) * 3, top + (back ? -1 : 1), h, (back ? 2.4 : 1.8) + r(), r() * 2);
  }).join('');
  const sparks = Array.from({ length: 16 }, () => `<circle class="od-spark" style="--d:${f(r() * 4)}s; --dx:${f((r() - 0.5) * 50)}px; --t:${f(2.4 + r() * 2.2)}s" cx="${f(CX + (r() - 0.5) * 36)}" cy="${f(top - 24)}" r="${f(0.6 + r() * 0.8)}"/>`).join('');
  return `<g class="od-blaze">
    <g class="od-blaze__back">${tongues(9, 50, 62, true)}</g>
    <g class="od-blaze__front">${tongues(11, 42, 40, false)}</g>
    ${sparks}
  </g>`;
}

/** 진: 울타리 양옆 멀리 늘어선 장막들 */
function camp(): string {
  const r = rng(8401);
  const spots: number[] = [-260, -190, -120, -50, 20, 78, 122, 278, 322, 380, 450, 520, 590, 660];
  return `<g class="od-camp">${spots.map((x) => tent(x + (r() - 0.5) * 10, 206 + r() * 3, 0.22 + r() * 0.06)).join('')}</g>`;
}

export function ordinationArt(state: OrdState): string {
  return `<g class="od od--${state}">
    <path class="bd-far" d="M${-W * 2} 210 C-300 192 -120 198 20 190 C90 186 130 196 170 194 C230 190 290 186 360 194 C480 200 640 190 ${W * 3} 200 L${W * 3} ${H} L${-W * 2} ${H} Z"/>
    ${cloudPillar(state)}
    ${camp()}
    ${tabernacle()}
    ${fence()}
    <path class="bd-mid od-yard" d="M${-W * 2} ${H} L${-W * 2} ${FB} L${W * 3} ${FB} L${W * 3} ${H} Z"/>
    ${laver()}
    ${altar(state)}
    <path class="bd-near od-near" d="M${-W * 2} ${H} L${-W * 2} 252 C-300 249 0 255 200 252 C400 249 700 255 ${W * 3} 251 L${W * 3} ${H} Z"/>
    ${state === 'blaze' ? `<rect class="od-wash" x="${-W * 2}" y="0" width="${W * 5}" height="${H}"/>` : ''}
  </g>`;
}

// ── 효과 fire-fall: 여호와 앞에서 불이 나와 제단을 사른다 (레 9:24) ─────────────
/** scene = .scene. 시작점 = 성막(구름 기둥 아래), 끝점 = 제단 윗면. 배경에 그 그림이 없으면 화면 비율로 */
export function playFireFall(scene: HTMLElement, rm: boolean): void {
  const b = scene.getBoundingClientRect();
  const last = scene.querySelector('.scene__backdrop .backdrop:last-child');
  const at = (sel: string, fx: number, fy: number) => {
    const n = last?.querySelector(sel) ?? scene.querySelector(sel);
    const a = n?.getBoundingClientRect();
    if (a && (a.width || a.height)) return { x: a.left - b.left + a.width / 2, y: a.top - b.top + a.height / 2 };
    return { x: b.width * fx, y: b.height * fy };
  };
  const from = at('.od-tent__shine', 0.5, 0.58);
  const to = at('.od-altar__top', 0.5, 0.82);

  const layer = document.createElement('div');
  layer.className = 'fx-firefall';
  layer.style.setProperty('--x0', `${from.x}px`);
  layer.style.setProperty('--y0', `${from.y}px`);
  layer.style.setProperty('--x1', `${to.x}px`);
  layer.style.setProperty('--y1', `${to.y}px`);
  const len = Math.max(20, to.y - from.y);
  layer.style.setProperty('--len', `${len}px`);
  const sparks = rm ? '' : Array.from({ length: 28 }, (_, i) => {
    const a = (Math.random() - 0.5) * 2.4;
    return `<i style="--dx:${(Math.sin(a) * (40 + Math.random() * 110)).toFixed(0)}px; --dy:${(-60 - Math.random() * 160).toFixed(0)}px; --d:${(i * 0.035).toFixed(2)}s; --s:${(0.6 + Math.random()).toFixed(2)}"></i>`;
  }).join('');
  layer.innerHTML = `<b class="fx-firefall__source"></b><b class="fx-firefall__bolt"></b><b class="fx-firefall__burst"></b><b class="fx-firefall__ring"></b><b class="fx-firefall__wash"></b><span class="fx-firefall__sparks">${sparks}</span>`;
  scene.append(layer);
  const life = rm ? 3200 : 9400;
  setTimeout(() => layer.classList.add('is-out'), life - 1800);
  setTimeout(() => layer.remove(), life);
  if (rm) return;

  const $ = (s: string) => layer.querySelector<HTMLElement>(s)!;
  const tl = gsap.timeline();
  // 1) 성막 쪽이 숨을 들이쉬듯 밝아진다
  tl.fromTo($('.fx-firefall__source'), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.in' }, 0);
  // 2) 불줄기가 제단으로 내리꽂힌다
  tl.fromTo($('.fx-firefall__bolt'), { scaleY: 0, opacity: 1 }, { scaleY: 1, duration: 0.38, ease: 'power3.in' }, 1.0);
  const hit = 1.38;
  // 3) 번쩍, 흔들림, 불꽃의 고리
  tl.add(() => {
    const flash = scene.closest('.play')?.querySelector<HTMLElement>('.play__flash');
    if (flash) gsap.fromTo(flash, { opacity: 0.85 }, { opacity: 0, duration: 1.6, ease: 'power2.out' });
    gsap.fromTo(scene, { y: -5 }, { y: 0, duration: 0.8, ease: 'elastic.out(1.2, 0.25)' });
    layer.classList.add('is-hit');
  }, hit);
  tl.fromTo($('.fx-firefall__burst'), { opacity: 1, scale: 0.2 }, { opacity: 0.85, scale: 1, duration: 0.7, ease: 'expo.out' }, hit);
  tl.fromTo($('.fx-firefall__ring'), { opacity: 0.9, scale: 0.1 }, { opacity: 0, scale: 1, duration: 1.6, ease: 'power2.out' }, hit);
  tl.to($('.fx-firefall__bolt'), { scaleX: 2.6, opacity: 0, duration: 1.4, ease: 'power2.out' }, hit + 0.1);
  tl.to($('.fx-firefall__source'), { opacity: 0.35, duration: 2, ease: 'power1.out' }, hit + 0.2);
  // 4) 무대 전체가 금빛으로 물들었다 천천히 가라앉는다
  tl.fromTo($('.fx-firefall__wash'), { opacity: 0 }, { opacity: 0.75, duration: 0.5, ease: 'power2.out' }, hit);
  tl.to($('.fx-firefall__wash'), { opacity: 0.28, duration: 3.5, ease: 'power1.inOut' }, hit + 0.7);
  tl.to($('.fx-firefall__burst'), { opacity: 0.35, scale: 1.3, duration: 3, ease: 'power1.out' }, hit + 0.8);
}
