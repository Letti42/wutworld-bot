import {loadFirebase} from 'cdo-firebase-storage';

;(async()=>{
    const storage = await loadFirebase('23-SfRzngxEqy9ml7EU4GVc6GaUCXHSFUkysN_O0lVw');
    console.log(Object.keys(storage))
    storage.onRecordEvent('Posts',(r,e)=>{
        if(!r.text)return;
        if(!r.text.includes('heroku'))return;
        storage.readRecords('Users',{username:'heroku'},(h)=>{
            let d = new Date();
            storage.createRecord('Comments',{post: r.id, text: "That's me!", timestamp: d.getTime(), user: h[0].id},(s)=>{return s;},(err)=>{console.log(err);});
        });     
    },function(err){
        console.log(err);
    });
})()
