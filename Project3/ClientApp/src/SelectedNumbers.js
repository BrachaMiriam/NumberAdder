import react from 'react';
import React from 'react';

class SelectedNumbers extends react.Component{
    render(){
        const{number, isLocked, onLockClick, onUnlockClick} = this.props;

        return(
                <li className='list-group-item'>
                    {number}
                    <button className='ml-3 btn btn-primary'
                    onClick={isLocked ? onUnlockClick : onLockClick}>
                    {isLocked ? 'Unlock' : 'Lock'}
                    </button>
                </li>
        )
    }
}

export default SelectedNumbers;