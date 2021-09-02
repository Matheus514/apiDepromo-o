const express = require ("express");
const app = express(); 
const bodyParser = require ("body-parser");
const { urlencoded } = require("body-parser");
const cors = require ("cors")
app.use (cors());

app.use (bodyParser.urlencoded({extended:false}));
app.use (bodyParser.json());
const jwt = require("jsonwebtoken");
const JWTSecret = "jjkjsjdssllldldsdsdjdksjkdsjhjhjhllhjls"



function auth(req,res,next){
    const authToken = req.headers['authorization']
    
    if(authToken != undefined){
    
        const bearer = authToken.split(' ');
        var token = bearer[1];
    
        jwt.verify(token,JWTSecret,(err, data) => {
            if(err){
                res.status(401);
                res.json({err:"Token inválido!"});
            }else{
    
                req.token = token;
                req.loggedUser = {id: data.id,email: data.email};               
                next();
            }
        });
    }else{
        res.status(401);
        res.json({err:"Token inválido!"});
    } 
    }









var DB = {
    promocao : [
        {
            id: 23,
            nomeDapromocao: "Melhor Preço",
            descricaoDapromocao: "Coma bastande e pague pouco",
            valorDapromocao: "$25",
            itens: [1,7]
        },
    ],
    users: [
        {
            id: 1,
            name: "Victor Lima",
            email: "victordevtb@guiadoprogramador.com",
            password: "nodejs<3"
        },
        {
            id: 20,
            name: "Guilherme",
            email: "guigg@gmail.com",
            password: "java123"
        }
    ]
}

app.get("/promocao",auth,(req,res)=>{
    res.statusCode = 200;
    res.json(DB.promocao);
})

app.get("/promocao/:id",auth,(req , res)=>{

    if(isNaN(req.params.id)){
        res.sendStatus(400)
    }else{
       var id = parseInt(req.params.id);
    
       var promocao = DB.promocao.find(g =>g.id == id);
    
    
       if(promocao !=undefined){
           res.json(promocao);
       }else{
           res.sendStatus(404);
       }
    }
    });

    app.get("/pedido/:id",auth,(req,res)=>{
        if(isNaN(req.params.id)){
            res.sendStatus(400)
        }else{
           var id = parseInt(req.params.id);
        
           var pedido = DB.pedido.find(g =>g.id == id);
        
        
           if(pedido !=undefined){
               res.json(pedido);
           }else{
               res.sendStatus(404);
           }}
        });

app.post("/itens",auth,(req,res)=>{

var {itensDapromocao,descricaoDapromocao} = req.body;
var ultimoId = DB.pedido[DB.pedido.length-1].id+1

DB.pedido.push({
    id:ultimoId,
    itensDapromocao,descricaoDapromocao
})

})       


    app.post("/promocao",auth,(req,res)=>{
      
        var {nomeDapromocao,descricaoDapromocao,valorDapromocao} = req.body;
    var ultimoId = DB.promocao[DB.promocao.length-1].id+1;
    

     DB.promocao.push({
        id:ultimoId,
        nomeDapromocao,    
        descricaoDapromocao,valorDapromocao
    
    });
    
    res.sendStatus(200);
    })
    
    app.delete("/promocao/:id",auth,(req,res)=>{
    
        if(isNaN(req.params.id)){
            res.sendStatus(400)
        }else{
           var id = parseInt(req.params.id);
        
           var index = DB.promocao .findIndex(g => g.id == id);
           if (index == -1){
               res.sendStatus(404)
               
           }else{DB.promocao.splice(index,1);
    res.sendStatus(200);
           }
        
        }
        })
    
    app.put("/promocao/:id",auth,(req, res) => {
    
        if(isNaN(req.params.id)){
            res.sendStatus(400)
        }else{
           var id = parseInt(req.params.id);
        
           var promocao = DB.promocao.find(g =>g.id == id);
        
        
           if(promocao != undefined){
           
            var {nomeDapromocao,descricaoDapromocao,valorDapromocao} = req.body;
           
    
           
            if(nomeDapromocao!= undefined){
                pratos.nomeDoPrato = nomeDoPrato;
            }
    
            if(valorDapromocao != undefined){
                promocao.valorDapromocao = valorDapromocao;
            }
            if(descricaoDapromocao != undefined){
                promocao.descricaoDapromocao=descricaoDapromocao
            }
            res.sendStatus(200);
    
    
           }else{
               res.sendStatus(404);
           }
        
        }
    
    });


    app.post("/auth",auth,(req,res)=>{
        var {email, password} = req.body;

        if(email != undefined){
    
            var user = promocao.find(u => u.email == email);
            if(user != undefined){
                if(user.password == password){
                    jwt.sign({id: user.id, email: user.email},JWTSecret,{expiresIn:'48h'},(err, token) => {
                        if(err){
                            res.status(400);
                            res.json({err:"Falha interna"});
                        }else{
                            res.status(200);
                            res.json({token: token});
                        }
                    })
                }else{
                    res.status(401);
                    res.json({err: "Credenciais inválidas!"});
                }
            }else{
                res.status(404);
                res.json({err: "O E-mail enviado não existe na base de dados!"});
            }
    
        }else{
            res.status(400);
            res.send({err: "O E-mail enviado é inválido"});
        }
    })















app.listen(9091,()=>{
console.log ("api rodando");
});