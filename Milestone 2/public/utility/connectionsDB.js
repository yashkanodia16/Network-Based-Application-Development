var data = [
    {
      connId: '1',
      connFixtures: 'Real Madrid vs Juventus',
      connName: 'Real Madrid',
      connTopic:'La Liga Teams Selection',
      details: 'Please bring your ID card and Entry Fee is 5 USD',
      date_time: '02/22/2020 6:00pm - 8:00pm',
    },
    {
        connId: '2',
        connFixtures: 'Barcelona vs Napoli',
        connName: 'Barcelona',
        connTopic:'La Liga Teams Selection',
        details: 'Please bring your ID card and Entry Fee is 5 USD',
        date_time: '02/22/2020 6:00pm - 8:00pm',
    },
    {
        connId: '3',
        connFixtures: 'Athletico Madrid vs Getafe CF',
        connName: 'Athletico Madrid',
        connTopic:'La Liga Teams Selection',
        details: 'Please bring your ID card and Entry Fee is 5 USD',
        date_time: '02/22/2020 6:00pm - 8:00pm',
    },
    {
        connId: '4',
        connFixtures: 'Liverpool vs Wolves',
        connName: 'Liverpool',
        connTopic:'Premier League Teams Selection',
        details: 'Please bring your ID card and Entry Fee is 5 USD',
        date_time: '02/22/2020 6:00pm - 8:00pm',
    },
    {
        connId: '5',
        connFixtures: 'Manchester City vs Bayern Munich',
        connName: 'Manchester City',
        connTopic:'Premier League Teams Selection',
        details: 'Please bring your ID card and Entry Fee is 5 USD',
        date_time: '02/22/2020 6:00pm - 8:00pm',
    },
    {
        connId: '6',
        connFixtures: 'Manchester United vs PSG',
        connName: 'Manchester United',
        connTopic:'Premier League Teams Selection',
        details: 'Please bring your ID card and Entry Fee is 5 USD',
        date_time: '02/22/2020 6:00pm - 8:00pm', 
    },
  ];


  
  
  //return all connections
  module.exports.getConnections = function(callb) {
    callb(data)
  };

  module.exports.getConnection=function(id,callb){

    for (var i = 0; i < data.length; i++){
        if(data[i].connId==id){
            callb(data[i]);
            return;
        }
        if (data.length-1==i) {
        callb(undefined);
        return;
        }
    }

  }
  