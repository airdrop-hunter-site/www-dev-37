function ga_dataLayer_push(evnt = "deposit",name,amount=0,comments="",hash="")
{
    window.dataLayer = window.dataLayer || [];
//    var m = new Array();
    var m = new Object();
    m.event             = evnt;
    m.name              = name;
    m.qty             	= amount;
    m.value             = amount;
    m.comments          = comments;
    m.hash              = hash;
    console.log(m);
    window.dataLayer.push(m);
//    window.dataLayer.push({
//        'event': evnt,
//      'name': name,
//        'value': amount,
//      'comments': comments,
//        'hash': hash
//    });
    log("GA push sended");

}
