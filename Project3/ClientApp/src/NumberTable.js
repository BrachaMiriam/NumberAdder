import React from 'react';
import { produce } from 'immer';
import NumberRow from './NumberRow';
import SelectedNumbers from './SelectedNumbers';

class NumberTable extends React.Component {
    state = {
        numbers: [],
        selectedNumbers: [],
        lockedNumbers: []
    }
    onAddButtonClick = () => {
        function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }
        const newState = produce(this.state, draftState => {
            draftState.numbers.push(getRndInteger(1, 1000));
        });
        this.setState(newState);
    }

    onSelectClick = n => {
        const newState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(n);
        })
        this.setState(newState);
    }
    
    onUnselectClick = n => {
        const selectedNumbers = this.state.selectedNumbers.filter(sn => n !== sn)
        this.setState({selectedNumbers});
    }

    isSelected = sn => {
        const {selectedNumbers} = this.state;
        return selectedNumbers.some(n => n === sn);
    }

    isLocked = ln => {
        const {lockedNumbers} = this.state;
        return lockedNumbers.some(l => l === ln);
    }
    onLockClick = sn => {
        const newState = produce(this.state, draftState => {
            draftState.isLocked(sn);
        })
        this.setState(newState);
    }

    onUnlockClick = sn => {
        const lockedNumbers = this.state.lockedNumbers.filter(ln => sn !== ln)
        this.setState({ lockedNumbers });
    }

    generateTable = () => {
        const{numbers} = this.state;
        return (
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Add/Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {numbers.map((n, i) => {
                        return <NumberRow
                        number={n}
                        key={i}
                        onSelectClick={() => this.onSelectClick(n)}
                        onUnselectClick={() => this.onUnselectClick(n)}
                        isSelected={this.isSelected(n)}
                        isLocked={this.isLocked(n)} />
                    })
                }
                </tbody>
            </table>
        )
    }

    generateSelectedTable = () => {
        const{selectedNumbers} = this.state;
        if (!selectedNumbers.length) {
            return;
        }
        return(
            <div className='jumbotron'>
                <h1>Selected Numbers</h1>
                <div className='col-md-6 col-md-offset-3'>
                    <ul className='list-group'>
                        {this.state.selectedNumbers.map((sn, i) => {
                            return <SelectedNumbers
                                number={sn}
                                key={i}
                                onLockButtonClick={() => this.onLockButtonClick(sn)}
                                onUnlockButtonClick={() => this.onUnlockButtonClick(sn)}
                                isLocked={this.isLocked(sn)}
                            />
                        })}
                    </ul>
                </div>
            </div>
        )
        
    }

    render() {
        return (
            <div className='container mt-5'>
                <div className="col-md-12">
                    <button className="btn btn-success btn-lg btn-block" onClick={this.onAddButtonClick}>ADD</button>
                </div>
                <div className='row mt-3'>
                    {this.generateTable()}
                </div>
                    {this.generateSelectedTable()}
            </div>
        )
    }
}
export default NumberTable;