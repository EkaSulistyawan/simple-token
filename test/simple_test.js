const simple = artifacts.require("simple_smart_contract");
var assert = require('assert');

contract("simple_smart_contract", async accounts =>{
    //  first test
    it("Account Registration",async ()=>{
        return simple.deployed().then((ins)=>{
            instance = ins;
            return instance.create_account({from:accounts[0]});
        }).then(()=>{
            return instance.getStatus({from:accounts[0]});
        }).then((bool0)=>{
            assert(bool0,'Accounts 0 should be registered');
            return instance.getStatus({from:accounts[1]});
        }).then((bool1)=>{
            assert(!bool1,'Accounts 1 is not registered');
        })
    })

    //  second test
    it("Can see Balance",async () =>{
        return simple.deployed().then((ins) =>{
            instance = ins;
            return instance.getBalance({from:accounts[0]});
        }).then((balance)=>{
            acc0init = balance.toNumber();
            return instance.deposit({from:accounts[0],value:10});
        }).then(()=>{
            return instance.getBalance({from:accounts[0]});
        }).then((balance)=>{
            acc0then = balance.toNumber();
            assert.strictEqual(acc0init+10,acc0then,"Failed");
        })
    })

    // third test
    it("Test Counter",async()=>{
        return simple.deployed().then((ins)=>{
            instance = ins;
            return instance.getActivity({from:accounts[0]});
        }).then((counter)=>{
            initCounter = counter.toNumber();
            //  counter after second test
            assert.strictEqual(initCounter,1,'Initial Counter is not 0');
            return instance.deposit({from:accounts[0],value:10}); // x1
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x2
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x3
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x4
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x5
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x6
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x7
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x8
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x9
        }).then(()=>{
            return instance.deposit({from:accounts[0],value:10}); // x10
        }).then(()=>{
            return instance.getActivity({from:accounts[0]});
        }).then((newcounter)=>{
            tenthCounter = newcounter.toNumber();
            assert.strictEqual(tenthCounter,11,'The tenth Counter is not 10');
            //  perform withdraw
        })
    })

    it("Try Withdraw after > 10 deposit",async()=>{
        return simple.deployed().then((ins)=>{
            instance = ins;
            // get current deposited balance
            return instance.getBalance({from:accounts[0]});
        }).then((res)=>{
            deposit0init = res.toNumber();
            //  try to withdraw
            return instance.withdraw(110,{from:accounts[0]});
        }).then(()=>{
            //  get current balance
            return instance.getBalance({from:accounts[0]});
        }).then((res)=>{
            deposit0now = res.toNumber();
            assert.strictEqual(deposit0now+110,deposit0init,'Withdrawing 110 Tokens should resulting in  0 balance');
        })
    })
})