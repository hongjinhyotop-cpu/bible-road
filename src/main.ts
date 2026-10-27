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
import './styles/title.css';
import './styles/map.css';
import './styles/play.css';
import './styles/library.css';
import './styles/codex.css';

import { applySettings, settings } from './engine/settings';
import { route, startRouter } from './engine/router';
import { mountField, restartField } from './fx/particles';
import { titleScreen } from './screens/title';
import { mapScreen } from './screens/map';
import { sceneScreen } from './screens/scene';
import { finaleScreen } from './screens/finale';
import { peopleScreen } from './screens/people';
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
// 다른 화면으로 넘어가면 열려 있던 패널은 닫는다
window.addEventListener('hashchange', closeSheet);
// 예전 읽기 구간 주소(#/read/gen-5)는 같은 id의 에피소드(#/scene/gen-5)로 바꿔 연다
const legacy = () => {
  if (location.hash.startsWith('#/read/')) location.replace(`#/scene/${location.hash.slice(7)}`);
};
legacy();
window.addEventListener('hashchange', legacy);
startRouter();
