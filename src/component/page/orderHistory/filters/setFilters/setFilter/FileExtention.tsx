import { connect } from 'react-redux';
import { configure } from './../../../../../utils';
import PickFromList, { PickFromListProps } from './../../../../../pick/PickFromList';
import { State, selectSetOrderFilter } from './../../../../../../store/reducer';
import { selectFileExtention, toggleFileExtention, fileExtentionOrder } from '../../../../../../store/orderFilter/setOrderFilter/orderFilter';
import { FileExtention } from './../../../../../../type/OrderFilter';

const PickFromFileExtentionList: React.FC<PickFromListProps<FileExtention>> = PickFromList;

const Picker = configure(PickFromFileExtentionList, { order: fileExtentionOrder });

const FileExtentionFilter = connect(
    (state: State) => ({ listPick: selectFileExtention(selectSetOrderFilter(state)) }),
    { onToggleFromList: toggleFileExtention }
)(Picker);

export default FileExtentionFilter;