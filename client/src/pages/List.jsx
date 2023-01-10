import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import SearchItem from '../components/SearchItem'
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import "./list.css"

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  return (
    <div>
      <Navbar />
      <Header type="list"/>
      <Container>
        <Row className='mt-3'>
          <Col className='col-3 listSearch'>
            <h3>Search</h3>
            <div className='mb-2 lsInput'>
              <label>Destination</label>
              <input placeholder={destination} ></input>
            </div>
            <div className='mb-2 lsInput'>
              <label>Date</label><br/>
              <span onClick={() => setOpenDate(!openDate)}>
                {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInputSmall"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="llsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInputSmall"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInputSmall"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <div className='d-flex justify-content-center'>
              <button className='btn btn-primary w-100'>Search</button>
            </div>
          </Col>
          <Col>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default List