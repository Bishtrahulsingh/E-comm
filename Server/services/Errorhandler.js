

class Errorhandler extends Error {   
    constructor(msg,status){
        super(msg,status)
        this.status=status
        this.message=msg 
    } 
   
    static Customerror(message,status){
        return new Errorhandler(message,status) 
    }
}


module.exports=Errorhandler