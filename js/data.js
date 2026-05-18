const savedTrips =  localStorage.getItem("trips");
const trips = savedTrips
    ? JSON.parse(savedTrips)
    : [];