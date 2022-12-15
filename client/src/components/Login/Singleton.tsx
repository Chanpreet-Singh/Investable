/**
 * Singleton class for login
 */

class Singleton{
    
    static instance: Singleton;

     urlLogin: string

    constructor(e: string){
        this.urlLogin = e;
    }

    static isInstance(){
        if(Singleton.instance){
            return true;
        }
        return false;
    }

 
    static getInstance(): Singleton {
        if(!Singleton.instance){
            Singleton.instance = new Singleton("/login");
        }
        return Singleton.instance;
    }
}

export default Singleton;