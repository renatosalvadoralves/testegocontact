import React, { Component } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Button } from 'reactstrap';


//const queryString = require('query-string');


class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nrCidades: false,
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.confirmCities = this.confirmCities.bind(this);

  }
  
  handleChange(event) {
    event.preventDefault();
    let cities = this.state.cities;
    let name = event.target.name;
    let value = event.target.value;
    cities[name] = value;
    console.log(this.state.cities)
    this.setState({cities})
  }

confirmCities(){
  const {
    cities
   } = this.state;
   console.log(cities)

   fetch('/weather', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        weather: cities,
    }),
}).then(res => res.json())
    .then(json => {
      console.log(json)
        if (json.success) {
            console.log('client success')
            this.props.setValues(json.data)
        } else {
          console.log('client fail')

        }
    })
}

  render() {
    const {
     nrCidades
    } = this.state;

    if (nrCidades) {
        var data = [];
      for (var i = 0; i < nrCidades; i++) {  
        data.push(<div className="wrap-input100 validate-input" data-validate="Name is required">
          <input className="input100" id="name" type="text" value={this.state.cities[i]} onChange={this.handleChange} name={i} placeholder='Cidade' />
          <label className="label-input100" htmlFor="name">
            <span className="lnr lnr-user" />
          </label>
        </div>)
      }
      return (<div className="container-contact100">
        <div className="wrap-contact100">
          <form className="contact100-form validate-form">
          <span className="contact100-form-title">
              Insira a cidade ou cidades.
                </span>
                <ValidatorForm
              ref="form"
              onSubmit={this.confirmCities}
              onError={errors => console.log(errors)}
            >
            {data}
            <Button outline size="lg" color="secondary">Confirmar</Button>{' '}
            </ValidatorForm>
          </form>
        </div>
      </div>)
    }


    return (
      <div className="container-contact100">
        <div className="wrap-contact100">
          <form className="contact100-form validate-form">
            <span className="contact100-form-title">
              Insira o número de cidades que pretende.
                </span>
            <ValidatorForm
              ref="form"
              onError={errors => console.log(errors)}
              contentStyle={{ width: "29%" }}
            >

              <DropDownMenu
                value={nrCidades}
                onChange={(event, index, value) => this.setState({ nrCidades: value })}
                labelStyle={{ textColor: "black", color: 'black', paddingLeft: 0, marginLeft: 0 }}
                underlineStyle={{ borderColor: 'black', margin: 0 }}
                autoWidth={true}
                selectedMenuItemStyle={{ color: 'black' }}
                animated={true}
                menuStyle={{ fontFamily: "metropolis-regular" }}
                style={{ width: '100% !important' }}
                iconStyle={{ fill: '#000000' }}

              >
                <MenuItem value={1} primaryText='1' />
                <MenuItem value={2} primaryText='2' />
                <MenuItem value={3} primaryText='3' />
                <MenuItem value={4} primaryText='4' />
                <MenuItem value={5} primaryText='5' />
                <MenuItem value={6} primaryText='6' />
                <MenuItem value={7} primaryText='7' />
                <MenuItem value={8} primaryText='8' />

              </DropDownMenu>

              <br />



            </ValidatorForm>
          </form></div></div>
    )

    return (
      <div className="container-contact100">
        <div className="wrap-contact100">
          <form className="contact100-form validate-form">
            <span className="contact100-form-title">
              Get in Touch
                </span>
            <div className="wrap-input100 validate-input" data-validate="Name is required">
              <input className="input100" id="name" type="text" name="name" placeholder="Name" />
              <label className="label-input100" htmlFor="name">
                <span className="lnr lnr-user" />
              </label>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
              <input className="input100" id="email" type="text" name="email" placeholder="Email" />
              <label className="label-input100" htmlFor="email">
                <span className="lnr lnr-envelope" />
              </label>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Phone is required">
              <input className="input100" id="phone" type="text" name="phone" placeholder="Phone" />
              <label className="label-input100" htmlFor="phone">
                <span className="lnr lnr-phone-handset" />
              </label>
            </div>
            <div className="wrap-input100 validate-input" data-validate="Message is required">
              <textarea className="input100" name="message" placeholder="Your message..." defaultValue={""} />
            </div>
            <div className="contact100-form-checkbox">
              <input className="input-checkbox100" id="ckb1" type="checkbox" name="copy-mail" />
              <label className="label-checkbox100" htmlFor="ckb1">
                Send copy to my-email
                  </label>
            </div>
            <div className="container-contact100-form-btn">
              <div className="wrap-contact100-form-btn">
                <div className="contact100-form-bgbtn" />
                <button className="contact100-form-btn">
                  Send Email
                    </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default Form;