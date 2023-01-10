import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react'
import "./header.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import {Col, Container, Row } from "react-bootstrap"
import { DateRange } from 'react-date-range';



const Header = ({type}) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 2,
    children: 0,
    room: 1,
  });
  const handleOption = (name, operation) =>{
    setOptions((prev) => {
      return {
        ...prev, 
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      }
    })
  }

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className='header'>
      <Container>
          <Row className='d-flex text-white header-Nav m-auto '>
              <Col className='headerCol'>
                <button href='/' className='text-decoration-none btn btn-outline-light marginButton'>
                    <FontAwesomeIcon icon={faBed} />
                    <span className='mx-2' >Stays</span> 
                </button>
                <a href='/' className='text-decoration-none btn btn-outline-light mx-2'>
                    <FontAwesomeIcon icon={faPlane} />
                    <span className='mx-2'>Flight</span> 
                </a>
                <a href='/' className='text-decoration-none btn btn-outline-light mx-2'>
                    <FontAwesomeIcon icon={faCar} />
                    <span className='mx-2'>Car Rentals</span> 
                </a>
                <a href='/' className='text-decoration-none btn btn-outline-light mx-2'>
                    <FontAwesomeIcon icon={faBed} />
                    <span className='mx-2'>Attraction</span> 
                </a>
                <a href='/' className='text-decoration-none btn btn-outline-light mx-2'>
                    <FontAwesomeIcon icon={faTaxi} />
                    <span className='mx-2'>Taxi</span> 
                </a>
              </Col>              
          </Row>
          { type !== "list" &&
            <><Row>
            <div className='text-white' style={{marginTop:"30px", marginBottom:"100px"}}>
              <h1>A lifetime of discount? It's Genius</h1>
              <p> Get rewarded for your travels - unlock instant savings of 10% or
                more with a free booking.com account</p>
              <button className='btn btn-primary signButton text-white'>Sign in / Register</button>
            </div>
          </Row>
          <Row>
            <div className='d-flex bg-white headerSearch'>
              <Col>
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Col>
              <Col className='d-flex col-3 searchOption' >
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </Col>
              <Col className='d-flex col-3 searchOption'>
                <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
                <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>
                  {`${options.adult} adult, ${options.children} children, ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}>-</button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}>-</button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}>+</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                      <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}>-</button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}>+</button>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
              <button className="searchButton text-white" onClick={handleSearch}>Search</button>
            </div>            
          </Row></>}
      </Container>
    </div>
  )
}

export default Header