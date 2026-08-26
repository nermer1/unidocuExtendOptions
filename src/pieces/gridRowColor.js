// B2 조각 엔트리: module.js의 info를 전역 우편함에 등록만 한다 (module.js는 원본 그대로)
import {info} from '../modules/gridRowColor/module.js';
($u.plugins._oeModules = $u.plugins._oeModules || []).push(info);
