import React from 'react';
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { handleAddPlace, postPlace } from "../../apis";

import { MainArea, StyledCard, CardInner} from "../../components";

class AutoAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  handleChange = e => {
    const params = this.state.user;
    params[e.target.name] = e.target.value;
    this.setState({ user: params });
  };

  complementAddress = () => {
    const { AjaxZip3 } = window;
    AjaxZip3.zip2addr(
      'postalCodeH',
      'postalCodeF',
      'prefecture',
      'city',
      'street'
    );
  };

  onBlurZipcode = () => {
    this.setState({
      user: {
        ...this.state.user,
        prefecture: document.getElementById('prefecture').value,
        city: document.getElementById('city').value,
        street: document.getElementById('street').value
      }
    });
  };

  render() {
    return(
      <>
        <input
          name="postalCodeH"
          size="3"
          maxLength="3"
          onChange={e => this.handleChange(e)}
        />
        -
        <input
          name="postalCodeF"
          size="4"
          maxLength="4"
          onChange={e => this.handleChange(e)}
          onKeyUp={this.complementAddress}
          onBlur={this.onBlurZipcode}
        />
        <input
            name="prefecture"
            id="prefecture"
            placeholder="都道府県"
            onChange={e => this.handleChange(e)}
        />
        <input
            name="city"
            id="city"
            placeholder="市町村"
            onChange={e => this.handleChange(e)}
        />
        <input
            name="street"
            id="street"
            placeholder="番地"
            onChange={e => this.handleChange(e)}
        />
      </>
    )  
  }
}
export default AutoAddress;

export function PlaceAddPage({ setHdTitle }) {
  
  const { register, handleSubmit, formState: { errors }, control, setValue } = useForm();
  const onSubmit = data => { 
    console.log(data);
    postPlace(data, 'add');
  }

  return (
    <MainArea>
      <StyledCard
        variant="outlined"
        >
        <CardInner>
      <form onSubmit={handleAddPlace} className="h-adr">
        
        <dl>
          <dt>会場名</dt>
          <dd>
            <input type="text" placeholder="name" {...register("name", {required: true, maxLength: 40})} />
            { errors.name && <span className="text-danger">必須・40文字以下</span> }
          </dd>
        </dl>
        <div className="head_main">
            <input type="text" name="name" placeholder="会場名" className="name_large"/>
          </div>
          <div className="detail">
            <div className="memo">
              <textarea type="text" name="memo" placeholder="メモ"/>
            </div>
            <div className="country">
              <textarea type="text" name="country" placeholder="国"/>
            </div>
            <div className="postalCode">
              <textarea type="text" name="postalCode" placeholder="郵便番号"/>
            </div>
            <div className="prefecture">
              <textarea type="text" name="prefecture" placeholder="都道府県"/>
            </div>
            <div className="city">
              <textarea type="text" name="city" placeholder="市町村"/>
            </div>
            <div className="street">
              <textarea type="text" name="street" placeholder="番地"/>
            </div>
            <div className="tel">
              <textarea type="text" name="tel" placeholder="TEL"/>
            </div>
            <div className="fax">
              <textarea type="text" name="fax" placeholder="FAX"/>
            </div>
          </div>
          <AutoAddress />
          <button type="submit">追加</button>
      </form>
        </CardInner>
      </StyledCard>
    </MainArea>
  );
}
