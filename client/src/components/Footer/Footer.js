import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
        <section className="hero is-medium" style={{background:'#1B1924'}}>
            <div className="hero-body">
                <div className="container" style={{width:60+'%',paddingLeft:7.5+'%'}}>

                    <div className="columns is-multiline is-mobile">
                        <div className="column is-one-quarter" style={{color:'#F4F4F4',lineHeight:60+'%'}}>
                            <span style={{fontSize:1.7+'em'}}>MMA</span><br />
                            <span style={{fontSize:0.7+'em'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                Countdown</span>
                        </div>
                        <div className="column is-one-quarter has-text-grey">
                            <h3 style={{color:'#48D3D4'}}>Location</h3>
                        </div>
                        <div className="column is-one-quarter has-text-grey-light">
                            <h3 style={{color:'#48D3D4'}}>Contact</h3>
                        </div>
                        <div className="column is-one-quarter has-text-grey-lighter">
                            <h3 style={{color:'#48D3D4'}}>Legal</h3>
                        </div>

                        <div className="column is-one-quarter vertical-align-text-div" style={{color:'#F4F4F4',lineHeight:80+'%'}}>
                        <div className="vertical-align-text-p">
                            <span style={{fontSize:0.7+'em'}}>© All Rights Reserved 2019</span><br />
                            <span style={{fontSize:0.7+'em'}}>MMA Countdown</span>
                        </div>
                        </div>
                        <div className="column is-one-quarter has-text-grey">
                                <a className="underline--magical" target="_blank"
                                   href="put_location_google_maps" style={{textDecoration: 'none',color: '#fff'}}>
                                    A Student House<br />
                                    Hamilton, Canada</a>
                        </div>
                        <div className="column is-one-quarter has-text-grey-light">

                        </div>
                        <div className="column is-one-quarter has-text-grey-lighter">
                        
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
  }
}

export default Footer;
