/*!

=========================================================
* Animal Page v1.0.0
* Section Component
=========================================================

* Product Page: https://github.com/oaguilar5/BoviSync_Animal_Page
* Free License

* Author: Oscar Aguilar
* Created: 11/25/2020

=========================================================


*/


import React from "react";
// react plugin used to create google maps
// reactstrap components
import { 
    Card, 
    CardHeader, 
    CardBody, 
    Table
} from "reactstrap";

var className = "dashboard-section"

class Section extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          headerName: this.props.headerName,
          items: this.props.items,
          itemMeta: this.props.itemMeta,
          animalData: this.props.animalData,
          decimals: this.props.decimals,
          dataUnknown: this.props.dataUnknown,
          display: true
        };
      }

      getDataElement = item => {
        let retVal = this.props.dataUnknown;
        let data = this.props.animalData[item];
        if (typeof data !== 'undefined' && data !== null) {
            retVal = data;
            //if numerical value, check against precision
            if (typeof retVal === 'number') {
                if (this.props.decimals && this.props.decimals > 0) {
                    retVal = retVal.toFixed(this.props.decimals)
                } else if (this.props.decimals === 0) {
                    retVal = parseInt(retVal)
                }
                let color = this.caculateNumericalThreshold(retVal);
                retVal = <span style={{color: color}}><b>{retVal}</b></span>
            }
        }
        return retVal;
      }

      caculateNumericalThreshold = number => {
        let color = ""
        try {
            number = parseInt(number)
            let thresholdLow = this.props.thresholdLow;
            let thresholdHigh = this.props.thresholdHigh;
            if (thresholdLow && number < thresholdLow) {
                color = this.props.colorLow.toLowerCase();
            } else if (thresholdHigh && number > thresholdHigh) {
                color = this.props.colorHigh.toLowerCase();
            }
        } catch (err) {
            console.log("Section.jsx: encountered error in caculateNumericalThreshold(). Error: " + err)
        }
        return color
      }

      getDataName = item => {
        let retVal = "Unknown Name";
        if (typeof this.props.itemMeta[item] !== 'undefined')
            retVal = this.props.itemMeta[item].name;
        return retVal;
      }

      getDataDescription = item => {
        let retVal = "Unknown Description";
        if (typeof this.props.itemMeta[item] !== 'undefined')
            retVal = this.props.itemMeta[item].description;
        return retVal;
      }

      toggleCard = () => {
          this.setState(prevState => { return {display: !prevState.display}})
      }


  render() {
    return (
      <>
        <div className={className}>
            <Card className="section-card">
                <CardHeader 
                    onClick={this.toggleCard}
                    style={{backgroundColor: this.props.headerColor}}
                    >
                        
                    <b>{this.state.headerName}</b> <span className="toggle">{this.state.display ? "-" : "+"}</span>
                </CardHeader>
                <CardBody style={{display: this.state.display ? "block" : "none"}}>
                    {Object.keys(this.state.animalData).length > 0 && 
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                {[...this.props.items].map(item => (
                                    <th title={this.getDataName(item)} key={Date.now() + "_" + item + "_header"}>{item}</th>
                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                {this.props.animalData && [...this.props.items].map(item => (
                                    <td title={this.getDataDescription(item)} key={Date.now() + "_" + item}>{this.getDataElement(item)}</td>
                                ))}
                                </tr>
                            </tbody>
                        </Table>
                    }
                    {Object.keys(this.state.animalData).length === 0 && 
                        <h4 className="text-muted no-data">Unable to retrieve data</h4>
                    }
                </CardBody>
            </Card>
        </div>
      </>
    );
  }
}

export default Section;