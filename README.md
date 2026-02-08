Bookfiy - Salonflow is a booking and scheduling system for service-based businesses(salons, barbers, coaches) to help them manage appointments and get more clients online.
A simple booking flow that handles: service selection → date/time selection → customer details → WhatsApp confirmation/localstorage.

This project is fully built with React and Tailwindcss.
Features are:
Designing multi-step booking flow.
Service selection, date/time, user details.
Whatsapp bokking integration or localstorage
Focus on product flow and UX

Parent (BookingFlow)
  ├── owns services data
  ├── owns selectedService state
  ├── owns selectedDate
  ├── owns selectedTime
  └── controls booking flow

Services (Child)
  ├── receives services
  ├── shows cards
  ├── highlights selected
  └── reports clicks upward

More than once component needs the data, so the state goes to the parent.

The parent component owns the truth
The child components only display and reports user actions
This flow teaches Controlled components + lifting state up which makes it easier to control multi-step flows.

A solid booking flow with:
localStorage persistence with validation
Service selection with form reset
Multi-step navigation with back buttons
Direct WhatsApp integration with formatted messages

