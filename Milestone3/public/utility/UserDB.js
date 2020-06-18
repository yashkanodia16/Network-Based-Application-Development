var usersData = [
  {
    u_id: 1,
    u_fname: 'Yash',
    u_lname: 'Kanodia',
    email: 'ykanodia@uncc.edu',
    address: 'University Terrace Drive',
    ucity: "Charlotte",
    ustate: "NC",
    uzip: 28262, 
    ucountry: 'USA'
  }
  ]
  module.exports.getUser = function() {
  return usersData[0];
  }