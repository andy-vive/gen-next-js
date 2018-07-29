import { configure } from '../../../../.cache/typescript/2.9/node_modules/@types/enzyme';
import Adapter from '../../../../.cache/typescript/2.9/node_modules/@types/enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
