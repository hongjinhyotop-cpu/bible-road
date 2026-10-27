import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import './styles/tokens.css';
import './styles/acts.css';
import './styles/base.css';
import './styles/ui.css';
import './styles/title.css';
import './styles/map.css';

import { applySettings, settings } from './engine/settings';
import { route, startRouter } from './engine/router';
import { mountField, restartField } from './fx/particles';
import { titleScreen } from './screens/title';
import { mapScreen } from './screens/map';

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
startRouter();
