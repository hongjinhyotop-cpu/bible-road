// 뱀 — "들짐승 중에 가장 간교하더라" (창 3:1).
// 바닥에 똬리를 틀고, 몸을 S자로 세워 사람의 어깨 높이에서 말을 건다. 갈라진 혀.
// 저주(창 3:14) 전이라 "배로 다니기" 전의 모습을 어떻게 볼지는 여러 해석이 있어서, 그냥 몸을 세운 뱀으로만 그린다.
import type { CharacterDef } from './index';

const serpent: CharacterDef = {
  id: 'serpent',
  name: '뱀',
  traits: '똬리 + S자로 세운 몸, 갈라진 혀, 가늘게 빛나는 눈',
  faces: 'right',
  art: {
    kind: 'svg',
    viewBox: [200, 420],
    pivots: {
      upper: [116, 380],
      sway: [100, 270],
      head: [122, 170],
    },
    markup: `
      <g data-part="legs">
        <!-- 똬리 세 겹 -->
        <path d="M34 404 C34 386 74 377 108 378 C144 379 168 388 166 402 C164 413 124 415 98 414 C64 413 34 413 34 404 Z"/>
        <path d="M50 386 C50 370 84 363 108 364 C134 365 150 374 148 385 C146 394 118 396 98 396 C72 395 50 394 50 386 Z"/>
        <path d="M70 368 C70 356 92 351 108 352 C124 353 134 360 132 368 C130 375 112 377 100 377 C84 376 70 375 70 368 Z"/>
        <path class="detail" d="M44 400 C70 393 132 392 158 399 M58 383 C82 377 128 377 142 382 M76 366 C92 361 116 361 128 365" fill="none" stroke-width="1"/>
      </g>
      <g data-part="upper">
        <g data-part="sway">
          <path d="M112 362 C138 336 138 300 112 278 C88 258 84 226 98 204" fill="none" stroke="currentColor" stroke-width="19" stroke-linecap="round"/>
          <path d="M98 204 C106 188 116 180 121 166" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round"/>
          <path class="detail" d="M118 350 C130 330 128 304 108 288 M96 260 C88 244 88 226 96 212" fill="none" stroke-width="1"/>
          <g data-part="head">
            <g transform="matrix(1.3 0 0 1.3 -36.6 -51)">
            <!-- 머리: 앞으로 뾰족하게, 눈 위에 각진 눈두덩 -->
            <path d="M112 166 C112 154 122 146 136 147 C146 148 155 152 160 157 C161 160 158 162 154 163 C146 166 138 170 128 171 C120 172 113 171 112 166 Z"/>
            <path d="M126 150 C132 146 140 146 146 149 L140 151 Z"/>
            <ellipse class="glint" cx="139" cy="153.5" rx="2.6" ry="1"/>
            <path class="tongue" d="M159 160 L168 160 L174 156 M168 160 L174 164" fill="none" stroke-width="1.4" stroke-linecap="round"/>
            </g>
          </g>
        </g>
      </g>`,
  },
};

export default serpent;
