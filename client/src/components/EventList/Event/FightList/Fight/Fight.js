import React, { Component } from "react";


class Fight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fight: props.fight
        };
    }

    render() {

        return (
            <div>

                {(this.state.fight.length === 4 || this.state.fight.length === 5) &&
                    <div className="columns is-vcentered is-mobile is-gapless" style={{paddingBottom:15+'px'}}>
                        <div className="column fightFont" style={{color:'black',fontFamily: 'Work Sans'}}>{this.state.fight[1]}</div>
                        <div className="column is-two-fifths big-text" style={{backgroundColor:'gray'}}>

                            <h1 className="" style={{fontSize:1+'em',color:'black',fontWeight:200}}>
                                {this.state.fight[0]}
                            </h1>


                        </div>
                        <div className="column big-text fightFont" style={{color:'black',fontFamily:'Nunito'}}>{this.state.fight[3]}</div>
                    </div>
                }

                {(this.state.fight.length > 5) &&
                    <div className="columns is-vcentered is-mobile is-gapless" style={{paddingBottom:15+'px',backgroundColor:'#F5F5F5'}}>
                    {(this.state.fight[2] === 2 || this.state.fight[2] === "2") &&
                        <div className="column fightFont" style={{backgroundColor:'#FF0000',color:'black',fontFamily: 'Work Sans'}}>
                            {this.state.fight[1]}
                        </div>
                    }
                    {(this.state.fight[4].includes('Draw') || this.state.fight[4].includes('No Contest') || this.state.fight[4].includes('NC')) &&
                        <div className="column fightFont" style={{backgroundColor:'#D3D3D3',color:'black',fontFamily: 'Work Sans'}}>
                            {this.state.fight[1]}
                        </div>
                    }
                    {(!this.state.fight[4].includes('Draw') && !this.state.fight[4].includes('No Contest') && !this.state.fight[4].includes('NC') && this.state.fight[2] === "def.") &&
                        <div className="column fightFont" style={{backgroundColor:'#00FA96',color:'black',fontFamily: 'Work Sans'}}>
                            {this.state.fight[1]}
                        </div>
                    }

                    <div className="column is-two-fifths big-text">

                        <h1 className="" style={{fontSize:1+'em',color:'black',fontWeight:200}}>
                                {this.state.fight[4]}<br />
                                {this.state.fight[0]}<br />
                                {this.state.fight[6]} Round {this.state.fight[5]}
                        </h1>

                    </div>
                        {(this.state.fight[2] === 2 || this.state.fight[2] === "2") &&
                            <div className="column fightFont" style={{backgroundColor:'#00FA96',color:'black',fontFamily: 'Work Sans'}}>
                                {this.state.fight[3]}
                            </div>
                        }
                        {(this.state.fight[4].includes('Draw') || this.state.fight[4].includes('No Contest') || this.state.fight[4].includes('NC')) &&
                            <div className="column fightFont" style={{backgroundColor:'#D3D3D3',color:'black',fontFamily: 'Work Sans'}}>
                                {this.state.fight[3]}
                            </div>
                        }
                        {(!this.state.fight[4].includes('Draw') && !this.state.fight[4].includes('No Contest') && !this.state.fight[4].includes('NC') && this.state.fight[2] === "def.") &&
                            <div className="column fightFont" style={{backgroundColor:'#FF0000',color:'black',fontFamily: 'Work Sans'}}>
                                {this.state.fight[3]}
                            </div>
                        }


                </div>

                }




            </div>







        );
    }
}



export default Fight;
