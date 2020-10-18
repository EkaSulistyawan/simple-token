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
                    window.location.href = './account.html';
                }else{
                    //  if the #new id clicked, then proceed to create new account
                    $('#new').click((e)=>{
                        //  contract execution
                        instance.create_account({from:activeAcc},(err,txhash)=>{
                            if(err){
                                alert('Creation Failed');
                            }else{
                                //   wait for pending transaction
                                web3.eth.getTransactionReceipt(txhash,(err,res)=>{
                                    if(!err){
                                        if(res==null){
                                            console.log('pending');
                                        }else{
                                            console.log('success');
                                            document.location.reload(true);
                                        }
                                    }
                                })
                            }
                        })
                    })
                }
            }
        })
    }
})
