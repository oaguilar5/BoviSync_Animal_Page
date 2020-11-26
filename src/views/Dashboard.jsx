/*!

=========================================================
* Animal Page v1.0.0
* Dashboard View
=========================================================

* Product Page: https://github.com/oaguilar5/BoviSync_Animal_Page
* Free License

* Author: Oscar Aguilar
* Created: 11/25/2020

=========================================================


*/


import React from "react";
import Section from "../components/Section.jsx"
// reactstrap components
import { 
    Button,
    Card, 
    CardHeader, 
    CardBody,
    Col,
    Input,
    Label,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Collapse,
    UncontrolledDropdown,
    DropdownItem,
    DropdownToggle,
    DropdownMenu
} from "reactstrap";


var className = "dashboard-view"
var colors = [
    "auto", 
    "lightsalmon", 
    "lightseagreen", 
    "lightgoldenrodyellow", 
    "lightslategray", 
    "lightcoral", 
    "brown", 
    "mediumaquamarine", 
    "goldenrod", 
    "mediumorchid"
]


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            welcomeMsg: "Welcome! Please specify your preferences below",
            infoMsg: "Hover over any table header to view the data item name. Hover over any table data item to view its description.",
            infoModal: false,
            modalMsg: "",
            itemMeta: {},
            pageMeta: [],
            animalData: {},
            decimals: "",
            thresholdHigh: "",
            colorHigh: "",
            thresholdLow: "",
            colorLow: "",
            dataUnknown: "Data Unknown",
            headerColors: colors,
            noData: ""
        };
      }

    /**
     * Name: componentDidMount
     * Description: React component lifecycle funciton called when component renders
     * 
     * @params none
     * @returns none
    **/
    componentDidMount() {
        this.fetchAppData();
    }
    
    /**
     * Name: fetchAppData
     * Description: retrieves meta data and report item JSON files to determine how to render the page
     * 
     * @params none
     * @requires JSON file links provided by BoviSync
     * @returns none - sets the state variables of the component
    **/
    fetchAppData = () => {
        //make async calls to retrieve each item and set its state

        //item meta
        fetch(this.props.itemMetaUrl)
            .then(response => response.json())
            .then(data => this.itemMetaReconstruct(data))
            .catch(err => {
                //display an error message to the user
                this.setState({infoModal: true, modalMsg: "Error retrieving Item Meta Data, please try again"})
                //DEBUG
                console.log("Dashboard.jsx: error retrieving item meta. Error: " + err)
            })

        //page meta
        fetch(this.props.pageMetaUrl)
            .then(response => response.json())
            .then(data => {
                //check to ensure the 'sections' array is present
                if (data.sections) {
                    this.setState({pageMeta: data.sections})
                } else {
                    //present error message
                    this.setState({infoModal: true, modalMsg: "Error: no sections present in Page Meta Data", noData: "No Sections Available"})
                }
            })
            .catch(err => {
                //display an error message to the user
                this.setState({infoModal: true, modalMsg: "Error retrieving Page Meta Data, please try again", noData: "No Sections Available"})
                //DEBUG
                console.log("Dashboard.jsx: error retrieving page meta. Error: " + err)
            })

        //animal data
        fetch(this.props.animalDataUrl)
            .then(response => response.json())
            .then(data => this.setState({animalData: data}))
            .catch(err => {
                //display an error message to the user
                this.setState({infoModal: true, modalMsg: "Error retrieving Animal Data, please try again"})
                //DEBUG
                console.log("Dashboard.jsx: error retrieving animal data. Error: " + err)
            })
    }

    /**
     * Name: itemMetaReconstruct
     * Description: reconstructs itemMeta as a Map where each key is the shortName
     * 
     * @params itemMeta - object retrieved from json fetch
     * @requires JSON file item meta to be an array of objects which should contain shortName
     * @returns none - sets the itemMeta state variable
    **/
   itemMetaReconstruct = itemMeta => {
        try {
            let itemMetaMap = {};
            for (let i=0;i<itemMeta.length;i++) {
                let thisItem = {[itemMeta[i].shortName]: itemMeta[i]}
                Object.assign(itemMetaMap, thisItem)
            }
            //set the state variable
            this.setState({itemMeta: itemMetaMap})
        } catch (err) {
            //present an error
            console.log("Dashboard.jsx: encountered error in itemMetaReconstruct(). Error: " + err)
        }
   }

   /**
     * Name: toggleModal
     * Description: negates the value of the modal to open/close
     * 
     * @params none
     * @requires none
     * @returns none - sets the state variable
    **/
   toggleModal = () => {
        this.setState(prevState => { return { infoModal: !prevState.infoModal } })
    }


    /**
     * Name: inputOnBlur
     * Description: Special method assigned to the two threshold input elements...
     * Used to evaluate the threshold values to ensure low is not greater than high and vice-versa
     * 
     * @params evt - the event triggered by focusing on the element
     * @requires none
     * @returns none - sets the state variable
    **/
    inputOnBlur = evt => {
        try {
            let id = evt.target.id;
            let value = evt.target.value;
            value = parseInt(value);
            //check if a threshold value was updated that it doesn't breach the other's limit
            let thresholdLow = this.state.thresholdLow;
            let thresholdHigh = this.state.thresholdHigh;
            //if the values were breached, change the threshold value
            if (thresholdHigh && id === "thresholdLow" && value > thresholdHigh) {
                this.setState({thresholdHigh: value})
            } else if (thresholdLow && id === "thresholdHigh" && value < thresholdLow) {
                this.setState({thresholdLow: value})
            }
        } catch (err) {
            console.log("Dashboard.jsx: encountered error in inputOnBlur(). Error: " + err)
        }
    }

    /**
     * Name: inputOnChange
     * Description: Basic method assigned to all inputs to change their value state variable
     * 
     * @params none
     * @requires none
     * @returns none - sets the state variable
    **/
   inputOnChange = evt => {
       try {
            let id = evt.target.id;
            let value = evt.target.value;
            let type = evt.target.type;
            if (type === "select") {
                    value = evt.target.options[evt.target.selectedIndex].value;
            } else if (type === "number") {
                //sanitize numbers
                value = parseInt(value);
            }
            this.setState({[id]: value})
       } catch (err) {
        console.log("Dashboard.jsx: encountered error in inputOnChange(). Error: " + err)
       }
        
   }

  render() {
    return (
      <>
        <div className={className}>
        <Navbar color="light" light expand="lg">
          <div className="logo">
            <a href="/app"><img src="/images/logo_1.png" alt="Animal Page" /></a>
          </div>
            <NavbarToggler />
            <Collapse navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/app">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/app">My Farm</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/app">Dairy Central</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/app">Search</NavLink>
                </NavItem>

              </Nav>
              <div className="account-link">
                <UncontrolledDropdown>
                  <DropdownToggle
                    color="default"
                    data-toggle="dropdown"
                    caret
                  >
                    <div className="user-photo">
                      <img alt="User" src="/images/user-icon.png" />
                    </div>
                    <p className="d-lg-none">Log out</p>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <DropdownItem header >John Doe</DropdownItem>
                    <DropdownItem divider tag="li" />
                    <NavLink tag="li" >
                      <DropdownItem className="nav-item" href="/app">Log out</DropdownItem>
                    </NavLink>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </Collapse>
          </Navbar>
            <Modal isOpen={this.state.infoModal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Notice</ModalHeader>
                <ModalBody>
                    {this.state.modalMsg}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>Ok</Button>{' '}
                </ModalFooter>
            </Modal>
            <div className="preferences">
                <Card>
                    <CardHeader><b>Preferences</b></CardHeader>
                    <CardBody>
                        <p>{this.state.welcomeMsg}</p>
                        <p>{this.state.infoMsg}</p>
                        <Row>
                            <Col md="2">
                                <Label>Decimal Places</Label>
                                <Input 
                                    type="number" 
                                    id="decimals" 
                                    min="0" 
                                    max="10" 
                                    value={this.state.decimals} 
                                    onChange={this.inputOnChange}
                                />
                            </Col>
                            <Col md="2">
                                <Label>Mark values over</Label>
                                <Input 
                                    type="number" 
                                    id="thresholdHigh" 
                                    value={this.state.thresholdHigh} 
                                    onChange={this.inputOnChange}
                                    onBlur={this.inputOnBlur}
                                />
                            </Col>
                            <Col md="2">
                                <Label>With Color</Label>
                                <Input 
                                    type="select" 
                                    id="colorHigh" 
                                    value={this.state.colorHigh} 
                                    onChange={this.inputOnChange} 
                                    
                                >
                                    <option></option>
                                    <option>Green</option>
                                    <option>Red</option>
                                    <option>Blue</option>
                                </Input>
                            </Col>
                            <Col md="2">
                                <Label>Mark values under</Label>
                                <Input 
                                    type="number" 
                                    id="thresholdLow" 
                                    value={this.state.thresholdLow} 
                                    onChange={this.inputOnChange}
                                    onBlur={this.inputOnBlur}
                                />
                            </Col>
                            <Col md="2">
                                <Label>With Color</Label>
                                <Input 
                                    type="select" 
                                    id="colorLow" 
                                    value={this.state.colorLow} 
                                    onChange={this.inputOnChange} 
                                    onBlur={this.inputOnBlur}
                                >
                                    <option></option>
                                    <option>Green</option>
                                    <option>Red</option>
                                    <option>Blue</option>
                                </Input>
                            </Col>
                            <Col md="2">
                                <Label>Specify Unknown Values As</Label>
                                <Input 
                                    type="text" 
                                    id="dataUnknown" 
                                    value={this.state.dataUnknown} 
                                    onChange={this.inputOnChange}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
            {this.state.pageMeta.length > 0 &&
                [...this.state.pageMeta].map((item, index) => (
                    <Section
                        key={Date.now() + "_" + item.label}
                        headerName={item.label}
                        items={item.items}
                        itemMeta={this.state.itemMeta}
                        animalData={this.state.animalData}
                        decimals={this.state.decimals}
                        thresholdHigh={this.state.thresholdHigh}
                        thresholdLow={this.state.thresholdLow}
                        colorHigh={this.state.colorHigh}
                        colorLow={this.state.colorLow}
                        dataUnknown={this.state.dataUnknown}
                        headerColor={this.state.headerColors[index % 10]}
                    />
                ))
            }
            {this.state.pageMeta.length === 0 &&
                <h1 className="text-muted no-data">{this.state.noData}</h1>
            }
        </div>
      </>
    );
  }
}

export default Dashboard;