import languageMap from './languageMap';
import { createContext } from 'react';

const TextContext = createContext(languageMap.bg);

export default TextContext;