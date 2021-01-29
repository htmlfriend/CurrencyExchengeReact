import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
import Layout from "./component/layout/Layout";
import { Dark } from "./component/dark/Dark";
import { Modal } from "./component/modal/Modal";
import { RateContext } from "./context/RateContext";
import { Input } from "./component/input/Input";

import CHF from "./image/CHF.png";
import CNY from "./image/CNY.png";
import EUR from "./image/EUR.png";
import GBP from "./image/GBP.png";
import JPY from "./image/JPY.png";
import RUB from "./image/RUB.png";
import USD from "./image/USD.png";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      error: "",
      showModal: false,
      isFormValid: false,
      formControlls: {
        email: {
          value: "",
          type: "email",
          label: "Email",
          errorMessage: "Enter the correct email",
          valid: false,
          touched: false,
          validation: {
            required: true,
            email: true,
          },
        },
        password: {
          value: "",
          type: "password",
          label: "Password",
          errorMessage: "Enter the correct password",
          valid: false,
          touched: false,
          validation: {
            required: true,
            minLength: 6,
          },
        },
      },
      base: "USD",
      rate: "",
      date: "",
      currency: {
        USD: { name: "Доллар США", flag: USD, course: null },
        CNY: { name: "Китайский Юань", flag: CNY, course: null },
        EUR: { name: "Евро", flag: EUR, course: null },
        GBP: { name: "Фунт Стерлингов", flag: GBP, course: null },
        JPY: { name: "Японская Йена", flag: JPY, course: null },
        RUB: { name: "Российский Рубль", flag: RUB, course: null },
        CHF: { name: "Швейцарский Франк", flag: CHF, course: null },
      },

      /**
       * calculator
       */
      inputValue: 100,
      currencyValue: "USD",
      result: null,

      /**
       * sample with the basebase on a firebase
       */

      sample: {
        base: "USD",
        base2: "RUB",
        date: "",
        course: "",
      },
      sampleList: "",
    };
  }

  /**
   * validate form for register and login
   */

  validateEmail = (email) => {
    var regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;

    return regex.test(String(email).toLowerCase());
  };

  validateControl = (value, validation) => {
    if (!validation) {
      // no rules
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (validation.email) {
      isValid = this.validateEmail(value) && isValid;
    }
    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }
    return isValid;
  };

  onChangeHandlerForm = (event, controlName) => {
    let formControlls = Object.assign({ ...this.state.formControlls });

    let control = { ...formControlls[controlName] };
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    formControlls[controlName] = control;
    let isFormValid = true;

    Object.keys(formControlls).forEach((item) => {
      isFormValid = formControlls[item].valid && isFormValid;
    });
    this.setState({ formControlls, isFormValid });
  };

  renderInputs = () => {
    return Object.keys(this.state.formControlls).map((controlName, idx) => {
      let control = this.state.formControlls[controlName];
      return (
        <Input
          key={controlName + idx}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={true}
          onChange={(event) => this.onChangeHandlerForm(event, controlName)}
        />
      );
    });
  };

  // -----------------------------------

  /**
   * method for the modal form
   */
  modalShowHandler = () => {
    this.setState({ showModal: true });
  };

  modalHideHandler = () => {
    this.setState({ showModal: false });
  };

  // -------------------------

  /**
   * methods for the sample page
   */
  baseHandler = (event) => {
    this.setState({
      sample: { ...this.state.sample, base: event.target.value },
    });
  };
  base2Handler = (event) => {
    this.setState({
      sample: { ...this.state.sample, base2: event.target.value },
    });
  };
  sampleDateHandler = (event) => {
    this.setState({
      sample: { ...this.state.sample, date: event.target.value },
    });
  };

  dataWrite = async () => {
    // get the course at the date
    await fetch(
      `https://api.exchangeratesapi.io/latest?${this.state.sample.date}base=${this.state.sample.base}`
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          sample: {
            ...this.state.sample,
            course: response.rates[this.state.sample.base2],
          },
        });
      });

    // send to the database
    await axios
      .post(
        "https://rateup-c00b1-default-rtdb.firebaseio.com/sample.json",
        this.state.sample
      )
      .then((response) => {
        return "";
      });

    // get data from databases

    await axios
      .get("https://rateup-c00b1-default-rtdb.firebaseio.com/sample.json")
      .then((response) => {
        this.setState({
          sampleList: response.data,
        });
      });
  };

  // delete  request list items from the the reducer page

  sampleRemove = async (id) => {
    let sampleList = { ...this.state.sampleList };

    delete sampleList[id];
    this.setState({
      sampleList,
    });

    await axios.delete(
      `https://rateup-c00b1-default-rtdb.firebaseio.com/sample/${id}.json`
    );
  };
  // ------------------

  getData = async () => {
    const response = await (
      await fetch(
        `https://api.exchangeratesapi.io/latest?base=${this.state.base}`
      )
    ).json();

    return response;
  };

  inputValueHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
      result: null,
    });
  };

  currencyValueHandler = (event) => {
    this.setState({
      currencyValue: event.target.value,
      result: null,
    });
  };

  calculatorHandler = async (value) => {
    let result;
    await fetch("https://api.exchangeratesapi.io/latest?base=RUB")
      .then((response) => response.json())
      .then((response) => {
        result = response.rates[value] * this.state.inputValue;
      });

    this.setState({
      result,
    });
  };

  /**
   * Login and register pages with rest auth firebase
   */
  loginHandler = async () => {
    const authData = {
      email: this.state.formControlls.email.value,
      password: this.state.formControlls.password.value,
      returnSecureToken: true,
    };
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=",
        authData
      );
      if (response.data.idToken) {
        const formControlls = { ...this.state.formControlls };
        formControlls.email.value = "";
        formControlls.password.value = "";
        this.setState({
          auth: true,
          showModal: false,
          error: "",
          formControlls,
        });
      }
    } catch (error) {
      this.setState({
        error: "Try again.Login is wrong!",
      });
    }
  };

  registerHandler = async () => {
    const authData = {
      email: this.state.formControlls.email.value,
      password: this.state.formControlls.password.value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
        authData
      );

      if (response.data.idToken) {
        const formControlls = { ...this.state.formControlls };
        formControlls.email.value = "";
        formControlls.password.value = "";
        this.setState({
          auth: true,
          showModal: false,
          error: "",
          formControlls,
        });
      }
    } catch (error) {
      this.setState({
        error:
          "Try again.Registration is failed! Something went wrong on our server",
      });
    }
  };

  //------------------------

  componentDidMount() {
    // https://api.exchangeratesapi.io/latest?base=USD
    this.getData().then((response) => {
      let { rates } = response;
      const currency = Object.assign({}, { ...this.state.currency });

      Object.keys(rates).forEach((item) => {
        Object.keys(currency).forEach((elem) => {
          if (elem === item) {
            currency[item].course = rates[item];
          }
        });
      });
      this.setState({
        rate: response.rates,
        date: response.date,
        currency: currency,
      });
    });
    /**
     * state for the page 'reducer'. The previous request to the data.
     */
    axios
      .get("https://rateup-c00b1-default-rtdb.firebaseio.com/sample.json")
      .then((response) => {
        this.setState({
          sampleList: response.data,
        });
      });
  }

  render() {
    return (
      <RateContext.Provider
        value={{
          state: this.state,
          inputValueHandler: this.inputValueHandler,
          currencyValueHandler: this.currencyValueHandler,
          calculatorHandler: this.calculatorHandler,
          baseHandler: this.baseHandler,
          base2Handler: this.base2Handler,
          sampleDateHandler: this.sampleDateHandler,
          dataWrite: this.dataWrite,
          sampleRemove: this.sampleRemove,
          renderInputs: this.renderInputs,
          modalShowHandler: this.modalShowHandler,
          modalHideHandler: this.modalHideHandler,
          loginHandler: this.loginHandler,
          registerHandler: this.registerHandler,
        }}
      >
        <Dark
          showModal={this.state.showModal}
          modalHideHandler={this.modalHideHandler}
        />
        <Modal />
        <Layout />
      </RateContext.Provider>
    );
  }
}
