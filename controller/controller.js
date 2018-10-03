var request = require('request');


module.exports = {
  createRepo : function(req,res){
    const repoName = req.body.repo;
    const repoDesc = req.body.desc;
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization' : `token ${process.env.GIT_TOKEN}`
      },
      body : JSON.stringify({
        "name" : repoName,
        "description" : repoDesc
      })
    };
    request.post(options,(error, response, body)=>{
      if(!error){
        res.status(200).json({
          msg : "success adding repository"
        });
      }
      else{
        res.status(500).json({
          msg : error
        });
      }
    });
  },

  findRepo : function(req,res){
    const options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'User-Agent': 'request',
        'Authorization' : `token ${process.env.GIT_TOKEN}`
      }
    };

    request.get(options,(error, response, body)=>{
      const data = JSON.parse(body);
      const result = [];

      for(let i = 0;i<data.length;i++){
        if(data[i].stargazers_count>0){
          result.push(data[i]);
        }
      }

      const final = [];
      for(let i in result){
        if(result[i][req.body.searchParam]===Number(req.body.paramValue)||result[i][req.body.searchParam]===req.body.paramValue){
          final.push(result[i]);
        }
      }

      if(!error){
        res.status(200).json({
          repo : final
        });
      }
      else{
        res.status(500).json({
          msg : error
        });
      }

    });
  },

  findStarredRepo : function(req,res){
  
    const options = {
      url: 'https://api.github.com/user/starred',
      headers: {
        'User-Agent': 'request',
        'Authorization' : `token ${process.env.GIT_TOKEN}`
      }
    };

    request.get(options,(error, response, body)=>{
      if(!error){
        const data = JSON.parse(body);
        res.status(200).json(data)
      }
      else{
        res.status(500).json(error)
      }
    });
  },

  searchByUsername : function(req,res){
    const username = req.params.username;
  
    const url = `https://api.github.com/users/${username}/repos`;

    const options = {
      url: url,
      headers: {
        'User-Agent': 'request',
        'Authorization' : `token ${process.env.GIT_TOKEN}`
      }
    };
    
    request.get(options,(error,response,body)=>{
      if(!error){
        console.log('masuk sana')
        res.status(200).json({
          listRepo : JSON.parse(body)
        });
      }
      else{
        console.log('masuk sini')
        res.status(500).json({
          msg : error
        });
      }

    });

  },

  unstarRepo : function(req,res){
    const username = req.body.username;
    const repo = req.body.repo;
    const url = `https://api.github.com/user/starred/${username}/${repo}`;

    const options = {
      url: url,
      headers: {
        'User-Agent': 'request',
        'Authorization' : `token ${process.env.GIT_TOKEN}`
      }
    };

    request.delete(options,(error,response,body)=>{
      if(!error){
        res.status(200).json({
          msg : "success"
        });
      }
      else{
        res.status(500).json({
          msg : error
        });
      }
    });
  },

  finding : function(req,res){
    const nama = req.query.name;

    const options = {
      url: 'https://api.github.com/user/starred',
      headers: {
        'User-Agent': 'request',
        'Authorization' : `token ${process.env.GIT_TOKEN}`
      }
    };

    request.get(options,(error, response, body)=>{
      const data = JSON.parse(body);
      const result = [];

      for(let i = 0;i<data.length;i++){
        if(data[i].name.indexOf(nama) >= 0){
          result.push(data[i]);
        }
      }

      if(!error){
        res.status(200).json({
          result
        });
      }
      else{
        res.status(500).json({
          msg : error
        });
      }

    });

  }
  ,
  signin : function(req,res){
    console.log(process.env.client_id)
    request({
          url: 'https://github.com/login/oauth/access_token',
          method: 'post',
          json: true,
          body: {
              client_id: process.env.client_id,
              client_secret : process.env.client_secret, 
              code : req.query.code
          }
          }, (err, incomingMsg, respon) => {
              if(err){
                  console.log(err);
              } else {
                  res.send(respon)
              }
          })
   }

};