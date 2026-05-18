const savedTrips =  localStorage.getItem("trips");
let trips = savedTrips
    ? JSON.parse(savedTrips)
    : [];