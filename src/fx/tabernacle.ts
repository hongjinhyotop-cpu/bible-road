// 성막 기구 (출 25–31, 35–40): 무대 가운데 금빛 조명 속에 기구 하나가 떠오른다.
// 장면 JSON의 beat에 "item": "ark" → 이전 기구는 가라앉고 새 기구가 떠오름. "item": null / "none" → 걷힘.
// 그림은 역광 실루엣 + 금빛 테두리(그어지며 나타남). 색은 막 테마 변수(--act-a/accent)를 따라간다.
// 모양·움직임은 styles/tabernacle.css (모션 줄이기면 짧은 페이드).
// 하나님은 그리지 않는다: 그룹은 얼굴 없는 날개만, 임재는 빛으로만 (CLAUDE.md 8-1).
import { ITEMS, isItem, type ItemName } from '../engine/items';

const W = 240;
const H = 200;
let uid = 0;

// 그림 안의 자리 표시: $H 뿔 · $G 금 · $B 놋 · $W 청·자·홍 세로 줄(직물) · $S 가로 줄(에봇·띠) · $F 주름 그늘 · $L 은은한 빛
type Art = { body: string; edges: string; live?: string; glints?: [number, number][] };

/** 금빛 테두리(그어지며 나타나는 선). 굵기 w */
const line = (d: string, w = 1) => `<path class="ti-line" pathLength="1" stroke-width="${w}" d="${d}"/>`;
const mirror = (svg: string) => `<g transform="matrix(-1 0 0 1 ${W} 0)">${svg}</g>`;

/** 등잔·제단의 불꽃 하나 (x, 바닥 y, 크기) */
function flame(x: number, y: number, s = 1, d = 0): string {
  return `<g class="ti-flame" style="--d:${d.toFixed(2)}s" transform="translate(${x} ${y}) scale(${s})">
    <circle class="ti-flame__halo" cy="-5" r="8"/>
    <path class="ti-flame__out" d="M0 0 C-3.4 -2.6 -3 -7 0 -12 C3 -7 3.4 -2.6 0 0 Z"/>
    <path class="ti-flame__in" d="M0 -0.6 C-1.6 -2 -1.4 -4.6 0 -7 C1.4 -4.6 1.6 -2 0 -0.6 Z"/>
  </g>`;
}

/** 번제단 몸체 (출 27:1-8): 번제단·번제·속죄제가 같이 쓴다. 윗면 y 94~104, 바닥 y 174, 앞 뿔 끝 ≈ (65, 91)·(161, 91) */
function bronzeAltar(): { body: string; edges: string } {
  const horn = (x: number, y: number, s: number, flip = false) =>
    `<path transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" d="M-4 0 C-6 -6 -4 -11 1 -13 C-1 -8 1 -4 4 0 Z"/>`;
  let grate = '';
  for (let x = 62; x < 164; x += 8) grate += `M${x} 132 L${Math.min(x + 8, 164)} 146 M${Math.min(x + 8, 164)} 132 L${x} 146 `;
  return {
    body: `<g fill="$B">${horn(80, 95, 0.8)}${horn(176, 95, 0.8, true)}
        <path class="ti-top" d="M62 104 L76 94 L178 94 L164 104 Z"/>
        <path class="ti-shade" d="M164 104 L178 94 L178 162 L164 174 Z"/>
        <rect x="62" y="104" width="102" height="70"/>${horn(64, 104, 1.1)}${horn(162, 104, 1.1, true)}
        <rect x="30" y="137" width="168" height="4" rx="2"/></g>
        <rect class="ti-grate" x="62" y="132" width="102" height="14"/>`,
    edges: line('M62 104 L76 94 L178 94 L164 104 Z') + line('M62 104 V174 H164 V104 M164 174 L178 162 V94') + line(grate, 0.5) +
      line('M62 132 H164 M62 146 H164', 0.7) + line('M30 139 H198', 1.1),
  };
}

/** 앉아 있는 사람 실루엣 (화목제 식탁). 바닥 가운데 (x, y), 크기 s */
const sitter = (x: number, y: number, s = 1) =>
  `<g class="ti-diner" transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-25" r="5.2"/>
    <path d="M-10 0 C-11 -12 -7 -19 0 -19 C7 -19 11 -12 10 0 Z"/></g>`;

/** 떡 한 덩이 (위에서 비스듬히 본 둥근 떡) */
const loaf = (x: number, y: number, rx = 7, ry = 2.6) => `<ellipse class="ti-bread" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/>`;

/** 피어오르는 연기 덩이 (번제의 연기 기둥) */
const puffs = (x: number, y: number, n: number, spread = 10) =>
  Array.from({ length: n }, (_, i) =>
    `<circle class="ti-puff" style="--d:${(i * (6 / n)).toFixed(2)}s; --dx:${(((i * 37) % 11) - 5) * (spread / 5)}px" cx="${x}" cy="${y}" r="${5 + (i % 3) * 1.5}"/>`).join('');

const ART: Record<ItemName, () => Art> = {
  // ── 증거궤 + 속죄소 + 두 그룹 (출 25:10-22) ──
  ark() {
    // 그룹: 얼굴 없이 날개만. 높이 편 날개 끝이 속죄소 위에서 서로 닿는다 (출 25:20)
    const upper = 'M70 98 C62 70 76 44 117 33 Q111 42 104 43 Q106 51 98 53 Q100 61 92 63 Q96 73 88 77 Q92 87 86 98 Z';
    const lower = 'M78 98 C76 84 82 72 94 66 Q92 75 90 80 Q93 88 89 98 Z';
    const wing = `<path d="${upper}"/><path class="ti-shade" d="${lower}"/>`;
    const wingLine = line(upper) + line('M74 94 C70 72 82 54 104 43 M78 94 C77 78 86 64 98 53 M82 95 C82 84 86 74 92 63', 0.5);
    return {
      body: `<g fill="$G">${wing}${mirror(wing)}
        <rect x="62" y="104" width="116" height="62" rx="1"/>
        <rect x="64" y="166" width="10" height="7"/><rect x="166" y="166" width="10" height="7"/>
        <rect x="56" y="96" width="128" height="8" rx="1.5"/>
        <rect x="26" y="139" width="188" height="5" rx="2.5"/></g>
        <rect class="ti-gold-hi" x="60" y="104" width="120" height="3.5"/>`,
      edges: wingLine + mirror(wingLine) +
        line('M56 96 H184 V104 H56 Z') + line('M62 104 V166 H178 V104') + line('M71 113 H169 V157 H71 Z', 0.6) +
        line('M26 141.5 H214', 1.2) + `<circle class="ti-line" pathLength="1" cx="72" cy="141.5" r="4.2"/><circle class="ti-line" pathLength="1" cx="168" cy="141.5" r="4.2"/>`,
      // 두 그룹 날개 사이, 속죄소 위의 빛 (만남의 자리)
      live: `<ellipse class="ti-shine" cx="120" cy="74" rx="26" ry="30" fill="$L"/>`,
      glints: [[118, 38], [184, 97], [72, 141]],
    };
  },

  // ── 진설병 상: 떡 열두 개, 두 줄에 여섯씩 + 정결한 유향 (출 25:23-30, 레 24:5-7) ──
  table() {
    const stack = (cx: number) =>
      Array.from({ length: 6 }, (_, i) => `<ellipse class="ti-bread" cx="${cx}" cy="${96 - i * 6}" rx="20" ry="3.8"/>`).join('');
    const crumbs = (cx: number) =>
      Array.from({ length: 6 }, (_, i) => line(`M${cx - 15} ${95 - i * 6} Q${cx} ${91 - i * 6} ${cx + 15} ${95 - i * 6}`, 0.5)).join('');
    const cup = (cx: number) => `<path fill="$G" d="M${cx - 7} 61 Q${cx} 68 ${cx + 7} 61 Z"/>`;
    return {
      body: `<g fill="$G" class="ti-back"><rect x="84" y="108" width="4" height="62"/><rect x="152" y="108" width="4" height="62"/></g>
        <g fill="$G"><rect x="62" y="100" width="116" height="4" rx="1"/><rect x="64" y="104" width="112" height="6"/>
        <rect x="70" y="110" width="100" height="8"/><rect x="70" y="110" width="6" height="64"/><rect x="164" y="110" width="6" height="64"/>
        <rect x="30" y="135" width="180" height="4" rx="2"/></g>
        ${stack(98)}${stack(142)}${cup(98)}${cup(142)}`,
      edges: line('M62 100 H178 V110 H62 Z') + line('M70 110 V174 M76 118 V174 M164 118 V174 M170 110 V174') + line('M70 118 H170', 0.7) +
        line('M30 137 H210', 1.1) + crumbs(98) + crumbs(142),
      live: `<path class="ti-wisp" pathLength="1" d="M98 60 C94 52 102 46 98 38 C95 32 100 28 98 22"/><path class="ti-wisp" style="--d:2.4s" pathLength="1" d="M142 60 C146 52 138 46 142 38 C145 32 140 28 142 22"/>`,
      glints: [[178, 100], [98, 62], [70, 137]],
    };
  },

  // ── 순금 등대: 가운데 줄기 + 양쪽 가지 셋, 살구꽃 잔, 일곱 등잔 (출 25:31-40) ──
  lampstand() {
    const radii = [16, 30, 44];
    const arm = (r: number) => `M${120 - r} 52 A${r} ${r} 0 0 0 ${120 + r} 52`;
    const xs = [120, ...radii.flatMap((r) => [120 - r, 120 + r])];
    const knob = (x: number, y: number) => `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.6" ry="2.6"/>`;
    const knobs = [
      ...radii.flatMap((r) => [-1, 1].map((s) => knob(120 + s * r * Math.cos(0.9), 52 + r * Math.sin(0.9)))),
      ...[68, 82, 96, 118, 136].map((y) => knob(120, y)),
    ].join('');
    const lamp = (x: number) => `<path d="M${x - 7} 50 Q${x} 56 ${x + 7} 50 L${x + 5} 47 L${x - 5} 47 Z"/>`;
    return {
      body: `<g fill="none" stroke="$G" stroke-width="4.6" stroke-linecap="round">${radii.map((r) => `<path d="${arm(r)}"/>`).join('')}</g>
        <g fill="$G"><rect x="117" y="50" width="6" height="104"/>
        <path d="M96 176 L144 176 L134 167 L125 158 L125 150 L115 150 L115 158 L106 167 Z"/>${knobs}${xs.map(lamp).join('')}</g>`,
      edges: radii.map((r) => line(arm(r), 0.8)).join('') + line('M120 50 V150', 0.8) + line('M96 176 L144 176 L134 167 L125 158 L125 150 L115 150 L115 158 L106 167 Z'),
      live: xs.map((x, i) => flame(x, 47, 1, i * 0.37)).join(''),
      glints: [[120, 96], [76, 52], [164, 52]],
    };
  },

  // ── 번제단: 조각목에 놋을 입힌 네모 제단, 네 뿔, 그물 (출 27:1-8) ──
  altar() {
    return {
      ...bronzeAltar(),
      live: `<ellipse class="ti-ember" cx="120" cy="99" rx="34" ry="4"/>${flame(104, 100, 1.5, 0.2)}${flame(120, 100, 2.1, 0)}${flame(136, 100, 1.4, 0.5)}
        <path class="ti-wisp" pathLength="1" d="M120 76 C114 64 126 56 119 44 C113 34 124 26 120 14"/>`,
      glints: [[64, 92], [164, 92], [62, 139]],
    };
  },

  // ── 물두멍: 놋 대야와 받침. 여인들의 놋 거울로 만듦 (출 30:17-21, 38:8) ──
  laver() {
    const sparks = [[104, 97], [126, 99], [140, 96], [114, 100], [96, 99.5]]
      .map(([x, y], i) => `<ellipse class="ti-spark" style="--d:${(i * 0.7).toFixed(1)}s" cx="${x}" cy="${y}" rx="3.2" ry="0.7"/>`).join('');
    return {
      body: `<g fill="$B"><path d="M74 98 C76 120 96 131 120 131 C144 131 164 120 166 98 Z"/>
        <path d="M112 130 L128 130 L126 150 L114 150 Z"/>
        <path d="M94 174 C100 160 112 153 114 150 L126 150 C128 153 140 160 146 174 Z"/>
        <rect x="90" y="172" width="60" height="4" rx="2"/>
        <ellipse class="ti-top" cx="120" cy="98" rx="46" ry="8"/></g>
        <ellipse class="ti-water" cx="120" cy="98" rx="41" ry="5.6"/>`,
      edges: line('M74 98 C76 120 96 131 120 131 C144 131 164 120 166 98') + `<ellipse class="ti-line" pathLength="1" cx="120" cy="98" rx="46" ry="8"/>` +
        line('M112 130 L114 150 M128 130 L126 150') + line('M94 174 C100 160 112 153 114 150 M126 150 C128 153 140 160 146 174 M90 176 H150') +
        [[98, 112], [120, 117], [142, 112]].map(([x, y]) => `<circle class="ti-line" pathLength="1" stroke-width="0.6" cx="${x}" cy="${y}" r="4.5"/>`).join(''),
      live: sparks,
      glints: [[166, 98], [120, 117], [146, 174]],
    };
  },

  // ── 분향단: 조각목에 금을 입힌 작은 제단, 네 뿔, 향 연기 한 줄 (출 30:1-10) ──
  incense() {
    const horn = (x: number, y: number, flip = false) =>
      `<path transform="translate(${x} ${y}) scale(${flip ? -0.7 : 0.7} 0.7)" d="M-4 0 C-6 -6 -4 -11 1 -13 C-1 -8 1 -4 4 0 Z"/>`;
    return {
      body: `<g fill="$G">${horn(106, 88)}${horn(152, 87, true)}
        <path class="ti-top" d="M96 96 L106 88 L154 88 L144 96 Z"/>
        <path class="ti-shade" d="M144 96 L154 88 L154 166 L144 174 Z"/>
        <rect x="96" y="96" width="48" height="78"/>${horn(98, 97)}${horn(142, 97, true)}
        <rect x="64" y="116" width="112" height="3.6" rx="1.8"/></g>
        <rect class="ti-gold-hi" x="94" y="96" width="52" height="4"/>`,
      edges: line('M96 96 L106 88 L154 88 L144 96 Z') + line('M96 96 V174 H144 V96 M144 174 L154 166 V88') + line('M102 104 H138 V166 H102 Z', 0.6) +
        line('M64 117.8 H176', 1),
      live: `<ellipse class="ti-ember" cx="124" cy="92" rx="12" ry="2.4"/>
        <g class="ti-smoke"><path pathLength="1" d="M124 90 C117 78 131 68 123 56 C115 44 131 34 123 22 C118 14 126 8 121 0"/>
        <path class="is-thin" pathLength="1" d="M124 90 C129 80 119 70 126 58 C133 46 118 38 125 26"/></g>`,
      glints: [[106, 88], [152, 87], [96, 117]],
    };
  },

  // ── 성막 전체: 금 입힌 널판, 은 받침, 네 겹 덮개, 동쪽 문, 앞쪽 뜰 포장 (출 26) ──
  tent() {
    let boards = '';
    for (let x = 72; x < 204; x += 9) boards += `<rect x="${x}" y="100" width="8" height="58"/>`;
    let sockets = '';
    for (let x = 72; x < 204; x += 9) sockets += `<rect x="${x - 0.5}" y="157" width="9" height="5"/>`;
    const layer = (y: number, cls: string, fill = '') => {
      let d = `M66 98 L210 98 L210 ${y}`;
      for (let x = 210; x > 66; x -= 12) d += ` Q${x - 6} ${y + 2.4} ${x - 12} ${y}`;
      return `<path class="${cls}"${fill ? ` fill="${fill}"` : ''} d="${d} Z"/>`;
    };
    let posts = '';
    let postLines = '';
    for (let x = 14; x <= 226; x += 17.6) {
      posts += `<rect x="${(x - 1.6).toFixed(1)}" y="158" width="3.2" height="18"/>`;
      postLines += `M${x.toFixed(1)} 158 V176 `;
    }
    return {
      body: `<g fill="$G">${boards}</g><g class="ti-silver">${sockets}</g>
        ${layer(130, 'ti-weave', '$W')}${layer(125, 'ti-goat')}${layer(120, 'ti-ram')}${layer(115, 'ti-skin')}
        <path class="ti-skin" d="M62 98 Q138 90 214 98 L214 101 L62 101 Z"/>
        <path fill="$G" class="ti-shade" d="M40 104 L66 98 L66 160 L40 166 Z"/>
        <path fill="$W" d="M44 108 L64 103.5 L64 158 L44 162.6 Z"/>
        <g fill="$G">${[42, 48, 54, 60, 65].map((x) => `<rect x="${x - 1}" y="${104 - (x - 40) * 0.23}" width="2" height="60"/>`).join('')}</g>
        <path class="ti-skin" d="M36 104 L66 96 L66 101 L36 109 Z"/>
        <path class="ti-linen" d="M6 160 L234 160 L234 176 L6 176 Z"/>
        <g fill="$B">${posts}</g>`,
      edges: line('M62 98 Q138 90 214 98') + line('M66 98 V160 M40 104 L66 98 M40 104 V166 L66 160') + line('M44 108 L64 103.5 V158 L44 162.6 Z', 0.6) +
        line('M210 98 V130', 0.8) + line('M66 115 H210', 0.4) + line('M6 160 H234', 0.9) + line(postLines, 0.5),
      glints: [[66, 98], [138, 93], [40, 104]],
    };
  },

  // ── 지성소 휘장: 청색·자색·홍색 실과 가는 베실, 그룹 무늬, 금 입힌 기둥 넷 (출 26:31-33) ──
  veil() {
    let hem = 'M52 44 L188 44 L188 168';
    for (let x = 188; x > 52; x -= 17) hem += ` Q${x - 8.5} 172.5 ${x - 17} 168`;
    const motif = (x: number, y: number) =>
      `M${x - 9} ${y + 5} C${x - 10} ${y - 3} ${x - 4} ${y - 8} ${x - 1} ${y - 9} M${x + 9} ${y + 5} C${x + 10} ${y - 3} ${x + 4} ${y - 8} ${x + 1} ${y - 9} M${x - 6} ${y + 5} C${x - 6} ${y - 1} ${x - 3} ${y - 4} ${x - 1} ${y - 5} M${x + 6} ${y + 5} C${x + 6} ${y - 1} ${x + 3} ${y - 4} ${x + 1} ${y - 5}`;
    const motifs = [71, 118, 166].flatMap((x) => [76, 122].map((y) => motif(x, y))).join(' ');
    const pillars = [50, 92, 142, 184];
    return {
      body: `<g class="ti-sway"><path fill="$W" d="${hem} Z"/><path fill="$F" d="${hem} Z"/></g>
        <g fill="$G"><rect x="44" y="39" width="152" height="3.4" rx="1.7"/>${pillars.map((x) => `<rect x="${x}" y="37" width="6" height="133"/>`).join('')}</g>
        <g class="ti-silver">${pillars.map((x) => `<rect x="${x - 2}" y="168" width="10" height="8"/>`).join('')}</g>`,
      edges: `<g class="ti-sway">${line(motifs, 0.6)}${line(hem.replace('M52 44 L188 44 ', 'M188 44 '), 0.6)}</g>` +
        line('M44 40.7 H196', 0.8) + line(pillars.map((x) => `M${x} 37 V170 M${x + 6} 37 V170`).join(' '), 0.6),
      glints: [[118, 76], [53, 40], [187, 40]],
    };
  },

  // ── 대제사장의 옷: 관(여호와께 성결), 견대의 호마노, 흉패 열두 보석, 에봇과 띠, 청색 겉옷 끝의 방울과 석류 (출 28) ──
  garments() {
    const gems = ['#b8423a', '#d8c25a', '#3f9a6e', '#3aa3a0', '#3d5fb5', '#e8e6f0', '#d98a3a', '#b49a7a', '#8a5ab8', '#c9b84a', '#5a5868', '#4f8a5a'];
    const stones = gems.map((c, i) => `<rect class="ti-gem" style="--c:${c}" x="${(107.4 + (i % 3) * 9.4).toFixed(1)}" y="${(73.4 + Math.floor(i / 3) * 9.2).toFixed(1)}" width="6.6" height="6.6" rx="1.4"/>`).join('');
    let hem = '';
    for (let x = 74, i = 0; x <= 166; x += 7.6, i++) {
      hem += i % 2
        ? `<circle fill="$G" cx="${x.toFixed(1)}" cy="171.5" r="2.4"/>`
        : `<path class="${i % 4 ? 'ti-purple' : 'ti-scarlet'}" d="M${x.toFixed(1)} 168.6 c-2.6 0 -3.2 3 -2.2 4.6 c0.8 1.2 3.6 1.2 4.4 0 c1 -1.6 0.4 -4.6 -2.2 -4.6 z"/>`;
    }
    return {
      body: `<path class="ti-blue" d="M84 60 C92 53 148 53 156 60 L170 168 L70 168 Z"/>
        <path fill="$F" d="M84 60 C92 53 148 53 156 60 L170 168 L70 168 Z" opacity="0.6"/>
        ${hem}
        <path fill="$S" d="M92 58 L104 56 L106 64 L134 64 L136 56 L148 58 L152 124 L88 124 Z"/>
        <rect fill="$S" x="84" y="116" width="72" height="7.5" rx="1"/>
        <path fill="$S" d="M100 123 L106 123 L104 146 L99 146 Z"/>
        <ellipse class="ti-ink" cx="120" cy="55" rx="11" ry="3.4"/>
        <g fill="$G"><circle cx="100" cy="59" r="5"/><circle cx="140" cy="59" r="5"/>
        <rect x="103.6" y="69.6" width="32.8" height="40" rx="1.6"/></g>
        <circle class="ti-onyx" cx="100" cy="59" r="3.2"/><circle class="ti-onyx" cx="140" cy="59" r="3.2"/>
        ${stones}
        <path class="ti-linen" d="M101 42 C99 24 141 24 139 42 L139 47 L101 47 Z"/>
        <rect fill="$G" x="104" y="38" width="32" height="7.6" rx="1.2"/>
        <text class="ti-plate" x="120" y="43.6" text-anchor="middle">여호와께 성결</text>`,
      edges: line('M84 60 C92 53 148 53 156 60 L170 168 L70 168 Z') + line('M92 58 L104 56 L106 64 L134 64 L136 56 L148 58 L152 124 L88 124 Z', 0.8) +
        line('M84 116 H156 V123.5 H84 Z', 0.6) + line('M103.6 69.6 H136.4 V109.6 H103.6 Z', 0.9) + line('M104 70 L100 64 M136 70 L140 64', 0.6) +
        line('M101 42 C99 24 141 24 139 42 L139 47 L101 47 Z', 0.8) + line('M104 33 C112 30 128 30 136 33 M102 38 C112 35 128 35 138 38', 0.5) +
        line('M104 41.8 L98 38 M136 41.8 L142 38', 0.6),
      glints: [[120, 41], [110, 76], [130, 95], [140, 59]],
    };
  },

  // ── 뜰 전경: 세마포 포장, 동쪽 문(청·자·홍), 번제단·물두멍·성막, 성막 위의 구름 (출 27:9-19, 40:33-34) ──
  court() {
    // 위에서 비스듬히: 앞 가장자리 y 168 (x 26~214), 뒤 가장자리 y 94 (x 52~188). 동쪽(문)은 왼쪽
    const L = (t: number) => [26 + (52 - 26) * t, 168 - 74 * t];
    const R = (t: number) => [214 - (214 - 188) * t, 168 - 74 * t];
    const fence = (pts: number[][], h: number) =>
      `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} L${pts.slice().reverse().map(([x, y]) => `${x.toFixed(1)} ${(y - h).toFixed(1)}`).join(' L')} Z`;
    const posts = (pts: number[][], h: number) => pts.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)} V${(y - h).toFixed(1)}`).join(' ');
    const along = (a: number[], b: number[], n: number) => Array.from({ length: n + 1 }, (_, i) => [a[0] + ((b[0] - a[0]) * i) / n, a[1] + ((b[1] - a[1]) * i) / n]);
    const back = along([52, 94], [188, 94], 10);
    const left1 = along(L(0), L(0.32), 2);
    const gate = along(L(0.32), L(0.68), 2);
    const left2 = along(L(0.68), L(1), 2);
    const right = along(R(0), R(1), 5);
    const front = along([26, 168], [214, 168], 14);
    return {
      body: `<path class="ti-cloud" d="M156 98 C140 78 150 56 146 30 C143 14 160 4 166 16 C172 4 186 14 182 30 C178 56 186 78 170 98 Z" fill="$L"/>
        <path class="ti-sand" d="M26 168 L214 168 L188 94 L52 94 Z"/>
        <path class="ti-linen" d="${fence(back, 7)}"/>
        <path class="ti-linen ti-shade" d="${fence(right, 8)}"/>
        <path class="ti-linen" d="${fence(left1, 8)}"/><path fill="$W" d="${fence(gate, 9)}"/><path class="ti-linen" d="${fence(left2, 8)}"/>
        <path class="ti-skin" d="M128 110 L182 110 L179 96 L132 96 Z"/>
        <path fill="$G" class="ti-shade" d="M128 128 L128 110 L132 96 L132 114 Z"/>
        <path fill="$G" d="M128 110 L182 110 L182 128 L128 128 Z"/>
        <path fill="$W" d="M128.6 112 L131.4 104 L131.4 116 L128.6 124 Z"/>
        <g fill="$B"><path d="M62 134 L78 134 L78 124 L62 124 Z"/><path class="ti-top" d="M62 124 L78 124 L81 120 L65 120 Z"/>
        <ellipse cx="103" cy="126" rx="6.5" ry="2.4"/><rect x="101.6" y="126" width="2.8" height="5"/></g>
        <path class="ti-linen" d="${fence(front, 9)}"/>`,
      edges: line('M26 168 L214 168 L188 94 L52 94 Z', 0.6) + line(`M52 87 H188 M${L(0)[0]} ${L(0)[1] - 8} L${L(0.32)[0]} ${L(0.32)[1] - 8} M${L(0.68)[0]} ${L(0.68)[1] - 8} L${L(1)[0]} ${L(1)[1] - 8}`, 0.6) +
        line(`M26 159 H214`, 0.8) + line(posts(front, 9) + ' ' + posts(back, 7), 0.4) +
        line('M128 110 L182 110 L182 128 L128 128 Z M128 110 L132 96 L179 96 L182 110', 0.7),
      live: `${flame(70, 120, 0.8, 0.1)}<ellipse class="ti-spark" cx="103" cy="125.6" rx="3" ry="0.6"/>`,
      glints: [[155, 110], [40, 126], [182, 110]],
    };
  },

  // ── 증거판 두 돌판: 하나님이 친히 쓰신 글 (출 31:18, 32:15-16) ──
  tablets() {
    const shape = (x: number) => `M${x} 172 L${x} 74 C${x} 54 ${x + 12} 44 ${x + 27} 44 C${x + 42} 44 ${x + 54} 54 ${x + 54} 74 L${x + 54} 172 Z`;
    const rows = (x: number, seed: number) => {
      let d = '';
      for (let r = 0; r < 5; r++) {
        const y = 78 + r * 18;
        const a = 6 + ((seed * 7 + r * 13) % 9);
        const b = 10 + ((seed * 5 + r * 11) % 12);
        d += `M${x + 9} ${y} h${a} M${x + 13 + a} ${y} h${b} M${x + 17 + a + b} ${y} h${Math.max(4, 28 - a - b)} `;
      }
      return d;
    };
    return {
      body: `<g transform="rotate(-3 92 172)"><path class="ti-stone" d="${shape(63)}"/></g>
        <g transform="rotate(3 148 172)"><path class="ti-stone" d="${shape(123)}"/></g>`,
      edges: `<g transform="rotate(-3 92 172)">${line(shape(63))}${line(rows(63, 1), 1.4)}</g>
        <g transform="rotate(3 148 172)">${line(shape(123))}${line(rows(123, 2), 1.4)}</g>`,
      live: `<ellipse class="ti-shine" cx="120" cy="110" rx="70" ry="60" fill="$L"/>`,
      glints: [[90, 44], [150, 44], [120, 120]],
    };
  },

  // ── 관유와 향품: 뿔병의 관유, 몰약·육계·창포·계피 + 향 빻는 그릇 (출 30:22-38) ──
  oil() {
    const horn = 'M74 152 C68 116 92 84 134 72 C150 67 160 60 166 49 L173 55 C168 68 157 78 142 85 C110 98 94 122 98 152 Z';
    return {
      body: `<path fill="$H" d="${horn}"/>
        <path class="ti-ridge" d="M75 128 Q87 124 97 131 M80 110 Q92 104 102 113 M90 96 Q101 89 110 99 M104 85 Q114 79 121 90 M121 77 Q130 73 134 84 M137 71 Q145 67 147 77 M149 63 Q156 59 157 67"/>
        <g fill="$G"><path d="M72 146 L100 146 L100 154 L72 154 Z"/><path d="M160 54 L170 61 L172 58 L162 51 Z"/>
        <path d="M120 80 L126 92 L120 94 L115 82 Z" opacity="0.8"/><path d="M164 50 L172 44 L176 49 L169 55 Z"/></g>
        <g class="ti-cane"><rect x="182" y="118" width="3" height="56" rx="1.5" transform="rotate(12 183 174)"/>
        <rect x="188" y="112" width="3" height="62" rx="1.5" transform="rotate(6 189 174)"/>
        <rect x="194" y="120" width="3.4" height="54" rx="1.7" transform="rotate(-4 195 174)"/></g>
        <g fill="$B"><path d="M138 158 C140 172 172 172 174 158 Z"/><rect x="146" y="170" width="20" height="5" rx="2"/>
        <rect x="160" y="132" width="4" height="30" rx="2" transform="rotate(24 162 158)"/></g>
        <g class="ti-myrrh"><path d="M60 172 c-3 0 -4 -4 0 -9 c4 5 3 9 0 9 z"/><path d="M48 174 c-2.4 0 -3 -3 0 -7 c3 4 2.4 7 0 7 z"/></g>`,
      edges: line(horn) + line('M72 146 H100 M72 154 H100', 0.7) + line('M106 120 C112 104 124 92 140 85', 0.5) + line('M138 158 C140 172 172 172 174 158 Z', 0.8),
      live: `<circle class="ti-drop" cx="173" cy="52" r="1.8"/>
        <path class="ti-wisp" pathLength="1" d="M156 156 C150 146 160 140 154 130 C150 122 158 116 155 108"/>`,
      glints: [[166, 50], [86, 150], [156, 158]],
    };
  },

  // ── 만나 항아리: 만나 한 오멜을 담아 증거판 앞에 대대로 간수 (출 16:32-34, 히 9:4 "만나를 담은 금 항아리") ──
  'manna-jar'() {
    const jar = 'M98 64 L142 64 L140 72 C139 78 136 82 134 86 C160 96 172 118 170 140 C168 162 152 176 120 177 C88 176 72 162 70 140 C68 118 80 96 106 86 C104 82 101 78 100 72 Z';
    const heap = 'M100 66 C104 54 114 49 120 49 C126 49 136 54 140 66 Z';
    const flakes = Array.from({ length: 14 }, (_, i) => {
      const x = 104 + ((i * 37) % 32);
      const y = 52 + ((i * 13) % 12);
      return `<ellipse class="ti-manna" cx="${x}" cy="${y}" rx="1.6" ry="1.1"/>`;
    }).join('');
    return {
      body: `<path class="ti-manna" d="${heap}"/>${flakes}
        <path fill="$G" d="${jar}"/>
        <rect x="94" y="62" width="52" height="6" rx="2" fill="$G"/>
        <path class="ti-shade" fill="$G" d="M134 86 C160 96 172 118 170 140 C168 162 152 176 120 177 C140 170 154 156 156 138 C158 118 150 100 134 86 Z"/>
        <ellipse class="ti-gold-hi" cx="88" cy="132" rx="3" ry="18" transform="rotate(8 88 132)"/>`,
      edges: line(jar) + line('M94 62 H146 V68 H94 Z', 0.8) + line('M78 120 C100 112 140 112 162 120 M76 150 C100 158 140 158 164 150', 0.6),
      live: `<ellipse class="ti-shine" cx="120" cy="56" rx="34" ry="22" fill="$L"/>`,
      glints: [[112, 50], [131, 54], [92, 118]],
    };
  },

  // ════ 레위기: 제사와 규례 (레 1–7, 23, 25) — 제사 종류를 기구처럼 하나씩 ════

  // ── 번제: 놋 제단 위에서 통째로 다 태워 올림. 연기는 곧게 하늘로 (레 1:9 "향기로운 냄새") ──
  burnt() {
    const a = bronzeAltar();
    // 제물은 뭉뚱그린 덩이 하나 (나뭇단 위). 피·도살은 그리지 않는다
    const offer = 'M84 98 C82 88 92 80 106 78 C110 70 124 68 132 74 C146 76 158 86 156 98 Z';
    return {
      body: `<path class="ti-column" d="M104 76 C100 54 108 30 100 -14 L140 -14 C132 30 140 54 136 76 Z"/>
        ${a.body}
        <g class="ti-wood"><rect x="80" y="94" width="80" height="4" rx="2" transform="rotate(-4 120 96)"/><rect x="84" y="95" width="74" height="4" rx="2" transform="rotate(5 120 97)"/></g>
        <path class="ti-offer" d="${offer}"/>`,
      edges: a.edges + line(offer, 0.6) + line('M120 66 V20', 0.4),
      live: `<ellipse class="ti-ember" cx="120" cy="99" rx="44" ry="5"/>
        ${flame(92, 100, 1.8, 0.3)}${flame(150, 100, 1.9, 0.6)}${flame(106, 96, 2.6, 0.1)}${flame(134, 96, 2.8, 0.45)}${flame(120, 84, 2.2, 0.8)}
        <g class="ti-rise">${puffs(120, 64, 7, 6)}</g>
        <g class="ti-smoke"><path pathLength="1" d="M120 66 C117 46 123 26 119 0 C118 -8 121 -14 120 -20"/>
        <path class="is-thin" pathLength="1" d="M112 70 C110 50 114 30 111 6"/><path class="is-thin" pathLength="1" d="M128 70 C130 50 126 30 129 6"/></g>`,
      glints: [[65, 91], [161, 91], [62, 139]],
    };
  },

  // ── 소제: 고운 가루에 기름을 붓고 유향을 얹음. 누룩 없이, 소금은 꼭 (레 2:1-2, 4, 11, 13) ──
  grain() {
    const mound = 'M66 150 C78 132 100 113 120 112 C140 113 162 132 174 150 Z';
    // 기름 항아리: 똑바로 그린 뒤 120° 기울임 → 입구가 오른쪽 아래 (≈ 101, 71)
    const jar = 'M-5 -22 L5 -22 L4 -17 C12 -14 14 -4 12 4 C10 12 4 16 0 16 C-4 16 -10 12 -12 4 C-14 -4 -12 -14 -4 -17 Z';
    const jarAt = (s: string) => `<g transform="translate(82 60) rotate(120)">${s}</g>`;
    const cakes = [170, 164, 158].map((y) => loaf(42, y, 20, 4.6)).join('');
    const pricks = [158].map((y) => [-10, -4, 2, 8, -7, 5].map((dx, i) => `<circle class="ti-prick" cx="${42 + dx}" cy="${y + (i > 3 ? 1.6 : -0.6)}" r="0.7"/>`).join('')).join('');
    const frank = [[136, 122], [140, 124], [144, 121], [139, 119.6], [147, 125], [133, 125]]
      .map(([x, y]) => `<circle class="ti-frank" cx="${x}" cy="${y}" r="2"/>`).join('');
    return {
      body: `<g fill="$B"><ellipse cx="120" cy="150" rx="62" ry="10"/><rect x="104" y="156" width="32" height="14" rx="2"/><rect x="96" y="169" width="48" height="4" rx="2"/></g>
        <path class="ti-flour" d="${mound}"/>
        <path class="ti-oil" d="M110 116 C112 112 126 112 128 116 C130 122 134 126 132 134 C128 128 124 124 120 124 C116 126 112 130 106 134 C106 126 108 120 110 116 Z"/>
        ${frank}
        ${jarAt(`<path class="ti-clay" d="${jar}"/><path class="ti-shade ti-clay" d="M4 -17 C12 -14 14 -4 12 4 C10 12 4 16 0 16 C6 10 8 0 4 -17 Z"/>`)}
        ${cakes}${pricks}
        <path fill="$B" d="M182 160 C184 174 214 174 216 160 Z"/><path class="ti-salt" d="M185 160 C190 150 208 150 213 160 Z"/>`,
      edges: line('M58 150 C62 160 178 160 182 150 M58 150 C62 140 178 140 182 150', 0.8) + line(mound, 0.6) + jarAt(line(jar, 0.8)) +
        line('M22 158 C24 162 60 162 62 158 M22 164 C24 168 60 168 62 164 M22 170 C24 174 60 174 62 170', 0.5) + line('M182 160 C184 174 214 174 216 160 Z', 0.7),
      live: `<path class="ti-pour" pathLength="1" d="M101 72 C106 80 113 94 117 113"/>
        <circle class="ti-drop" cx="117" cy="104" r="1.6"/>
        <path class="ti-wisp" pathLength="1" d="M140 118 C136 108 144 102 139 92 C135 84 142 78 139 70"/>
        <ellipse class="ti-spark" style="--d:0.8s" cx="199" cy="155" rx="3" ry="0.7"/><ellipse class="ti-spark" style="--d:2.2s" cx="205" cy="157" rx="2.4" ry="0.6"/>`,
      glints: [[120, 113], [199, 154], [42, 156]],
    };
  },

  // ── 화목제: 한 상을 셋이 나눔 — 기름은 제단 불에(하나님 몫), 흔든 가슴과 넓적다리는 제사장 몫, 나머지는 드린 사람 식구가 먹음 (레 3; 7:11-34) ──
  peace() {
    const horn = (x: number, flip = false) => `<path transform="translate(${x} 114) scale(${flip ? -0.75 : 0.75} 0.75)" d="M-4 0 C-6 -6 -4 -11 1 -13 C-1 -8 1 -4 4 0 Z"/>`;
    const breast = 'M98 112 C97 101 107 94 117 95 C124 96 127 103 125 112 Z';
    const thigh = 'M127 112 C128 104 133 97 139 94 C142 89 149 89 150 94 C151 98 147 101 144 101 C141 105 140 108 142 112 Z';
    return {
      body: `<ellipse class="ti-shine" cx="120" cy="40" rx="30" ry="20" fill="$L"/>
        <g fill="$B">${horn(32)}${horn(68, true)}<rect x="30" y="114" width="40" height="38"/><path class="ti-top" d="M30 114 L34 110 L74 110 L70 114 Z"/>
        <path class="ti-shade" d="M70 114 L74 110 L74 148 L70 152 Z"/></g>
        <g class="ti-wave"><path class="ti-meat" d="${breast}"/><path class="ti-meat" d="${thigh}"/>
        <path fill="$G" d="M90 112 L152 112 L147 118 L95 118 Z"/></g>
        <g fill="$G"><rect x="118" y="118" width="4" height="30"/><rect x="108" y="148" width="24" height="4" rx="2"/></g>
        ${sitter(184, 140, 0.9)}
        <ellipse class="ti-linen" cx="186" cy="150" rx="34" ry="6"/>
        ${loaf(174, 148)}${loaf(188, 147.4, 6, 2.3)}<path fill="$G" d="M197 141 L205 141 L203 147 L199 147 Z"/>
        ${sitter(156, 152)}${sitter(216, 152, 0.75)}`,
      edges: line('M30 114 L34 110 L74 110 L70 114 Z M30 114 V152 H70 V114 M70 152 L74 148 V110', 0.8) +
        `<g class="ti-wave">${line(breast, 0.6)}${line(thigh, 0.6)}${line('M90 112 H152 L147 118 H95 Z', 0.7)}</g>` +
        line('M86 100 C80 106 80 114 84 120 M156 100 C162 106 162 114 158 120', 0.5) +
        line('M120 46 L54 98 M120 46 V88 M120 46 L184 128', 0.35) +
        line('M152 151 C160 157 212 157 220 151', 0.6) + line('M20 160 H220', 0.9),
      live: `${flame(46, 110, 1.4, 0.2)}${flame(58, 110, 1.1, 0.6)}
        <path class="ti-wisp" pathLength="1" d="M52 98 C48 88 56 82 51 72 C47 64 54 58 51 50"/>
        <ellipse class="ti-ember" cx="186" cy="138" rx="30" ry="9"/>`,
      glints: [[120, 40], [150, 113], [201, 141]],
    };
  },

  // ── 속죄제: 피를 놋 제단 네 뿔에 바르고 나머지는 제단 밑에 쏟음. 위에서 덮는 빛 (레 4:7, 25, 30) ──
  'sin-offering'() {
    const a = bronzeAltar();
    const marks = [[65, 93.6, 2.1], [161, 93.6, 2.1], [80.6, 86.6, 1.6], [175.4, 86.6, 1.6]]
      .map(([x, y, r], i) => `<ellipse class="ti-mark" style="--d:${(i * 0.9).toFixed(1)}s" cx="${x}" cy="${y}" rx="${r}" ry="${(r * 1.3).toFixed(1)}"/>`).join('');
    const motes = [[96, 10], [140, 0], [118, 24], [84, 30], [152, 20]]
      .map(([x, y], i) => `<circle class="ti-mote" style="--d:${(i * 1.3).toFixed(1)}s" cx="${x}" cy="${y}" r="1.2"/>`).join('');
    return {
      body: `<path class="ti-cover" d="M98 -24 L142 -24 L190 100 L50 100 Z"/>
        <ellipse class="ti-seep" cx="113" cy="176" rx="56" ry="4.5"/>
        ${a.body}`,
      edges: a.edges + line('M58 176 H170', 0.5),
      live: `<ellipse class="ti-ember" cx="120" cy="99" rx="22" ry="3"/>${flame(112, 99, 1.1, 0.3)}${flame(126, 99, 1.4, 0)}
        ${marks}${motes}`,
      glints: [[65, 92], [161, 92], [120, 20]],
    };
  },

  // ── 속건제: 끼친 손해만큼 + 오분의 일을 더 얹어 갚고, 흠 없는 숫양을 드림 (레 5:15-16; 6:4-6) ──
  guilt() {
    // 저울대는 5° 기울어 오른쪽(더 얹은 쪽)이 내려감. 받침점 (120, 58), 팔 길이 66
    const t = (5 * Math.PI) / 180;
    const L = [120 - 66 * Math.cos(t), 58 - 66 * Math.sin(t)];
    const R = [120 + 66 * Math.cos(t), 58 + 66 * Math.sin(t)];
    const drop = 44;
    const pan = ([x, y]: number[]) => `M${x - 24} ${y + drop} C${x - 20} ${y + drop + 11} ${x + 20} ${y + drop + 11} ${x + 24} ${y + drop} Z`;
    const cords = ([x, y]: number[]) => `M${x} ${y} L${x - 22} ${y + drop} M${x} ${y} L${x + 22} ${y + drop} M${x} ${y} V${y + drop}`;
    const stack = ([x, y]: number[], n: number) =>
      Array.from({ length: n }, (_, i) => `<ellipse class="ti-coin" cx="${(x + (i % 2) * 0.8).toFixed(1)}" cy="${(y + drop - 1.6 - i * 3).toFixed(1)}" rx="7.5" ry="2.2"/>`).join('');
    const extraY = R[1] + drop - 1.6 - 4 * 3;
    // 숫양 (작게, 왼쪽 아래)
    const ram = 'M-22 -14 C-24 -24 -10 -28 4 -26 C12 -25 17 -22 19 -17 L24 -22 C28 -26 33 -25 33 -20 L30 -13 C27 -9 23 -9 20 -11 C18 -7 14 -5 12 -5 L12 0 L9 0 L8 -4 L-12 -4 L-13 0 L-16 0 L-17 -5 C-21 -7 -22 -10 -22 -14 Z';
    const curl = 'M25 -22 C21 -29 30 -32 33 -27 C35 -23 31 -20 28 -22';
    const ramAt = (s: string) => `<g transform="translate(40 176) scale(0.95)">${s}</g>`;
    return {
      body: `<g fill="$G"><rect x="117.5" y="58" width="5" height="108"/><circle cx="120" cy="53" r="4.2"/>
        <path d="M96 176 L144 176 L136 166 L104 166 Z"/>
        <rect x="52" y="55.6" width="136" height="4.8" rx="2.4" transform="rotate(5 120 58)"/>
        <path d="${pan(L)}"/><path d="${pan(R)}"/></g>
        ${stack(L, 4)}${stack(R, 4)}
        <ellipse class="ti-coin is-extra" cx="${R[0] + 2}" cy="${extraY.toFixed(1)}" rx="6" ry="1.9"/>
        ${ramAt(`<path class="ti-wool" d="${ram}"/>`)}
        ${[[176, 173.5], [189, 171.5], [200, 174.5]].map(([x, y]) => `<ellipse class="ti-coin" cx="${x}" cy="${y}" rx="6" ry="1.9"/>`).join('')}`,
      edges: line(cords(L), 0.5) + line(cords(R), 0.5) + line(pan(L), 0.8) + line(pan(R), 0.8) +
        `<g transform="rotate(5 120 58)">${line('M52 55.6 H188 V60.4 H52 Z', 0.7)}</g>` + line('M117.5 62 V166 M122.5 62 V166 M96 176 L104 166 H136 L144 176', 0.7) +
        ramAt(line(ram, 0.6) + `<path class="ti-line" pathLength="1" stroke-width="1.6" d="${curl}"/>`) + line('M20 176.6 H220', 0.6),
      live: `<ellipse class="ti-coin is-falling" cx="${R[0] + 2}" cy="${(extraY - 3).toFixed(1)}" rx="6" ry="1.9"/>
        <ellipse class="ti-shine" cx="${R[0]}" cy="${(extraY - 2).toFixed(1)}" rx="18" ry="10" fill="$L"/>`,
      glints: [[120, 52], [R[0] + 4, extraY - 2], [52, 52]],
    };
  },

  // ── 여호와의 절기: 한 해의 바퀴. 가운데 안식일, 봄에 유월절·무교절·초실절, 칠칠절, 가을에 나팔절·속죄일·초막절 (레 23) ──
  feasts() {
    const C = [120, 100];
    const at = (deg: number, r = 51) => {
      const a = (deg * Math.PI) / 180;
      return [C[0] + r * Math.sin(a), C[1] - r * Math.cos(a)];
    };
    const g = (deg: number, s: string) => {
      const [x, y] = at(deg);
      return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">${s}</g>`;
    };
    const lamb = `<path class="ti-wool" d="M-8 2 C-10 -3 -6 -6 0 -6 C4 -6 6 -5 7 -3 L9 -6 C11 -7 12 -5 11 -3 L9 0 C8 2 6 2 5 1 L4 5 H2.6 L2 2 H-5 L-5.6 5 H-7 Z"/>`;
    const matzah = `<circle class="ti-bread" r="7.4"/>${[[-3, -2], [2, -3], [0, 1], [4, 2], [-3, 3]].map(([x, y]) => `<circle class="ti-prick" cx="${x}" cy="${y}" r="0.7"/>`).join('')}`;
    const sheaf = `<g class="ti-barley">${[-5, -2.5, 0, 2.5, 5].map((dx) => `<path d="M${dx * 0.4} 6 L${dx} -6" stroke-width="1"/><ellipse cx="${dx * 1.05}" cy="-7.5" rx="1.3" ry="2.6" transform="rotate(${dx * 4} ${dx * 1.05} -7.5)"/>`).join('')}</g><rect fill="$G" x="-3.6" y="0" width="7.2" height="2"/>`;
    const loaves = `${loaf(-4, 1, 6, 3)}${loaf(4, -2, 6, 3)}`;
    const shofar = `<path fill="$H" d="M-9 5 C-4 6 2 4 5 -1 C6 -3 7 -6 7 -8 L11 -6 C10 -2 8 2 5 5 C1 8 -5 9 -9 7 Z"/>`;
    const veil = `<rect fill="$W" x="-6" y="-8" width="12" height="15"/><rect fill="$G" x="-7.5" y="-9.5" width="15" height="2"/>`;
    const booth = `<g fill="$G"><rect x="-7" y="-4" width="1.4" height="11"/><rect x="5.6" y="-4" width="1.4" height="11"/></g>
      <g class="ti-leaf"><ellipse cx="-5" cy="-6" rx="4" ry="2.2"/><ellipse cx="0" cy="-7.6" rx="4.4" ry="2.4"/><ellipse cx="5" cy="-6" rx="4" ry="2.2"/><ellipse cx="-2" cy="-4.6" rx="3.4" ry="1.8"/><ellipse cx="3" cy="-4.6" rx="3.4" ry="1.8"/></g>`;
    // 안식일: 가운데 금 고리에 일곱 점(일곱째 날) + 등잔 하나
    const seven = Array.from({ length: 7 }, (_, i) => {
      const [x, y] = at((i * 360) / 7, 10.5);
      return `<circle class="ti-dot${i === 0 ? ' is-on' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i === 0 ? 1.9 : 1.3}"/>`;
    }).join('');
    // 바깥 테의 눈금 (열두 달) — 천천히 돈다
    const ticks = Array.from({ length: 48 }, (_, i) => {
      const [x1, y1] = at(i * 7.5, i % 4 ? 72 : 69);
      const [x2, y2] = at(i * 7.5, 76);
      return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }).join(' ');
    const arc = (a0: number, a1: number, r: number) => {
      const [x0, y0] = at(a0, r);
      const [x1, y1] = at(a1, r);
      return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    };
    const turn = (s: string) => `<g class="ti-turn">${s}</g>`;
    return {
      body: `<circle class="ti-dial" cx="120" cy="100" r="78"/>
        <circle fill="none" stroke="$G" stroke-width="6" cx="120" cy="100" r="74"/>
        <circle class="ti-dial is-inner" cx="120" cy="100" r="66"/>
        ${g(-26, lamb)}${g(4, matzah)}${g(34, sheaf)}${g(92, loaves)}${g(168, shofar)}${g(204, veil)}${g(240, booth)}
        <circle fill="$G" cx="120" cy="100" r="15"/><circle class="ti-dial" cx="120" cy="100" r="12.4"/>${seven}`,
      edges: turn(`<path class="ti-line" pathLength="1" stroke-width="0.5" d="${ticks}"/>`) +
        `<circle class="ti-line" pathLength="1" cx="120" cy="100" r="78"/><circle class="ti-line" pathLength="1" stroke-width="0.6" cx="120" cy="100" r="66"/>` +
        line(arc(-44, 104, 62), 1.4) + line(arc(150, 256, 62), 1.4) +
        `<circle class="ti-line" pathLength="1" stroke-width="0.7" cx="120" cy="100" r="15"/>`,
      live: turn(`<circle class="ti-moon" cx="120" cy="25" r="3.2"/>`) + flame(120, 103, 0.55, 0.2),
      glints: [[120, 22], [at(168)[0], at(168)[1] - 6], [at(34)[0], at(34)[1] - 8]],
    };
  },

  // ── 희년의 나팔: 오십 년째 속죄일에 숫양 뿔나팔 — 종이 풀려나고 땅이 본래 주인에게 (레 25:9-10) ──
  jubilee() {
    const horn = 'M24 108 C40 136 84 146 120 134 C152 122 172 92 184 44 L206 54 C194 102 168 138 128 152 C86 166 38 152 20 118 Z';
    const ridges = 'M34 128 Q32 138 40 142 M54 138 Q52 148 60 152 M78 142 Q78 152 86 156 M104 140 Q106 150 112 152 M130 132 Q134 142 140 144 M152 116 Q158 126 164 126 M168 92 Q176 100 182 98 M178 66 Q186 72 194 70';
    // 소리 고리: 나팔 입 (195, 49)에서 위·오른쪽으로 퍼짐
    const ring = (r: number, i: number) => {
      const p = (deg: number) => [195 + r * Math.cos((deg * Math.PI) / 180), 49 + r * Math.sin((deg * Math.PI) / 180)];
      const [x0, y0] = p(-140);
      const [x1, y1] = p(-5);
      return `<path class="ti-ring" style="--d:${(i * 1.2).toFixed(1)}s" pathLength="1" d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"/>`;
    };
    // 사슬: 왼쪽 위에서 내려오다 끊어짐. 아래 고리 둘은 풀려 떨어진다
    const link = (x: number, y: number, side: boolean) =>
      side ? `<rect class="ti-link" x="${x - 1.6}" y="${y - 5}" width="3.2" height="10" rx="1.6"/>` : `<ellipse class="ti-link is-open" cx="${x}" cy="${y}" rx="3.6" ry="5.2"/>`;
    const chain = Array.from({ length: 7 }, (_, i) => link(40 + i * 1.4, 14 + i * 9, i % 2 === 1)).join('');
    const stone = 'M196 176 L196 142 C196 136 200 132 206 132 C212 132 216 136 216 142 L216 176 Z';
    return {
      body: `<g class="ti-chain">${chain}</g>
        <path fill="$H" d="${horn}"/><path class="ti-ridge" d="${ridges}"/>
        <ellipse class="ti-ink" cx="195" cy="49" rx="11.5" ry="4" transform="rotate(25 195 49)"/>
        <path class="ti-stone" d="${stone}"/>
        <path class="ti-field" d="M20 176 C70 172 150 174 220 172 L220 178 L20 178 Z"/>`,
      edges: line(horn) + line('M20 118 C30 112 26 106 24 108', 0.8) + line(stone, 0.8) + line('M200 146 H212 M200 154 H210 M203 162 H212', 0.5) +
        line('M24 170 C60 166 100 168 140 166 M30 174 C80 170 130 172 186 170', 0.4) + line('M38 6 V12', 0.8),
      live: `${[14, 26, 38].map(ring).join('')}
        <g class="ti-fall">${link(50.4, 80, false)}${link(51.6, 89, true)}</g>`,
      glints: [[195, 44], [206, 134], [42, 10]],
    };
  },
};

/** 반짝임 (네 갈래 별) */
const glint = ([x, y]: [number, number], i: number) =>
  `<path class="ti-glint" style="--d:${(1.4 + i * 1.7).toFixed(1)}s" transform="translate(${x} ${y})" d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z"/>`;

function itemSvg(id: ItemName): string {
  const n = ++uid;
  const art = ART[id]();
  const urls: Record<string, string> = { $H: `url(#ti-h${n})`, $G: `url(#ti-g${n})`, $B: `url(#ti-b${n})`, $W: `url(#ti-w${n})`, $S: `url(#ti-s${n})`, $F: `url(#ti-f${n})`, $L: `url(#ti-l${n})` };
  const fill = (s: string) => s.replace(/\$[GBWSFLH]/g, (k) => urls[k]);
  return `<svg class="ti__art" viewBox="0 0 ${W} ${H}" aria-hidden="true">
    <defs>
      <linearGradient id="ti-g${n}" x1="0" y1="0" x2="0.25" y2="1"><stop offset="0" class="ti-s-gold-hi"/><stop offset="0.45" class="ti-s-gold"/><stop offset="1" class="ti-s-gold-lo"/></linearGradient>
      <linearGradient id="ti-b${n}" x1="0" y1="0" x2="0.25" y2="1"><stop offset="0" class="ti-s-bronze-hi"/><stop offset="0.5" class="ti-s-bronze"/><stop offset="1" class="ti-s-bronze-lo"/></linearGradient>
      <linearGradient id="ti-w${n}" x1="0" y1="0" x2="0.16" y2="0" spreadMethod="repeat"><stop offset="0" class="ti-s-blue"/><stop offset="0.3" class="ti-s-purple"/><stop offset="0.62" class="ti-s-scarlet"/><stop offset="0.8" class="ti-s-linen"/><stop offset="1" class="ti-s-blue"/></linearGradient>
      <linearGradient id="ti-s${n}" x1="0" y1="0" x2="0" y2="0.16" spreadMethod="repeat"><stop offset="0" class="ti-s-gold"/><stop offset="0.25" class="ti-s-blue"/><stop offset="0.5" class="ti-s-purple"/><stop offset="0.75" class="ti-s-scarlet"/><stop offset="1" class="ti-s-gold"/></linearGradient>
      <linearGradient id="ti-f${n}" x1="0" y1="0" x2="0.085" y2="0" spreadMethod="reflect"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.42"/></linearGradient>
      <linearGradient id="ti-h${n}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" class="ti-s-horn-hi"/><stop offset="0.55" class="ti-s-horn"/><stop offset="1" class="ti-s-horn-lo"/></linearGradient>
      <radialGradient id="ti-l${n}"><stop offset="0" class="ti-s-light"/><stop offset="0.5" class="ti-s-light-mid"/><stop offset="1" class="ti-s-light-0"/></radialGradient>
    </defs>
    <g class="ti-body">${fill(art.body)}</g>
    <g class="ti-edges">${fill(art.edges)}</g>
    <g class="ti-live">${fill(art.live ?? '')}${(art.glints ?? []).map(glint).join('')}</g>
  </svg>`;
}

/** 무대에 붙이는 기구 층 (인물 앞, 글 상자 뒤) */
export function createItemLayer(): HTMLElement {
  const layer = document.createElement('div');
  layer.className = 'scene__items';
  layer.setAttribute('aria-hidden', 'true');
  return layer;
}

/**
 * 기구 하나를 보여 준다 (이전 기구는 가라앉으며 사라짐). id가 null·"none"·모르는 이름이면 걷는다.
 * play = 재생기 화면(.play): data-item을 달아서 인물들이 양옆으로 비켜서게 한다.
 * instant = 연출 없이 바로 (장면 처음·다시 보기, 화면 전환 fade의 어둠 속)
 */
export function setItem(play: HTMLElement, layer: HTMLElement, id: string | null | undefined, instant = false): void {
  const next = isItem(id) ? id : null;
  const cur = layer.querySelector<HTMLElement>('.ti:not(.is-out)');
  if ((cur?.dataset.id ?? null) === next) return;
  if (cur) {
    if (instant) cur.remove();
    else {
      cur.classList.remove('is-on');
      cur.classList.add('is-out');
      setTimeout(() => cur.remove(), 1400);
    }
  }
  if (next) play.dataset.item = next;
  else delete play.dataset.item;
  if (!next) return;

  const info = ITEMS[next];
  const el = document.createElement('div');
  el.className = 'ti';
  el.dataset.id = next;
  el.innerHTML = `<div class="ti__light"></div><div class="ti__floor"></div>${itemSvg(next)}
    <p class="ti__label"><b></b><span></span><i class="latin"></i></p>`;
  el.querySelector('b')!.textContent = info.name;
  el.querySelector('span')!.textContent = info.note;
  el.querySelector('i')!.textContent = info.ref;
  // 금빛 테두리가 차례로 그어지게
  el.querySelectorAll<SVGElement>('.ti-line').forEach((l, i) => l.style.setProperty('--i', String(Math.min(i, 24))));
  layer.append(el);
  if (instant) el.classList.add('is-on', 'is-instant');
  else {
    void el.offsetWidth;
    requestAnimationFrame(() => el.classList.add('is-on'));
  }
}
