pragma solidity >=0.4.22 <0.8.0;

contract simple_smart_contract{

    // an account has attributes:
    // 1. Balance, the amount of token stored under an account
    // 2. Counter, at least 10-times deposit before can withdraw
    // 3. An account is active or not
    struct account{
        uint256 balance;
        uint256 counter;
        bool active;
    }

    mapping (address => account) public accounts;

    // create account
    function create_account() public{
        accounts[msg.sender].active = true;
        accounts[msg.sender].counter = 0;
    }

    // event
    event Deposit(address _curr_owner,uint256 deposited_amount);
    event Withdraw(address _curr_owner, uint256 deposited_amount, uint256 curr_balance);

    // deposit function
    function deposit() public payable{
        // must be active account
        require(accounts[msg.sender].active,'Acccount is not registered');
        // minimum deposit is 10
        require(msg.value >= 10,'Minimum deposited token is 10');
        // increase balance
        accounts[msg.sender].balance += msg.value;
        // add 1 to counter
        accounts[msg.sender].counter += 1;
        //  

        // emit deposit event
        emit Deposit(msg.sender,msg.value);
    }

    // withdraw function
    function withdraw(uint256 _amount)public payable{
        // must be active account
        require(accounts[msg.sender].active,'Acccount is not registered');
        //  at least 10 times deposit
        require(accounts[msg.sender].counter >= 10,'Minimum 10 activity (deposit) to perform withdraw');
        //  the amount of withdraw tokens is less than the balance
        require(accounts[msg.sender].balance >= _amount, 'Insufficient funds');

        //  proceed to withdraw
        accounts[msg.sender].balance -= _amount;
        msg.sender.transfer(_amount);
        
        // emit event
        emit Withdraw(msg.sender,_amount,accounts[msg.sender].balance);
    }


    //   see their balance
    function getBalance() public view returns (uint256){
        return accounts[msg.sender].balance;
    }
    
    // see current acitvity
    function getActivity() public view returns (uint256){
        return accounts[msg.sender].counter;
    }

    //  get active status of current address
    function getStatus() public view returns (bool){
        return accounts[msg.sender].active;
    }

}