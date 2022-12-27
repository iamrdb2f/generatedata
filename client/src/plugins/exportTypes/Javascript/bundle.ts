import { ETBundle } from '~types/exportTypes';
import { Settings, initialState, getCodeMirrorMode, getDownloadFileInfo } from './Javascript';
import { generate } from './Javascript.generate';

export { GenerationOptionsType } from './Javascript';

const bundle: ETBundle = {
	Settings,
	initialState,
	getCodeMirrorMode,
	getDownloadFileInfo,
	generate
};

export default bundle;

