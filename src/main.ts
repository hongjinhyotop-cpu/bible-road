import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './styles/tokens.css';
import './styles/acts.css';
import './styles/base.css';
import './styles/ui.css';
import './styles/voice.css';
import './styles/stage.css';
import './styles/backdrop.css';
import './styles/flood.css';
import './styles/babel.css';
import './styles/nile.css';
import './styles/bush.css';
import './styles/plagues.css';
import './styles/twins.css';
import './styles/title.css';
import './styles/map.css';
import './styles/play.css';
import './styles/library.css';
import './styles/tabernacle.css';
import './styles/codex.css';
import './styles/ladder.css';
import './styles/jabbok.css';
import './styles/joseph.css';
import './styles/passover.css';
import './styles/sea.css';
import './styles/hall.css';
import './styles/sinai.css';
import './styles/manna.css';
import './styles/covenant.css';
import './styles/mamre.css';
import './styles/calf.css';
import './styles/ordination.css';
import './styles/sodom.css';
import './styles/egypt-court.css';

import { applySettings, settings } from './engine/settings';
import { route, startRouter } from './engine/router';
import { mountField, restartField } from './fx/particles';
import { titleScreen } from './screens/title';
import { mapScreen } from './screens/map';
import { sceneScreen } from './screens/scene';
import { finaleScreen } from './screens/finale';
import { peopleScreen } from './screens/people';
import { itemsScreen } from './screens/items';
import { closeSheet } from './ui/sheet';

applySettings();
settings.subscribe(restartField);

const grain = document.createElement('div');
grain.className = 'grain';
const vignette = document.createElement('div');
vignette.className = 'vignette';
document.body.append(vignette, grain);
mountField();

route('/', titleScreen);
route('/map', mapScreen);
route('/scene/:id', sceneScreen);

route('/finale/:act', finaleScreen);
route('/people', peopleScreen);
route('/people/:id', peopleScreen);
// 숨은 확인용: 성막 기구 라이브러리 미리 보기 (지도에 연결 안 함)
route('/items', itemsScreen);
route('/items/:id', itemsScreen);
// 다른 화면으로 넘어가면 열려 있던 패널은 닫는다
window.addEventListener('hashchange', closeSheet);
// 예전 읽기 구간 주소(#/read/gen-5)는 같은 id의 에피소드(#/scene/gen-5)로 바꿔 연다
const legacy = () => {
  if (location.hash.startsWith('#/read/')) location.replace(`#/scene/${location.hash.slice(7)}`);
};
legacy();
window.addEventListener('hashchange', legacy);
startRouter();
