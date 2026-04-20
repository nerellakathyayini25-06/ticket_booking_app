import React, { useState } from "react";
import EventDetails from "./components/EventDetails";
import BookingForm from "./components/BookingForm";
import BookingSummary from "./components/BookingSummary";
import "./App.css";

function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Fest 2026",
      department: "Computer Science",
      date: "May 10, 2026 - 10:00 AM",
      venue: "Main Auditorium",
      price: 200,
      availableTickets: 50
    },
    {
      id: 2,
      name: "AI Seminar",
      department: "IT",
      date: "June 5, 2026",
      venue: "Seminar Hall",
      price: 150,
      availableTickets: 30
    }
  ]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [booking, setBooking] = useState(null);
  const [step, setStep] = useState(1); // 👈 controls flow

  // Step 1 → Select Event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setStep(2);
  };

  // Step 2 → Go to Booking Form
  const goToBooking = () => {
    setStep(3);
  };

  // Step 3 → Booking Done
  const handleBooking = (formData) => {
    const updatedEvents = events.map((ev) =>
      ev.id === selectedEvent.id
        ? {
            ...ev,
            availableTickets: ev.availableTickets - formData.tickets
          }
        : ev
    );

    setEvents(updatedEvents);
    setBooking({ ...formData, eventName: selectedEvent.name });
    setStep(4);
  };

  return (
    <div className="container">
      <h1>Event Ticket Booking</h1>

      {/* STEP 1: Show Events */}
      {step === 1 && (
        <>
          <h2>Select Event</h2>
          {events.map((ev) => (
            <div key={ev.id} className="card">
              <h3>{ev.name}</h3>
              <button onClick={() => handleSelectEvent(ev)}>
                Select Event
              </button>
            </div>
          ))}
        </>
      )}

      {/* STEP 2: Show Event Details */}
      {step === 2 && selectedEvent && (
        <>
          <EventDetails event={selectedEvent} />
          <button onClick={goToBooking}>Proceed to Book</button>
        </>
      )}

      {/* STEP 3: Show Booking Form */}
      {step === 3 && selectedEvent && (
        <BookingForm event={selectedEvent} onBook={handleBooking} />
      )}

      {/* STEP 4: Show Summary */}
      {step === 4 && booking && (
        <BookingSummary booking={booking} event={selectedEvent} />
      )}
    </div>
  );
}

export default App;