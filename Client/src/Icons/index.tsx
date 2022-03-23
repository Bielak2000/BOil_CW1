import {AiFillEdit, AiFillEye, AiFillDelete} from 'react-icons/ai';
import {BiErrorCircle} from 'react-icons/bi';

export const MagnificationIcon = () => {
    return (
        <AiFillEye style={{width: 16, height: 16}}/>
    )
}

export const EditIcon = () => {
    return (
        <AiFillEdit style={{width: 16, height: 16}}/>
    )
}

export const DeleteIcon = () => {
    return (
        <AiFillDelete style={{width: 16, height: 16}}/>
    )
}

export const ErrorIcon = () => {
    return (
        <BiErrorCircle  style={{width: 16, height: 16}}/>
    )
}