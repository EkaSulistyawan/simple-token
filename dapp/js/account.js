import contractjs from './contract.js'

function toEther(x){
    return (x/1000000000000000000).toFixed(2);
}

$('#warning-withdraw').show()
$('#withdraw-section').hide()

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

        // get balance
        instance.getBalance({from:activeAcc},(err,res)=>{
            if(!err){
                $('#balance').val(res.toNumber());
            }else{
                console.log('Failed');
            }
        })

        //  deposit
        //  event
        var depositevent = instance.Deposit();
        depositevent.watch((err,res)=>{
            if(!err){
                console.log(res.args.deposited_amount.toNumber());
            }
        })
        //  emitter
        $('#deposit').click(()=>{
            instance.deposit({from:activeAcc,value:$('#deposit-val').val()},(err,res)=>{
                if(!err){
                    console.log(res);
                }
            })
        })

        //  withdraw
        instance.getActivity({from:activeAcc},async (err,res)=>{
            if(!err){
                if(res.toNumber()>=10){//   minimum 10 activity
                    $('#withdraw-section').show()
                    $('#warning-withdraw').hide()
                    $('#withdraw').click(()=>{
                        instance.withdraw($('#withdraw-val').val(),{from:activeAcc},(err,res)=>{
                            if(!err){
                                console.log(res);
                            }
                        })
                    })
                }else{
                    //  hide div
                    $('#actcounter').text(res.toNumber()+'/10 Activities to Withdraw')
                }
            }
        })
    }
})