export const loads = [
  { id: "CG-2084", cargo: "Packaged food", from: "Muzaffarpur, Bihar", to: "Patna, Bihar", weight: "8 tonnes", vehicle: "14 ft truck", rate: 12500, date: "22 Oct 2026", distance: "75 km", shipper: "NorthStar Foods", status: "Open", quotes: 4 },
  { id: "CG-2085", cargo: "Textile rolls", from: "Delhi, Delhi", to: "Jaipur, Rajasthan", weight: "12 tonnes", vehicle: "17 ft truck", rate: 22000, date: "23 Oct 2026", distance: "281 km", shipper: "Aarav Textiles", status: "Open", quotes: 7 },
  { id: "CG-2086", cargo: "Industrial supplies", from: "Hajipur, Bihar", to: "Kolkata, West Bengal", weight: "16 tonnes", vehicle: "Container truck", rate: 38000, date: "24 Oct 2026", distance: "560 km", shipper: "Eastern Components", status: "Open", quotes: 3 },
  { id: "CG-2087", cargo: "Building materials", from: "Lucknow, Uttar Pradesh", to: "Kanpur, Uttar Pradesh", weight: "10 tonnes", vehicle: "Open truck", rate: 14800, date: "25 Oct 2026", distance: "90 km", shipper: "BuildRight Supply", status: "Open", quotes: 5 },
  { id: "CG-2088", cargo: "Consumer goods", from: "Ranchi, Jharkhand", to: "Patna, Bihar", weight: "6 tonnes", vehicle: "14 ft truck", rate: 19500, date: "26 Oct 2026", distance: "326 km", shipper: "Everyday Retail", status: "Open", quotes: 2 },
  { id: "CG-2089", cargo: "Pharmaceutical cartons", from: "Patna, Bihar", to: "Varanasi, Uttar Pradesh", weight: "4 tonnes", vehicle: "Closed container", rate: 17200, date: "27 Oct 2026", distance: "245 km", shipper: "Medline Distribution", status: "Open", quotes: 6 },
];

export const trucks = [
  { id: "TR-101", name: "Tata LPT 1618", type: "Open truck", capacity: "16 tonnes", location: "Muzaffarpur, Bihar", owner: "Singh Transport Co.", verified: true, rating: 4.8, trips: 142 },
  { id: "TR-102", name: "BharatBenz 1217", type: "Container", capacity: "12 tonnes", location: "Patna, Bihar", owner: "Eastern Freight", verified: true, rating: 4.7, trips: 96 },
  { id: "TR-103", name: "Ashok Leyland 1920", type: "Trailer", capacity: "20 tonnes", location: "Delhi, Delhi", owner: "A-One Logistics", verified: true, rating: 4.9, trips: 218 },
  { id: "TR-104", name: "Eicher Pro 2095", type: "14 ft truck", capacity: "7 tonnes", location: "Jaipur, Rajasthan", owner: "Sharma Fleet", verified: false, rating: 4.3, trips: 31 },
];

export const shipments = [
  { id: "CG-2011", cargo: "Packaged food", route: "Muzaffarpur → Patna", transporter: "Singh Transport Co.", progress: 68, status: "In transit", eta: "Today, 5:30 PM", from: "Muzaffarpur, Bihar", to: "Patna, Bihar" },
  { id: "CG-2004", cargo: "Textile rolls", route: "Delhi → Jaipur", transporter: "A-One Logistics", progress: 100, status: "Delivered", eta: "Delivered 15 Oct", from: "Delhi, Delhi", to: "Jaipur, Rajasthan" },
  { id: "CG-1998", cargo: "Industrial supplies", route: "Hajipur → Kolkata", transporter: "Eastern Freight", progress: 24, status: "Picked up", eta: "Tomorrow, 11 AM", from: "Hajipur, Bihar", to: "Kolkata, West Bengal" },
];

export const quotes = [
  { id: "QT-731", loadId: "CG-2084", transporter: "Singh Transport Co.", vehicle: "14 ft truck", price: 11800, eta: "1 day", rating: 4.8, verified: true, note: "GPS updates available" },
  { id: "QT-732", loadId: "CG-2084", transporter: "Bihar Roadways", vehicle: "16 ft truck", price: 12400, eta: "1 day", rating: 4.6, verified: true, note: "Loading support included" },
  { id: "QT-733", loadId: "CG-2084", transporter: "QuickHaul Fleet", vehicle: "14 ft truck", price: 10900, eta: "2 days", rating: 4.4, verified: false, note: "Final rate subject to confirmation" },
];
// Alias used by the operations dashboard. Keep `shipments` as the source of truth.
export const initialShipments = shipments;
