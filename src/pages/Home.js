import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import RoomItem from '../components/RoomItem';
import NavPanel from '../components/NavPanel';
import { getRooms } from '../redux/rooms/rooms';
import lunar from '../images/lunar.png';

const Home = () => {
  const rooms = useSelector((state) => state.roomsReducer);
  console.log(rooms);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="Container">
        <div className="vis">
          <FontAwesomeIcon icon={faBars} onClick={handleShow} />
        </div>
        <div className="home">
          <div className="nav">
            <img src={lunar} className="lunar-logo" alt="Lunar Hotel Logo" />
            <NavPanel />
          </div>
          <div className="main">
            <h1>Lunar&apos;s rooms</h1>
            {rooms.length === 0 ? (
              <h2>Create a room</h2>
            ) : (
              <h2>Please select a room for reservation</h2>
            )}
            <div className="rooms">
              {rooms && (
                rooms.map((room) => (
                  <RoomItem room={room} key={room.id} rooms={rooms} />
                )))}
            </div>
          </div>
        </div>
      </div>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lunar</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Home;
