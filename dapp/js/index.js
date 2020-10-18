import contractjs from './contract.js'

window.addEventListener('load',async()=>{
    if(window.ethereum){
        window.web3 = new Web3(ethereum);
        try{
            ethereum.enable();
        }catch(err){
            alert('Ethereum Injection through Metamask Failed!');
        }
        //   code here
        var instance = web3.eth.contract(contractjs.contract_abi).at(contractjs.contract_address);
        var activeAcc = web3.eth.accounts[0];

        //  if the account has been registered, proceed to create.html
        instance.getStatus({from:activeAcc},(err,res)=>{
            if(!err){
                console.log(res);
                if(res){
                    //alert('registered');
                    //proceed to account.html
                    window.location.href = './account.html';
                }else{
                    //  if the #new id clicked, then proceed to create new account
                    $('#new').click((e)=>{
                        //  contract execution
                        instance.create_account((err)=>{
                            if(err){
                                alert('Creation Failed');
                            }else{
                                //   reload the page
                                window.location.href = './index.html';
                            }
                        })
                    })
                }
            }
        })
    }
})