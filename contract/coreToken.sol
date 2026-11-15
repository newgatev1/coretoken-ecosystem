
// SPDX-License-Identifier: MIT
pragma solidity 0.8.34;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoreToken is ERC20 {
        uint256 public constant INITIAL_SUPPLY =
                100_000_000 * 10 ** 18;

                    constructor() ERC20("COREToken", "CT") {
                                _mint(msg.sender, INITIAL_SUPPLY);
                    }
}

                    }
}
