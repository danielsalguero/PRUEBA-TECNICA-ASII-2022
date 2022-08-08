var config = require('./bd_config.js');
const sql = require('mssql');



async function getFiscalias(iddepartamento){ 
    try{
        //let pool = await sql.connect(config);
        let pool = await sql.connect('Data Source=DESKTOP-R4EJE55\\SQLEXPRESS;Initial Catalog=bd_mp;User ID=user_mp;Password=12345;Trusted_Connection=True;Integrated Security=False; TrustServerCertificate=True');
        //let pool = await sql.connect('Data Source = DESKTOP-R4EJE55\\SQLEXPRESS; Initial Catalog = bd_mp; Trusted_Connection=True; Integrated Security = True; TrustServerCertificate=True;');
        
        let resultado;
    
        if (iddepartamento == 0) {
    
            
             resultado = await pool.request().query("SELECT [id_fiscalia], A.[fiscalia], A.[direccion], A.[telefono], A.[estado],B.[departamento] FROM [TC_FISCALIA]  AS A JOIN [TC_DEPARTAMENTO]  AS B ON  A.[ID_DEPARTAMENTO] = B.[ID_DEPARTAMENTO] WHERE  A.[ESTADO] = 1");
       
            }else{
            resultado = await pool.request().query("SELECT [id_fiscalia], A.[fiscalia], A.[direccion], A.[telefono], A.[estado],B.[departamento] FROM [TC_FISCALIA]  AS A JOIN [TC_DEPARTAMENTO]  AS B ON  A.[ID_DEPARTAMENTO] = B.[ID_DEPARTAMENTO] WHERE  A.[ESTADO] = 1 AND B.[ID_DEPARTAMENTO] =" + iddepartamento);

          }

        console.log(resultado.recordsets);
        return resultado.recordsets;
        
    
    }catch(error){
        console.log('ERROR' + error);
    }

}

getFiscalias(0);

module.exports ={
    getFiscalias : getFiscalias
}