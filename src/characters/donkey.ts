// 발람의 나귀 — "나는 네가 오늘까지 네 일생에 타는 나귀가 아니냐" (민 22:30). A급 num-22-24-balaam에서 그림.
// 사람이 아니라 인물 도감에는 넣지 않는다. 말할 때 이름표는 "나귀".
// 옆모습(오른쪽을 봄): 둥근 몸통, 가는 네 다리와 작은 발굽, 짧게 선 갈기, 길고 큰 두 귀, 끝에 술이 달린 꼬리.
// 등에 깐 안장 담요 위에 발람이 앉아 있다 (옷 ridden: 발람과 같은 고깔 모자·층층 수염·지팡이).
// 옷(장면 beat의 "outfit": {"donkey": "..."}):
//  - ridden : 기본. 발람을 태우고 선 모습
//  - down   : 발람을 태운 채 엎드림 (민 22:27). 다리를 접고 몸이 내려앉는다 (styles/balaam.css .dk-lift)
//  - free   : 발람이 내린 뒤 엎드린 채 (민 22:31)
//  - saddle : 안장만 얹고 선 모습
// 넓은 짐승이라 무대에서 두 사람 자리(slots 2)를 차지한다.
import type { CharacterDef } from './index';
import { FACE_MAN } from './_parts.ts';
import { BALAAM_BEARD, BALAAM_CAP } from './balaam.ts';

const LEGS_UP = `
  <path d="M140 300 C138 330 140 360 142 398 L140 409 L156 409 L153 398 C152 360 154 330 159 304 Z"/>
  <path d="M272 298 C272 330 274 362 274 398 L272 409 L288 409 L285 398 C284 360 286 330 289 300 Z"/>
  <path class="tone2" d="M160 300 C162 330 165 362 167 398 L165 409 L181 409 L178 398 C177 360 178 330 181 300 Z"/>
  <path class="tone2" d="M290 296 C292 330 296 362 297 398 L295 409 L311 409 L308 398 C306 360 306 330 307 300 Z"/>`;

/** 다리를 접고 엎드림: 몸은 .dk-lift가 아래로 내린다 */
const LEGS_DOWN = `
  <path d="M120 392 C140 384 170 384 196 392 C204 396 206 404 200 409 L118 409 C112 404 112 396 120 392 Z"/>
  <path d="M262 390 C284 386 310 390 334 398 C342 401 344 407 340 409 L262 409 C256 404 256 394 262 390 Z"/>
  <path class="detail" d="M300 396 Q318 398 336 404 M150 396 Q170 396 192 402" fill="none" stroke-width="1"/>`;

const SADDLE = `
  <path d="M176 250 C196 244 236 244 258 250 C262 262 262 280 258 296 C236 300 198 300 178 296 C174 280 174 262 176 250 Z"/>
  <path class="crown" d="M177 292 C198 296 236 296 258 292 L258 297 C236 301 198 301 178 297 Z"/>
  <path class="detail" d="M182 294 l0 8 M190 295 l0 8 M198 296 l0 8 M206 296 l0 8 M214 296 l0 8 M222 296 l0 8 M230 296 l0 8 M238 296 l0 8 M246 295 l0 8 M254 294 l0 8" fill="none" stroke-width="1.4"/>`;

/** 안장 위에 앉은 발람: 무릎 아래로 늘어진 겉옷, 곧은 등, 고깔 모자, 지팡이 든 앞팔(.dk-arm — 때릴 때 휘두른다) */
const RIDER = `
  <path d="M184 256 C180 230 182 200 186 176 C188 160 194 150 204 146 C214 144 224 150 228 160 C232 176 230 210 228 248 Z"/>
  <path d="M184 250 C200 242 232 242 252 248 C260 252 260 262 254 266 L248 268 C250 290 250 312 246 330 L230 332 C228 312 226 290 224 268 C208 266 192 264 184 258 Z"/>
  <path class="detail" d="M230 334 l0 7 M235 334 l0 7 M240 333 l0 7 M245 332 l0 7" fill="none" stroke-width="1.3"/>
  <path d="M228 330 L254 331 C256 334 256 337 252 338 L228 338 Z"/>
  <path class="detail" d="M188 178 Q190 214 196 246 M196 252 Q222 252 250 256" fill="none" stroke-width="1"/>
  <g transform="matrix(0.88 0 0 0.88 118 79)">${BALAAM_CAP}${FACE_MAN}${BALAAM_BEARD}</g>
  <g class="dk-arm">
    <path d="M249 199 L246 194 L292 112 L296 114 Z"/>
    <path d="M206 158 C214 152 224 156 224 166 C226 180 226 190 228 198 C236 196 244 194 250 192 C256 190 261 197 256 203 C246 208 234 212 222 212 C214 212 210 206 210 198 C208 184 206 170 206 158 Z"/>
  </g>`;

const donkey: CharacterDef = {
  id: 'donkey',
  name: '나귀',
  traits: '옆모습의 나귀: 둥근 몸통, 가는 네 다리, 짧게 선 갈기, 길고 큰 귀, 술 달린 꼬리. 등에 안장 담요, 그 위에 발람(고깔 모자)',
  faces: 'right',
  slots: 2,
  height: 1.02,
  art: {
    kind: 'svg',
    viewBox: [440, 420],
    pivots: {
      upper: [220, 320],
      head: [300, 262],
      cloth: [216, 250],
      legs: [220, 409],
    },
    outfits: {
      ridden: { markup: SADDLE + RIDER, pivot: [216, 250], parts: { legs: LEGS_UP } },
      down: { markup: SADDLE + RIDER, pivot: [216, 250], parts: { legs: LEGS_DOWN } },
      free: { markup: SADDLE, pivot: [216, 250], parts: { legs: LEGS_DOWN } },
      saddle: { markup: SADDLE, pivot: [216, 250], parts: { legs: LEGS_UP } },
    },
    markup: `
      <g data-part="legs">${LEGS_UP}</g>
      <g data-part="upper">
        <g class="dk-lift">
          <!-- 꼬리: 끝에 술 -->
          <path d="M122 266 C108 290 104 318 106 346 L113 346 C113 322 117 298 129 276 Z"/>
          <ellipse cx="109" cy="354" rx="5.5" ry="13"/>
          <!-- 몸통 -->
          <path d="M120 262 C130 246 170 244 210 246 C250 247 280 244 296 252 C310 260 314 282 306 300 C300 314 280 318 250 316 C210 318 170 320 140 316 C118 312 108 290 120 262 Z"/>
          <path class="detail" d="M140 312 Q200 322 290 310 M296 258 Q306 280 300 300" fill="none" stroke-width="1"/>
          <g data-part="head">
            <!-- 목과 짧게 선 갈기 -->
            <path d="M282 258 C294 236 314 212 332 194 L356 200 C352 222 340 246 316 278 Z"/>
            <path class="detail" d="M286 252 L282 246 M292 242 L288 236 M299 232 L295 226 M306 223 L302 217 M313 214 L309 208 M320 206 L317 199 M327 199 L325 192" fill="none" stroke-width="2.2"/>
            <!-- 귀: 길고 크게 -->
            <path d="M334 196 C327 172 325 148 329 126 C337 140 343 166 345 192 Z"/>
            <path d="M345 192 C347 168 353 146 362 130 C364 150 360 174 353 197 Z"/>
            <!-- 머리: 길쭉하게 아래로, 둥근 주둥이 -->
            <path d="M330 192 C342 182 358 184 366 194 C378 210 392 236 398 254 C401 264 394 273 384 273 C372 273 362 266 354 256 C344 242 334 224 328 210 C326 202 326 196 330 192 Z"/>
            <path class="detail" d="M386 262 Q390 266 394 262 M376 248 Q384 244 392 250" fill="none" stroke-width="1"/>
            <ellipse class="glint" cx="352" cy="208" rx="2.4" ry="1.4"/>
          </g>
          <g data-part="cloth" class="tone2">${SADDLE}${RIDER}</g>
        </g>
      </g>`,
  },
};

export default donkey;
